import { useState } from "react";
import { Container } from "@mui/material";
import { useLocation } from "react-router-dom";
import CustomError from "@components/error/CustomError";
import NavigationLessons from "@components/navigation/NavigationLessons";
import UpcomingLessons from "./UpcomingLessons";
import "./AllLessonsPage.scss";

const AllLessonsPage = () => {
  const { pathname } = useLocation();

  const [reqError, setReqError] = useState(null);

  return reqError ? (
    <CustomError />
  ) : (
    <Container className="allLessonsPageContainer">
      <NavigationLessons />
      {pathname.includes("upcoming_lessons") && <UpcomingLessons setError={setReqError} />}
    </Container>
  );
};

export default AllLessonsPage;
