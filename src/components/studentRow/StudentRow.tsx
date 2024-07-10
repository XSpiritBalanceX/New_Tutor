import { Box, FormLabel, Button } from "@mui/material";
import { translate } from "@i18n";
import { Controller, Control, FieldValues, Path, PathValue, UseFormWatch, FieldErrors } from "react-hook-form";
import ControlledInput from "@components/fields/ControlledInput";
import "./StudentRow.scss";

interface IStudentRowProps<T extends FieldValues> {
  id: number;
  control: Control<T>;
  watch: UseFormWatch<T>;
  errors: any;
}

const StudentRow = <T extends FieldValues>({ id, control, watch, errors }: IStudentRowProps<T>) => {
  const { t } = translate("translate", { keyPrefix: "registrationPage" });
  console.log(watch("learning_languages" as Path<T>));
  return (
    <Box className="studentRowBox">
      <Box className="languageLevelBoxes">
        <Box className="studentFieldBox">
          <FormLabel className="studentFormLabel">{t("languageForLearning")}</FormLabel>
        </Box>
        <Box className="studentFieldBox">
          <FormLabel className="studentFormLabel">{t("levelOfLanguage")}</FormLabel>
        </Box>
      </Box>
      <Box className="studentFieldBox goalBox">
        <FormLabel className="studentFormLabel">{t("goalForLearning")}</FormLabel>
      </Box>
    </Box>
  );
};

export default StudentRow;
