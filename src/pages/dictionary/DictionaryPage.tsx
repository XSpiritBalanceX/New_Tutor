import { useState, useEffect } from "react";
import { Container, Box, TextField, InputAdornment } from "@mui/material";
import { translate } from "@i18n";
import { NavLink, useParams, useLocation, useNavigate } from "react-router-dom";
import KeyboardArrowRightOutlinedIcon from "@mui/icons-material/KeyboardArrowRightOutlined";
import AddIcon from "@mui/icons-material/Add";
import { USER_TYPE } from "@utils/appConsts";
import SearchIcon from "@mui/icons-material/Search";
import { IWords, TWord } from "./TypesDictionary";
import "./DictionaryPage.scss";

const mockData: IWords = {
  all_words: [
    { word: "Destination", type: 1, translation: "Пункт назначения", status: 0 },
    { word: "To take off", type: 3, translation: "Взлетать", status: 1 },
    { word: "To get off the plane", type: 3, translation: "Сойти с самолёта", status: 1 },
    { word: "To land", type: 2, translation: "Приземляться", status: 1 },
    { word: "To go out (with)", type: 3, translation: "выходить из дома (чтобы развлечься)", status: 0 },
    { word: "Therefore", type: 5, translation: "Поэтому", status: 0 },
    { word: "Arrivals", type: 1, translation: "Прибытие", status: 1 },
    { word: "Departures", type: 1, translation: "Отправление", status: 0 },
    { word: "Company shares", type: 1, translation: "Акции компании", status: 0 },
    { word: "Stock exchange", type: 1, translation: "Биржа", status: 1 },
    { word: "To afford ", type: 2, translation: "Позволять", status: 1 },
    { word: "Brand", type: 1, translation: "Торговая марка", status: 1 },
    { word: "Charge for", type: 3, translation: "Взимать плату", status: 0 },
    { word: "Seldom", type: 5, translation: "Редко", status: 0 },
    { word: "Cute", type: 4, translation: "Милый", status: 1 },
  ],
  favorites: [
    { word: "To get off the plane", type: 3, translation: "Сойти с самолёта", status: 1 },
    { word: "Therefore", type: 5, translation: "Поэтому", status: 0 },
    { word: "Arrivals", type: 1, translation: "Прибытие", status: 1 },
    { word: "Seldom", type: 5, translation: "Редко", status: 0 },
  ],
  business_english: [
    { word: "Company shares", type: 1, translation: "Акции компании", status: 0 },
    { word: "Stock exchange", type: 1, translation: "Биржа", status: 1 },
    { word: "Brand", type: 1, translation: "Торговая марка", status: 1 },
    { word: "Charge for", type: 3, translation: "Взимать плату", status: 0 },
  ],
};

const DictionaryPage = () => {
  const { t } = translate("translate", { keyPrefix: "dictionaryPage" });

  const isTeacher = localStorage.getItem(USER_TYPE) === "1";

  const [searchWord, setSearchWord] = useState("");
  const [currentWords, setCurrentWords] = useState<TWord[]>([]);

  const { name_folder } = useParams();
  const { pathname } = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    isTeacher && navigate("/");
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    const words = mockData[name_folder as keyof IWords];
    if (words) {
      setCurrentWords(words);
    }
    // eslint-disable-next-line
  }, [name_folder]);

  useEffect(() => {
    if (searchWord) {
      const words = mockData[name_folder as keyof IWords];
      if (words) {
        const foundData = words.filter(
          (el) =>
            el.word.toLowerCase().includes(searchWord.toLowerCase()) ||
            el.translation.toLowerCase().includes(searchWord.toLowerCase()),
        );
        setCurrentWords(foundData);
      }
    } else {
      setCurrentWords(mockData[name_folder as keyof IWords]);
    }
    // eslint-disable-next-line
  }, [searchWord]);

  const handleChangeFilter = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchWord(e.currentTarget.value);
  };

  const statisticWords = [
    { label: "allWords", data: mockData.all_words.length },
    { label: "inStudying", data: mockData.all_words.filter((el) => el.status === 0).length },
    { label: "learned", data: mockData.all_words.filter((el) => el.status === 1).length },
  ];

  const capitalizeFirstLetter = (str: string) => {
    return str
      .split("_")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(" ");
  };

  return (
    <Container className="dictionaryPageContainer">
      <Box className="locationDictionaryPage">
        <NavLink to={"/"}>{t("main")}</NavLink>
        <KeyboardArrowRightOutlinedIcon className="arrowIcon" />
        <p>{t("dictionary")}</p>
      </Box>
      <p className="titlePage">{t("dictionary")}</p>
      <Box className="contentDictionaryPage">
        <Box className="controlsDictionary">
          <Box className="searchStatisticBox">
            <TextField
              value={searchWord}
              placeholder={t("enterWord")}
              onChange={handleChangeFilter}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
              className="searchWordField"
              disabled={!name_folder}
            />
            <Box className="statisticLinkBox">
              <Box className="statisticBox">
                {statisticWords.map((el, ind) => (
                  <Box key={ind} className="itemStatisticBox">
                    <p className="dataText">{el.data}</p>
                    <p className="labelText">{t(el.label)}</p>
                  </Box>
                ))}
              </Box>
              <NavLink to={"/dictionary/new_word"}>
                <AddIcon />
                {t("addNewWord")}
              </NavLink>
            </Box>
          </Box>
          <Box className="folderLinksBox">
            <NavLink to={"/dictionary/all_words"} className={"nav-link folderLink"}>
              {t("allWords")} <span>{`(${mockData.all_words.length})`}</span>
            </NavLink>
            <NavLink to={"/dictionary/favorites"} className={"nav-link folderLink"}>
              {t("favorites")} <span>{`(${mockData.favorites.length})`}</span>
            </NavLink>
            {Object.keys(mockData)
              .filter((item) => item !== "all_words" && item !== "favorites")
              .map((el, ind) => (
                <NavLink key={ind} to={`/dictionary/${el}`} className={"nav-link folderLink"}>
                  {capitalizeFirstLetter(el)} <span>{`(${mockData[el].length})`}</span>
                </NavLink>
              ))}
            <NavLink to={"/dictionary/new_folder"} className={"newFolderLink"}>
              <span>
                <AddIcon />
              </span>
              {t("addNewFolder")}
            </NavLink>
          </Box>
        </Box>
      </Box>
    </Container>
  );
};

export default DictionaryPage;
