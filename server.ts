import { serve } from 'https://deno.land/std@0.194.0/http/server.ts'
import { serveDir } from 'https://deno.land/std@0.194.0/http/file_server.ts'

serve((req) =>
	serveDir(req, { fsRoot: '.', headers: ['content-encoding: br'] })
)
