import { useState } from "react";
import { Box, Button, TextField, FormControlLabel, Checkbox } from "@mui/material";
import { translate } from "@i18n";
import { TWord, WordsTypes } from "@pages/dictionary/TypesDictionary";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import { useNavigate } from "react-router-dom";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import RadioButtonCheckedIcon from "@mui/icons-material/RadioButtonChecked";
import "./DictionaryItems.scss";

interface INewFolderProps {
  listOfWords: TWord[];
}

const NewFolder = ({ listOfWords }: INewFolderProps) => {
  const { t } = translate("translate", { keyPrefix: "dictionaryPage" });

  const navigate = useNavigate();

  const [folderName, setFolderName] = useState("");
  const [listWithWords, setListWithWords] = useState<string[]>([]);

  const handleNavigate = () => {
    navigate("/dictionary");
  };

  const handleChangeFolderName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFolderName(e.currentTarget.value);
  };

  const handleChangeList = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = e.target;
    if (checked) {
      const copyData = listWithWords.slice();
      copyData.push(value);
      setListWithWords(copyData);
    } else {
      const filteredData = listWithWords.filter((el) => el !== value);
      setListWithWords(filteredData);
    }
  };

  const handleSaveFolder = () => {
    console.log(listWithWords);
  };

  return (
    <Box className="newFolderBox">
      <Box className="controlBox">
        <p>{t("addNewFolder")}</p>
        <Button type="button" onClick={handleNavigate}>
          <CloseOutlinedIcon />
        </Button>
      </Box>
      <TextField
        value={folderName}
        onChange={handleChangeFolderName}
        className="folderNameField"
        placeholder={t("namePlaceholder")}
      />
      <p className="chooseWords">{t("chooseWords")}</p>
      <Box className="containerListOfWords">
        {listOfWords &&
          listOfWords.map((el, ind) => (
            <Box key={ind} className="itemListBox">
              <FormControlLabel
                value={el.id}
                control={
                  <Checkbox
                    className="checkBoxWord"
                    icon={<RadioButtonUncheckedIcon />}
                    checkedIcon={<RadioButtonCheckedIcon />}
                    onChange={handleChangeList}
                  />
                }
                label={
                  <>
                    <p className="word">{`${el.word} (${WordsTypes[el.type]})`}</p>
                    <p className="translation">{el.translation}</p>
                  </>
                }
                className="controlWord"
              />
            </Box>
          ))}
      </Box>
      <Button
        type="button"
        className="saveFolderButton"
        onClick={handleSaveFolder}
        disabled={!folderName || listWithWords.length === 0}
      >
        {t("save")}
      </Button>
    </Box>
  );
};

export default NewFolder;
