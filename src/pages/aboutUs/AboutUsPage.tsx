import { Container, Box } from "@mui/material";
import first from "@assets/first.svg";
import second from "@assets/second.svg";
import third from "@assets/third.svg";
import { translate } from "@i18n";
import KeyboardArrowRightOutlinedIcon from "@mui/icons-material/KeyboardArrowRightOutlined";
import { NavLink } from "react-router-dom";
import * as tutorSelectors from "@store/selectors";
import { useAppSelector } from "@store/hook";
import "./AboutUsPage.scss";

const AboutUsPage = () => {
  const { t } = translate("translate", { keyPrefix: "aboutUsPage" });

  const isLogin = useAppSelector(tutorSelectors.isLoginSelect);

  const picturesText = [
    { picture: first, text: "firstText" },
    { picture: second, text: "secondText" },
    { picture: third, text: "thirdText" },
  ];

  return (
    <Container className={`aboutUsPageContainer ${isLogin ? "" : "unLoggedUser"}`}>
      <Box className="locationAboutUsPage">
        <NavLink to={"/"}>{t("main")}</NavLink>
        <KeyboardArrowRightOutlinedIcon className="arrowIcon" />
        <p>{t("aboutUs")}</p>
      </Box>
      <p className="titlePage">{t("aboutUs")}</p>
      <Box className="titleTextBox">{t("titleAboutUs")}</Box>
      <Box className="textPicturesBox">
        {picturesText.map((el, ind) => (
          <Box key={ind} className="aboutUsItemBox">
            <img src={el.picture} alt={`pict_${ind}`} />
            <p>{t(el.text)}</p>
          </Box>
        ))}
      </Box>
    </Container>
  );
};

export default AboutUsPage;
