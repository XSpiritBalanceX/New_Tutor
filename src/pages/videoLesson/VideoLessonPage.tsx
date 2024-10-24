import { useState, useEffect } from "react";
import { Container, Box, Button } from "@mui/material";
import { translate } from "@i18n";
import { useParams, useNavigate } from "react-router-dom";
import moment from "moment";
import * as momentTimeZone from "moment-timezone";
import { VideoChat, LS_WEBRTK_TOKEN_KEY } from "webrtc-frontend-library";
import { useAppSelector, useAppDispatch } from "@store/hook";
import * as tutorSelectors from "@store/selectors";
import { changeOpenChat, setOpponentId } from "@store/tutorSlice";
import ChatIcon from "@components/icons/ChatIcon";
import TaskIcon from "@components/icons/TaskIcon";
import { refreshToken } from "@api/auth/refreshToken";
import { LS_TOKEN_KEY } from "chat-frontend-library";
import { TOKEN_KEY } from "@utils/appConsts";
import "./VideoLesson.scss";

const VideoLessonPage = () => {
  const { t } = translate("translate", { keyPrefix: "videoLessonPage" });

  const locale = useAppSelector(tutorSelectors.localeSelect);

  const [timeLeft, setTimeLeft] = useState<{ minutes: number; seconds: number }>({
    minutes: 0,
    seconds: 0,
  });
  const [isDisableJoinButton, setIsDisableJoinButton] = useState(true);
  const [roomId, setRoomId] = useState("");
  const [isShowVideo, setIsShowVideo] = useState(true);
  const [isPreJoinPage, setIsPreJoinPage] = useState(true);
  const [timerVideo, setTimerVideo] = useState(0);

  const isOpenChat = useAppSelector(tutorSelectors.isOpenChatSelect);

  const dispatch = useAppDispatch();

  const { lesson_time, room_id, opponent_id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const [day, month, year, hours, minutes] = (lesson_time || "").split("-").map(Number);

    const userTimeZoneOffset = momentTimeZone.tz(momentTimeZone.tz.guess()).utcOffset();
    const targetDate = moment(`${year}-${month}-${day} ${hours}:${minutes}`, "YYYY-MM-DD HH:mm").add(
      userTimeZoneOffset,
      "minutes",
    );

    const timer = setInterval(() => {
      const now = moment();
      const duration = moment.duration(targetDate.diff(now));
      const minutesLeft = duration.asMinutes();

      if (minutesLeft > 10) {
        setIsDisableJoinButton(true);
      } else if (minutesLeft >= 0 && minutesLeft <= 10) {
        setTimeLeft({
          minutes: duration.minutes(),
          seconds: duration.seconds(),
        });
        setIsDisableJoinButton(true);
      } else if (minutesLeft > -15 && minutesLeft < 0 && room_id) {
        setTimeLeft({
          minutes: duration.minutes(),
          seconds: duration.seconds(),
        });
        setIsDisableJoinButton(false);
        setRoomId(room_id);
      } else if (minutesLeft < -15) {
        clearInterval(timer);
        setTimeLeft({ minutes: 0, seconds: 0 });
        setIsDisableJoinButton(true);
        setRoomId(room_id as string);
      }
    }, 1000);
    return () => clearInterval(timer);
    // eslint-disable-next-line
  }, [lesson_time]);

  useEffect(() => {
    if (!isPreJoinPage) {
      const timer = setInterval(() => {
        setTimerVideo((prevTime) => prevTime + 1);
      }, 1000);

      return () => clearInterval(timer);
    }
    // eslint-disable-next-line
  }, [isPreJoinPage]);

  useEffect(() => {
    const getCurrentElement = () => {
      const videoElement = document.querySelector(".roomWrapper");
      const preJoinElement = document.querySelector(".containerPrejoinPage");

      if (videoElement) {
        setIsPreJoinPage(false);
      } else if (preJoinElement) {
        setIsPreJoinPage(true);
      }
    };

    getCurrentElement();

    const observer = new MutationObserver(getCurrentElement);
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      observer.disconnect();
      dispatch(changeOpenChat(false));
    };
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    const videoElement = document.querySelector(".roomWrapper");
    if (videoElement && isOpenChat) {
      videoElement.scrollIntoView({ behavior: "smooth" });
      const chat = document.querySelector(".tutorChatBox ");
      chat && chat.classList.remove("animate__animated");
    }
    // eslint-disable-next-line
  }, [isOpenChat]);

  const handleCloseVideo = () => {
    setIsShowVideo(false);
    if (isPreJoinPage) {
      navigate("/lessons/upcoming/1");
    } else {
      navigate("/review");
    }
  };

  const handleRefreshToken = async () => {
    const newToken = await refreshToken();
    if (newToken) {
      localStorage.setItem(TOKEN_KEY, newToken);
      localStorage.setItem(LS_TOKEN_KEY, newToken);
      localStorage.setItem(LS_WEBRTK_TOKEN_KEY, newToken);
    }
    return newToken;
  };

  const handleOpenChat = () => {
    dispatch(changeOpenChat(true));
    dispatch(setOpponentId(opponent_id as string));
  };

  const minutes = Math.floor(timerVideo / 60);
  const seconds = timerVideo % 60;

  return (
    <Container className="newVideoLessonContainer">
      <Box className={`titleAndButtonBox ${isPreJoinPage ? "preJoinBoxData" : "videoBoxData"}`}>
        <Box className="titleAndTimer">
          <p className="titleVideoPage">{t("videoLesson")}</p>
          {!isPreJoinPage && (
            <p className="videoTimer">{`${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`}</p>
          )}
        </Box>
        {!isPreJoinPage && (
          <Box className="chatButtonBox">
            <Button type="button">
              <TaskIcon fill="#FFFFFF" /> <span>{t("sendAssignment")}</span>
            </Button>
            {!isOpenChat && (
              <Button type="button" onClick={handleOpenChat}>
                <ChatIcon fill="#FFFFFF" /> <span>{t("openChat")}</span>
              </Button>
            )}
          </Box>
        )}
        {isPreJoinPage && (
          <Box className="timerBox">
            <p>
              {t("timeToLesson", {
                min: timeLeft.minutes,
                sec: timeLeft.seconds,
              })}
            </p>
          </Box>
        )}
      </Box>
      {isShowVideo && (
        <VideoChat
          roomId={roomId}
          handleClose={handleCloseVideo}
          handleError={handleRefreshToken}
          user_locale={locale}
          isDisabledButtonJoin={isDisableJoinButton}
          iconsWithBg={false}
        />
      )}
    </Container>
  );
};

export default VideoLessonPage;
