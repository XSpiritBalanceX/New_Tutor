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
import { ITeacherLanguageSettings, ITeacherLanguage } from "./TypesSettingLanguages";
import AddIcon from "@mui/icons-material/Add";
import "./SettingTeacherLanguages.scss";

const SettingTeacherLanguages = () => {
  const { t } = translate("translate", { keyPrefix: "profilePage" });

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

  useEffect(() => {
    if (teacherLanguages) {
      const completedData = teacherLanguages.map((el) => {
        return {
          language: el.language.toString(),
          level: el.level.toString(),
          description: el.description,
          price: el.price,
          certificate: el.files,
        };
      });
      setInitialValues({ teaching_languages: completedData });
      setCountOfLanguage(completedData.length);
    }
    // eslint-disable-next-line
  }, [teacherLanguages]);

  const validationSchema = Yup.object().shape({
    teaching_languages: Yup.array()
      .of(
        Yup.object({
          id: Yup.number(),
          language: Yup.string().required(t("errChooseLanguage")),
          level: Yup.string().required(t("errLevel")),
          description: Yup.string().required(t("errGoal")),
          price: Yup.number().required(t("errFillField")).typeError(t("typeCoast")),
          certificate: /* Yup.mixed<File[]>().default([]).required(t("errCertificate")) */ Yup.array().required(),
        }),
      )
      .required(),
  });

  const {
    control,
    watch,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<ITeacherLanguageSettings>({
    resolver: yupResolver(validationSchema),
    values: initialValues,
  });

  const { remove } = useFieldArray({ control, name: "teaching_languages" });

  const submitTeacherLanguages = (data: ITeacherLanguageSettings) => {
    console.log(data);
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
  );
};

export default SettingTeacherLanguages;
