import { useState } from "react";
import { Container, Box } from "@mui/material";
import { translate } from "@i18n";
import KeyboardArrowRightOutlinedIcon from "@mui/icons-material/KeyboardArrowRightOutlined";
import { useParams, useNavigate } from "react-router-dom";
import { USER_TYPE } from "@axiosApi/axiosAPI";
import CustomError from "@components/error/CustomError";
import Loader from "@components/loader/Loader";
import "./AllLessonsPage.scss";

const AllLessonsPage = () => {
  const { t } = translate("translate", { keyPrefix: "allLessonsPage" });

  const { page } = useParams();
  const navigate = useNavigate();

  const isStudent = localStorage.getItem(USER_TYPE) === "0";

  const [itemPerPage] = useState(5);

  return (
    <Container className="allLessonsPageContainer">
      <Box className="locationAllLessons">
        <p className="myLessons">{t("myLessons")}</p>
        <KeyboardArrowRightOutlinedIcon className="arrowIcon" />
        <p className="allLesson">{t("allLessons")}</p>
      </Box>
      <p className="titleAllLessons">{t("allLessons")}</p>
    </Container>
  );
};

export default AllLessonsPage;
