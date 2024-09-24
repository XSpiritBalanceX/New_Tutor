import { useState, useEffect } from "react";
import { Container, Box } from "@mui/material";
import { translate } from "@i18n";
import { useParams, useNavigate } from "react-router-dom";
import moment from "moment";
import * as momentTimeZone from "moment-timezone";
import { VideoChat } from "webrtc-frontend-library";
import { useAppSelector } from "@store/hook";
import * as tutorSelectors from "@store/selectors";
import "./VideoLesson.scss";

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

  const { room_id, lesson_time } = useParams();
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
      if (duration.asMilliseconds() <= 0) {
        clearInterval(timer);
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        setIsDisableJoinButton(false);
      } else {
        setTimeLeft({
          days: Math.floor(duration.asDays()),
          hours: duration.hours(),
          minutes: duration.minutes(),
          seconds: duration.seconds(),
        });
        setIsDisableJoinButton(true);
      }
    }, 1000);
    return () => clearInterval(timer);
    // eslint-disable-next-line
  }, [lesson_time]);

  const handleCloseVideo = () => {
    navigate("/review");
  };

  const handleRefreshToken = async () => {
    //TODO: added real logic for refreshing user token
    console.log("refresh token");
    return "";
  };

  return (
    <Container className="newVideoLessonContainer">
      <p className="titleVideoPage">{t("videoLesson")}</p>
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
      <VideoChat
        roomId={room_id || ""}
        handleClose={handleCloseVideo}
        handleError={handleRefreshToken}
        user_locale={locale}
        isDisabledButtonJoin={isDisableJoinButton}
      />
    </Container>
  );
};

export default VideoLessonPage;
