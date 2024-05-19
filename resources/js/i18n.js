import { nextTick } from 'vue';
import { createI18n } from 'vue-i18n';

let i18n;

export const SUPPORT_LOCALES = ['en', 'ja'];

export const LOCALS = [
  {
    id: 1,
    label: 'en',
    value: 'en',
    avatar: 'https://www.shareicon.net/data/32x32/2016/03/22/447191_flag_48x48.png'
  },
  {
    id: 2,
    label: 'ja',
    value: 'ja',
    avatar: 'https://www.shareicon.net/data/32x32/2015/07/23/73663_flag_256x256.png'
  },
];

export function setI18nLanguage(locale) {
  loadLocaleMessages(locale);

  if (i18n.mode === 'legacy') {
    i18n.global.locale = locale;
  } else {
    i18n.global.locale.value = locale;
  }

  document.querySelector('html').setAttribute('lang', locale);
  localStorage.setItem('lang', locale);
}

export async function loadLocaleMessages(locale) {
  // load locale messages with dynamic import
  const messages = await import(
    `./locales/${locale}.json`
  );

  // set locale and locale message
  i18n.global.setLocaleMessage(locale, messages.default);

  return nextTick();
}

export default function setupI18n() {
  if(!i18n) {
    let locale = localStorage.getItem('lang') || 'en';

    i18n = createI18n({
      globalInjection: true,
      legacy: false,
      locale: locale,
      fallbackLocale: 'en'
    });

    setI18nLanguage(locale);
  }
  return i18n;
}