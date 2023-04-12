import { argon2Hash, argon2Verify } from "./mod.ts";

const [cmd, ...args] = Deno.args

if (cmd === "hash") {
  const hashes = args.map((arg) => argon2Hash(arg))
  console.log(hashes.join(" "))
} else if (cmd === "verify") {
  const [password, hash] = args
  const isSame = argon2Verify(password, hash)
  console.log(isSame)
  Deno.exit(isSame ? 0 : 1)
}