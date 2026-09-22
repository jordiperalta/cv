import { addMessages, getLocaleFromNavigator, init, locale } from 'svelte-i18n';
import { messages, supportedLocales } from '../data/i18n.js';

import '../data/about.js';
import '../data/common.js';
import '../data/education.js';
import '../data/experience.js';
import '../data/language.js';

supportedLocales.forEach((language) => addMessages(language, messages[language]));

const browserLocale = getLocaleFromNavigator()?.split('-')[0];

init({
  fallbackLocale: 'en',
  initialLocale: supportedLocales.includes(browserLocale) ? browserLocale : 'en',
});

export { locale, supportedLocales };
