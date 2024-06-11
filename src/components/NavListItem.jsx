import { useContext } from "react";
import { AppContext } from "../context";

const NavListItem = ({ data }) => {
  const { handleNavOnClick } = useContext(AppContext);

  return (
    <li>
      <a
        href="#"
        className={`${data.active ? "active" : ""}`}
        onClick={() => handleNavOnClick(data._id, data.target)}
      >
        <i className={`bi ${data.icon}`}></i>
        <span className="navName">{data.name}</span>
      </a>
    </li>
  );
};
export default NavListItem;
