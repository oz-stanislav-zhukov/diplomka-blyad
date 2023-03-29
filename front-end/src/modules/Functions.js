import Translit from 'cyrillic-to-translit-js'
import Storage from '@/modules/Storage.js'
import config from '@/config.js'

export default {
  name: 'Functions',
  rand: function (max = 1){
    if(max == 0) max = 1;
    return Math.floor(Math.random() * max) + 1;
  },
  genCode: function (count = 16){
    let key = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for (var i = 0; i < count; i++) key += possible.charAt(Math.floor(Math.random() * possible.length));
    return key;
  },
  getLink: function (domain){
    //if(process.env.NODE_ENV === 'development') return '';
    return `${(config.domains.https ? 'https' : 'http')}://${config.domains[domain]}`;
  },
  isSubDomain: function (subdomain){
    return config.domains.subdomain == subdomain;
  },
  toUpperText(text){
    return text.charAt(0).toUpperCase() + text.slice(1);
  },
  translitName(user){
    const locale = Storage.get('language');
    const translit = new Translit();

    if(config.locale.translit.latin.indexOf(locale) != -1) {
      return { 
        first_name: translit.transform(user.first_name),
        middle_name: translit.transform(user.middle_name),
        last_name: translit.transform(user.last_name),
        original_name: [user.first_name, user.middle_name, user.last_name]
      };
    }

    return { first_name: user.first_name, middle_name: user.middle_name, last_name: user.last_name};
  },
  translitText(text){
    const locale = Storage.get('language');
    const translit = new Translit();
    if(config.locale.translit.latin.indexOf(locale) != -1) return translit.transform(text);
    return text;
  },
  PrecisionRound(number, precision) {
    var factor = Math.pow(10, precision);
    return Math.round(number * factor) / factor;
  },
  cHM(min) {
    return ("0" + min).slice(-2);
  }
}