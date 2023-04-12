Simple wrapper for argon2 hashing and verification for deno projects.

Currently is just a WASM wrapper for the hasing and verifying with the rust [argon2 crate](https://docs.rs/argon2/latest/argon2/). No options are exposed in this version, uses defaults.

```ts
import { argon2Hash, argon2Verify } from "https://raw.githubusercontent.com/innovatedev-deno/pw-hashing/main/mod.ts";

const hash = argon2Hash("password");
const isValid = argon2Verify("password", hash);
```

``bash
deno install --name=pw-hashing --allow-net=raw.githubusercontent.com https://raw.githubusercontent.com/innovatedev-deno/pw-hashing/main/cli.ts
``

``bash
pw-hashing hash password

# be sure to wrap hash in single quote or escape all $ characters
pw-hashing verify password '$argon2id$v=19$....'
``