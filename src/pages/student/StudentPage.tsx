import { useState, useEffect } from "react";
import { Container, Box, Avatar, Button } from "@mui/material";
import { translate } from "@i18n";
import { useParams, NavLink } from "react-router-dom";
import KeyboardArrowRightOutlinedIcon from "@mui/icons-material/KeyboardArrowRightOutlined";
import user from "@assets/user.svg";
import { languageInCases, TLanguages, level, TLevel } from "@utils/listOfLanguagesLevels";
import { useAppSelector, useAppDispatch } from "@store/hook";
import * as tutorSelectors from "@store/selectors";
import { setOpponentId, changeOpenChat } from "@store/tutorSlice";
import "./StudentPage.scss";

const mockData = {
  id: 1,
  first_name: "Alex",
  last_name: "Smith",
  photo: null,
  languages: [
    {
      id: 1,
      language: 5,
      level: 2,
      description:
        "Ivamus vel odio tortor. Maecenas justo nisi, facilisis at risus et, ullamcorper pellentesque massa.",
    },
    {
      id: 2,
      language: 12,
      level: 5,
      description: "Suspendisse diam mi, sagittis id tincidunt iaculis, euismod eu purus.",
    },
    {
      id: 3,
      language: 20,
      level: 3,
      description:
        "Sed sollicitudin gravida massa, sed rhoncus massa gravida ac. Maecenas euismod sapien est, id venenatis est tempor tristique. Donec ut purus sit amet libero mollis viverra vel non eros. Maecenas congue, neque in efficitur gravida, sapien odio sollicitudin mi, eget fringilla leo justo vel leo. In non ipsum magna. Nullam luctus sagittis imperdiet. ",
    },
  ],
};

const StudentPage = () => {
  const { t } = translate("translate", { keyPrefix: "studentPage" });

  const locale = useAppSelector(tutorSelectors.localeSelect);
  const dispatch = useAppDispatch();

  const { id } = useParams();

  const [isShowAll, setIsShowAll] = useState(false);
  const [studentLanguage, setStudentLanguage] = useState(mockData.languages);

  useEffect(() => {
    isShowAll && setStudentLanguage(mockData.languages);
    !isShowAll && setStudentLanguage(mockData.languages.slice(0, 2));
    // eslint-disable-next-line
  }, [isShowAll]);

  const handleShowAll = () => {
    setIsShowAll(!isShowAll);
  };

  const lowLevel = [0, 1, 2];
  const averageLevel = [3, 4];

  const handleShowChat = () => {
    console.log("show chat", id);
    const mockTeacherID = "31cbfe87-d1d0-49de-ae14-167adfcfa277";
    dispatch(setOpponentId(mockTeacherID));
    dispatch(changeOpenChat(true));
  };

  return (
    <Container className="studentPageContainer">
      <Box className="locationStudentPage">
        <NavLink to={"/"}>{t("main")}</NavLink>
        <KeyboardArrowRightOutlinedIcon className="arrowIcon" />
        <NavLink to={"/upcoming_lessons/1"}>{t("myLessons")}</NavLink>
        <KeyboardArrowRightOutlinedIcon className="arrowIcon" />
        <p>{t("profileStudent")}</p>
      </Box>
      <Box className="studentProfileBox">
        <Avatar src={mockData.photo || user} className="studentAvatar" />
        <Box className="studentInformationBox">
          <p className="studentName">{`${mockData.first_name} ${mockData.last_name}`}</p>
          {studentLanguage.map((el, ind) => (
            <p key={ind} className="studentLanguage">
              {t("languageLevel", { language: languageInCases[locale as keyof TLanguages][el.language] })}{" "}
              <span
                className={
                  lowLevel.includes(el.level)
                    ? "lowLevel"
                    : averageLevel.includes(el.level)
                    ? "averageLevel"
                    : "highLevel"
                }
              >
                {level[locale as keyof TLevel][el.level]}
              </span>
            </p>
          ))}
          {mockData.languages.length > 2 && (
            <Box className="showMoreButtonBox">
              <Button type="button" onClick={handleShowAll}>
                {t(isShowAll ? "collapse" : "showMore")}
              </Button>
            </Box>
          )}
          <Button type="button" onClick={handleShowChat} className="chatButton">
            {t("writeMe")}
          </Button>
        </Box>
      </Box>
      <Box className="studentGoalBox">
        <p className="goal">{t("goal")}</p>
        <Box className="descriptionBox">
          {mockData.languages.map((el, ind) => (
            <p key={ind}>{el.description}</p>
          ))}
        </Box>
      </Box>
    </Container>
  );
};

export default StudentPage;
