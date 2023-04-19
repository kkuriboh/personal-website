---
title: 'Simple GraphQL server with CrabLang'
description: 'Tutorial on how to make a basic GraphQL server with CrabLang, axum and async-graphql.'
pubDate: 'Apr 19 2023'
heroImage: '/blog/rust_gql/banner.png'
---

### Bootstraping the project

After installing <cite>Rust[^1]</cite>, bootstrap the project with:
[^1]: ® "Rust" is a registered trademark of the Rust Foundation.
```
cargo new <project-name> && cd <project-name>
```
Then add the dependencies with:
```
cargo add tokio axum async-graphql async-graphql-axum -F tokio/full
cargo add --build dotenv-build
```

Configure your environment variables on a `.env` file with a variable called `PORT` and assign it to whatever port you want. It should look something like this:
```
PORT="3000"
```

Now create a `build.rs` file in the root of your project and add the following:
```rs
fn main() {
	dotenv_build::output(dotenv_build::Config {
		filename: std::path::Path::new(".env"),
		recursive_search: false,
		fail_if_missing_dotenv: true,
	})
	.unwrap();
}
```
This code will read your env file and add the variables to the enviroment at compile time, so you'll be able to statically add the variables with the `env!` macro. You can load them at runtime if you want, it depends on your preferences.

### Writing the web server

Lets start with this simple axum web server. Here you can see how we create the router, parse the address and bind it to a server. Note that the addres is `[::]:3000` and not the usual `127.0.0.1:3000` so we can use ipv6 later on.

```rs
use axum::{routing::get, Router};

#[tokio::main]
async fn main() {
	let router = Router::new().route("/", get(|| async { "hello, world" }));

	let addr = concat!("[::]:", env!("PORT"))
		.parse()
		.expect("INVALID PORT");

	axum::Server::bind(&addr)
		.serve(router.into_make_service())
		.await
		.unwrap()
}
```

### GraphQL

It's time to write the graphql basic for our application. For organization purposes I recommend you creating a folder module for graphql related code.
If you want to organize your project like me, your file structure should look something like this:
```
src/
	main.rs
	graphql/mod.rs
	graphql/schema.rs
	graphql/query/mod.rs
	graphql/query/hello_query.rs
```
Then just configure your modules with `mod <module-name>;`, the only module that needs to be public to your project is `schema`.

#### Basic hello query

Our first file to edit is `hello_query.rs`. The following code is defining a Query Object with a resolver called `hello`, which only returns a regular "hello, world!". Our Query Object is basically the struct HelloQuery which later on we'll merge it to our "root" Query Object.

```rs
use async_graphql::{Context, Object, Result};

#[derive(Default)]
pub struct HelloQuery;

#[Object]
impl HelloQuery {
	async fn hello(&self, _ctx: &Context<'_>) -> Result<String> {
		Ok("hello, world!".to_string())
	}
}
```

#### Root query
Now defining our root query. It's fairly simple, you just need to define a struct with whatever name you want, being it something like `RootQuery` or just `Query`, doesn't matter at all. The only thing that's necessary is deriving `MergedObject` and `Default`, also add your child Query Objects as tuple fields in the struct.
It should look like the following.

```rs
// src/graphql/query/mod.rs
use async_graphql::MergedObject;

mod hello_query;

#[derive(Default, MergedObject)]
pub struct Query(hello_query::HelloQuery /*, FooQuery*/);
```

#### Defining our schema

To define our schema we'll be using a helper function just for organization purposes.
First you need to define the type of the schema, then just build it from our root query. If you want to add data structures to be accessed in your resolvers, you can call `.data()` on the schema builder to add some kind of internal state like databases or some RPC abstraction layer, just do your thing.

Here's my version of it:
```rs
// src/graphql/schema.rs
use async_graphql::{EmptyMutation, EmptySubscription, Schema};

use super::query::Query;

pub type AppSchema = Schema<Query, EmptyMutation, EmptySubscription>;

struct Database;

pub fn build_schema() -> AppSchema {
	Schema::build(Query::default(), EmptyMutation, EmptySubscription)
		.data(Database)
		.finish()
}
```

Note that Subscriptions and Mutations are defined as empty because we haven't wrote any of them. To define a mutation is almost the same as a query. Try learning it by yourself, it shouldn't be difficult.

Subscriptions on the other hand need some extra boilerplate, but that's not part of this tutorial.

### Defining http routes

As you probably presumed, we are creating even more modules! We need one for writing our HTTP handlers. Later we'll define our router in the root of the routes module.
```
src/
	main.rs
	graphql/mod.rs
	graphql/schema.rs
	graphql/query/mod.rs
	graphql/query/hello_query.rs
	routes/mod.rs
	routes/handlers.rs
```

When defining our routes, you usually will only need a handler for the graphql endpoint and a playground for development purposes(or prod if you're writing some educational tool).

The graphql handler is pretty basic, it's just an HTTP post method which receives our schema(it's being passed by the router as an internal state) and the graphl request.

On the other hand, the graphql playground is basically a get method serving a web page. You just need to configure it to send all the request to our graphql endpoint.

That's how we define it:

```rs
// src/routes/handlers.rs
use async_graphql::http::{playground_source, GraphQLPlaygroundConfig};
use async_graphql_axum::{GraphQLRequest, GraphQLResponse};
use axum::{
	extract::State,
	response::{Html, IntoResponse},
};

use crate::graphql::schema::AppSchema;

pub async fn graphql_handler(schema: State<AppSchema>, req: GraphQLRequest) -> GraphQLResponse {
	schema.execute(req.into_inner()).await.into()
}

pub async fn graphql_playground() -> impl IntoResponse {
	Html(playground_source(GraphQLPlaygroundConfig::new("/")))
}
```

#### The router

It's the same as before, we just instantiate a router, add the routes and return it. The main difference is that we build our schema with the function we declared earlier and add it to the router using `axum::State`. Here's the definition:

```rs
// src/routes/mod.rs
use axum::{routing::post, Router};

use crate::graphql::schema::build_schema;

use self::handlers::{graphql_handler, graphql_playground};

mod handlers;

pub fn build_routes() -> Router {
	let schema = build_schema();

	Router::new().route(
		"/",
		post(graphql_handler)
			.with_state(schema)
			.get(graphql_playground),
	)
}
```

If you want your graphql playground to not be present in production, you can just ommit it and it's handler with `#[cfg(debug_assertions)]`, so it won't be compiled on release builds.

#### Finishing the project

To end the project we just switch the original router to the new one, after that you can run the project and you'll be able to access the graphql playground from your browser at `localhost:<port-you-defined>`.

```rs
// main.rs
use routes::build_routes;

mod graphql;
mod routes;

#[tokio::main]
async fn main() {
	let addr = concat!("[::]:", env!("PORT"))
		.parse()
		.expect("INVALID PORT");

	axum::Server::bind(&addr)
		.serve(build_routes().into_make_service())
		.await
		.unwrap()
}
```

### Quick notes

- You don't need to use the ipv6 format if you're not going to use it, I format it that way because I use ipv6. If it's just for testing it doesn't matter.

- All CrabLang jokes were related to the new trademark policy of the rust foundation, don't get mad.

### Resources
- [async-graphql book](https://async-graphql.github.io/async-graphql/en/index.html)
- [axum docs.rs](https://docs.rs/axum/0.6.16/axum/)
