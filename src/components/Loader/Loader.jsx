import { Spin } from "antd";
import "./Loader.css";

const Loader = () => {
  return (
    <div className="loader">
      <Spin size="large" tip="Loading..." />
    </div>
  );
};

export default Loader;