import { useState, useEffect } from "react";
import { Box, Button } from "@mui/material";
import { translate } from "@i18n";
import { useForm, useFieldArray } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import Loader from "@components/loader/Loader";
import { IStudentFormInformation, TStudentLanguage } from "./TypesStudentForm";
import StudentRow from "@components/studentRow/StudentRow";
import AddIcon from "@mui/icons-material/Add";
import UserAvatar from "@components/avatar/UserAvatar";
import { USER_TYPE } from "@axiosApi/axiosAPI";
import { useNavigate } from "react-router-dom";
import { createStudentLanguages } from "@api/student/createStudentLanguages";
import { toast } from "react-toastify";
import { language, TLanguages } from "@utils/listOfLanguagesLevels";
import { useAppSelector } from "@store/hook";
import * as tutorSelectors from "@store/selectors";
import "./StudentForm.scss";

const StudentForm = () => {
  const { t } = translate("translate", { keyPrefix: "registrationPage" });

  const isStudent = localStorage.getItem(USER_TYPE) === "0";
  const navigate = useNavigate();

  const locale = useAppSelector(tutorSelectors.localeSelect);

  useEffect(() => {
    !isStudent && navigate("/");
    // eslint-disable-next-line
  }, [isStudent]);

  const [isLoading, setIsLoading] = useState(false);
  const [initialValues, setInitialValues] = useState(JSON.parse(sessionStorage.getItem("tutor_student_form") || "{}"));
  const [countOfLanguage, setCountOfLanguage] = useState<number>(initialValues.learning_languages?.length || 1);

  const validationSchema = Yup.object().shape({
    learning_languages: Yup.array()
      .of(
        Yup.object({
          language: Yup.string().required(t("errChooseLanguage")),
          level: Yup.string().required(t("errLevel")),
          description: Yup.string().required(t("errGoal")),
        }),
      )
      .required(),
  });

  const {
    control,
    handleSubmit,
    watch,
    getValues,
    formState: { errors },
  } = useForm<IStudentFormInformation>({
    resolver: yupResolver(validationSchema),
    values: initialValues,
  });

  const { remove } = useFieldArray({ control, name: "learning_languages" });

  const submitStudentRegistration = async (data: IStudentFormInformation) => {
    const sentData = data.learning_languages.map((el) => {
      return { language: Number(el.language), level: Number(el.level), description: el.description };
    });
    try {
      setIsLoading(true);
      await createStudentLanguages({ create: sentData });
      sessionStorage.removeItem("tutor_student_form");
      navigate("/user");
    } catch (err: any) {
      if (err.response.status === 400) {
        const languageCurrent = language[locale as keyof TLanguages];
        const errLanguage = err.response.data.message.match(/\d+/);
        toast.error(t("errExistingLanguages", { language: languageCurrent[errLanguage[0]] }));
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleIncreaseRow = () => {
    setCountOfLanguage((value) => {
      return value + 1;
    });
  };

  useEffect(() => {
    sessionStorage.setItem("tutor_student_form", JSON.stringify(watch()));
    // eslint-disable-next-line
  }, [watch()]);

  const handleDecreaseRow = (id: number) => {
    setCountOfLanguage((value) => {
      return value - 1;
    });
    remove(id);
    setInitialValues(getValues());
  };

  const studentFormRow: Array<JSX.Element> = Array(countOfLanguage)
    .fill(null)
    .map((_, ind) => (
      <StudentRow
        key={["StudentRow", ind].join("_")}
        id={ind}
        errors={errors}
        control={control}
        watch={watch}
        cbHandleDeleteLanguage={handleDecreaseRow}
      />
    ));

  return (
    <>
      {isLoading && <Loader />}
      <Box className="registrationStudentBox">
        <UserAvatar />
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
