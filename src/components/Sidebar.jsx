import { useContext } from "react";
import "./Sidebar.css";
import NavListItem from "./NavListItem";
import { AppContext } from "../context";
import Socials from "./Socials";

const Sidebar = () => {
  const { navData, social, active, handleSectionActive } =
    useContext(AppContext);

  return (
    <div className={`sideMenu ${active ? "active" : ""}`}>
      <a href="/" className="logo">
        <i className="bi bi-controller"></i>
        <span className="brand">Store</span>
      </a>
      <ul className="nav">
        {navData.map((data) => (
          <NavListItem key={data._id} data={data} />
        ))}
      </ul>
      <ul className="social">
        {social.map((socialIcons) => (
          <Socials key={socialIcons._id} socialIcons={socialIcons} />
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
