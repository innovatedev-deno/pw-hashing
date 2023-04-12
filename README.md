Simple wrapper for argon2 hashing and verification for deno projects.

Currently is just a WASM wrapper for the hasing and verifying with the rust [argon2 crate](https://docs.rs/argon2/latest/argon2/). No options are exposed in this version, uses defaults.

```ts
import { argon2Hash, argon2Verify } from "https://deno.land/x/pw-hashing/mod.ts";

const hash = argon2Hash("password");
const isValid = argon2Verify("password", hash);
```
