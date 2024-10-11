import { Box, Container } from "@mui/material";
import { translate } from "@i18n";
import KeyboardArrowRightOutlinedIcon from "@mui/icons-material/KeyboardArrowRightOutlined";
import LocationElement from "./LocationElement";
import { useParams } from "react-router-dom";
import ProfileMenu from "./ProfileMenu";
import ProfileSettings from "@components/profileSettings/ProfileSettings";
import Loader from "@components/loader/Loader";
import { useDeleteStudentLanguageMutation, useDeleteTeacherLanguageMutation } from "@store/requestApi/profileApi";
import SettingTeacherLanguages from "@components/settingTeacherLanguages/SettingTeacherLanguages";
import SettingTeacherSchedule from "@components/settingTeacherSchedule/SettingTeacherSchedule";
//import SettingNumber from "@components/settingNumber/SettingNumber";
import SettingPassword from "@components/settingPassword/SettingPassword";
import SettingPayments from "@components/settingPayments/SettingPayments";
import "./ProfilePage.scss";

type TProfileOptions = {
  settings: JSX.Element;
  language: JSX.Element;
  /* number: JSX.Element; */
  schedule: JSX.Element;
  password: JSX.Element;
  payment: JSX.Element;
};

const ProfilePage = () => {
  const { t } = translate("translate", { keyPrefix: "profilePage" });

  const { element } = useParams();

  const [, { isLoading: loadingDeleteLangStudent }] = useDeleteStudentLanguageMutation();
  const [, { isLoading: loadingDeleteLangTeacher }] = useDeleteTeacherLanguageMutation();

  const profileOptions: TProfileOptions = {
    settings: <ProfileSettings />,
    language: <SettingTeacherLanguages />,
    /* number: <SettingNumber />, */
    schedule: <SettingTeacherSchedule />,
    password: <SettingPassword />,
    payment: <SettingPayments />,
  };

  return (
    <Container className="profilePageContainer">
      {(loadingDeleteLangStudent || loadingDeleteLangTeacher) && <Loader />}
      <Box className="locationBox">
        <p className="myProfile">{t("myProfile")}</p>
        <KeyboardArrowRightOutlinedIcon className="arrowIcon" />
        <LocationElement element={element as string} />
      </Box>
      <Box className="profilePageContent">
        <ProfileMenu />
        {profileOptions[element as keyof TProfileOptions]}
      </Box>
    </Container>
  );
};

export default ProfilePage;
