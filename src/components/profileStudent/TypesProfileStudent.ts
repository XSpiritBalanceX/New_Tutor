import { Control, FieldErrors, UseFormWatch } from "react-hook-form";

type TStudentLanguage = {
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
  country: string;
};

export interface IStudentFormInformation {
  user_information: TUserInformation;
  learning_languages: TStudentLanguage[];
}

export interface IStudentLanguagesProps {
  control: Control<IStudentFormInformation>;
  countOfLanguage: number;
  errors: FieldErrors<IStudentFormInformation>;
  watch: UseFormWatch<IStudentFormInformation>;
  cbHandleCountOfRow: (value: number) => void;
}
