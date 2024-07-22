import { Box, Table, TableBody, TableCell, TableRow } from "@mui/material";
import { translate } from "@i18n";
import moment from "moment";
import "./SettingPayments.scss";

const mockData = [
  {
    id: 1,
    date: "2024-05-10 17:13",
    card: "Mastercard 4201******6650",
    sum: "— 13,50",
    goal: "(Оплата) -Package 2 - to Traves Yoren",
    isReturn: false,
  },
  {
    id: 2,
    date: "2024-05-13 11:35",
    card: "Mastercard 4201******6650",
    sum: "+ 11,50",
    goal: "(возврат средств на карту)",
    isReturn: true,
  },
  {
    id: 3,
    date: "2024-05-12 11:20",
    card: "Mastercard 4201******6650",
    sum: "— 11,50",
    goal: "(Оплата)",
    isReturn: false,
  },
];

const HistoryOfPayments = () => {
  const { t } = translate("translate", { keyPrefix: "settingPaymentsPage" });

  return (
    <Box className="historyOfPaymentsBox">
      <p className="titleHistory">{t("historyOfPayments")}</p>
      <Table className="historyTable">
        <TableBody>
          {mockData.map((el, ind) => (
            <TableRow key={ind}>
              <TableCell>{moment(el.date).format("DD.MM.YYYY-HH:mm")}</TableCell>
              <TableCell>{el.card}</TableCell>
              <TableCell>{el.sum} $</TableCell>
              <TableCell className={`sumCell ${el.isReturn ? "isReturnedSum" : ""}`}>{el.goal}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Box>
  );
};

export default HistoryOfPayments;
