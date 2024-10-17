import { useState } from "react";
import { Container } from "@mui/material";
import { useParams } from "react-router-dom";
import CustomError from "@components/error/CustomError";
import NavigationLessons from "@components/navigation/NavigationLessons";
import UpcomingLessons from "./UpcomingLessons";
import { useGetListLessonsQuery, useCancelBookedLessonMutation } from "@store/requestApi/bookingApi";
import Loader from "@components/loader/Loader";
import { USER_TYPE } from "@utils/appConsts";
import "./AllLessonsPage.scss";

const AllLessonsPage = () => {
  const { lessons_type, page } = useParams();

  const isStudent = localStorage.getItem(USER_TYPE) === "0";

  const [itemPerPage] = useState(4);

  const [, { isLoading }] = useCancelBookedLessonMutation();

  const { data, error, isFetching, refetch } = useGetListLessonsQuery(
    {
      limit: itemPerPage,
      offset: (Number(page) - 1) * itemPerPage,
      isStudent: isStudent,
      lessons_type: lessons_type as string,
    },
    { refetchOnMountOrArgChange: true },
  );

  return error ? (
    <CustomError />
  ) : (
    <Container className="allLessonsPageContainer">
      {(isFetching || isLoading) && <Loader />}
      <NavigationLessons />
      {lessons_type === "upcoming" && (
        <UpcomingLessons lessons_information={data} refetch={refetch} currentPage={Number(page)} />
      )}
    </Container>
  );
};

export default AllLessonsPage;
