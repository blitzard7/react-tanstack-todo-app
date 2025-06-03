import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import translation from '../public/locales/en/translation.json';

i18n
  .use(initReactI18next)
  .init({
    fallbackLng: 'en',
    debug: true,
    interpolation: {
      escapeValue: false,
    },
    ns: ['translation'],
    defaultNS: 'translation',
    lng: 'en',
    resources: { en: { translation } },
  })
  .catch((e) => {
    console.error('Failed to initialize i18n', e);
  });

export default i18n;
