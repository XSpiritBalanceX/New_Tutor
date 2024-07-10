import { useState, useEffect } from "react";
import { Box, Button } from "@mui/material";
import { translate } from "@i18n";
import { useForm, useFieldArray } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import Loader from "@components/loader/Loader";
import { useLocation } from "react-router-dom";
import AddIcon from "@mui/icons-material/Add";
import "./TeacherForm.scss";

interface ITeacherForm {
  teaching_languages: { language: string; level: string; description: string; price: number; certificate: File[] }[];
}

const TeacherForm = () => {
  const { t } = translate("translate", { keyPrefix: "registrationPage" });

  const { pathname } = useLocation();

  const isSchedule = pathname.includes("schedule");

  const [isLoading, setIsLoading] = useState(false);
  const [initialValues, setInitialValues] = useState(JSON.parse(sessionStorage.getItem("tutor_teacher_form") || "{}"));
  const [countOfLanguage, setCountOfLanguage] = useState<number>(initialValues.teaching_languages?.length || 1);

  const validationSchema = Yup.object().shape({
    teaching_languages: Yup.array()
      .of(
        Yup.object({
          language: Yup.string().required(t("errChooseLanguage")),
          level: Yup.string().required(t("errLevel")),
          description: Yup.string().required(t("errFillField")),
          price: Yup.number().required(t("errFillField")).typeError(t("typeCoast")),
          certificate: Yup.mixed<File[]>().default([]).required(t("errCertificate")),
        }),
      )
      .required(),
  });

  const {
    control,
    watch,
    setValue,
    getValues,
    handleSubmit,
    formState: { errors },
  } = useForm<ITeacherForm>({
    resolver: yupResolver(validationSchema),
  });

  const { remove } = useFieldArray({ control, name: "teaching_languages" });

  useEffect(() => {
    sessionStorage.setItem("tutor_teacher_form", JSON.stringify(watch()));
    // eslint-disable-next-line
  }, [watch()]);

  const submitTeacherForm = (data: ITeacherForm) => {
    console.log(data);
  };

  const handleIncreaseRow = () => {
    setCountOfLanguage((value) => {
      return value + 1;
    });
  };

  return (
    <>
      {isLoading && <Loader />}
      <Box className="teacherFormBox">
        <Box className="stepsBox">
          <Box className={"activeNumberOfStep"}>1</Box>
          <Box className={"activeLine firstLine"} />
          <Box className={`lastLine ${isSchedule ? "activeLine" : "lineInStep"}`} />
          <Box className={`${isSchedule ? "activeNumberOfStep" : "numberOfStep"}`}>2</Box>
        </Box>
        {!isSchedule && (
          <form onSubmit={handleSubmit(submitTeacherForm)}>
            <Box className="addLanguageButtonBox">
              <Button type="button" onClick={handleIncreaseRow}>
                <Box className="addBox">
                  <AddIcon />
                </Box>
                {t("addLanguageTeaching")}
              </Button>
            </Box>
            <Box className="submitButtonBox">
              <Button type="submit">{t("next")}</Button>
            </Box>
          </form>
        )}
      </Box>
    </>
  );
};

export default TeacherForm;
