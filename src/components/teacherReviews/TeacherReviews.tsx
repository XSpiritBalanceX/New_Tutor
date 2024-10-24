import { useState, useEffect } from "react";
import { Box, Rating, Button } from "@mui/material";
import ArrowBackIosOutlinedIcon from "@mui/icons-material/ArrowBackIosOutlined";
import ArrowForwardIosOutlinedIcon from "@mui/icons-material/ArrowForwardIosOutlined";
import moment from "moment";
import StarIcon from "@mui/icons-material/Star";
import { translate } from "@i18n";
import KeyboardArrowRightOutlinedIcon from "@mui/icons-material/KeyboardArrowRightOutlined";
import ModalTeacherReview from "@components/modal/ModalTeacherReview";
import "./TeacherReviews.scss";

const mockData = [
  {
    id: 1,
    rating: 4,
    title: "Отличный подход, классная подача материала в игровой форме, качественные видеоуроки",
    plus: "Большой опыт преподавания, Нравится как были изложены темы. Уроки всегда были хорошо подобраны именно под мои нужды  и мой уровень языка. Очень грамотный, профессиональный педагог, способный найти подход к студенту, выделить актуальные для человека вещи, действительно сделать занятия веселыми и интересными",
    minus: "Часто опаздывает на урок ",
    date: "2022-12-10",
    user: "Valentin",
  },
  {
    id: 2,
    rating: 3,
    title: "После занятий чувствую гораздо больше свободы в общении",
    plus: " Занималась английским с целью повышения уровня владения, прежде всего аспекта Speaking, на базе лексического подхода.",
    minus: "Результат удовлетворил",
    date: "2022-12-10",
    user: "Clar",
  },
  {
    id: 3,
    rating: 5,
    title: "Mauris tempus ipsum ac posuere cursus.",
    plus: "Mauris in dolor tincidunt eros pharetra facilisis quis non ante. Nulla quis hendrerit est, a cursus erat. Donec eu dui consequat, tincidunt leo vitae, euismod nisl. Praesent facilisis porttitor ipsum, sit amet sagittis lectus malesuada sit amet. Proin suscipit rhoncus nulla, sagittis commodo nisl ornare vitae. Aliquam tincidunt ultricies bibendum.",
    minus:
      "Praesent facilisis porttitor ipsum, sit amet sagittis lectus malesuada sit amet. Proin suscipit rhoncus nulla",
    date: "2023-11-02",
    user: "Karen",
  },
  {
    id: 4,
    rating: 2,
    title: "Mauris quis nibh consequat, ornare elit ut, sollicitudin quam",
    plus: "Donec quis egestas orci. Sed nec consequat lacus.",
    minus:
      "Duis ac vulputate libero, nec scelerisque massa. Donec et luctus neque. Maecenas tempor viverra nunc viverra faucibus. Aliquam erat volutpat. Sed at tortor et magna dignissim eleifend. Nam imperdiet ligula consectetur, tempus nisl vel, scelerisque nisl. Praesent nisl nulla, ornare quis lobortis eget, condimentum at magna. Nulla convallis urna in pretium rhoncus. In elementum ut dui quis dictum.",
    date: "2024-05-28",
    user: "Alex",
  },
  {
    id: 5,
    rating: 4,
    title: "Vestibulum pretium convallis auctor. Suspendisse ac laoreet lectus, eu gravida purus.",
    plus: "Quisque a luctus urna, eu interdum felis. Quisque enim lectus, mollis at nisl eget, bibendum elementum ligula. Nulla a posuere tortor. Praesent at gravida ante, et congue eros. Etiam vestibulum dictum viverra. Phasellus quis urna rutrum, feugiat nunc sollicitudin, varius lacus. ",
    minus:
      "Praesent vitae tristique leo, at tincidunt lectus. Suspendisse maximus, tellus vel dapibus convallis, risus ante euismod justo, at iaculis felis dui sed justo. Sed ut sapien et turpis pharetra aliquet. Integer varius dui quis mi laoreet blandit.",
    date: "2023-08-02",
    user: "Grag",
  },
];

interface IReview {
  id: number;
  rating: number;
  title: string;
  plus: string;
  minus: string;
  date: string;
  user: string;
}

const TeacherReviews = () => {
  const { t } = translate("translate", { keyPrefix: "teacherPage" });

  const [teacherReviews, setTeacherReviews] = useState<IReview[]>([]);
  const [currentReview, setCurrentReview] = useState<IReview | null>(null);
  const [isOpenModal, setIsOpenModal] = useState(true);
  const [activePage, setActivePage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(2);
  const totalPages = Math.ceil(mockData.length / itemsPerPage);

  const ratingSum = mockData.reduce((sum, acc) => sum + acc.rating, 0);
  const averageRating = (ratingSum / mockData.length).toFixed(1);

  const maxLengthText = 190;

  useEffect(() => {
    const startIndex = (activePage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const pageItems = mockData.slice(startIndex, endIndex);
    setTeacherReviews(pageItems);
    // eslint-disable-next-line
  }, [mockData, activePage, itemsPerPage]);

  useEffect(() => {
    const handleResize = () => {
      const mediaQuery = window.matchMedia("(max-width: 65em)");
      if (mediaQuery.matches) {
        setItemsPerPage(1);
      } else {
        setItemsPerPage(2);
      }
    };

    window.addEventListener("resize", handleResize);

    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handlePages = (e: React.MouseEvent<HTMLButtonElement>) => {
    const { name } = e.currentTarget;
    if (name === "previos") {
      setActivePage(activePage - 1);
    } else {
      setActivePage(activePage + 1);
    }
  };

  const handleSeeAllReview = (id: number) => {
    const review = teacherReviews.find((el) => el.id === id);
    if (review) {
      setCurrentReview(review);
      setIsOpenModal(true);
    }
  };

  const handleCloseModal = () => {
    setIsOpenModal(false);
  };

  return (
    <Box className="teacherReviewsBox">
      {currentReview && (
        <ModalTeacherReview isOpen={isOpenModal} cbCloseModal={handleCloseModal} review={currentReview} />
      )}
      <Box className="titlesBox">
        <p className="title">{t("review")}</p>
        <p className="averageRating">{t("overallRating", { rating: `${averageRating}/5` })}</p>
      </Box>
      <Box className="reviewsBox">
        {teacherReviews.map((el, ind) => (
          <Box key={ind} className="reviewItem">
            <Rating
              value={el.rating}
              readOnly
              emptyIcon={<StarIcon className="emptyIcon" />}
              icon={<StarIcon className="fillIcon" />}
              className="ratingReview"
            />
            <p className="titleReview">{el.title}</p>
            <p className="mobileTitle">{el.title.length > 52 ? `${el.title.slice(0, 52)}...` : el.title}</p>
            <Box className="descriptionReview">
              <p className="titleDescription">{t("pros")}</p>
              <p className="textDescription">
                {el.plus.length > maxLengthText ? `${el.plus.slice(0, maxLengthText)}...` : el.plus}
              </p>
            </Box>
            <Box className="descriptionReview">
              <p className="titleDescription">{t("cons")}</p>
              <p className="textDescription">
                {el.minus.length > maxLengthText ? `${el.minus.slice(0, maxLengthText)}...` : el.minus}
              </p>
            </Box>
            <Box className="userControlsBox">
              <Box className="userDateBox">
                <p className="reviewDate">{moment(el.date, "YYYY-MM-DD").format("DD MMMM YYYY")}</p>
                <p className="userName">{el.user}</p>
              </Box>
              {(el.plus.length > maxLengthText || el.minus.length > maxLengthText) && (
                <Button type="button" className="readMoreButton" onClick={() => handleSeeAllReview(el.id)}>
                  {t("readMore")}
                  <KeyboardArrowRightOutlinedIcon />
                </Button>
              )}
            </Box>
          </Box>
        ))}
      </Box>
      <Box className="controlsReviewsBox">
        <Button type="button" name="previos" onClick={handlePages} disabled={activePage === 1}>
          <ArrowBackIosOutlinedIcon />
        </Button>
        <p className="countOfPagesReviews">{`${activePage}/${totalPages}`}</p>
        <Button type="button" name="next" onClick={handlePages} disabled={activePage === totalPages}>
          <ArrowForwardIosOutlinedIcon />
        </Button>
      </Box>
    </Box>
  );
};

export default TeacherReviews;
