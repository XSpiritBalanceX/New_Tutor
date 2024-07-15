import Lottie from "lottie-react";
import spinnerAnimation from "@utils/loader.json";
import "./Loader.scss";

const Loader = () => {
  return <Lottie animationData={spinnerAnimation} loop className="loader" />;
};

export default Loader;
