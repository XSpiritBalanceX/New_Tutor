import { useState } from "react";
import { Box, Button } from "@mui/material";
import { translate } from "@i18n";
import UserBalance from "./UserBalance";
import AddIcon from "@mui/icons-material/Add";
import CloseIcon from "@mui/icons-material/Close";
import UserBankCards from "./UserBankCards";
import NewBankCard from "./NewBankCard";
import HistoryOfPayments from "./HistoryOfPayments";
import "./SettingPayments.scss";

const SettingPayments = () => {
  const { t } = translate("translate", { keyPrefix: "settingPaymentsPage" });

  const [isAddNewCard, setIsAddNewCard] = useState(false);

  const handleAddNewCard = () => [setIsAddNewCard(!isAddNewCard)];

  return (
    <Box className="settingPaymentsBox">
      <UserBalance />
      <Box className="cardsBox">
        <p className="cardsTitle">{t("cards")}</p>
        {!isAddNewCard && <UserBankCards />}
        <Box className="buttonCardsBox">
          <Button type="button" onClick={handleAddNewCard}>
            {isAddNewCard ? <CloseIcon /> : <AddIcon />}
          </Button>
          <p>{t(isAddNewCard ? "cancel" : "addCard")}</p>
        </Box>
      </Box>
      {isAddNewCard && <NewBankCard />}
      {!isAddNewCard && <HistoryOfPayments />}
    </Box>
  );
};

export default SettingPayments;
