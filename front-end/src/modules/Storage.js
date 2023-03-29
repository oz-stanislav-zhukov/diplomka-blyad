import { Encrypt, Decrypt } from "@/modules/Crypto.js"
import config from '@/config.js'

export default {
  name: 'Storage',
  get: function (key, crypt = false){
    let data = localStorage[key];
    return crypt ? Decrypt(data) : data;
  },
  set: function (key, data, crypt = false){
    localStorage[key] = (crypt) ? Encrypt(data) : data;
  },
  unset: function (key){
    localStorage.removeItem(key);
  },
  is: function (key){
    return localStorage[key] ? true : false;
  },
  getCookie: function (key, original = false, crypt = false){
    var matches = document.cookie.match(new RegExp( // eslint-disable-next-line
      `(?:^|; )${key.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1')}=([^;]*)`
    ));

    var result = matches ? decodeURIComponent(matches[1]) : false;
    if(original) return crypt ? Decrypt(result) : result;
    else if(typeof result == 'undefined') return false;
    else if(result == 'false') return false;
    return crypt ? Decrypt(result) : result;
  },
  setCookie: function (key, data, crypt = false, age = 2678400){
    if(import.meta.env.DEV) document.cookie = `${key}=${(crypt) ? Encrypt(data) : data}; path=/; samesite=lax; max-age=${age}`;
    else document.cookie = `${key}=${(crypt) ? Encrypt(data) : data}; path=/; domain=.${config.domains.domain}; samesite=lax; max-age=${age}`;
    return true;
  },
  deleteCookie: function(key) {
    return this.setCookie(key, "", false, -1);
  },
  isCookie: function(key) {
    return this.getCookie(key, true) ? true : false;
  }
}