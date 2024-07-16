import { ChangeEvent, useState } from "react";
import { Box, FormLabel, FormHelperText } from "@mui/material";
import { IStudentInformationProps } from "./TypesProfileStudent";
import ControlledInput from "@components/fields/ControlledInput";
import { translate } from "@i18n";
import { InputMask } from "@react-input/mask";
import ProfileEmailNotification from "@components/notification/ProfileEmailNotification";
import WarningAmberRoundedIcon from "@mui/icons-material/WarningAmberRounded";
import "./ProfileStudent.scss";

const StudentInformation = ({ control, errors, setValue, watch, is_verify_email }: IStudentInformationProps) => {
  const { t } = translate("translate", { keyPrefix: "profilePage" });

  const [isVerifyEmail, setIsVerifyEmail] = useState(is_verify_email);

  const firstLastName = [
    { label: "firstName", name: "user_information.first_name", error: errors.user_information?.first_name?.message },
    { label: "lastName", name: "user_information.last_name", error: errors.user_information?.first_name?.message },
  ];

  const handleCloseNotification = () => {
    setIsVerifyEmail(true);
  };

  const handleDateOfBirth = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.currentTarget;
    setValue("user_information.date_of_birthday", value);
  };

  return (
    <Box className="studentProfileInformationBox">
      <Box className="doubleFields">
        {firstLastName.map((el, ind) => (
          <Box key={ind} className="studentProfileFieldBox">
            <FormLabel className={`studentProfileLabel ${el.error ? "errorLabel" : ""}`}>{t(el.label)}</FormLabel>
            <ControlledInput name={el.name} control={control} error={el.error} placeholder={t(el.label)} />
          </Box>
        ))}
      </Box>
      <Box className="doubleFields">
        <Box className="studentProfileFieldBox dateOfBirthBox">
          <FormLabel className={`studentProfileLabel ${errors.user_information?.date_of_birthday ? "errorLabel" : ""}`}>
            {t("dateOfBirth")}
          </FormLabel>
          <InputMask
            mask="__.__.____"
            replacement={{ _: /\d/ }}
            placeholder={t("dateOfBirth")}
            className={`dataField ${errors.user_information?.date_of_birthday ? "errorField" : ""}`}
            value={watch("user_information.date_of_birthday")}
            onChange={handleDateOfBirth}
          />
          {errors.user_information?.date_of_birthday && <WarningAmberRoundedIcon className="errorIcon" />}
          <FormHelperText className="errorMessage">{errors.user_information?.date_of_birthday?.message}</FormHelperText>
        </Box>
        <Box className="studentProfileFieldBox">
          <FormLabel className={`studentProfileLabel ${errors.user_information?.email ? "errorLabel" : ""}`}>
            {t("email")}
          </FormLabel>
          <ControlledInput
            name={"user_information.email"}
            control={control}
            error={errors.user_information?.email?.message}
            placeholder={t("email")}
          />
          {!isVerifyEmail && <ProfileEmailNotification cbHandleCloseNotification={handleCloseNotification} />}
        </Box>
      </Box>
      <Box className={`studentProfileFieldBox ${!isVerifyEmail ? "fieldWithOpenModal" : "fieldWithoutOpenModal"}`}>
        <FormLabel className={`studentProfileLabel`}>{t("phoneNumber")}</FormLabel>
        <InputMask
          mask="+375 (99) 999-99-99"
          replacement={{ "9": /\d/ }}
          placeholder={"+375 (XX) XXX-XX-XX"}
          className={`dataField `}
          disabled
        />
      </Box>
    </Box>
  );
};

export default StudentInformation;
