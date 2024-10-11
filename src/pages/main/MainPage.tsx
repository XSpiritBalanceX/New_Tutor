import { Container, Box } from "@mui/material";
import { translate } from "@i18n";
import { NavLink } from "react-router-dom";
import mainPicture from "@assets/mainPagePicture.svg";
import teacher from "@assets/experteacher.svg";
import schedule from "@assets/convenSchedule.svg";
import prices from "@assets/affordPrices.svg";
import lesson from "@assets/freeLesson.svg";
import regPicture from "@assets/registerpicture.svg";
import chooseTeacher from "@assets/chooseteacher.svg";
import takeLesson from "@assets/takelesson.svg";
import improve from "@assets/improveknowledge.svg";
import arrLeft from "@assets/arrowleft.svg";
import arrRight from "@assets/arrowright.svg";
import { useAppSelector } from "@store/hook";
import * as tutorSelectors from "@store/selectors";
import CustomError from "@components/error/CustomError";
import "./MainPage.scss";

const MainPage = () => {
  const { t } = translate("translate", { keyPrefix: "mainPage" });

  const errorProfileStudent = useAppSelector(tutorSelectors.studentProfileError);
  const errorProfileTeacher = useAppSelector(tutorSelectors.teacherProfileError);

  const whyLearning = [
    { title: "experTeacher", text: "aboutExperTeacher", picture: teacher },
    { title: "convenSchedule", text: "aboutConvenSchedule", picture: schedule },
    { title: "affordPrices", text: "aboutAffordPrices", picture: prices },
    { title: "freeLesson", text: "aboutFreeLesson", picture: lesson },
  ];

  const howLearning = [
    { title: "oneRegister", picture: regPicture },
    { title: "twoChooseTeacher", picture: chooseTeacher },
    { title: "threeChooseLesson", picture: takeLesson },
    { title: "fourImprove", picture: improve },
  ];
  return (
    <>
      {(errorProfileStudent || errorProfileTeacher) && <CustomError />}
      {!errorProfileStudent && !errorProfileTeacher && (
        <Container className="mainPageContainer">
          <Box className="firstMainPageBox">
            <p className="titleFirstBox">
              <span>TUTOR</span> &mdash; {t("title")}
            </p>
            <img src={mainPicture} alt="main" className="mainPicture" />
            <p className="titleWords">{t("titleWords")}</p>
            <NavLink to={"/search/1"}>{t("findTeacher")}</NavLink>
          </Box>
          <Box className="secondMainPageBox">
            <p className="title">{t("whyTitle")}</p>
            <Box className="picturesBox">
              {whyLearning.map((el, ind) => (
                <Box key={ind} className={`learningBox learningBox_${ind + 1}`}>
                  <Box>
                    <p className="learningTitle">{t(el.title)}</p>
                    <p className="learningText">{t(el.text)}</p>
                  </Box>
                  <img src={el.picture} alt={`learning_${ind + 1}`} />
                </Box>
              ))}
            </Box>
          </Box>
          <Box className="thirdMainPageBox">
            <p className="title">{t("howLearning")}</p>
            <Box className="howToLearnPicturesBox">
              {howLearning.map((el, ind) => (
                <Box key={ind} className={`howToLearnBox howToLearnBox_${ind + 1}`}>
                  <Box className="stepsBox">
                    <Box className="stepsNumberBox">
                      <p className="numberAbove">{`0${ind + 1}`}</p>
                      <p className="numberUnder">{`0${ind + 1}`}</p>
                    </Box>
                    <p className="stepTitle">{t(el.title)}</p>
                    {ind === 2 && <span>{t("free")}</span>}
                  </Box>
                  <Box className="stepsPicturesBox">
                    <img src={el.picture} alt={`learning_${ind + 1}`} />
                    {ind !== 3 && <img src={ind === 2 ? arrLeft : arrRight} alt="arrow" className="arrowPicture" />}
                  </Box>
                </Box>
              ))}
            </Box>
          </Box>
        </Container>
      )}
    </>
  );
};

export default MainPage;
