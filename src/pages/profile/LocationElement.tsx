import { translate } from "@i18n";
import { NavLink } from "react-router-dom";
import KeyboardArrowRightOutlinedIcon from "@mui/icons-material/KeyboardArrowRightOutlined";
import "./ProfilePage.scss";

interface ILocationElementProps {
  element: string;
}

const LocationElement = ({ element }: ILocationElementProps) => {
  const { t } = translate("translate", { keyPrefix: "profilePage" });

  let result;

  switch (true) {
    case element === "settings":
      result = <p className="elementText">{t("generalSettings")}</p>;
      break;
    case element === "number":
      result = (
        <>
          <NavLink to={"/profile/settings"}>{t("generalSettings")}</NavLink>
          <KeyboardArrowRightOutlinedIcon className="arrowIcon" />
          <p className="elementText">{t("changeNumber")}</p>
        </>
      );
      break;
    case element === "language":
      result = <p className="elementText">{t("languages")}</p>;
      break;
    case element === "schedule":
      result = <p className="elementText">{t("schedule")}</p>;
      break;
    case element === "password":
      result = <p className="elementText">{t("changePassword")}</p>;
      break;
    default:
      result = <p className="elementText">{t("payments")}</p>;
      break;
  }
  return result;
};

export default LocationElement;
