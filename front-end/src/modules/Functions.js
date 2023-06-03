import Translit from 'cyrillic-to-translit-js'
import Storage from '@/modules/Storage.js'
import config from '@/config.js'

export default {
  name: 'Functions',
  created(){
    Array.prototype.unique = function() {
      var a = this.concat();
      for(var i=0; i<a.length; ++i) {
        for(var j=i+1; j<a.length; ++j) {
          if(a[i] === a[j]) a.splice(j--, 1);
        }
      }
      return a;
    };
  },
  rand: function (max = 1){
    if(max == 0) max = 1;
    return Math.floor(Math.random() * max) + 1;
  },
  genCode: function (count = 16, is_number = false){
    let key = "";
    var possible = is_number ? "0123456789" : "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for (var i = 0; i < count; i++) key += possible.charAt(Math.floor(Math.random() * possible.length));
    return key;
  },
  getLink: function (domain){
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
  },
  ClipboardCoby(text) {
    navigator.clipboard.writeText(text);
  },
  GetYouTubeVideoID(url){
    var regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
    var match = url.match(regExp);
    return (match&&match[7].length==11)? match[7] : false;
  },
  HideNumber(string, replaceTo = '·', elemsHide = 5, sliceFromback = 2) { // eslint-disable-next-line
    var result = string.match(/^(\(?\+?\d{1,2}\)? ?\(?\d{1,3}\)? ?\d+\-? ?\d+\-? ?\d+)$/);
    if (result !== null){
      const regex = new RegExp(`((\\(?\\ ?\\-?\\d\\ ?\\-?\\)?){${elemsHide}})((\\ ?\\-?\\d\\ ?\\-?){${sliceFromback}}$)`, 'gm');

      let m;
      while ((m = regex.exec(string)) !== null) {
        if (m.index === regex.lastIndex) regex.lastIndex++;

        const forRex = m[1];
        const str = m[1].replace(/(\d)/gm, replaceTo);
        const lasts = m[3];
        const full = string;
        const noBack = full.slice(0, -lasts.length).slice(0, -forRex.length);
        const out = noBack+''+str+''+lasts;
        return out;
      }

      return string;
    } else return string;
  }
}