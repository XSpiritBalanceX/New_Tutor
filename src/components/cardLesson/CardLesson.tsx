import { Box, Button, Avatar } from "@mui/material";
import { translate } from "@i18n";
import { ILesson } from "@store/requestApi/lessonsApi";
import { USER_TYPE } from "@utils/appConsts";
import moment from "moment";
import user from "@assets/user.svg";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "@store/hook";
import { setOpponentId, changeOpenChat } from "@store/tutorSlice";
import "./CardLesson.scss";

interface ICardLessonProps {
  lesson_information: ILesson;
  cbShowModal: (id: number) => void;
}

const CardLesson = ({ lesson_information, cbShowModal }: ICardLessonProps) => {
  const { t } = translate("translate", { keyPrefix: "allLessonsPage" });

  const dispatch = useAppDispatch();

  const isStudent = localStorage.getItem(USER_TYPE) === "0";

  const navigate = useNavigate();

  const handleStartLesson = () => {
    const timeLesson = moment(`${lesson_information.date} ${lesson_information.time_start}`, "YYYY-MM-DD HH:mm").format(
      "DD-MM-YYYY-HH-mm",
    );
    navigate(`/video_lesson/${timeLesson}`);
  };

  const handleOpenChat = () => {
    console.log("open chat", lesson_information.teacher_id);
    const mockTeacherID = "d5b56da0-b25f-4eec-9501-f9462dcaa195";
    dispatch(setOpponentId(mockTeacherID));
    dispatch(changeOpenChat(true));
  };

  const handleCancelLesson = () => {
    cbShowModal(lesson_information.id);
  };

  const handleShowUserPage = () => {
    isStudent && navigate(`/teacher/${lesson_information.teacher_id}`);
    !isStudent && navigate(`/student/${lesson_information.teacher_id}`);
  };

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
          <Avatar src={lesson_information.photo || user} className="userAvatar" onClick={handleShowUserPage} />
          <Box className="userNameButtonBox">
            <p
              onClick={handleShowUserPage}
            >{`${lesson_information.teacher_first_name} ${lesson_information.teacher_last_name}`}</p>
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
