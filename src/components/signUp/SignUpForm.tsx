import { useState } from "react";
import { Box, Button, FormControlLabel, Radio, FormHelperText, RadioGroup, FormLabel, Checkbox } from "@mui/material";
import { translate } from "@i18n";
import Loader from "@components/loader/Loader";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { useForm } from "react-hook-form";
import { InputMask, MaskEvent } from "@react-input/mask";
import moment from "moment";
import ControlledInput from "@components/fields/ControlledInput";
import WarningAmberRoundedIcon from "@mui/icons-material/WarningAmberRounded";
import ControlledPassword from "@components/fields/ControlledPassword";
import { NavLink } from "react-router-dom";
import "./SignUpForm.scss";

interface ISignUp {
  user_type: "0" | "1";
  first_name: string;
  last_name: string;
  date_of_birthday?: string;
  country?: string;
  email: string;
  password: string;
  confirm_password: string;
  policy: boolean;
}

const SignUpForm = () => {
  const { t } = translate("translate", { keyPrefix: "authPage" });

  const [isLoading, setIsLoading] = useState(false);

  const validationSchema = Yup.object().shape({
    user_type: Yup.string().oneOf(["0", "1"]).required(t("choosePath")),
    first_name: Yup.string().required(t("reqName")).min(3, t("errName")).max(20, t("errName")),
    last_name: Yup.string().required(t("reqSurname")).min(3, t("errName")).max(20, t("errName")),
    date_of_birthday: Yup.string().when("user_type", {
      is: (val: string) => val === "0",
      then: () =>
        Yup.string()
          .notRequired()
          .test("valid-date", t("notValidDateOfBirth"), (value) => {
            const dob = moment(value, "DD.MM.YYYY");
            return !dob.isValid() ? false : true;
          })
          .test("less-18", t("greatThan"), (value) => {
            const minAge = 18;
            const currentDate = moment();
            const dob = moment(value, "DD.MM.YYYY");
            const age = currentDate.diff(dob, "years");
            return age >= minAge;
          }),
      otherwise: () =>
        Yup.string()
          .required(t("reqDateOfBirth"))
          .test("valid-date", t("notValidDateOfBirth"), (value) => {
            const dob = moment(value, "DD.MM.YYYY");
            return !dob.isValid() ? false : true;
          })
          .test("less-18", t("greatThan"), (value) => {
            const minAge = 18;
            const currentDate = moment();
            const dob = moment(value, "DD.MM.YYYY");
            const age = currentDate.diff(dob, "years");
            return age >= minAge;
          }),
    }),
    country: Yup.string().when("user_type", {
      is: (val: string) => val === "1",
      then: () => Yup.string().required(t("chooseCountry")),
      otherwise: () => Yup.string(),
    }),
    email: Yup.string().required(t("reqEmail")).email(t("wrongEmail")),
    password: Yup.string()
      .required(t("reqPassword"))
      .min(8, t("passMin"))
      .max(32, t("passMax"))
      .matches(/^[a-zA-Z0-9]+$/, t("wrongFormatPassword")),
    confirm_password: Yup.string()
      .required(t("confirmPassw"))
      .oneOf([Yup.ref("password")], t("passDontMatch")),
    policy: Yup.boolean().oneOf([true], t("haveToAgree")).required(t("haveToAgree")),
  });

  const {
    control,
    handleSubmit,
    register,
    watch,
    setValue,
    formState: { errors },
  } = useForm<ISignUp>({ resolver: yupResolver(validationSchema) });

  const submitSignUp = (data: ISignUp) => {
    console.log(data);
  };

  const usersTypes = [
    { label: "student", value: "0" },
    { label: "teacher", value: "1" },
  ];

  const fieldsName = [
    { label: "firstName", name: "first_name", error: errors.first_name?.message },
    { label: "lastName", name: "last_name", error: errors.last_name?.message },
  ];

  const passwordFields = [
    { label: "createPassword", name: "password", error: errors.password?.message },
    { label: "confirmPassw", name: "confirm_password", error: errors.confirm_password?.message },
  ];

  const handleDateOfBirth = (e: MaskEvent) => {
    const { value } = e.detail;
    setValue("date_of_birthday", value);
  };

  return (
    <form onSubmit={handleSubmit(submitSignUp)}>
      {isLoading && <Loader />}
      <p>{t("registration")}</p>
      <p>{t("registrationAs")}</p>
      <Box>
        <RadioGroup>
          {usersTypes.map((el, ind) => (
            <FormControlLabel
              key={ind}
              value={el.value}
              control={<Radio />}
              label={t(el.label)}
              {...register("user_type")}
            />
          ))}
        </RadioGroup>
        <FormHelperText className="errorMessage">{errors.user_type?.message}</FormHelperText>
      </Box>
      {fieldsName.map((el, ind) => (
        <Box key={ind}>
          <FormLabel className={`signInLabel ${el.error ? "errorLabel" : ""}`}>{t(el.label)}</FormLabel>
          <ControlledInput control={control} name={el.name} error={el.error} placeholder={t(el.label)} />
        </Box>
      ))}
      <Box>
        <FormLabel className={`signInLabel ${errors.email ? "errorLabel" : ""}`}>
          {t("dateOfBirth")}
          <span>{watch("user_type") && watch("user_type") === "1" && ` (${t("notNecess")})`}</span>
        </FormLabel>
        <InputMask
          mask="__.__.____"
          replacement={{ _: /\d/ }}
          placeholder={t("dateOfBirth")}
          onMask={handleDateOfBirth}
          className={`dataField ${errors.date_of_birthday ? "errorField" : ""}`}
        />
        {errors.date_of_birthday && <WarningAmberRoundedIcon className="errorIcon" />}
        <FormHelperText className="errorMessage">{errors && errors.date_of_birthday?.message}</FormHelperText>
      </Box>
      {watch("user_type") && watch("user_type") === "1" && "countryField"}
      <Box>
        <FormLabel className={`signInLabel ${errors.email ? "errorLabel" : ""}`}>{t("email")}</FormLabel>
        <ControlledPassword control={control} name={"email"} placeholder={t("email")} error={errors.email?.message} />
      </Box>
      {passwordFields.map((el, ind) => (
        <Box key={ind}>
          <FormLabel className={`signInLabel ${el.error ? "errorLabel" : ""}`}>{t(el.label)}</FormLabel>
          <ControlledPassword control={control} name={el.name} placeholder={t(el.label)} error={el.error} />
        </Box>
      ))}
      <Box>
        <FormControlLabel control={<Checkbox />} {...register("policy")} label={""} />
        <Box>
          <p>{t("agreeWith")}</p>
          <NavLink to={"/terms"}>{t("termsOfUse")}</NavLink>
          <p>{t("and")}</p>
          <NavLink to={"/policy"}>{t("privacyPolicyAgree")}</NavLink>
        </Box>
      </Box>
      <Button type="submit">{t("signInReg")}</Button>
      <Box>
        <p>{t("haveAcc")}</p>
        <NavLink to={"/login"}>{t("signInButton")}</NavLink>
      </Box>
    </form>
  );
};

export default SignUpForm;
