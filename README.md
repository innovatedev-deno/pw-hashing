Simple wrapper for argon2 hashing and verification for deno projects.

Currently is just a WASM wrapper for the hasing and verifying with the rust [argon2 crate](https://docs.rs/argon2/latest/argon2/). No options are exposed in this version, uses defaults.

```ts
import { argon2Hash, argon2Verify } from "https://raw.githubusercontent.com/innovatedev-deno/pw-hashing/main/mod.ts";

const hash = argon2Hash("password");
const isValid = argon2Verify("password", hash);
```

## CLI

Install

```bash
deno install --name=pw-hashing --allow-net=raw.githubusercontent.com https://raw.githubusercontent.com/innovatedev-deno/pw-hashing/main/cli.ts
```

Usage

```bash
pw-hashing hash password

pw-hashing hash password1 password2
# outputs resulting hash - 1 per line

# when verifying a hash, be sure to wrap in single quote or escape all $ characters
pw-hashing verify password '$argon2id$v=19$....'
```