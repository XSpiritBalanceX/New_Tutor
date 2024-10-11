import { useState, useEffect } from "react";
import { Container, Box, Button } from "@mui/material";
import { translate } from "@i18n";
import { useParams, useNavigate } from "react-router-dom";
import moment from "moment";
import * as momentTimeZone from "moment-timezone";
import { VideoChat } from "webrtc-frontend-library";
import { useAppSelector, useAppDispatch } from "@store/hook";
import * as tutorSelectors from "@store/selectors";
import { changeOpenChat } from "@store/tutorSlice";
import "./VideoLesson.scss";

const mockRoomId = "00e46ff4-c459-425d-91d9-61b5ef5bdb8f";

const VideoLessonPage = () => {
  const { t } = translate("translate", { keyPrefix: "videoLessonPage" });

  const locale = useAppSelector(tutorSelectors.localeSelect);

  const [timeLeft, setTimeLeft] = useState<{ days: number; hours: number; minutes: number; seconds: number }>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  const [isDisableJoinButton, setIsDisableJoinButton] = useState(true);
  const [roomId, setRoomId] = useState("");
  const [isShowVideo, setIsShowVideo] = useState(true);
  const [isPreJoinPage, setIsPreJoinPage] = useState(true);

  const isOpenChat = useAppSelector(tutorSelectors.isOpenChatSelect);

  const dispatch = useAppDispatch();

  const { lesson_time } = useParams();
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
      if (duration.asMinutes() > 5) {
        setTimeLeft({
          days: Math.floor(duration.asDays()),
          hours: duration.hours(),
          minutes: duration.minutes(),
          seconds: duration.seconds(),
        });
        setIsDisableJoinButton(true);
      } else if (duration.asMinutes() >= 0 && duration.asMinutes() <= 5 && mockRoomId) {
        setTimeLeft({
          days: Math.floor(duration.asDays()),
          hours: duration.hours(),
          minutes: duration.minutes(),
          seconds: duration.seconds(),
        });
        setIsDisableJoinButton(false);
        setRoomId(mockRoomId);
      } else if (duration.asMinutes() < -15) {
        clearInterval(timer);
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        setIsDisableJoinButton(true);
        setRoomId("");
      }
    }, 1000);
    return () => clearInterval(timer);
    // eslint-disable-next-line
  }, [lesson_time]);

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
    navigate("/review");
  };

  const handleRefreshToken = async () => {
    //TODO: added real logic for refreshing user token
    console.log("refresh token");
    return localStorage.getItem("webrtkuniq_access_token");
  };

  const handleOpenChat = () => {
    dispatch(changeOpenChat(true));
  };

  return (
    <Container className="newVideoLessonContainer">
      <Box className={`titleAndButtonBox ${isPreJoinPage ? "preJoinBoxData" : "videoBoxData"}`}>
        <p className="titleVideoPage">{t("videoLesson")}</p>
        {!isPreJoinPage && (
          <Box className="chatButtonBox">
            {!isOpenChat && (
              <Button type="button" onClick={handleOpenChat}>
                {t("openChat")}
              </Button>
            )}
          </Box>
        )}
        {isPreJoinPage && (
          <Box className="timerBox">
            <p>
              {t("timeToLesson", {
                day: timeLeft.days,
                hour: timeLeft.hours,
                min: timeLeft.minutes,
                sec: timeLeft.seconds,
              })}
            </p>
          </Box>
        )}
      </Box>
      {isShowVideo && (
        <VideoChat
          roomId={mockRoomId}
          handleClose={handleCloseVideo}
          handleError={handleRefreshToken}
          user_locale={locale}
          isDisabledButtonJoin={false}
        />
      )}
    </Container>
  );
};

export default VideoLessonPage;
