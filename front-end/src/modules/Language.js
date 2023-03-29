import state from '@/state.js'

import { nextTick } from 'vue'
import { createI18n } from 'vue-i18n'
import en from '@/lang/en.json'
import PageController from '@/modules/PageController.js'
import Storage from '@/modules/Storage.js'

export const SUPPORT_LOCALES = ['en', 'ru'];

export function setupI18n(options = { locale: 'en', fallbackLocale: 'en', messages: { en: en }, pluralizationRules: {
  /**
   * @param choice {number} a choice index given by the input to $tc: `$tc('path.to.rule', choiceIndex)`
   * @param choicesLength {number} an overall amount of available choices
   * @returns a final choice index to select plural word by
   */
  'ru': function(choice, choicesLength) {
    // this === VueI18n instance, so the locale property also exists here
    if(choice === 0) return 0;
    const teen = choice > 10 && choice < 20;
    const endsWithOne = choice % 10 === 1;
    if(choicesLength < 4) return (!teen && endsWithOne) ? 1 : 2;
    if(!teen && endsWithOne) return 1;
    if(!teen && choice % 10 >= 2 && choice % 10 <= 4) return 2;
    return (choicesLength < 4) ? 2 : 3;
  }
} }){
  const i18n = createI18n(options);
  setI18nLanguage(i18n, options.locale);
  return i18n;
}

export function setI18nLanguage(i18n, locale, legacy = false) {
  if (i18n.mode === 'legacy' || legacy) {
    i18n.locale = locale;
  } else {
    i18n.locale.value = locale;
  }

  document.querySelector('html').setAttribute('lang', locale);
}

export async function loadLocaleMessages(i18n, locale) {
  const messages = await import(
    /* webpackChunkName: "locale-[request]" */ `@/lang/${locale}.json`
  );

  i18n.setLocaleMessage(locale, messages.default);

  return nextTick();
}

export async function setLanguage(i18n, paramsLocale = 'en', notify = true){
    // use locale if paramsLocale is not in SUPPORT_LOCALES
    if (!SUPPORT_LOCALES.includes(paramsLocale)) {
      return false;
    }

    // load locale messages
    if (!i18n.availableLocales.includes(paramsLocale)) {
      await loadLocaleMessages(i18n, paramsLocale);
    }

    // set i18n language
    setI18nLanguage(i18n, paramsLocale, true);

    if(notify) PageController.update();
    return i18n;
}

export async function switchLang($i18n, locale){
  state.user_settings.language = locale;
  Storage.set('language', locale);
  Storage.setCookie('language', locale);
  setLanguage($i18n, locale);
}