import { Box, FormLabel, Button, TextField, InputAdornment, FormHelperText } from "@mui/material";
import { translate } from "@i18n";
import { Controller, Control, FieldValues, Path, PathValue, UseFormWatch } from "react-hook-form";
import ControlledSelect from "@components/fields/ControlledSelect";
import { useAppSelector } from "@store/hook";
import * as tutorSelectors from "@store/selectors";
import { language, level } from "@utils/listOfLanguagesLevels";
import WarningAmberRoundedIcon from "@mui/icons-material/WarningAmberRounded";
import "./StudentRow.scss";

interface IStudentRowProps<T extends FieldValues> {
  id: number;
  control: Control<T>;
  watch: UseFormWatch<T>;
  errors: any;
  cbHandleDeleteLanguage: (id: number) => void;
}

const StudentRow = <T extends FieldValues>({
  id,
  control,
  watch,
  errors,
  cbHandleDeleteLanguage,
}: IStudentRowProps<T>) => {
  const { t } = translate("translate", { keyPrefix: "registrationPage" });

  const locale = useAppSelector(tutorSelectors.localeSelect);

  const languageCurrent = locale === "en" ? language.english : language.russian;
  const levelCurrent = locale === "en" ? level.english : level.russian;

  const handleDeleteLanguage = () => {
    cbHandleDeleteLanguage(id);
  };

  return (
    <Box className="studentRowBox">
      <Box className="languageLevelBoxes">
        <Box className="studentFieldBox">
          <FormLabel className="studentFormLabel">{t("languageForLearning")}</FormLabel>
          <ControlledSelect
            name={`learning_languages.${id}.language`}
            control={control}
            label={t("chooseLanguage")}
            error={errors.learning_languages?.[id]?.language?.message}
            options={languageCurrent}
          />
        </Box>
        <Box className="studentFieldBox">
          <FormLabel className="studentFormLabel">{t("levelOfLanguage")}</FormLabel>
          <ControlledSelect
            name={`learning_languages.${id}.level`}
            control={control}
            label={t("chooseLanguage")}
            error={errors.learning_languages?.[id]?.level?.message}
            options={levelCurrent}
          />
        </Box>
      </Box>
      <Box className="studentFieldBox goalBox">
        <FormLabel className="studentFormLabel">{t("goalForLearning")}</FormLabel>
        <Controller
          name={`learning_languages.${id}.description` as Path<T>}
          control={control}
          defaultValue={"" as PathValue<T, Path<T>>}
          render={({ field }) => {
            return (
              <TextField
                {...field}
                multiline
                rows={5}
                error={!!errors.learning_languages?.[id]?.description}
                placeholder={t("typeText")}
                className={`controlledField `}
                InputProps={{
                  endAdornment: !!errors.learning_languages?.[id]?.description && (
                    <InputAdornment position="end" className="errorIcon">
                      <WarningAmberRoundedIcon />
                    </InputAdornment>
                  ),
                }}
              />
            );
          }}
        />
        <FormHelperText className="errorMessage">
          {errors.learning_languages?.[id]?.description?.message}
        </FormHelperText>
      </Box>
      {watch("learning_languages" as Path<T>) && watch("learning_languages" as Path<T>).length !== 1 && (
        <Box className="deleteLanguageBox">
          <Button type="button" onClick={handleDeleteLanguage}>
            {t("deleteLanguage")}
          </Button>
        </Box>
      )}
    </Box>
  );
};

export default StudentRow;
