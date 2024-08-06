import { useState } from "react";
import { FormLabel, Button, Box } from "@mui/material";
import { translate } from "@i18n";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import ControlledInput from "@components/fields/ControlledInput";
import recovery from "@assets/modalreset.svg";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import "./ResetPassword.scss";

interface IEmail {
  email: string;
}

const ForgotPasswordForm = () => {
  const { t } = translate("translate", { keyPrefix: "resetPasswordPage" });

  const [isShowModal, setIsShowModal] = useState(false);

  const validationSchema = Yup.object().shape({
    email: Yup.string().required(t("errReqField")).email(t("errEmail")),
  });

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<IEmail>({
    resolver: yupResolver(validationSchema),
  });

  const submitRecoveryPassword = (data: IEmail) => {
    console.log(data);
  };

  const handleCloseModal = () => {
    setIsShowModal(false);
  };

  return (
    <>
      {isShowModal ? (
        <>
          <Box className="modalOverlayBox" />
          <Box className="modalRecovery">
            <Box className="closeModalBox">
              <Button type="button" onClick={handleCloseModal}>
                <CloseOutlinedIcon />
              </Button>
            </Box>
            <Box className="contentModalBox">
              <p className="mainTitle">{t("passwordRecovery")}</p>
              <p>{t("textAfterRecovery")}</p>
              <img src={recovery} alt="recovery" />
            </Box>
          </Box>
        </>
      ) : (
        <form onSubmit={handleSubmit(submitRecoveryPassword)} className="forgotPasswordForm">
          <p className="mainTitle">{t("passwordRecovery")}</p>
          <p className="title">{t("textPasswordRecovery")}</p>
          <Box className="emailFieldBox">
            <FormLabel className={`emailLabel ${errors?.email ? "errorLabel" : ""}`}>{t("email")}</FormLabel>
            <ControlledInput name="email" control={control} error={errors?.email?.message} placeholder={t("email")} />
          </Box>
          <Button type="submit" className="submitButton">
            {t("continue")}
          </Button>
        </form>
      )}
    </>
  );
};

export default ForgotPasswordForm;
