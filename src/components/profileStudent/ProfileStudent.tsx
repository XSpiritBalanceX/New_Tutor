import { useState, useEffect } from "react";
import { Box, Button } from "@mui/material";
import { useAppSelector } from "@store/hook";
import * as tutorSelectors from "@store/selectors";
import { useForm, useFieldArray } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { translate } from "@i18n";
import moment from "moment";
import StudentLanguages from "./StudentLanguages";
import StudentInformation from "./StudentInformation";
import { IStudentFormInformation, TStudentLanguage, TNewLanguage, TUpdatedLanguage } from "./TypesProfileStudent";
import DeleteLanguageNotification from "@components/notification/DeleteLanguageNotification";
import { useUpdateStudentLanguagesMutation, useUpdateUserInformationMutation } from "@store/requestApi/profileApi";
import { toast } from "react-toastify";
import Loader from "@components/loader/Loader";
import "./ProfileStudent.scss";

const ProfileStudent = () => {
  const { t } = translate("translate", { keyPrefix: "profilePage" });

  const studentInformation = useAppSelector(tutorSelectors.studentInformationSelect);

  const [initialValues, setInitialValues] = useState<IStudentFormInformation>({
    user_information: { first_name: "", last_name: "", date_of_birthday: "", email: "", country: "" },
    learning_languages: [],
  });
  const [countOfLanguage, setCountOfLanguage] = useState<number>(initialValues.learning_languages.length || 1);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState<null | TStudentLanguage>(null);

  const [updateStudentLanguages, { isLoading: isLoadingUpdate }] = useUpdateStudentLanguagesMutation();
  const [updateUserInformation, { isLoading: isLoadingUpdateProfile }] = useUpdateUserInformationMutation();

  useEffect(() => {
    if (studentInformation) {
      const compiledDataLanguages = studentInformation.languages.map((el) => {
        return { id: el.id, language: el.language.toString(), level: el.level.toString(), description: el.description };
      });
      const compiledDataUser = {
        first_name: studentInformation.user.first_name,
        last_name: studentInformation.user.last_name,
        date_of_birthday: studentInformation.user.date_of_birthday
          ? moment(studentInformation.user.date_of_birthday, "YYYY-MM-DD").format("DD.MM.YYYY")
          : "",
        email: studentInformation.user.email,
        country: studentInformation.user.country ? studentInformation.user.country.toString() : "",
      };
      setInitialValues({ user_information: compiledDataUser, learning_languages: compiledDataLanguages });
      setCountOfLanguage(compiledDataLanguages.length);
    }
    // eslint-disable-next-line
  }, [studentInformation]);

  const validationSchema = Yup.object().shape({
    user_information: Yup.object({
      first_name: Yup.string().required(t("reqName")).min(3, t("errName")).max(20, t("errName")),
      last_name: Yup.string().required(t("reqSurname")).min(3, t("errName")).max(20, t("errName")),
      date_of_birthday: Yup.string()
        .required(t("reqDateOfBirth"))
        .test("valid-date", t("notValidDateOfBirth"), (value) => {
          if (!value) return true;
          const dob = moment(value, "DD.MM.YYYY");
          return !dob.isValid() ? false : true;
        })
        .test("less-18", t("greatThan"), (value) => {
          if (!value) return true;
          const minAge = 18;
          const currentDate = moment();
          const dob = moment(value, "DD.MM.YYYY");
          const age = currentDate.diff(dob, "years");
          return age >= minAge;
        }),
      email: Yup.string().required(t("reqEmail")).email(t("wrongEmail")),
      country: Yup.string().default(""),
    }),
    learning_languages: Yup.array()
      .of(
        Yup.object({
          id: Yup.number(),
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
    setValue,
    formState: { errors },
  } = useForm<IStudentFormInformation>({
    resolver: yupResolver(validationSchema),
    values: initialValues,
  });

  const { remove } = useFieldArray({ control, name: "learning_languages" });

  const submitStudentProfile = (data: IStudentFormInformation) => {
    const newLanguages: TNewLanguage[] = [];
    const updatedLanguages: TUpdatedLanguage[] = [];
    if (JSON.stringify(initialValues.learning_languages) !== JSON.stringify(watch("learning_languages"))) {
      data.learning_languages.forEach((el) => {
        if (!el.id) {
          newLanguages.push({ language: Number(el.language), level: Number(el.level), description: el.description });
        } else {
          updatedLanguages.push({
            id: el.id,
            language: Number(el.language),
            level: Number(el.level),
            description: el.description,
          });
        }
      });
      updateStudentLanguages({ newLanguages: newLanguages, updateLanguages: updatedLanguages })
        .unwrap()
        .then(() => toast.success(t("messageSucRequest")))
        .catch(() => toast.error(t("messageErrRequest")));
    }

    if (JSON.stringify(initialValues.user_information) !== JSON.stringify(watch("user_information"))) {
      const updateUserData = {
        first_name: data.user_information.first_name,
        last_name: data.user_information.last_name,
        date_of_birthday: moment(data.user_information.date_of_birthday, "DD.MM.YYYY").format("YYYY-MM-DD"),
        country: data.user_information.country ? Number(data.user_information.country) : null,
      };
      updateUserInformation(updateUserData)
        .unwrap()
        .then(() => toast.success(t("messageSucRequest")))
        .catch(() => toast.error(t("messageErrRequest")));
    }
  };

  const handleCloseModal = () => {
    setIsOpenModal(false);
    setCurrentLanguage(null);
  };

  const handleCountRow = (value: number) => {
    setCountOfLanguage(value);
  };

  const handleDeleteLanguage = (id: number) => {
    const language = initialValues.learning_languages.find((_, ind) => ind === id);
    if (language) {
      setCurrentLanguage(language);
      setIsOpenModal(true);
    } else {
      setCountOfLanguage((value) => {
        return value - 1;
      });
      remove(id);
    }
  };

  return (
    <>
      {(isLoadingUpdate || isLoadingUpdateProfile) && <Loader />}
      <Box className="studentProfileBox">
        <DeleteLanguageNotification
          isOpen={isOpenModal}
          cbCloseModal={handleCloseModal}
          currentLanguage={currentLanguage}
        />
        <form onSubmit={handleSubmit(submitStudentProfile)}>
          <StudentInformation
            control={control}
            errors={errors}
            setValue={setValue}
            watch={watch}
            is_verify_email={studentInformation?.user?.is_verify_email}
          />
          <StudentLanguages
            control={control}
            countOfLanguage={countOfLanguage}
            errors={errors}
            watch={watch}
            cbHandleCountOfRow={handleCountRow}
            cbHandleDeleteLanguage={handleDeleteLanguage}
          />
          <Box className="submitButtonBox">
            <Button type="submit">{t("apply")}</Button>
          </Box>
        </form>
      </Box>
    </>
  );
};

export default ProfileStudent;
