import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import translationEN from '../translations/en/translation.json';
import translationFR from '../translations/fr/translation.json';
import translationKR from '../translations/ko/translation.json';
import translationES from '../translations/es/translation.json';
import translationZH from '../translations/zh/translation.json';

i18n
    .use(initReactI18next)
    .init({
        resources: {
            en: {
                translation: translationEN,
            },
            fr: {
                translation: translationFR,
            },
            ko: {
                translation: translationKR,
            },
            es: {
                translation: translationES,
            },
            zh: {
                translation: translationZH,
            },
        },
        lng: 'en', 
        fallbackLng: 'en', 
        interpolation: {
            escapeValue: false, 
        },
    });

export default i18n;
