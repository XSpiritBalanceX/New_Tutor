import { Container, Box } from "@mui/material";
import { translate } from "@i18n";
import KeyboardArrowRightOutlinedIcon from "@mui/icons-material/KeyboardArrowRightOutlined";
import { NavLink } from "react-router-dom";
import { useAppSelector } from "@store/hook";
import * as tutorSelectors from "@store/selectors";
import "./PolicyPage.scss";

const PolicyPage = () => {
  const { t } = translate("translate", { keyPrefix: "policyPage" });

  const isLogin = useAppSelector(tutorSelectors.isLoginSelect);

  const basesForProcessingFirst = ["basesProcessingText2", "basesProcessingText3", "basesProcessingText4"];
  const basesForProcessingSecond = [
    "basesProcessingText6",
    "basesProcessingText7",
    "basesProcessingText8",
    "basesProcessingText9",
  ];
  const registrationAndAccountsFirst = [
    "registrationAndAccountsText2",
    "registrationAndAccountsText3",
    "registrationAndAccountsText4",
  ];
  const dataWeCollect = ["dataCollect", "accountStudent", "accountStudentText", "accountTutor", "accountTutorText"];
  const registrationAndAccountsSecond = ["registrationAccText1", "registrationAccText2", "registrationAccText3"];

  return (
    <Container className={`policyPageContainer ${isLogin ? "" : "unLoggedUser"}`}>
      <Box className="locationPolicyPage">
        <NavLink to={"/"}>{t("main")}</NavLink>
        <KeyboardArrowRightOutlinedIcon className="arrowIcon" />
        <p>{t("policy")}</p>
      </Box>
      <p className="titlePage">{t("policy")}</p>
      <Box className="rowWithoutUlPolicy">
        <p>{t("generalInformation")}</p>
        <p>{t("generalInformationPolicy")}</p>
      </Box>
      <Box className="rowWithUlPolicy">
        <p>{t("basesProcessing")}</p>
        <p>{t("basesProcessingText1")}</p>
        <ul>
          {basesForProcessingFirst.map((el, ind) => {
            return <li key={ind}>{t(el)}</li>;
          })}
        </ul>
        <p>{t("basesProcessingText5")}</p>
        <ul>
          {basesForProcessingSecond.map((el, ind) => {
            return <li key={ind}>{t(el)}</li>;
          })}
        </ul>
      </Box>
      <Box className="rowWithUlPolicy">
        <p>{t("registrationAndAccounts")}</p>
        <p>{t("registrationAndAccountsText1")}</p>
        <ul>
          {registrationAndAccountsFirst.map((el, ind) => {
            return <li key={ind}>{t(el)}</li>;
          })}
        </ul>
      </Box>
      <Box className="rowDataCollectPolicy">
        {dataWeCollect.map((el, ind) => {
          return <p key={ind}>{t(el)}</p>;
        })}
      </Box>
      <Box className="rowWithoutUlPolicy">
        <p>{t("registrationAndAccounts")}</p>
        {registrationAndAccountsSecond.map((el, ind) => {
          return <p key={ind}>{t(el)}</p>;
        })}
      </Box>
    </Container>
  );
};

export default PolicyPage;
