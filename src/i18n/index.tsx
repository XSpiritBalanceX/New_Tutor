import i18n from "i18next";
import { initReactI18next, useTranslation } from "react-i18next";
import english from "./english.json";
import russian from "./russian.json";

export const i18Next = i18n.use(initReactI18next).init({
  resources: {
    en: english,
    ru: russian,
  },
  lng: "en",
  compatibilityJSON: "v3",
  fallbackLng: "en",
  interpolation: {
    escapeValue: false,
  },
});

export const translate = useTranslation;

export const i18nT = i18n.t;
