import { useEffect } from "react";
import { Container, Box } from "@mui/material";
import { translate } from "@i18n";
import { useParams, NavLink } from "react-router-dom";
import { useGetTeacherQuery } from "@store/requestApi/teacherApi";
import Loader from "@components/loader/Loader";
import CustomError from "@components/error/CustomError";
import { useAppSelector } from "@store/hook";
import * as tutorSelectors from "@store/selectors";
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
    <Container>
      {isLoading && <Loader />}
      <Box></Box>
    </Container>
  );
};

export default TeacherPage;
