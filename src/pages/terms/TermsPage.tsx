import { Container, Box } from "@mui/material";
import { translate } from "@i18n";
import KeyboardArrowRightOutlinedIcon from "@mui/icons-material/KeyboardArrowRightOutlined";
import { NavLink } from "react-router-dom";
import { useAppSelector } from "@store/hook";
import * as tutorSelectors from "@store/selectors";
import "./TermsPage.scss";

const TermsPage = () => {
  const { t } = translate("translate", { keyPrefix: "termsPage" });

  const isLogin = useAppSelector(tutorSelectors.isLoginSelect);

  const tutorTermsList = ["tutorTermsText2", "tutorTermsText3", "tutorTermsText4"];
  const tutorTermsText = ["tutorTermsText5", "tutorTermsText6", "tutorTermsText7", "tutorTermsText8"];
  const amendmentsTerms = ["amendmentTerms", "amendmentTermsText1", "amendmentTermsText2"];
  const rightUseTutor = ["useTutor", "useTutorText1", "useTutorText2", "useTutorText3"];
  const directInteraction = ["directInteractionText2", "directInteractionText3"];
  const tutorRepresentations = [
    "tutorRepresentationsText1",
    "tutorRepresentationsText2",
    "tutorRepresentationsText3",
    "tutorRepresentationsText4",
    "tutorRepresentationsText5",
    "tutorRepresentationsText6",
  ];
  const studentRepresentations = [
    "studentRepresentationsText2",
    "studentRepresentationsText3",
    "studentRepresentationsText4",
    "studentRepresentationsText5",
  ];

  const studentPaymentsAnsReturns = ["paymentsAndReturnsStudentText1", "paymentsAndReturnsStudentText2"];

  return (
    <Container className={`termsContainer ${isLogin ? "" : "unLoggedUser"}`}>
      <Box className="locationTermsPage">
        <NavLink to={"/"}>{t("main")}</NavLink>
        <KeyboardArrowRightOutlinedIcon className="arrowIcon" />
        <p>{t("terms")}</p>
      </Box>
      <p className="titlePage">{t("terms")}</p>
      <Box className="rowWithoutUlTerms">
        <p>{t("generalInformation")}</p>
        <p>{t("generalInformationText")}</p>
      </Box>
      <Box className="rowWithUlTerms">
        <p>{t("tutorTerms")}</p>
        <p>{t("tutorTermsText1")}</p>
        <ul>
          {tutorTermsList.map((el, ind) => {
            return <li key={ind}>{t(el)}</li>;
          })}
        </ul>
        {tutorTermsText.map((el, ind) => {
          return <p key={ind}>{t(el)}</p>;
        })}
        <p>{t("tutorTermsText9")}</p>
        <ul>
          <li>{t("tutorTermsText10")}</li>
        </ul>
      </Box>
      <Box className="rowWithoutUlTerms">
        {amendmentsTerms.map((el, ind) => {
          return <p key={ind}>{t(el)}</p>;
        })}
      </Box>
      <Box className="rowWithoutUlTerms">
        {rightUseTutor.map((el, ind) => {
          return <p key={ind}>{t(el)}</p>;
        })}
      </Box>
      <Box className="rowWithUlTerms">
        <p>{t("directInteraction")}</p>
        <p>{t("directInteractionText1")}</p>
        <ul>
          {directInteraction.map((el, ind) => {
            return <li key={ind}>{t(el)}</li>;
          })}
        </ul>
        <p>{t("directInteractionText4")}</p>
      </Box>
      <Box className="sevenRowTerms">
        <p>{t("representationAnsWarr")}</p>
        <p>{t("tutorRepresentations")}</p>
        <ul>
          {tutorRepresentations.map((el, ind) => {
            return <li key={ind}>{t(el)}</li>;
          })}
        </ul>
        <p>{t("studentRepresentations")}</p>
        <p>{t("studentRepresentationsText1")}</p>
        <ul>
          {studentRepresentations.map((el, ind) => {
            return <li key={ind}>{t(el)}</li>;
          })}
        </ul>
      </Box>
      <Box className="sevenRowTerms">
        <p>{t("paymentsAndReturns")}</p>
        <p>{t("paymentsAndReturnsStudent")}</p>
        <ul>
          {studentPaymentsAnsReturns.map((el, ind) => {
            return <li key={ind}>{t(el)}</li>;
          })}
        </ul>
        <p>{t("paymentsAndReturnsTeacher")}</p>
        <ul>
          <li>{t("paymentsAndReturnsTeacherText1")}</li>
        </ul>
      </Box>
    </Container>
  );
};

export default TermsPage;
