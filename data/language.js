import { localized } from './i18n.js';

export const languageLabels = {
  speak: localized('language.labels.speak', { en: 'speak', es: 'hablar', ca: 'parlar' }),
  read: localized('language.labels.read', { en: 'read', es: 'leer', ca: 'llegir' }),
  write: localized('language.labels.write', { en: 'write', es: 'escribir', ca: 'escriure' }),
  level: localized('language.labels.level', { en: 'level*', es: 'nivel*', ca: 'nivell*' }),
};

export const languageData = [
  {
    name: 'Catalan',
    locale: 'ca',
    certification: localized('language.catalan.certification', { en: 'Native language', es: 'Lengua materna', ca: 'Llengua materna' }),
    level: 'C1',
    speak: 87,
    read: 92,
    write: 89,
    colors: {
      base: '#60a060',
      speak: '#307030',
      read: '#377737',
      write: '#408040',
      label: '#284',
    },
  },
  {
    name: 'Spanish',
    locale: 'es',
    certification: localized('language.spanish.certification', { en: 'Native language', es: 'Lengua materna', ca: 'Llengua materna' }),
    level: 'C1',
    speak: 93,
    read: 96,
    write: 88,
    colors: {
      base: '#53708c',
      speak: '#274461',
      read: '#2e4a67',
      write: '#365370',
      label: '#7594b2',
    },
  },
  {
    name: 'English',
    locale: 'en',
    certification: localized('language.english.certification', { en: 'Certification: Trinity College of London GESE Grade 9', es: 'Certificación: Trinity College of London GESE Grade 9', ca: 'Certificació: Trinity College of London GESE Grade 9' }),
    level: 'B2.3',
    speak: 67,
    read: 73,
    write: 71,
    colors: {
      base: '#b080e0',
      speak: '#7040a0',
      read: '#7747a7',
      write: '#8050b0',
      label: '#b8e',
    },
  },
];
