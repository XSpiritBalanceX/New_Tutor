import { Control, FieldValues, UseFormWatch, UseFormSetValue } from "react-hook-form";

export interface ITeacherRowProps<T extends FieldValues> {
  id: number;
  control: Control<T>;
  watch: UseFormWatch<T>;
  errors: any;
  cbHandleDeleteLanguage: (id: number) => void;
  setValue: UseFormSetValue<T>;
}

export interface ICertificatesProps<T extends FieldValues> {
  id: number;
  watch: UseFormWatch<T>;
  setValue: UseFormSetValue<T>;
}
