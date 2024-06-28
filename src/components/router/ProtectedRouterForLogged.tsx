import { Navigate } from "react-router-dom";
/* import { useAppSelector } from "@store/hook";
import * as tutorSelectors from "@store/selectors"; */

interface IProtectedRouterForLoggedProps {
  children: JSX.Element;
}

const ProtectedRouterForLogged = ({ children }: IProtectedRouterForLoggedProps) => {
  const token = localStorage.getItem("tutor_access_token");
  //const isLogin = useAppSelector(tutorSelectors.isLoginSelect);

  if (!token /* || !isLogin */) {
    return <Navigate to={"/"} replace />;
  }
  return children;
};

export default ProtectedRouterForLogged;
