import { instantiate } from "./lib/deno_pw_hashing.generated.js";
export const VERSION = "0.1.0";
export const { argon2_hash: argon2Hash, argon2_verify: argon2Verify } = await instantiate();
