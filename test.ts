import {
  assert,
  assertEquals,
} from "https://deno.land/std@0.182.0/testing/asserts.ts";

import { argon2Hash, argon2Verify } from "./mod.ts";

Deno.test("argon2Hash", async (t) => {
  const password = "password";
  const password2 = "password2";
  const hash = argon2Hash(password);
  const hash2 = argon2Hash(password2);

  await t.step("hash is an argon2id string", () => {
    //https://regex101.com/library/8d0bGE
    assertEquals(
      hash.search(
        /^\$argon2id\$v=(?:16|19)\$m=\d{1,10},t=\d{1,10},p=\d{1,3}(?:,keyid=[A-Za-z0-9+/]{0,11}(?:,data=[A-Za-z0-9+/]{0,43})?)?\$[A-Za-z0-9+/]{11,64}\$[A-Za-z0-9+/]{16,86}$/,
      ),
      0,
    );
  });

  await t.step("hash is different for different passwords", () => {
    assert(hash !== hash2);
  });

  await t.step("hash passes for same password", () => {
    const isSame = argon2Verify(password, hash);
    assert(isSame);

    const isSame2 = argon2Verify(password2, hash2);
    assert(isSame2);
  });

  await t.step("hash fails for different password", () => {
    const isNotSame = argon2Verify("password2", hash);
    assert(!isNotSame);
  });
});
