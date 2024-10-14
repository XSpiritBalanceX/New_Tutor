import { Box, Button, Avatar } from "@mui/material";
import { translate } from "@i18n";
import { USER_TYPE } from "@utils/appConsts";
import moment from "moment";
import user from "@assets/user.svg";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "@store/hook";
import { setOpponentId, changeOpenChat } from "@store/tutorSlice";
import { ILessonUser } from "@store/requestApi/bookingApi";
import "./CardLesson.scss";

interface ICardLessonProps {
  lesson_information: ILessonUser;
  cbShowModal: (id: number) => void;
  isHideButton: boolean;
  isDisabledJoin: boolean;
}

const CardLesson = ({ lesson_information, cbShowModal, isHideButton, isDisabledJoin }: ICardLessonProps) => {
  const { t } = translate("translate", { keyPrefix: "allLessonsPage" });

  const dispatch = useAppDispatch();

  const isStudent = localStorage.getItem(USER_TYPE) === "0";

  const navigate = useNavigate();

  const handleStartLesson = () => {
    const userId = (isStudent ? lesson_information.teacher_id : lesson_information.student_id) as number;
    const timeLesson = moment(`${lesson_information.date} ${lesson_information.time}`, "YYYY-MM-DD HH:mm").format(
      "DD-MM-YYYY-HH-mm",
    );
    if (lesson_information.video_room_id) {
      navigate(`/video_lesson/${timeLesson}/${lesson_information.video_room_id}`);
      dispatch(setOpponentId(userId.toString()));
    }
  };

  const handleOpenChat = () => {
    const userId = (isStudent ? lesson_information.teacher_id : lesson_information.student_id) as number;
    dispatch(setOpponentId(userId.toString()));
    dispatch(changeOpenChat(true));
  };

  const handleCancelLesson = () => {
    cbShowModal(lesson_information.id);
  };

  const handleShowUserPage = () => {
    isStudent && navigate(`/teacher/${lesson_information.teacher_id}`);
    !isStudent && navigate(`/student/${lesson_information.student_id}`);
  };

  return (
    <Box className="lessonBox">
      <p className="dateOfLesson">{`${moment(lesson_information.date, "YYYY-MM-DD").format("MMMM, DD")}, ${moment(
        lesson_information.time,
        "HH:mm",
      )
        .add(moment().utcOffset(), "minutes")
        .format("HH:mm")} - ${moment(lesson_information.time, "HH:mm")
        .add(55, "minutes")
        .add(moment().utcOffset(), "minutes")
        .format("HH:mm")}`}</p>
      <Box className="lessonContent">
        <Box className="userInformationBox">
          <Avatar src={lesson_information.avatar || user} className="userAvatar" onClick={handleShowUserPage} />
          <Box className="userNameButtonBox">
            <p onClick={handleShowUserPage}>{`${lesson_information.first_name} ${lesson_information.last_name}`}</p>
            {!isHideButton && (
              <Button type="button" onClick={handleStartLesson} disabled={isDisabledJoin}>
                {t("startLesson")}
              </Button>
            )}
          </Box>
        </Box>
        <Box className="controlsLessonBox">
          <Button type="button" onClick={handleOpenChat} className="writeButton">
            {t(isStudent ? "writeTeacher" : "writeStudent")}
          </Button>
          {!isHideButton && (
            <Button type="button" onClick={handleCancelLesson} className="cancelButton">
              {t("cancelLesson")}
            </Button>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default CardLesson;
