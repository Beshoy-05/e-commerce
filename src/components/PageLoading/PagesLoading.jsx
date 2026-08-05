import loadingGif from "../../assets/loading.svg";
import "./PageLoading.css";

const PageLoading = () => {
  return (
    <div className="page-loading">
      <img src={loadingGif} alt="Loading..." />
    </div>
  );
};

export default PageLoading;