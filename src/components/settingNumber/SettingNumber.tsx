import { Box, FormLabel, Button, FormHelperText } from "@mui/material";
import { translate } from "@i18n";
import { useForm, Path } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import ControlledInput from "@components/fields/ControlledInput";
import { InputMask } from "@react-input/mask";
import "./SettingNumber.scss";

interface ISettingsNumber {
  old_number: string;
  old_number_code: string;
  new_number: string;
  new_number_code: string;
}

const SettingNumber = () => {
  const { t } = translate("translate", { keyPrefix: "settingNumberPage" });

  const validationSchema = Yup.object().shape({
    old_number: Yup.string().required(t("reqField")),
    old_number_code: Yup.string().required(t("reqField")),
    new_number: Yup.string().required(t("reqField")),
    new_number_code: Yup.string().required(t("reqField")),
  });

  const {
    control,
    watch,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<ISettingsNumber>({
    resolver: yupResolver(validationSchema),
  });

  const submitUserNumbers = (data: ISettingsNumber) => {
    console.log(data);
  };

  const handleChangeNumber = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.currentTarget;
    setValue(name as Path<ISettingsNumber>, value);
    console.log(name, value);
  };

  const handleSendCode = (e: React.MouseEvent<HTMLButtonElement>) => {
    console.log(e.currentTarget.name);
  };

  return (
    <Box className="settingNumberBox">
      <form onSubmit={handleSubmit(submitUserNumbers)}>
        <Box className="doubleFields">
          <Box className="settingNumberFieldBox">
            <FormLabel className={`settingNumberLabel ${errors.old_number ? "errorLabel" : ""}`}>
              {t("titleOldNumber")}
            </FormLabel>
            <InputMask
              mask="+375 (__) ___-__-__"
              replacement={{ _: /\d/ }}
              placeholder={"+375 (XX) XXX-XX-XX"}
              className={`numberField ${errors.old_number ? "errorField" : ""}`}
              name="old_number"
              onChange={handleChangeNumber}
              value={watch("old_number") ?? ""}
            />
            <FormHelperText className="errorMessage">{errors.old_number?.message}</FormHelperText>
          </Box>
          <Button type="button" name="old_number" onClick={handleSendCode} className="sendCodeButton">
            {t("sendCode")}
          </Button>
        </Box>
        <Box className="settingNumberFieldBox oldNumberCodeBox">
          <FormLabel className={`settingNumberLabel ${errors.old_number_code ? "errorLabel" : ""}`}>
            {t("titleCode")}
          </FormLabel>
          <ControlledInput
            name="old_number_code"
            control={control}
            placeholder={t("code")}
            error={errors?.old_number_code?.message}
          />
        </Box>
        <Box className="doubleFields">
          <Box className="settingNumberFieldBox">
            <FormLabel className={`settingNumberLabel ${errors.new_number ? "errorLabel" : ""}`}>
              {t("titleNewNumber")}
            </FormLabel>
            <InputMask
              mask="+375 (__) ___-__-__"
              replacement={{ _: /\d/ }}
              placeholder={"+375 (XX) XXX-XX-XX"}
              className={`numberField ${errors.new_number ? "errorField" : ""}`}
              name="new_number"
              onChange={handleChangeNumber}
              value={watch("new_number") ?? ""}
            />
            <FormHelperText className="errorMessage">{errors.new_number?.message}</FormHelperText>
          </Box>
          <Button type="button" name="new_number" onClick={handleSendCode} className="sendCodeButton">
            {t("sendCode")}
          </Button>
        </Box>
        <Box className="settingNumberFieldBox">
          <FormLabel className={`settingNumberLabel ${errors.new_number_code ? "errorLabel" : ""}`}>
            {t("titleCode")}
          </FormLabel>
          <ControlledInput
            name="new_number_code"
            control={control}
            placeholder={t("code")}
            error={errors?.new_number_code?.message}
          />
        </Box>
        <Button type="submit" className="submitButton">
          {t("apply")}
        </Button>
      </form>
    </Box>
  );
};

export default SettingNumber;
