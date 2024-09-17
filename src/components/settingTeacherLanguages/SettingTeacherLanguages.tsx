import { useState, useEffect } from "react";
import { Box, Button } from "@mui/material";
import TeacherRow from "@components/teacherRow/TeacherRow";
import { useAppSelector } from "@store/hook";
import * as tutorSelectors from "@store/selectors";
import { translate } from "@i18n";
import { useForm, useFieldArray } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import DeleteLanguageNotification from "@components/notification/DeleteLanguageNotification";
import { ITeacherLanguageSettings, ITeacherLanguage, TNewLanguage, TUpdateLanguage } from "./TypesSettingLanguages";
import AddIcon from "@mui/icons-material/Add";
import { USER_TYPE } from "@utils/appConsts";
import { useNavigate } from "react-router-dom";
import { useUpdateTeacherLanguagesMutation, useGetProfileQuery } from "@store/requestApi/profileApi";
import { toast } from "react-toastify";
import { uploadTeacherDocs } from "@api/teacher/uploadTeacherDocs";
import Loader from "@components/loader/Loader";
import "./SettingTeacherLanguages.scss";

const SettingTeacherLanguages = () => {
  const { t } = translate("translate", { keyPrefix: "profilePage" });

  const isStudent = localStorage.getItem(USER_TYPE) === "0";

  const navigate = useNavigate();

  const [updateTeacherLanguages, { isLoading: isLoadingUpdate }] = useUpdateTeacherLanguagesMutation();
  const { refetch: refetchProfileQuery, isLoading: isLoadingRefetch } = useGetProfileQuery({ isStudent: false });

  useEffect(() => {
    isStudent && navigate("/profile/settings");
    // eslint-disable-next-line
  }, [isStudent]);

  const teacherLanguages = useAppSelector(tutorSelectors.teacherLanguagesSelect);

  const [initialValues, setInitialValues] = useState<ITeacherLanguageSettings>({
    teaching_languages: [
      {
        language: "",
        level: "",
        description: "",
        price: 0,
        certificate: [],
      },
    ],
  });
  const [countOfLanguage, setCountOfLanguage] = useState<number>(initialValues.teaching_languages.length || 1);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState<null | ITeacherLanguage>(null);

  const validationSchema = Yup.object().shape({
    teaching_languages: Yup.array()
      .of(
        Yup.object({
          id: Yup.number(),
          language: Yup.string().required(t("errChooseLanguage")),
          level: Yup.string().required(t("errLevel")),
          description: Yup.string().required(t("errGoal")),
          price: Yup.number().required(t("errFillField")).typeError(t("typeCoast")),
          certificate: Yup.mixed<(File | { id: number; file: string })[]>().default([]).required(),
        }),
      )
      .required(),
  });

  const {
    control,
    watch,
    setValue,
    handleSubmit,
    clearErrors,
    formState: { errors },
  } = useForm<ITeacherLanguageSettings>({
    resolver: yupResolver(validationSchema),
    values: initialValues,
  });

  useEffect(() => {
    if (teacherLanguages) {
      const completedData = teacherLanguages.map((el) => {
        return {
          id: el.id,
          language: el.language.toString(),
          level: el.level.toString(),
          description: el.description,
          price: el.price,
          certificate: el.files,
        };
      });
      setInitialValues({ teaching_languages: completedData });
      setValue("teaching_languages", completedData);
      setCountOfLanguage(completedData.length);
    }
    // eslint-disable-next-line
  }, [teacherLanguages]);

  const { remove } = useFieldArray({ control, name: "teaching_languages" });

  const submitTeacherLanguages = async (data: ITeacherLanguageSettings) => {
    if (JSON.stringify(initialValues) !== JSON.stringify(data)) {
      const newLanguages: TNewLanguage[] = [];
      const updateLanguages: TUpdateLanguage[] = [];
      data.teaching_languages.forEach((el) => {
        if (!el.id) {
          newLanguages.push({
            language: Number(el.language),
            level: Number(el.level),
            description: el.description,
            price: Number(el.price),
          });
        } else {
          updateLanguages.push({
            id: el.id,
            language: Number(el.language),
            level: Number(el.level),
            description: el.description,
            price: Number(el.price),
          });
        }
      });
      try {
        const response = await updateTeacherLanguages({
          newLanguages: newLanguages,
          updateLanguages: updateLanguages,
        }).unwrap();

        const allCertificate: FormData[] = [];
        const idRowToChange: any[] = response.created_ids.slice();
        data.teaching_languages.forEach((el) => {
          if (el.certificate.length) {
            el.certificate.forEach((item) => {
              if (item instanceof File) {
                const formData = new FormData();
                formData.append("photo", item);
                allCertificate.push(formData);
                idRowToChange.push(el.id);
              }
            });
          }
        });

        await uploadTeacherDocs(allCertificate, idRowToChange);
        refetchProfileQuery();
        toast.success(t("messageSucRequest"));
      } catch (err: any) {
        toast.error(t("messageErrRequest"));
      }
    }
  };

  const handleCloseModal = () => {
    setIsOpenModal(false);
    setCurrentLanguage(null);
  };

  const handleIncreaseRow = () => {
    setCountOfLanguage((value) => {
      return value + 1;
    });
  };

  const handleDeleteLanguage = (id: number) => {
    const language = initialValues.teaching_languages.find((_, ind) => ind === id);
    if (language) {
      setCurrentLanguage(language);
      setIsOpenModal(true);
    } else {
      setCountOfLanguage((value) => {
        return value - 1;
      });
      remove(id);
      clearErrors(`teaching_languages.${id}`);
    }
  };

  const teacherRow: Array<JSX.Element> = Array(countOfLanguage)
    .fill(null)
    .map((_, ind) => (
      <TeacherRow
        key={["TeacherRow", ind].join("_")}
        id={ind}
        control={control}
        watch={watch}
        errors={errors}
        cbHandleDeleteLanguage={handleDeleteLanguage}
        setValue={setValue}
      />
    ));

  return (
    <>
      {(isLoadingUpdate || isLoadingRefetch) && <Loader />}
      <Box className="settingTeacherLanguageBox">
        <DeleteLanguageNotification
          isOpen={isOpenModal}
          cbCloseModal={handleCloseModal}
          currentLanguage={currentLanguage}
        />
        <form onSubmit={handleSubmit(submitTeacherLanguages)}>
          {teacherRow}
          <Box className="addLanguageButtonBox">
            <Button type="button" onClick={handleIncreaseRow}>
              <AddIcon />
            </Button>
            <p>{t("addLanguageLearning")}</p>
          </Box>
          <Box className="submitButtonBox">
            <Button type="submit">{t("apply")}</Button>
          </Box>
        </form>
      </Box>
    </>
  );
};

export default SettingTeacherLanguages;
