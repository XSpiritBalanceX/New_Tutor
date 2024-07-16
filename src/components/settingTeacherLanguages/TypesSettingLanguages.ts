export interface ITeacherLanguage {
  id?: number;
  language: string;
  level: string;
  description: string;
  price: number;
  certificate: File[] | { id: number; file: string }[];
}

export interface ITeacherLanguageSettings {
  teaching_languages: ITeacherLanguage[];
}
