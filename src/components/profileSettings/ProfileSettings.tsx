import { Box } from "@mui/material";
import UserAvatar from "@components/avatar/UserAvatar";
import { USER_TYPE } from "@axiosApi/axiosAPI";
import ProfileStudent from "@components/profileStudent/ProfileStudent";
import ProfileTeacher from "./ProfileTeacher";
import "./ProfileSettings.scss";

const ProfileSettings = () => {
  const isStudent = localStorage.getItem(USER_TYPE) === "0";

  return (
    <Box className="profileContainer">
      <UserAvatar />
      {isStudent ? <ProfileStudent /> : <ProfileTeacher />}
    </Box>
  );
};

export default ProfileSettings;
