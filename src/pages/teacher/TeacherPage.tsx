import { useEffect } from "react";
import { Container, Box } from "@mui/material";
import { translate } from "@i18n";
import { useParams, NavLink } from "react-router-dom";
import { useGetTeacherQuery } from "@store/requestApi/teacherApi";
import Loader from "@components/loader/Loader";
import CustomError from "@components/error/CustomError";
import { useAppSelector } from "@store/hook";
import * as tutorSelectors from "@store/selectors";
import KeyboardArrowRightOutlinedIcon from "@mui/icons-material/KeyboardArrowRightOutlined";
import TeacherProfile from "./TeacherProfile";
import "./TeacherPage.scss";

const TeacherPage = () => {
  const { t } = translate("translate", { keyPrefix: "teacherPage" });

  const { id } = useParams();

  const isLogin = useAppSelector(tutorSelectors.isLoginSelect);

  useEffect(() => {
    isLogin && localStorage.setItem("tutor_skip_auth", "true");

    return () => {
      localStorage.removeItem("tutor_skip_auth");
    };
    // eslint-disable-next-line
  }, [isLogin]);

  const { error, isLoading, data } = useGetTeacherQuery({ teacher_id: id as string });

  return error ? (
    <CustomError />
  ) : (
    <Container className="teacherPageContainer">
      {isLoading && <Loader />}
      <Box className="locationTeacherPageBox">
        <NavLink to={"/"} className={"teacherPageLink"}>
          {t("main")}
        </NavLink>
        <KeyboardArrowRightOutlinedIcon className="arrowIcon" />
        <NavLink to={"/search/1"} className={"teacherPageLink"}>
          {t("findTeacher")}
        </NavLink>
        <KeyboardArrowRightOutlinedIcon className="arrowIcon" />
        <p>{t("teacherProfile")}</p>
      </Box>
      {data && (
        <>
          <TeacherProfile teacher_information={data.user} teacher_languages={data.languages} />
          <Box className="teacherScheduleBox"></Box>
        </>
      )}
    </Container>
  );
};

export default TeacherPage;
