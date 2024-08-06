import { Container, Box, Button } from "@mui/material";
import { translate } from "@i18n";
import KeyboardArrowRightOutlinedIcon from "@mui/icons-material/KeyboardArrowRightOutlined";
import { NavLink } from "react-router-dom";
import invitePic from "@assets/invitation.svg";
import TelegramIcon from "@mui/icons-material/Telegram";
import TwitterIcon from "@mui/icons-material/Twitter";
import WhatsAppIcon from "@components/icons/WhatsAppIcon";
import ViberIcon from "@components/icons/ViberIcon";
import SkypeIcon from "@components/icons/SkypeIcon";
import "./InviteFriendPage.scss";

const InviteFriendPage = () => {
  const { t } = translate("translate", { keyPrefix: "inviteFriendPage" });

  const handleCopyLink = () => {
    console.log("copy link");
  };

  const shareButton = [
    { name: "facebook", content: "f" },
    { name: "whatsapp", content: <WhatsAppIcon fill="#FEFEFF" /> },
    { name: "telegram", content: <TelegramIcon /> },
    { name: "twitter", content: <TwitterIcon /> },
    { name: "viber", content: <ViberIcon fill="#FEFEFF" /> },
    { name: "skype", content: <SkypeIcon fill="#FEFEFF" /> },
  ];

  const handleShareVia = (e: React.MouseEvent<HTMLButtonElement>) => {
    console.log(e.currentTarget.name);
  };

  return (
    <Container className="inviteFriendContainer">
      <Box className="locationInvitationPage">
        <NavLink to={"/"}>{t("main")}</NavLink>
        <KeyboardArrowRightOutlinedIcon className="arrowIcon" />
        <p>{t("inviteFriend")}</p>
      </Box>
      <p className="titlePage">{t("inviteFriend")}</p>
      <Box className="contentInvitation">
        <img src={invitePic} alt="invitation" />
        <Box className="mainContentBox">
          <p className="titleContent">{t("titlePage")}</p>
          <Box className="appLinkBox">
            <Box className="linkField" />
            <Button type="button" onClick={handleCopyLink}>
              {t("copyLink")}
            </Button>
          </Box>
          <Box className="shareBox">
            <p>{t("shareVia")}</p>
            <Box>
              {shareButton.map((el, ind) => (
                <Button key={ind} type="button" name={el.name} className="shareButton" onClick={handleShareVia}>
                  {el.content}
                </Button>
              ))}
            </Box>
          </Box>
        </Box>
      </Box>
    </Container>
  );
};

export default InviteFriendPage;
