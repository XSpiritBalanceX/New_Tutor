import { FormLabel, Button, Box } from "@mui/material";
import { translate } from "@i18n";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import ControlledPassword from "@components/fields/ControlledPassword";
import "./ResetPassword.scss";

interface IResetPassword {
  password: string;
  confirm_password: string;
}

const ResetPasswordForm = () => {
  const { t } = translate("translate", { keyPrefix: "resetPasswordPage" });

  const validationSchema = Yup.object().shape({
    password: Yup.string()
      .required(t("errReqField"))
      .min(8, t("passMin"))
      .max(32, t("passMax"))
      .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,32}$/, t("wrongFormatPassword")),
    confirm_password: Yup.string()
      .required(t("errReqField"))
      .oneOf([Yup.ref("password")], t("passDontMatch")),
  });

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<IResetPassword>({
    resolver: yupResolver(validationSchema),
  });

  const submitResetPassword = (data: IResetPassword) => {
    console.log(data);
  };

  const passwords = [
    { name: "password", label: "password", error: errors?.password?.message },
    { name: "confirm_password", label: "confirmPassword", error: errors?.confirm_password?.message },
  ];

  return (
    <form onSubmit={handleSubmit(submitResetPassword)} className="resetPasswordForm">
      <p className="mainTitle">{t("passwordRecovery")}</p>
      <p className="title">{t("enterNewPassword")}</p>
      {passwords.map((el, ind) => (
        <Box key={ind} className="resetPasswordFieldBox">
          <FormLabel className={`resetLabel ${el.error ? "errorLabel" : ""}`}>{t(el.label)}</FormLabel>
          <ControlledPassword name={el.name} control={control} error={el.error} placeholder={t("password")} />
        </Box>
      ))}
      <Button type="submit" className="submitButton">
        {t("continue")}
      </Button>
    </form>
  );
};

export default ResetPasswordForm;
