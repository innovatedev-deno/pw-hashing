use wasm_bindgen::prelude::*;
use argon2::{
  password_hash::{
      rand_core::OsRng,
      PasswordHash, PasswordHasher, PasswordVerifier, SaltString
  },
  Argon2
};

#[wasm_bindgen]
pub fn argon2_hash(password: String) -> Result<String, JsValue> {
    let salt = SaltString::generate(&mut OsRng);
    let argon2 = Argon2::default();
    let password_bytes = password.into_bytes();
    let password_hash = argon2.hash_password(&password_bytes, &salt)
        .map_err(|e| JsValue::from_str(&format!("Error: {:?}", e)))?;

    Ok(password_hash.to_string())
}

#[wasm_bindgen]
pub fn argon2_verify(password: String, hash: String) -> Result<bool, JsValue> {
    let parsed_hash = PasswordHash::new(&hash).map_err(|e| JsValue::from_str(&format!("Error: {:?}", e)))?;
    let password_bytes = password.into_bytes();
    
    let result = Argon2::default().verify_password(&password_bytes, &parsed_hash).is_ok();
    Ok(result)
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_argon2_hash() {
        let password = "password";
        let password_hash = argon2_hash(password.to_string()).unwrap();
        assert!(!password_hash.is_empty());
    }

    //'function not implemented on non-wasm32 targets',
    
    #[test]
    fn test_argon2_verify() {
        let password = "password";
        let password_hash = argon2_hash(password.to_string()).unwrap();
        let verify_result = argon2_verify(password.to_string(), password_hash).unwrap();
        assert!(verify_result);
    }

    #[test]
    fn test_argon2_verify_wrong_password() {
        let password = "password";
        let wrong_password = "wrong_password";
        let password_hash = argon2_hash(password.to_string()).unwrap();
        let verify_result = argon2_verify(wrong_password.to_string(), password_hash).unwrap();
        assert!(!verify_result);
    }
}