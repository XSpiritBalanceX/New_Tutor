import { Box, Button, Avatar } from "@mui/material";
import { translate } from "@i18n";
import { ILesson } from "@store/requestApi/lessonsApi";
import { USER_TYPE } from "@axiosApi/axiosAPI";
import moment from "moment";
import user from "@assets/user.svg";
import "./CardLesson.scss";

interface ICardLessonProps {
  lesson_information: ILesson;
  cbShowModal: (id: number) => void;
}

const CardLesson = ({ lesson_information, cbShowModal }: ICardLessonProps) => {
  const { t } = translate("translate", { keyPrefix: "allLessonsPage" });

  const isStudent = localStorage.getItem(USER_TYPE) === "0";

  const handleStartLesson = () => {
    console.log("start lesson");
  };

  const handleOpenChat = () => {
    console.log("open chat");
  };

  const handleCancelLesson = () => {};

  return (
    <Box className="lessonBox">
      <p className="dateOfLesson">{`${moment(lesson_information.date, "YYYY-MM-DD").format("MMMM, DD")}, ${moment(
        lesson_information.time_start,
        "HH:mm",
      )
        .add(moment().utcOffset(), "minutes")
        .format("HH:mm")} - ${moment(lesson_information.time_end, "HH:mm")
        .add(moment().utcOffset(), "minutes")
        .format("HH:mm")}`}</p>
      <Box className="lessonContent">
        <Box className="userInformationBox">
          <Avatar src={lesson_information.photo || user} className="userAvatar" />
          <Box className="userNameButtonBox">
            <p>{`${lesson_information.teacher_first_name} ${lesson_information.teacher_last_name}`}</p>
            <Button type="button" onClick={handleStartLesson}>
              {t("startLesson")}
            </Button>
          </Box>
        </Box>
        <Box className="controlsLessonBox">
          <Button type="button" onClick={handleOpenChat} className="writeButton">
            {t(isStudent ? "writeTeacher" : "writeStudent")}
          </Button>
          <Button type="button" onClick={handleCancelLesson} className="cancelButton">
            {t("cancelLesson")}
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default CardLesson;
