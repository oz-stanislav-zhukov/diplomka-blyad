import state from '@/state.js'
import { nextTick } from 'vue'
import { createI18n } from 'vue-i18n/dist/vue-i18n.cjs'
import PageController from '@/modules/PageController.js'
import Storage from '@/modules/Storage.js'
import en from '@/lang/en.json'

export default {
  i18n: null,
  $i18n: null,
  SUPPORT_LOCALES: ['en', 'ru'],
  options: {
    locale: 'en',
    fallbackLocale: 'en',
    messages: { en: en },
    pluralizationRules: {
      /**
       * @param choice {number} a choice index given by the input to $tc: `$tc('path.to.rule', choiceIndex)`
       * @param choicesLength {number} an overall amount of available choices
       * @returns a final choice index to select plural word by
       */
      'ru': function(choice, choicesLength) {
        if(choice === 0) return 0;

        const teen = choice > 10 && choice < 20;
        const endsWithOne = choice % 10 === 1;

        if(choicesLength < 4) return (!teen && endsWithOne) ? 1 : 2;
        if(!teen && endsWithOne) return 1;
        if(!teen && choice % 10 >= 2 && choice % 10 <= 4) return 2;
        return (choicesLength < 4) ? 2 : 3;
      }
    }
  },


  setup(options = this.options){
    this.i18n = createI18n(options);
    this.$i18n = this.i18n.global;
    this.setI18nLanguage(options.locale);
    return this.i18n;
  },
  async created(){
    if(Storage.isCookie('language')) Storage.set('language', Storage.getCookie('language'));
    if(Storage.is('language')) state.user_settings.language = Storage.get('language');
    this.setLanguage(state.user_settings.language, false);
  },
  async setLanguage(locale = 'en', notify = true, save = true){
    if(!this.SUPPORT_LOCALES.includes(locale)) return false;
    if(!this.$i18n.availableLocales.includes(locale)) await this.loadLocaleMessages(locale);
    this.setI18nLanguage(locale, true);
    state.user_settings.language = locale;
    if(save) {
      Storage.set('language', locale);
      Storage.setCookie('language', locale);
    }

    if(notify) PageController.update();
    return this.$i18n;
  },

  setI18nLanguage(locale, legacy = false) {
    if (this.i18n.mode === 'legacy' || legacy) this.$i18n.locale = locale;
    else this.$i18n.locale.value = locale;
    document.querySelector('html').setAttribute('lang', locale);
  },
  async loadLocaleMessages(locale) {
    const messages = await import(/* webpackChunkName: "locale-[request]" */ `@/lang/${locale}.json`);
    this.$i18n.setLocaleMessage(locale, messages.default);
    return nextTick();
  }
}