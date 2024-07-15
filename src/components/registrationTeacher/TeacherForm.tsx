import { useState, useEffect } from "react";
import { Box, Button } from "@mui/material";
import { translate } from "@i18n";
import { useForm, useFieldArray } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import Loader from "@components/loader/Loader";
import { useLocation, useNavigate } from "react-router-dom";
import AddIcon from "@mui/icons-material/Add";
import TeacherRow from "@components/teacherRow/TeacherRow";
import UserAvatar from "@components/avatar/UserAvatar";
import TeacherSchedule from "./TeacherSchedule";
import { USER_TYPE, REGISTER_STATE, TOKEN_KEY, TOKEN_EXPIRES_KEY } from "@axiosApi/axiosAPI";
import { createTeacherLanguages } from "@api/teacher/createTeacherLanguages";
import { uploadTeacherDocs } from "@api/teacher/uploadTeacherDocs";
import { refreshToken } from "@api/auth/refreshToken";
import { toast } from "react-toastify";
import { language, TLanguages } from "@utils/listOfLanguagesLevels";
import { useAppSelector } from "@store/hook";
import * as tutorSelectors from "@store/selectors";
import { jwtDecode } from "jwt-decode";
import { IToken } from "@axiosApi/TypesAPI";
import "./TeacherForm.scss";

interface ITeacherForm {
  teaching_languages: { language: string; level: string; description: string; price: number; certificate: File[] }[];
}

const TeacherForm = () => {
  const { t } = translate("translate", { keyPrefix: "registrationPage" });

  const locale = useAppSelector(tutorSelectors.localeSelect);

  const { pathname } = useLocation();
  const navigate = useNavigate();

  const isSchedule = pathname.includes("schedule");

  const isStudent = localStorage.getItem(USER_TYPE) === "0";
  const registerStep = localStorage.getItem(REGISTER_STATE);

  useEffect(() => {
    isStudent && navigate("/");
    if (pathname === "/registration/teacher") {
      registerStep !== "STEP1" && navigate("/");
      registerStep === "STEP2" && navigate("/registration/teacher/schedule");
    }
    // eslint-disable-next-line
  }, [isStudent, registerStep]);

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
          certificate: Yup.mixed<File[]>().nullable().default([]).required(t("errCertificate")),
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
    values: initialValues,
  });

  const { remove } = useFieldArray({ control, name: "teaching_languages" });

  useEffect(() => {
    sessionStorage.setItem("tutor_teacher_form", JSON.stringify(watch()));
    // eslint-disable-next-line
  }, [watch()]);

  const submitTeacherForm = async (data: ITeacherForm) => {
    const sentData = data.teaching_languages.map((el) => {
      return { language: Number(el.language), level: Number(el.level), description: el.description, price: el.price };
    });

    const formData = new FormData();
    const allCertificate: FormData[] = [];
    data.teaching_languages.forEach((el) => {
      if (Array.isArray(el.certificate)) {
        el.certificate.forEach((item) => {
          formData.append("photo", item);
          allCertificate.push(formData);
        });
      }
    });

    try {
      setIsLoading(true);
      const response = await createTeacherLanguages({ create: sentData });
      const responseCertificate =
        allCertificate.length !== 0 ? await uploadTeacherDocs(allCertificate, response.data.created_ids) : true;
      if (response && responseCertificate) {
        const responseToken = await refreshToken();
        const decode: IToken = jwtDecode(responseToken);
        localStorage.setItem(TOKEN_KEY, responseToken);
        localStorage.setItem(TOKEN_EXPIRES_KEY, decode.exp.toString());
        localStorage.setItem(REGISTER_STATE, decode.register_state);
        navigate("/registration/teacher/schedule");
      }
    } catch (err: any) {
      if (err.response.status === 400) {
        const languageCurrent = language[locale as keyof TLanguages];
        const errLanguage = err.response.data.message.match(/\d+/);
        errLanguage
          ? toast.error(t("errExistingLanguages", { language: languageCurrent[errLanguage[0]] }))
          : toast.error(t("errReq"));
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

  const handleDecreaseRow = (id: number) => {
    setCountOfLanguage((value) => {
      return value - 1;
    });
    remove(id);
    setInitialValues(getValues());
  };

  const teacherFormRow: Array<JSX.Element> = Array(countOfLanguage)
    .fill(null)
    .map((_, ind) => (
      <TeacherRow
        key={["TeacherRow", ind].join("_")}
        id={ind}
        control={control}
        watch={watch}
        errors={errors}
        cbHandleDeleteLanguage={handleDecreaseRow}
        setValue={setValue}
      />
    ));

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
        {!isSchedule && <UserAvatar />}
        {!isSchedule ? (
          <form onSubmit={handleSubmit(submitTeacherForm)}>
            {teacherFormRow}
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
        ) : (
          <TeacherSchedule />
        )}
      </Box>
    </>
  );
};

export default TeacherForm;
