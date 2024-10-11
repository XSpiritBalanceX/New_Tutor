import { useState, useEffect } from "react";
import { Box, Button, Pagination } from "@mui/material";
import { translate } from "@i18n";
import { TWord, WordsTypes } from "@pages/dictionary/TypesDictionary";
import { capitalizeFirstLetter } from "@utils/dictionaryFunctions";
import { useParams, useNavigate } from "react-router-dom";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import BucketIcon from "@components/icons/BucketIcon";
import "./ListOfWords.scss";

interface IListOfWordsProps {
  list: TWord[];
  all_items_count: number;
  cbHandleFavorites: (id: number) => void;
  cbHandleDeleteWord: (id: number) => void;
}

const ListOfWords = ({ list, all_items_count, cbHandleFavorites, cbHandleDeleteWord }: IListOfWordsProps) => {
  const { t } = translate("translate", { keyPrefix: "dictionaryPage" });

  const { name_folder, page } = useParams();
  const navigate = useNavigate();

  const [itemPerPage] = useState(10);
  const [pagesPagination, setPagesPagination] = useState(0);

  useEffect(() => {
    if (list) {
      const pages = Math.ceil(all_items_count / itemPerPage);
      setPagesPagination(pages);
    }
    // eslint-disable-next-line
  }, [list]);

  const handlePlayWords = () => {
    console.log("play words");
  };

  const handleChangePage = (_: React.ChangeEvent<unknown>, value: number) => {
    navigate(`/${name_folder}/${value}`);
  };

  const handleFavorites = (id: number) => {
    cbHandleFavorites(id);
  };

  const handleDeleteWord = (id: number) => {
    cbHandleDeleteWord(id);
  };

  return (
    <Box className="listContentBox">
      <Box className="titleButtonBox">
        <p>
          {name_folder === "all_words"
            ? t("allWords")
            : name_folder === "favorites"
            ? t("favorites")
            : capitalizeFirstLetter(name_folder as string)}
        </p>
        <Button type="button" onClick={handlePlayWords}>
          <PlayArrowIcon />
        </Button>
      </Box>
      <Box className="listWordsBox">
        {list &&
          list.map((el, ind) => (
            <Box key={ind} className="itemListWords">
              <Button type="button" onClick={() => handleFavorites(el.id)}>
                {el.is_favorite ? (
                  <BookmarkIcon className="markedIcon" />
                ) : (
                  <BookmarkBorderIcon className="markedIcon" />
                )}
              </Button>
              <Box className="itemWordBox">
                <p className="word">{`${el.word} (${WordsTypes[el.type]})`}</p>
                <p className="translation">{el.translation}</p>
              </Box>
              <Button type="button" onClick={() => handleDeleteWord(el.id)}>
                <BucketIcon fill="#C60202" />
              </Button>
            </Box>
          ))}
      </Box>
      {pagesPagination > 1 && (
        <Box className="paginationBox">
          <Pagination
            count={pagesPagination}
            page={Number(page)}
            onChange={handleChangePage}
            className="searchPagination"
          />
        </Box>
      )}
    </Box>
  );
};

export default ListOfWords;
