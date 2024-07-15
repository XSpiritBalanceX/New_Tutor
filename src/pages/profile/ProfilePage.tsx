import { Box, Container } from "@mui/material";
import { translate } from "@i18n";
import KeyboardArrowRightOutlinedIcon from "@mui/icons-material/KeyboardArrowRightOutlined";
import LocationElement from "./LocationElement";
import { useParams } from "react-router-dom";
import ProfileMenu from "./ProfileMenu";
import "./ProfilePage.scss";

const ProfilePage = () => {
  const { t } = translate("translate", { keyPrefix: "profilePage" });

  const { element } = useParams();

  return (
    <Container className="profilePageContainer">
      <Box className="locationBox">
        <p className="myProfile">{t("myProfile")}</p>
        <KeyboardArrowRightOutlinedIcon className="arrowIcon" />
        <LocationElement element={element as string} />
      </Box>
      <Box className="profilePageContent">
        <ProfileMenu />
      </Box>
    </Container>
  );
};

export default ProfilePage;
