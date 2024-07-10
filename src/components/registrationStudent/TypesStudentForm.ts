export type TStudentLanguage = {
  language: number;
  level: number;
  description: string;
};

export interface IStudentFormInformation {
  learning_languages: TStudentLanguage[];
}
