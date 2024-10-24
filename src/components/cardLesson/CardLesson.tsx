import { Box, Button, Avatar } from "@mui/material";
import { translate } from "@i18n";
import { USER_TYPE } from "@utils/appConsts";
import moment from "moment";
import user from "@assets/user.svg";
import { useNavigate, useParams } from "react-router-dom";
import { useAppDispatch } from "@store/hook";
import { setOpponentId, changeOpenChat } from "@store/tutorSlice";
import { ILessonUser } from "@store/requestApi/bookingApi";
import "./CardLesson.scss";

interface ICardLessonProps {
  lesson_information: ILessonUser;
  cbShowModal?: (id: number) => void;
  isDisabledJoin: boolean;
  isHideButtons?: boolean;
}

const CardLesson = ({ lesson_information, cbShowModal, isDisabledJoin, isHideButtons }: ICardLessonProps) => {
  const { t } = translate("translate", { keyPrefix: "allLessonsPage" });

  const dispatch = useAppDispatch();

  const isStudent = localStorage.getItem(USER_TYPE) === "0";

  const navigate = useNavigate();
  const { lessons_type } = useParams();

  const handleStartLesson = () => {
    const userId = (isStudent ? lesson_information.teacher_id : lesson_information.student_id) as number;
    const timeLesson = moment(`${lesson_information.date} ${lesson_information.time}`, "YYYY-MM-DD HH:mm").format(
      "DD-MM-YYYY-HH-mm",
    );
    if (lesson_information.video_room_id) {
      navigate(
        `/video_lesson/${timeLesson}/${lesson_information.video_room_id}/${
          isStudent ? lesson_information.teacher_id : lesson_information.student_id
        }`,
      );
      dispatch(setOpponentId(userId.toString()));
    }
  };

  const handleOpenChat = () => {
    const userId = (isStudent ? lesson_information.teacher_id : lesson_information.student_id) as number;
    dispatch(setOpponentId(userId.toString()));
    dispatch(changeOpenChat(true));
  };

  const handleCancelLesson = () => {
    cbShowModal && cbShowModal(lesson_information.id);
  };

  const handleShowUserPage = () => {
    isStudent && navigate(`/teacher/${lesson_information.teacher_id}`);
    !isStudent && navigate(`/student/${lesson_information.student_id}`);
  };

  return (
    <Box className="lessonBox">
      <p className={`dateOfLesson ${lessons_type === "canceled" ? "canceledDate" : ""}`}>{`${moment(
        lesson_information.date,
        "YYYY-MM-DD",
      ).format("DD MMMM")} ${moment(lesson_information.time, "HH:mm")
        .add(moment().utcOffset(), "minutes")
        .format("HH:mm")} - ${moment(lesson_information.time, "HH:mm")
        .add(55, "minutes")
        .add(moment().utcOffset(), "minutes")
        .format("HH:mm")}`}</p>
      <Box className="lessonContent">
        <Box className="userInformationBox">
          <Avatar src={lesson_information.avatar || user} className="userAvatar" onClick={handleShowUserPage} />
          <Box className="userNameButtonBox">
            <Box className="nameThemeBox">
              <p
                onClick={handleShowUserPage}
                className={`nameUser ${lessons_type === "canceled" ? "canceledName" : ""}`}
              >{`${lesson_information.first_name} ${lesson_information.last_name}`}</p>
              <p className={`themeLesson ${lessons_type === "canceled" ? "canceledTheme" : ""}`}>
                {"Business English: Effective Communication in the Workplace"}
              </p>
            </Box>
            {lesson_information.is_canceled && (
              <Box className="reasonCancelBox">
                <p className="canceledWhom">
                  {(isStudent && lesson_information.student_id) || (!isStudent && lesson_information.teacher_id)
                    ? t("canceledYou")
                    : lesson_information.teacher_id
                    ? t("canceledTeacher")
                    : lesson_information.student_id
                    ? t("canceledStudent")
                    : t("canceledAut")}
                </p>
                <p className="reasonText">{lesson_information.reason || t("reasonAuthCanceled")}</p>
              </Box>
            )}
            {!isHideButtons && (
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
          {!isHideButtons && (
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
