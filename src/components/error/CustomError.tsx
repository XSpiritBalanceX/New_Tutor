import { Box, Container, Button } from "@mui/material";
import { translate } from "@i18n";
import notFound from "@assets/notFound.svg";
import { useNavigate } from "react-router-dom";
import "./CustomError.scss";

interface ICustomErrorProps {
  isErrorBoundary?: boolean;
}

const CustomError = ({ isErrorBoundary }: ICustomErrorProps) => {
  const { t } = translate("translate", { keyPrefix: "errorPage" });

  const navigate = useNavigate();

  const handleNavigate = () => {
    if (isErrorBoundary) {
      window.location.href = "/";
    } else {
      navigate("/");
    }
  };

  return (
    <Container className="customErrorContainer">
      <Box className="contentCustomError">
        <p className="title">{t("title")}</p>
        <p className="text">{t("text")}</p>
        <img src={notFound} alt="not found" />
        <Button type="button" onClick={handleNavigate} className="navigationButton">
          {t("button")}
        </Button>
      </Box>
    </Container>
  );
};

export default CustomError;
