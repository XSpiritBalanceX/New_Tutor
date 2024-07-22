import { useEffect } from "react";
import { Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { USER_TYPE } from "@axiosApi/axiosAPI";
import Schedule from "@components/schedule/Schedule";
import "./SettingTeacherSchedule.scss";

const SettingTeacherSchedule = () => {
  const isStudent = localStorage.getItem(USER_TYPE) === "0";

  const navigate = useNavigate();

  useEffect(() => {
    isStudent && navigate("/profile/settings");
    // eslint-disable-next-line
  }, [isStudent]);

  return (
    <Box className="settingScheduleBox">
      <Schedule isCreating={false} />
    </Box>
  );
};

export default SettingTeacherSchedule;
