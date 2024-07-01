import Lottie from "lottie-react";
import spinnerAnimation from "@utils/loader.json";

const Loader = () => {
  return <Lottie animationData={spinnerAnimation} loop className="loader" />;
};

export default Loader;
