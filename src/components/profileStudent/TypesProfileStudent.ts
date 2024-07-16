import { Control, FieldErrors, UseFormWatch, UseFormSetValue } from "react-hook-form";

export type TStudentLanguage = {
  id?: number;
  language: string;
  level: string;
  description: string;
};

type TUserInformation = {
  first_name: string;
  last_name: string;
  date_of_birthday: string;
  email: string;
};

export interface IStudentFormInformation {
  user_information: TUserInformation;
  learning_languages: TStudentLanguage[];
}

export interface IStudentInformationProps {
  control: Control<IStudentFormInformation>;
  errors: FieldErrors<IStudentFormInformation>;
  setValue: UseFormSetValue<IStudentFormInformation>;
  watch: UseFormWatch<IStudentFormInformation>;
}

export interface IStudentLanguagesProps {
  control: Control<IStudentFormInformation>;
  countOfLanguage: number;
  errors: FieldErrors<IStudentFormInformation>;
  watch: UseFormWatch<IStudentFormInformation>;
  cbHandleCountOfRow: (value: number) => void;
  cbHandleDeleteLanguage: (id: number) => void;
}

export type TNewLanguage = {
  language: number;
  level: number;
  description: string;
};

export type TUpdatedLanguage = {
  id: number;
  language: number;
  level: number;
  description: string;
};
