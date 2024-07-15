import { useState } from "react";
import {
  Box,
  Button,
  FormControlLabel,
  Radio,
  FormHelperText,
  RadioGroup,
  FormLabel,
  Checkbox,
  TextField,
  MenuItem,
  InputAdornment,
} from "@mui/material";
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
import { NavLink, useNavigate } from "react-router-dom";
import { listOfCountries } from "@utils/listOfCountries";
import { useAppSelector } from "@store/hook";
import * as tutorSelectors from "@store/selectors";
import { signUp } from "@api/auth/signUp";
import { toast } from "react-toastify";
import { useAppDispatch } from "@store/hook";
import { loginUser } from "@store/tutorSlice";
import { jwtDecode } from "jwt-decode";
import { IToken } from "@axiosApi/TypesAPI";
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

  const locale = useAppSelector(tutorSelectors.localeSelect);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const validationSchema = Yup.object().shape({
    user_type: Yup.string().oneOf(["0", "1"]).required(t("choosePath")),
    first_name: Yup.string().required(t("reqName")).min(3, t("errName")).max(20, t("errName")),
    last_name: Yup.string().required(t("reqSurname")).min(3, t("errName")).max(20, t("errName")),
    date_of_birthday: Yup.string().when("user_type", {
      is: (val: string) => val === "1",
      then: () =>
        Yup.string()
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

  const submitSignUp = async (data: ISignUp) => {
    const sentData = {
      first_name: data.first_name,
      last_name: data.last_name,
      email: data.email,
      password: data.password,
      user_type: Number(data.user_type),
      country: data.country ? Number(data.country) : null,
      date_of_birthday: data.date_of_birthday ? moment(data.date_of_birthday, "DD.MM.YYYY").format("YYYY-MM-DD") : null,
    };
    try {
      setIsLoading(true);
      const response = await signUp(sentData);
      const decode: IToken = jwtDecode(response.data.access_token);
      dispatch(
        loginUser({
          isLogin: true,
          token: response.data.access_token,
          refreshToken: response.data.refresh_token,
          expiresIn: decode.exp,
          user_type: decode.user_type,
          register_state: decode.register_state,
        }),
      );
      setTimeout(() => {
        data.user_type === "0" ? navigate("/registration/student") : navigate("/registration/teacher");
      }, 500);
    } catch (err: any) {
      toast.error(t("errSignIn"));
    } finally {
      setIsLoading(false);
    }
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

  const handleChangeCountry = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue("country", e.target.value);
  };

  return (
    <form onSubmit={handleSubmit(submitSignUp)} className="signUpForm">
      {isLoading && <Loader />}
      <p className="signUpFormTitle">{t("registration")}</p>
      <p className={`signUpAsTitle ${errors.user_type ? "errorLabel" : ""}`}>{t("registrationAs")}</p>
      <Box className="radioBtnBox">
        <RadioGroup className="radioBtnSignUpGroup">
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
        <FormHelperText className="errorMessage errorRadioGroup">{errors.user_type?.message}</FormHelperText>
      </Box>
      {fieldsName.map((el, ind) => (
        <Box key={ind} className="signUpFieldBox">
          <FormLabel className={`signUpLabel ${el.error ? "errorLabel" : ""}`}>{t(el.label)}</FormLabel>
          <ControlledInput control={control} name={el.name} error={el.error} placeholder={t(el.label)} />
        </Box>
      ))}
      <Box className="signUpFieldBox dateOfBirthBox">
        <FormLabel className={`signUpLabel ${errors.date_of_birthday ? "errorLabel" : ""}`}>
          {t("dateOfBirth")}
          <span className="notNesses">
            {watch("user_type") && watch("user_type") === "1" && ` (${t("notNecess")})`}
          </span>
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
      {watch("user_type") && watch("user_type") === "1" && (
        <Box className="signUpFieldBox">
          <FormLabel className={`signUpLabel ${errors.country ? "errorLabel" : ""}`}>{t("countrylabel")}</FormLabel>
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
      )}
      <Box className="signUpFieldBox">
        <FormLabel className={`signUpLabel ${errors.email ? "errorLabel" : ""}`}>{t("email")}</FormLabel>
        <ControlledInput control={control} name={"email"} placeholder={t("email")} error={errors.email?.message} />
      </Box>
      {passwordFields.map((el, ind) => (
        <Box key={ind} className="signUpFieldBox">
          <FormLabel className={`signUpLabel ${el.error ? "errorLabel" : ""}`}>{t(el.label)}</FormLabel>
          <ControlledPassword control={control} name={el.name} placeholder={t(el.label)} error={el.error} />
        </Box>
      ))}
      <Box className="policyBox">
        <FormControlLabel control={<Checkbox />} {...register("policy")} label={""} />
        <Box className="policyTitleBox">
          <p>{t("agreeWith")}</p> <NavLink to={"/terms"}>{t("termsOfUse")}</NavLink>
          <p>{t("and")}</p>
          <NavLink to={"/policy"}>{t("privacyPolicyAgree")}</NavLink>
        </Box>
        <FormHelperText className="errorMessage">{errors && errors.policy?.message}</FormHelperText>
      </Box>
      <Button type="submit" className="buttonSubmitSignUp">
        {t("signInReg")}
      </Button>
      <Box className="navigationBox">
        <p>{t("haveAcc")}</p>
        <NavLink to={"/login"}>{t("signInButton")}</NavLink>
      </Box>
    </form>
  );
};

export default SignUpForm;
