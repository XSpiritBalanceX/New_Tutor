import { Box, FormLabel, Button, TextField, InputAdornment, FormHelperText } from "@mui/material";
import { translate } from "@i18n";
import { Controller, FieldValues, Path, PathValue } from "react-hook-form";
import ControlledSelect from "@components/fields/ControlledSelect";
import ControlledInput from "@components/fields/ControlledInput";
import { useAppSelector } from "@store/hook";
import * as tutorSelectors from "@store/selectors";
import { language, level, TLanguages, TLevel } from "@utils/listOfLanguagesLevels";
import WarningAmberRoundedIcon from "@mui/icons-material/WarningAmberRounded";
import { ITeacherRowProps } from "./TypesTeacherRow";
import Certificates from "./Certificates";
import "./TeacherRow.scss";

const TeacherRow = <T extends FieldValues>({
  id,
  control,
  watch,
  errors,
  cbHandleDeleteLanguage,
  setValue,
}: ITeacherRowProps<T>) => {
  const { t } = translate("translate", { keyPrefix: "registrationPage" });

  const locale = useAppSelector(tutorSelectors.localeSelect);

  const handleDeleteLanguage = () => {
    cbHandleDeleteLanguage(id);
  };

  return (
    <Box className="teacherRowBox">
      <Box className="firstRowTeacher">
        <Box className="teacherFieldBox">
          <FormLabel className="teacherFormLabel">{t("languageForTeaching")}</FormLabel>
          <ControlledSelect
            name={`teaching_languages.${id}.language`}
            control={control}
            label={t("chooseLanguage")}
            error={errors.teaching_languages?.[id]?.language?.message}
            options={language[locale as keyof TLanguages]}
          />
        </Box>
        <Box className="teacherFieldBox">
          <FormLabel className="teacherFormLabel">{t("levelOfLanguage")}</FormLabel>
          <ControlledSelect
            name={`teaching_languages.${id}.level`}
            control={control}
            label={t("chooseLanguage")}
            error={errors.teaching_languages?.[id]?.level?.message}
            options={level[locale as keyof TLevel]}
          />
        </Box>
      </Box>
      <Box className="secondRowTeacher">
        <Certificates id={id} watch={watch} setValue={setValue} />
        <Box className="teacherFieldBox">
          <FormLabel className="teacherFormLabel">{t("coastOfLesson")}</FormLabel>
          <ControlledInput
            name={`teaching_languages.${id}.price`}
            control={control}
            placeholder={t("typeCoast")}
            error={errors.teaching_languages?.[id]?.price?.message}
          />
          <p className="hintCoast">{t("hintCoast")}</p>
        </Box>
      </Box>
      <Box className="teacherFieldBox descriptionBox">
        <FormLabel className="teacherFormLabel">{t("professSkills")}</FormLabel>
        <Controller
          name={`teaching_languages.${id}.description` as Path<T>}
          control={control}
          defaultValue={"" as PathValue<T, Path<T>>}
          render={({ field }) => {
            return (
              <TextField
                {...field}
                multiline
                rows={5}
                error={!!errors.teaching_languages?.[id]?.description}
                placeholder={t("typeText")}
                className={`controlledField `}
                InputProps={{
                  endAdornment: !!errors.teaching_languages?.[id]?.description && (
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
          {errors.teaching_languages?.[id]?.description?.message}
        </FormHelperText>
      </Box>
      {watch("teaching_languages" as Path<T>) && watch("teaching_languages" as Path<T>).length !== 1 && (
        <Box className="deleteLanguageBox">
          <Button type="button" onClick={handleDeleteLanguage}>
            {t("deleteLanguage")}
          </Button>
        </Box>
      )}
    </Box>
  );
};

export default TeacherRow;
