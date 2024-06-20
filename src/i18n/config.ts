import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';
import EN from 'i18n/translation/EN.json';
import FR from 'i18n/translation/FR.json';
import CH from 'i18n/translation/CH.json';
import ID from 'i18n/translation/ID.json';
import TH from 'i18n/translation/TH.json';
import VN from 'i18n/translation/VN.json';
import KM from 'i18n/translation/KM.json';
import PT from 'i18n/translation/PT.json';
import ES from 'i18n/translation/ES.json';

const resources = {
  km: { translation: KM },
  pt: { translation: PT },
  es: { translation: ES },
  vn: { translation: VN },
  th: { translation: TH },
  en: { translation: EN, },
  fr: { translation: FR, },
  cn: { translation: CH },
  id: { translation: ID }
};

i18next
  .use(initReactI18next)
  .init({
    debug: false,
    lng: 'en',
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false, // not needed for react as it escapes by default
    },
    resources
  });