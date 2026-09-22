export const supportedLocales = ['en', 'es', 'ca'];

export const messages = Object.fromEntries(
  supportedLocales.map((locale) => [locale, {}]),
);

function setMessage(locale, key, value) {
  const segments = key.split('.');
  const last = segments.pop();
  const target = segments.reduce((current, segment) => {
    current[segment] ??= {};
    return current[segment];
  }, messages[locale]);

  target[last] = value;
}

export function localized(key, values) {
  const fallback = values.en;

  supportedLocales.forEach((locale) => {
    setMessage(locale, key, values[locale] ?? fallback);
  });

  return key;
}
