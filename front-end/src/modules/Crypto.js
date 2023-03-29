import CryptoJS from 'crypto-js/crypto-js'

const KEY = CryptoJS.enc.Utf8.parse("yRNpKbjPcwnhA4E4"); // 16b
const IV = CryptoJS.enc.Utf8.parse("Fbw0L7Np3Ep8kaIb9jwYpByzfdVj2ScB"); // 32b

export function CryptoGenPublic(count = 16){
  return CryptoJS.lib.WordArray.random(count);
}

export async function getHash(message, algo = "SHA-256") {
  const msgUint8 = new TextEncoder("utf-8").encode(message);                    // encode as (utf-8) Uint8Array
  const hashBuffer = await crypto.subtle.digest(algo, msgUint8);                // hash the message
  const hashArray = Array.from(new Uint8Array(hashBuffer));                     // convert buffer to byte array
  const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join(''); // convert bytes to hex string
  return hashHex;
}

export function Encrypt(decrypted, passphrase = false) {
  if(typeof decrypted == 'undefined') return;

  try {
    let key = KEY;
    let iv = IV;

    if(passphrase) key = CryptoJS.enc.Utf8.parse(passphrase);

    decrypted = CryptoJS.enc.Utf8.parse(decrypted);
    var encrypted = CryptoJS.AES.encrypt(decrypted, key, {
      iv: iv,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Iso10126
    });

    encrypted = CryptoJS.enc.Base64.stringify(encrypted.ciphertext);
    encrypted = CryptoJS.RC4.encrypt(encrypted, key, {
      iv: iv,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Iso10126
    });

    encrypted = CryptoJS.enc.Base64.stringify(encrypted.ciphertext);
    return encrypted;
  } catch (err) {
    console.error(err.message);
    return null;
  }
}

export function Decrypt(encrypted, passphrase = false) {
  if(typeof encrypted == 'undefined') return;

  try {
    let key = KEY;
    let iv = IV;

    if(passphrase) key = CryptoJS.enc.Utf8.parse(passphrase);

    encrypted = CryptoJS.enc.Base64.parse(encrypted);
    encrypted = CryptoJS.enc.Base64.stringify(encrypted);

    var decrypted = CryptoJS.RC4.decrypt(encrypted, key, {
      iv: iv,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Iso10126
    });

    decrypted = decrypted.toString(CryptoJS.enc.Utf8);
    decrypted = CryptoJS.AES.decrypt(decrypted, key, {
      iv: iv,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Iso10126
    });

    decrypted = decrypted.toString(CryptoJS.enc.Utf8);
    return decrypted.toString();
  } catch (err) {
    console.error(err.message);
    return null;
  }
}

export function SessionEncrypt(text, passphrase){
  var salt = CryptoJS.lib.WordArray.random(32);
  var iv = CryptoJS.lib.WordArray.random(16);

  var key = CryptoJS.PBKDF2(passphrase, salt, { hasher: CryptoJS.algo.SHA512, keySize: 64/8, iterations: 999 });
  var encrypted = CryptoJS.AES.encrypt(text, key, {iv: iv});

  var data = {
    c: CryptoJS.enc.Base64.stringify(encrypted.ciphertext),
    s: CryptoJS.enc.Hex.stringify(salt),
    i: CryptoJS.enc.Hex.stringify(iv)    
  }

  return JSON.stringify(data);
}

export function SessionDecrypt(json, passphrase){   
  if(typeof json === 'string' || json instanceof String) json = JSON.parse(json);

  var cipher = json.c;
  var salt = CryptoJS.enc.Hex.parse(json.s);
  var iv = CryptoJS.enc.Hex.parse(json.i);

  var pkey = CryptoJS.PBKDF2(passphrase, salt, { hasher: CryptoJS.algo.SHA512, keySize: 64/8, iterations: 999 });
  var decrypted = CryptoJS.AES.decrypt(cipher, pkey, {iv: iv});
  return decrypted.toString(CryptoJS.enc.Utf8);
}

export function ApiEncrypt(text, client_id, client_key, client_secret){
  var iv = CryptoJS.lib.WordArray.random(16);
  var salt = CryptoJS.enc.Utf8.parse(`${client_secret.substring(16)}${client_secret.substring(8, 16)}${client_secret.substring(0, 16)}`.split("").reverse().join(""));
  var session_hash = CryptoJS.SHA256(`${client_id}${client_key}`).toString();

  var key = CryptoJS.PBKDF2(session_hash, salt, { hasher: CryptoJS.algo.SHA512, keySize: 64/8, iterations: 999 });
  var encrypted = CryptoJS.AES.encrypt(text, key, {iv: iv});
  return `${CryptoJS.enc.Hex.stringify(encrypted.ciphertext)}${CryptoJS.enc.Hex.stringify(iv)}`;
}