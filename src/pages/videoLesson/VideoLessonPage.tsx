import { Container, Box } from "@mui/material";
import { translate } from "@i18n";
import { useParams } from "react-router-dom";
import moment from "moment";
import * as momentTimeZone from "moment-timezone";
import "./VideoLesson.scss";

const VideoLessonPage = () => {
  const { t } = translate("translate", { keyPrefix: "videoLessonPage" });

  const { room_id, lesson_time } = useParams();

  return (
    <Container className="newVideoLessonContainer">
      <p className="titleVideoPage">{t("videoLesson")}</p>
    </Container>
  );
};

export default VideoLessonPage;
