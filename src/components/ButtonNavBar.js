import { useNavigate } from "react-router-dom";
import {
  MdOutlineExplore,
  MdPersonOutline,
  MdOutlineLocalOffer,
} from "react-icons/md";

function ButtonNavBar() {
  const navigate = useNavigate();
  return (
    <div className="btm-nav btm-nav-sm w-72 mx-auto border-2 rounded-3xl bottom-5 shadow-xl">
      <button
        className={`border-e-2 border-e-gray-800/10 rounded-s-3xl hover:bg-gray-800/5 ${
          window.location.pathname === "/profile" && "bg-gray-800/5"
        }`}
        onClick={() => navigate("/profile")}
      >
        <MdPersonOutline className="text-3xl text-gray-600" />
      </button>
      <button
        className={`border-e-2 border-e-gray-800/10 hover:bg-gray-800/5 ${
          window.location.pathname === "/offers" && "bg-gray-800/5"
        }`}
        onClick={() => navigate("/offers")}
      >
        <MdOutlineLocalOffer className="text-3xl text-gray-600" />
      </button>
      <button
        className={`rounded-e-3xl hover:bg-gray-800/5 ${
          window.location.pathname === "/" && "bg-gray-800/5"
        }`}
        onClick={() => navigate("/")}
      >
        <MdOutlineExplore className="text-3xl text-gray-600" />
      </button>
    </div>
  );
}

export default ButtonNavBar;
