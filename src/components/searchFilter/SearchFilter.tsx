import { useState } from "react";
import {
  Box,
  TextField,
  FormLabel,
  MenuItem,
  Slider,
  FormControlLabel,
  Checkbox,
  FormGroup,
  Button,
} from "@mui/material";
import { translate } from "@i18n";
import { language, TLanguages } from "@utils/listOfLanguagesLevels";
import { useAppSelector } from "@store/hook";
import * as tutorSelectors from "@store/selectors";
import "./SearchFilter.scss";

const SearchFilter = () => {
  const { t } = translate("translate", { keyPrefix: "searchPage" });

  const locale = useAppSelector(tutorSelectors.localeSelect);

  const [learnLanguage, setLearnLanguage] = useState<string>("");
  const [priceOfLesson, setPriceOfLesson] = useState({ min: 0, max: 10 });
  const [isCertificated, setIsCertificated] = useState(true);
  const [partOfDay, setPartOfDay] = useState("morning");

  const handleChangeLearnLanguage = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLearnLanguage(e.target.value);
  };

  const handleChangePrice = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.currentTarget;
    const numberValue = Number(value);
    setPriceOfLesson((prev) => {
      return { ...prev, [name]: numberValue > 50 ? 50 : numberValue };
    });
  };

  const handleChangePriceSlider = (_: Event, newValue: number | number[]) => {
    setPriceOfLesson({ min: (newValue as number[])[0], max: (newValue as number[])[1] });
  };

  const handleIsCertificated = () => {
    setIsCertificated(!isCertificated);
  };

  const partsOfDays = ["morning", "day", "evening", "night", "anyTime"];

  const handleChangePart = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name } = e.currentTarget;
    setPartOfDay(name);
  };

  const handleApply = () => {
    console.log("apply");
  };

  return (
    <Box className="filterBox">
      <Box className="wantToLearnBox">
        <FormLabel className="filterLabel">{t("wantToLearn")}</FormLabel>
        <TextField
          select={true}
          value={learnLanguage}
          onChange={handleChangeLearnLanguage}
          label={t("chooseLang")}
          className="filterField"
        >
          {language[locale as keyof TLanguages].map((el, ind) => (
            <MenuItem key={ind} value={ind}>
              {el}
            </MenuItem>
          ))}
        </TextField>
      </Box>
      <Box className="filterPriceBox">
        <FormLabel className="filterLabel">{t("priceOfLesson")}</FormLabel>
        <Box className="priceFieldsBox">
          <TextField value={priceOfLesson.min} onChange={handleChangePrice} name="min" className="filterField" />
          <p className="toText">{t("to")}</p>
          <TextField value={priceOfLesson.max} onChange={handleChangePrice} name="max" className="filterField" />
          <p className="currencyText">$</p>
        </Box>
        <Slider
          value={[priceOfLesson.min, priceOfLesson.max]}
          onChange={handleChangePriceSlider}
          max={50}
          className="priceSlider"
          valueLabelDisplay="on"
        />
      </Box>
      <FormControlLabel
        control={<Checkbox checked={isCertificated} onChange={handleIsCertificated} />}
        label={t("certificatedTeacher")}
        className="certificatedTeacherCheckBox"
      />
      <Box className="partsOfDayBox">
        <FormLabel className="filterLabel">{t("wantToStudy")}</FormLabel>
        <FormGroup>
          {partsOfDays.map((el, ind) => (
            <FormControlLabel
              key={ind}
              control={<Checkbox checked={el === partOfDay} onChange={handleChangePart} name={el} />}
              label={t(el)}
              className="partOfDayField"
            />
          ))}
        </FormGroup>
      </Box>
      <Button type="button" onClick={handleApply} className="buttonApply">
        {t("apply")}
      </Button>
    </Box>
  );
};

export default SearchFilter;
