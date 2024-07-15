import { Navigate } from "react-router-dom";
import { useAppSelector } from "@store/hook";
import * as tutorSelectors from "@store/selectors";

interface IProtectedRouterForLoggedProps {
  children: JSX.Element;
}

const ProtectedRouterForLogged = ({ children }: IProtectedRouterForLoggedProps) => {
  const isLogin = useAppSelector(tutorSelectors.isLoginSelect);

  if (isLogin) {
    return <Navigate to={"/"} replace />;
  }
  return children;
};

export default ProtectedRouterForLogged;
