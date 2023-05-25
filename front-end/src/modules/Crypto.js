import CryptoJS from 'crypto-js/crypto-js'

const KEY = CryptoJS.enc.Utf8.parse("izohuZOkmMfa8gLC"); // 16b
const IV = CryptoJS.enc.Utf8.parse("73MxOniTv1XlF9eMALjUGg1imomgzTOa"); // 32b

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