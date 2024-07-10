export type TStudentLanguage = {
  language: string;
  level: string;
  description: string;
};

export interface IStudentFormInformation {
  learning_languages: TStudentLanguage[];
}
