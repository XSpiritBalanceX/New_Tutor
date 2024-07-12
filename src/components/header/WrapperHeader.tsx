import { Box } from "@mui/material";
import * as tutorSelectors from "@store/selectors";
import { useAppSelector } from "@store/hook";
import Header from "./Header";
import AuthHeader from "@components/authHeader/AuthHeader";
import "./Header.scss";

const WrapperHeader = () => {
  const isLogin = useAppSelector(tutorSelectors.isLoginSelect);

  return <Box className="wrapperHeaderBox">{isLogin ? <AuthHeader /> : <Header />}</Box>;
};

export default WrapperHeader;
