import { Box, Pagination } from "@mui/material";
import { useNavigate } from "react-router-dom";
import "./CustomPagination.scss";

interface ICustomPaginationProps {
  pagesPagination: number;
  currentPage: number;
  url: string;
}

const CustomPagination = ({ pagesPagination, currentPage, url }: ICustomPaginationProps) => {
  const navigate = useNavigate();

  const handleChangePage = (_: React.ChangeEvent<unknown>, value: number) => {
    navigate(`${url}/${value}`);
  };

  return pagesPagination > 1 ? (
    <Box className="paginationBox">
      <Pagination
        count={pagesPagination}
        page={Number(currentPage)}
        onChange={handleChangePage}
        className="customPagination"
      />
    </Box>
  ) : null;
};

export default CustomPagination;
