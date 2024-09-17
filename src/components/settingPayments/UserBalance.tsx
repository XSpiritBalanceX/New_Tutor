import { useState } from "react";
import { Box, Button, InputAdornment, MenuItem, TextField } from "@mui/material";
import { USER_TYPE } from "@utils/appConsts";
import { translate } from "@i18n";
import "./SettingPayments.scss";

const UserBalance = () => {
  const { t } = translate("translate", { keyPrefix: "settingPaymentsPage" });

  const isStudent = localStorage.getItem(USER_TYPE) === "0";

  const [currentCurrency, setCurrentCurrency] = useState("$");
  const [money, setMoney] = useState<string | number>("");
  const [currentSum, setCurrentSum] = useState("");

  const currency = [
    { label: "USD", value: "$" },
    { label: "BYN", value: "Br" },
  ];

  const handleChangeCurrency = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentCurrency(e.target.value);
  };

  const handleChangeSum = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.currentTarget;
    if (Number(value)) {
      setCurrentSum(value);
    }
  };

  const handleWithdrawMoney = () => {
    const sum = Number(currentSum) + Number(money);
    setMoney(sum);
    setCurrentSum("");
  };

  return (
    <Box className="userBalanceBox">
      <p className="yourBalance">
        {t("yourBalance")}
        <span>{money}</span>
      </p>
      <TextField
        placeholder={t("sum")}
        InputProps={{
          endAdornment: <InputAdornment position="start">{money}</InputAdornment>,
        }}
        value={currentSum}
        onChange={handleChangeSum}
        className="balanceField"
      />
      <TextField select={true} value={currentCurrency} onChange={handleChangeCurrency} className="currencyField">
        {currency.map((el, ind) => (
          <MenuItem key={ind} value={el.value}>
            {el.label}
          </MenuItem>
        ))}
      </TextField>
      <Button type="button" onClick={handleWithdrawMoney} className="withdrawButton">
        {t(isStudent ? "topUpBalance" : "withdraw")}
      </Button>
    </Box>
  );
};

export default UserBalance;
