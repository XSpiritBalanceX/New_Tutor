import { Box } from "@mui/material";
import * as tutorSelectors from "@store/selectors";
import { useAppSelector } from "@store/hook";
import Header from "./Header";
import "./Header.scss";

const WrapperHeader = () => {
  const isLogin = useAppSelector(tutorSelectors.isLoginSelect);

  return <Box className="wrapperHeaderBox">{isLogin ? <div>header</div> : <Header />}</Box>;
};

export default WrapperHeader;
