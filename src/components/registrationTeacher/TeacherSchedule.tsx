import { Box } from "@mui/material";
import Schedule from "@components/schedule/Schedule";
import "./TeacherForm.scss";

const TeacherSchedule = () => {
  return (
    <Box className="teacherScheduleBox">
      <Schedule isCreating={true} />
    </Box>
  );
};

export default TeacherSchedule;
