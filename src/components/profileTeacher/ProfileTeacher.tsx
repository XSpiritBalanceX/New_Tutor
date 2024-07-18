import { useState, useEffect } from "react";
import { Box, Button, FormLabel, FormHelperText, TextField, InputAdornment, MenuItem } from "@mui/material";
import { useAppSelector } from "@store/hook";
import * as tutorSelectors from "@store/selectors";
import { translate } from "@i18n";
import moment from "moment";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import ControlledInput from "@components/fields/ControlledInput";
import { InputMask } from "@react-input/mask";
import WarningAmberRoundedIcon from "@mui/icons-material/WarningAmberRounded";
import ProfileEmailNotification from "@components/notification/ProfileEmailNotification";
import { listOfCountries } from "@utils/listOfCountries";
import { useUpdateUserInformationMutation } from "@store/requestApi/profileApi";
import { toast } from "react-toastify";
import Loader from "@components/loader/Loader";
import "./ProfileTeacher.scss";

interface ITeacherInformation {
  first_name: string;
  last_name: string;
  date_of_birthday: string;
  email: string;
  country: string;
}

const ProfileTeacher = () => {
  const { t } = translate("translate", { keyPrefix: "profilePage" });

  const teacherInformation = useAppSelector(tutorSelectors.teacherProfileInfoSelect);
  const locale = useAppSelector(tutorSelectors.localeSelect);

  const [updateUserInformation, { isLoading: isLoadingUpdate }] = useUpdateUserInformationMutation();

  const [initialValues, setInitialValues] = useState({
    first_name: "",
    last_name: "",
    date_of_birthday: "",
    email: "",
    country: "",
  });
  const [isVerifyEmail, setIsVerifyEmail] = useState(false);

  useEffect(() => {
    if (teacherInformation) {
      const compiledData = {
        first_name: teacherInformation.first_name,
        last_name: teacherInformation.last_name,
        date_of_birthday: teacherInformation.date_of_birthday
          ? moment(teacherInformation.date_of_birthday, "YYYY-MM-DD").format("DD.MM.YYYY")
          : "",
        email: teacherInformation.email,
        country: teacherInformation.country ? teacherInformation.country.toString() : "",
      };
      setInitialValues(compiledData);
      setIsVerifyEmail(teacherInformation.is_verify_email);
    }
    // eslint-disable-next-line
  }, [teacherInformation]);

  const validationSchema = Yup.object().shape({
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
    country: Yup.string().required(t("chCountry")),
  });

  const {
    control,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<ITeacherInformation>({
    resolver: yupResolver(validationSchema),
    values: initialValues,
  });

  const submitTeacherProfile = (data: ITeacherInformation) => {
    if (JSON.stringify(initialValues) !== JSON.stringify(watch())) {
      const updateUserData = {
        first_name: data.first_name,
        last_name: data.last_name,
        date_of_birthday: moment(data.date_of_birthday, "DD.MM.YYYY").format("YYYY-MM-DD"),
        country: data.country ? Number(data.country) : null,
      };
      updateUserInformation(updateUserData)
        .unwrap()
        .then(() => toast.success(t("messageSucRequest")))
        .catch(() => toast.error(t("messageErrRequest")));
    }
  };

  const firstLastName = [
    { label: "firstName", name: "first_name", error: errors.first_name?.message },
    { label: "lastName", name: "last_name", error: errors.first_name?.message },
  ];

  const handleDateOfBirth = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.currentTarget;
    setValue("date_of_birthday", value);
  };

  const handleCloseNotification = () => {
    setIsVerifyEmail(true);
  };

  const handleChangeCountry = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue("country", e.target.value);
  };

  return (
    <>
      {isLoadingUpdate && <Loader />}
      <Box className="teacherProfileBox">
        <form onSubmit={handleSubmit(submitTeacherProfile)}>
          <Box className="doubleFields">
            {firstLastName.map((el, ind) => (
              <Box key={ind} className="teacherProfileFieldBox">
                <FormLabel className={`teacherProfileLabel ${el.error ? "errorLabel" : ""}`}>{t(el.label)}</FormLabel>
                <ControlledInput name={el.name} control={control} error={el.error} placeholder={t(el.label)} />
              </Box>
            ))}
          </Box>
          <Box className="doubleFields">
            <Box className="teacherProfileFieldBox dateOfBirthBox">
              <FormLabel className={`teacherProfileLabel ${errors.date_of_birthday ? "errorLabel" : ""}`}>
                {t("dateOfBirth")}
              </FormLabel>
              <InputMask
                mask="__.__.____"
                replacement={{ _: /\d/ }}
                placeholder={t("dateOfBirth")}
                className={`dataField ${errors.date_of_birthday ? "errorField" : ""}`}
                value={watch("date_of_birthday")}
                onChange={handleDateOfBirth}
              />
              {errors.date_of_birthday && <WarningAmberRoundedIcon className="errorIcon" />}
              <FormHelperText className="errorMessage">{errors.date_of_birthday?.message}</FormHelperText>
            </Box>
            <Box className="teacherProfileFieldBox">
              <FormLabel className={`teacherProfileLabel ${errors.email ? "errorLabel" : ""}`}>{t("email")}</FormLabel>
              <ControlledInput
                name={"email"}
                control={control}
                error={errors.email?.message}
                placeholder={t("email")}
              />
              {!isVerifyEmail && <ProfileEmailNotification cbHandleCloseNotification={handleCloseNotification} />}
            </Box>
          </Box>
          <Box className="doubleFields">
            <Box className="teacherProfileFieldBox dateOfBirthBox">
              <FormLabel className={`teacherProfileLabel`}>{t("phoneNumber")}</FormLabel>
              <InputMask
                mask="+375 (99) 999-99-99"
                replacement={{ "9": /\d/ }}
                placeholder={"+375 (XX) XXX-XX-XX"}
                className={`dataField `}
                disabled
              />
            </Box>
            <Box className="teacherProfileFieldBox">
              <FormLabel className={`teacherProfileLabel ${errors.country ? "errorLabel" : ""}`}>
                {t("countryLabel")}
              </FormLabel>
              <TextField
                value={watch("country") || ""}
                onChange={handleChangeCountry}
                select={true}
                label={t("chCountry")}
                className="countryField"
                error={!!errors.country}
                InputProps={{
                  endAdornment: !!errors.country && (
                    <InputAdornment position="end" className="errorIcon">
                      <WarningAmberRoundedIcon className="errorIcon" />
                    </InputAdornment>
                  ),
                }}
              >
                {listOfCountries.map((el, ind) => (
                  <MenuItem key={ind} value={el.id}>
                    {locale === "ru" ? el.russianLabel : el.englishLabel}
                  </MenuItem>
                ))}
              </TextField>
              <FormHelperText className="errorMessage">{errors && errors.country?.message}</FormHelperText>
            </Box>
          </Box>
          <Box className="submitButtonBox">
            <Button type="submit">{t("apply")}</Button>
          </Box>
        </form>
      </Box>
    </>
  );
};

export default ProfileTeacher;
