import { useState } from "react";
import { Container, Box } from "@mui/material";
import { useParams } from "react-router-dom";
import CustomError from "@components/error/CustomError";
import NavigationLessons from "@components/navigation/NavigationLessons";
import UpcomingLessons from "../../components/lessons/UpcomingLessons";
import CanceledLessons from "@components/lessons/CanceledLessons";
import PastLessons from "@components/lessons/PastLessons";
import { useGetListLessonsQuery, useCancelBookedLessonMutation } from "@store/requestApi/bookingApi";
import Loader from "@components/loader/Loader";
import { USER_TYPE } from "@utils/appConsts";
import communication from "@assets/communication.svg";
import gadgets from "@assets/gadgets.svg";
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
      <Box className="contentLessonsPage">
        {lessons_type === "upcoming" && (
          <UpcomingLessons
            lessons_information={data}
            refetch={refetch}
            currentPage={Number(page)}
            itemPerPage={itemPerPage}
          />
        )}
        {lessons_type === "past" && (
          <PastLessons lessons_information={data} currentPage={Number(page)} itemPerPage={itemPerPage} />
        )}
        {lessons_type === "canceled" && (
          <CanceledLessons lessons_information={data} currentPage={Number(page)} itemPerPage={itemPerPage} />
        )}
        {data && data.items.length !== 0 && (
          <Box className="pictureLessonsBox">
            <img src={isStudent ? communication : gadgets} alt="lessons" />
          </Box>
        )}
      </Box>
    </Container>
  );
};

export default AllLessonsPage;
