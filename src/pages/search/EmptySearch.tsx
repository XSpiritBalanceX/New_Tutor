import { Box } from "@mui/material";
import { translate } from "@i18n";
import notFound from "@assets/search.svg";
import "./SearchPage.scss";

const EmptySearch = () => {
  const { t } = translate("translate", { keyPrefix: "searchPage" });
  return (
    <Box className="emptySearchBox">
      <Box className="textEmptySearch">
        <p className="emptyText">{t("emptyRequest")}</p>
        <p className="changeRequest">{t("changeRequest")}</p>
      </Box>
      <img src={notFound} alt="not found" />
    </Box>
  );
};

export default EmptySearch;
