import { Component, ErrorInfo, ReactNode } from "react";
import CustomError from "./CustomError";

interface IProps {
  children: ReactNode;
}

interface IState {
  hasError: boolean;
}

class ErrorBoundary extends Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = { hasError: false };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    this.setState({ hasError: true });
    console.error(error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return <CustomError isErrorBoundary={true} />;
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
