import { Container, Box, List, ListItem, ListItemText, ListItemIcon } from "@mui/material";
import { translate } from "@i18n";
import KeyboardArrowRightOutlinedIcon from "@mui/icons-material/KeyboardArrowRightOutlined";
import { NavLink } from "react-router-dom";
import { useAppSelector } from "@store/hook";
import * as tutorSelectors from "@store/selectors";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
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
        <List className="listTerms">
          {tutorTermsList.map((el, ind) => (
            <ListItem key={ind} className="listTermsItem">
              <ListItemIcon className="listIcon">
                <FiberManualRecordIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText className="listText">{t(el)}</ListItemText>
            </ListItem>
          ))}
        </List>
        {tutorTermsText.map((el, ind) => {
          return <p key={ind}>{t(el)}</p>;
        })}
        <p>{t("tutorTermsText9")}</p>
        <List className="listTerms">
          <ListItem className="listTermsItem">
            <ListItemIcon className="listIcon">
              <FiberManualRecordIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText className="listText">{t("tutorTermsText10")}</ListItemText>
          </ListItem>
        </List>
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
        <List className="listTerms">
          {directInteraction.map((el, ind) => (
            <ListItem key={ind} className="listTermsItem">
              <ListItemIcon className="listIcon">
                <FiberManualRecordIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText className="listText">{t(el)}</ListItemText>
            </ListItem>
          ))}
        </List>
        <p>{t("directInteractionText4")}</p>
      </Box>
      <Box className="sevenRowTerms">
        <p>{t("representationAnsWarr")}</p>
        <p>{t("tutorRepresentations")}</p>
        <List className="listTerms">
          {tutorRepresentations.map((el, ind) => (
            <ListItem key={ind} className="listTermsItem">
              <ListItemIcon className="listIcon">
                <FiberManualRecordIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText className="listText">{t(el)}</ListItemText>
            </ListItem>
          ))}
        </List>
        <p>{t("studentRepresentations")}</p>
        <p>{t("studentRepresentationsText1")}</p>
        <List className="listTerms">
          {studentRepresentations.map((el, ind) => (
            <ListItem key={ind} className="listTermsItem">
              <ListItemIcon className="listIcon">
                <FiberManualRecordIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText className="listText">{t(el)}</ListItemText>
            </ListItem>
          ))}
        </List>
      </Box>
      <Box className="sevenRowTerms">
        <p>{t("paymentsAndReturns")}</p>
        <p>{t("paymentsAndReturnsStudent")}</p>
        <List className="listTerms">
          {studentPaymentsAnsReturns.map((el, ind) => (
            <ListItem key={ind} className="listTermsItem">
              <ListItemIcon className="listIcon">
                <FiberManualRecordIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText className="listText">{t(el)}</ListItemText>
            </ListItem>
          ))}
        </List>
        <p>{t("paymentsAndReturnsTeacher")}</p>
        <List className="listTerms">
          <ListItem className="listTermsItem">
            <ListItemIcon className="listIcon">
              <FiberManualRecordIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText className="listText">{t("paymentsAndReturnsTeacherText1")}</ListItemText>
          </ListItem>
        </List>
      </Box>
    </Container>
  );
};

export default TermsPage;
