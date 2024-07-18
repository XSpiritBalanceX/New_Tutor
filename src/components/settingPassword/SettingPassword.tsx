import { Box, FormLabel, Button } from "@mui/material";
import { translate } from "@i18n";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import ControlledPassword from "@components/fields/ControlledPassword";
import "./SettingPassword.scss";

interface ISettingPassword {
  old_password: string;
  new_password: string;
  confirm_password: string;
}

const SettingPassword = () => {
  const { t } = translate("translate", { keyPrefix: "settingPasswordPage" });

  const validationSchema = Yup.object().shape({
    old_password: Yup.string()
      .required(t("reqField"))
      .min(8, t("passMin"))
      .max(32, t("passMax"))
      .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,32}$/, t("wrongFormatPassword")),
    new_password: Yup.string().required(t("reqField")),
    confirm_password: Yup.string()
      .required(t("reqField"))
      .oneOf([Yup.ref("new_password")], t("passDontMatch")),
  });

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<ISettingPassword>({
    resolver: yupResolver(validationSchema),
  });

  const submitChangePassword = (data: ISettingPassword) => {
    console.log(data);
  };

  const passwordFields = [
    { name: "old_password", label: "oldPassword", placeh: "oldPassword", error: errors.old_password?.message },
    { name: "new_password", label: "newPassword", placeh: "newPassword", error: errors.new_password?.message },
    {
      name: "confirm_password",
      label: "confirmPassword",
      placeh: "newPassword",
      error: errors.confirm_password?.message,
    },
  ];

  return (
    <Box className="settingPasswordBox">
      <form onSubmit={handleSubmit(submitChangePassword)}>
        {passwordFields.map((el, ind) => (
          <Box key={ind} className="settingPasswordFieldBox">
            <FormLabel className={`settingPasswordLabel ${el.error ? "errorLabel" : ""}`}>{t(el.label)}</FormLabel>
            <ControlledPassword name={el.name} control={control} placeholder={t(el.placeh)} error={el.error} />
          </Box>
        ))}
        <Button type="submit" className="submitButton">
          {t("save")}
        </Button>
      </form>
    </Box>
  );
};

export default SettingPassword;
