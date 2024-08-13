import { Box, Drawer, Button } from "@mui/material";
import SearchFilter from "./SearchFilter";
import { translate } from "@i18n";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import "./SearchFilter";

interface IMobileSearchFilterProps {
  isOpen: boolean;
  cbHandleCloseMenu: () => void;
}

const MobileSearchFilter = ({ isOpen, cbHandleCloseMenu }: IMobileSearchFilterProps) => {
  const { t } = translate("translate", { keyPrefix: "searchPage" });

  const handleCloseMenu = () => {
    cbHandleCloseMenu();
  };
  return (
    <Drawer open={isOpen} anchor="right" className="mobileSearchFilterContainer" onClose={handleCloseMenu}>
      <Box className="closeButtonBox">
        <Button type="button" onClick={handleCloseMenu}>
          <CloseOutlinedIcon />
        </Button>
      </Box>
      <p className="filters">{t("filters")}</p>
      <SearchFilter />
    </Drawer>
  );
};

export default MobileSearchFilter;
