import { Box } from "@mui/material";
import UserAvatar from "@components/avatar/UserAvatar";
import { USER_TYPE } from "@utils/appConsts";
import ProfileStudent from "@components/profileStudent/ProfileStudent";
import ProfileTeacher from "@components/profileTeacher/ProfileTeacher";
import { useAppSelector } from "@store/hook";
import * as tutorSelectors from "@store/selectors";
import "./ProfileSettings.scss";

const ProfileSettings = () => {
  const isStudent = localStorage.getItem(USER_TYPE) === "0";

  const studentInformation = useAppSelector(tutorSelectors.studentInformationSelect);
  const teacherInformation = useAppSelector(tutorSelectors.teacherProfileInfoSelect);

  return (
    <Box className="profileContainer">
      <UserAvatar photo={isStudent ? studentInformation?.user?.photo : teacherInformation?.photo} />
      {isStudent ? <ProfileStudent /> : <ProfileTeacher />}
    </Box>
  );
};

export default ProfileSettings;
