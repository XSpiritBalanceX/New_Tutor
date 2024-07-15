import { useEffect } from "react";
import { Box } from "@mui/material";
import Schedule from "@components/schedule/Schedule";
import { REGISTER_STATE } from "@axiosApi/axiosAPI";
import { useNavigate } from "react-router-dom";
import "./TeacherForm.scss";

const TeacherSchedule = () => {
  const navigate = useNavigate();

  const registerStep = localStorage.getItem(REGISTER_STATE);

  useEffect(() => {
    registerStep === "STEP1" && navigate("/registration/teacher");
    // eslint-disable-next-line
  }, [registerStep]);

  return (
    <Box className="teacherScheduleBox">
      <Schedule isCreating={true} />
    </Box>
  );
};

export default TeacherSchedule;
