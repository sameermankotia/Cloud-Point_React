import { Link } from "react-router-dom";
import logo from "../logo.svg";

const Brand = ({ onClick }) => {
  return (
    <Link
      to="/"
      className="d-flex flex-column navbar-brand align-items-center text-center"
      onClick={onClick}
    >
      <div className="d-flex align-items-center">
        <img src={logo} width={32} alt="App logo" />
        <h1 className="fs-2 fw-bold ms-2 mb-0">CloudPoint</h1>
      </div>
      <h2 className="mt-2">Future Week Forecast</h2>
    </Link>
  );
};

export default Brand;