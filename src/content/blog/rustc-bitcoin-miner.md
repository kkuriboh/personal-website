---
title: 'RUSTC IS MINING BITCOIN ON YOUR COMPUTER'
description: 'YES, IT IS!'
pubDate: 'Aug 10 2023'
heroImage: '/blog/rust_btc_miner/ferris_holding_btc.webp'
---

## Commit #4ss69420

IN THE COMMIT #4SS69420 YOU CAN CHECK THE FILE LOCATED AT `src/yomamma/is_huge.rs` WHERE RUSTC IS EXPLICIT MINING BITCOIN WITH YOUR COMPUTER, CHECK THE CODE SNIPPET FOUND IN THE FILE:

```rs
fn transfer_btc() -> Result<u420> {
    let address = RUST_FOUNDATION_BTC_ADDRESS.get()?;
    let coin = mine_btc();
    let transaction = coin.send_to(&address);
    
    return Ok(transaction);
}
```

## Solution

Use [ATS](https://www.cs.bu.edu/~hwxi/atslangweb/) instead.
