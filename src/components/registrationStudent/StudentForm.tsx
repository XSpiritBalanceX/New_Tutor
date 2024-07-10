import { useState } from "react";
import { Box, Button } from "@mui/material";
import { translate } from "@i18n";
import { useForm, useFieldArray } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import Loader from "@components/loader/Loader";
import { IStudentFormInformation, TStudentLanguage } from "./TypesStudentForm";
import StudentRow from "@components/studentRow/StudentRow";
import AddIcon from "@mui/icons-material/Add";
import "./StudentForm.scss";

const StudentForm = () => {
  const { t } = translate("translate", { keyPrefix: "registrationPage" });

  const [isLoading, setIsLoading] = useState(false);
  const [countOfLanguage, setCountOfLanguage] = useState(1);

  const validationSchema = Yup.object().shape({
    learning_languages: Yup.array()
      .of(
        Yup.object({
          language: Yup.number().required(t("errChooseLanguage")),
          level: Yup.number().required(t("errLevel")),
          description: Yup.string().required(t("errGoal")),
        }),
      )
      .required(),
  });

  const {
    control,
    register,
    handleSubmit,
    setError,
    watch,
    getValues,
    setValue,
    formState: { errors },
  } = useForm<IStudentFormInformation>({
    resolver: yupResolver(validationSchema),
  });

  const submitStudentRegistration = (data: IStudentFormInformation) => {
    console.log(data);
  };

  const studentFormRow: Array<JSX.Element> = Array(countOfLanguage)
    .fill(null)
    .map((_, ind) => (
      <StudentRow key={["StudentRow", ind].join("_")} id={ind} errors={errors} control={control} watch={watch} />
    ));

  const handleIncreaseRow = () => {
    setCountOfLanguage((value) => {
      return value + 1;
    });
  };

  return (
    <>
      {isLoading && <Loader />}
      <Box className="registrationStudentBox">
        <p className="titleRegister">{t("registration")}</p>
        <form onSubmit={handleSubmit(submitStudentRegistration)}>
          {studentFormRow}
          <Box className="addLanguageButtonBox">
            <Button type="button" onClick={handleIncreaseRow}>
              <Box className="addBox">
                <AddIcon />{" "}
              </Box>
              {t("addLanguageLearning")}
            </Button>
          </Box>
          <Box className="submitButtonBox">
            <Button type="submit">{t("next")}</Button>
          </Box>
        </form>
      </Box>
    </>
  );
};

export default StudentForm;
