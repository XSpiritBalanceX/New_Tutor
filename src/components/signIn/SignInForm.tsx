import { useState } from "react";
import { Button, Box } from "@mui/material";
import { NavLink } from "react-router-dom";
import { translate } from "@i18n";
import Loader from "@components/loader/Loader";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { useForm } from "react-hook-form";
import TwitterIcon from "@mui/icons-material/Twitter";
import GoogleIcon from "@mui/icons-material/Google";
import "./SignInForm.scss";

interface ISignIn {
  email: string;
  password: string;
}

const SignInForm = () => {
  const { t } = translate("translate", { keyPrefix: "authPage" });

  const [isLoading, setIsLoading] = useState(false);

  const validationSchema = Yup.object().shape({
    email: Yup.string().required(t("reqEmail")).email("wrongEmail"),
    password: Yup.string()
      .required("reqPassword")
      .min(8, t("passMin"))
      .max(32, t("passMax"))
      .matches(/^[a-zA-Z0-9]+$/, t("wrongFormatPassword")),
  });

  const { control, handleSubmit } = useForm<ISignIn>({ resolver: yupResolver(validationSchema) });

  const submitSignIn = (data: ISignIn) => {
    console.log(data);
  };

  const authButtons = [
    { label: "f", path: "/" },
    { label: <TwitterIcon />, path: "/" },
    { label: <GoogleIcon />, path: "/" },
  ];

  return (
    <form onSubmit={handleSubmit(submitSignIn)} className="signInForm">
      {isLoading && <Loader />}
      <p className="signInTitle">{t("login")}</p>
      <Box className="linkForgotBox">
        <NavLink to={"/resetpassword"} className={"linkForgot"}>
          {t("forgotPassw")}
        </NavLink>
      </Box>
      <Button type="submit" className="buttonSubmit">
        {t("signInButton")}
      </Button>
      <Box className="noAccountBox">
        <p>{t("noAcca")}</p>
        <NavLink to={"/registration"} className={"linkReg"}>
          {t("signInReg")}
        </NavLink>
      </Box>
      <Box className="authBox">
        <p>{t("or")}</p>
        <p>{t("signInWith")}</p>
        <Box>
          {authButtons.map((el, ind) => (
            <Button key={ind} type="button" className="authButton">
              {el.label}
            </Button>
          ))}
        </Box>
      </Box>
    </form>
  );
};

export default SignInForm;
