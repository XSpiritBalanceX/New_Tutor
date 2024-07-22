export interface ITeacherLanguage {
  id?: number;
  language: string;
  level: string;
  description: string;
  price: number;
  certificate: (File | { id: number; file: string })[];
}

export interface ITeacherLanguageSettings {
  teaching_languages: ITeacherLanguage[];
}

export type TNewLanguage = {
  language: number;
  level: number;
  description: string;
  price: number;
};

export type TUpdateLanguage = {
  id: number;
  language: number;
  level: number;
  description: string;
  price: number;
};
