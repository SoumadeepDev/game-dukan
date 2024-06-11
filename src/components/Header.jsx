import "./Header.css";
import userImg from "../assets/user_Image.png";
import { useContext } from "react";
import { AppContext } from "../context";
import { useAuth } from "../authContext";
import { useNavigate } from "react-router-dom";
import { doSignOut } from "../firebase/auth";

const truncateEmail = (email, maxLength = 10) => {
  if (email.length > maxLength) {
    return email.substring(0, maxLength) + "...";
  }
  return email;
};

const getFirstName = (name) => {
  if (name) {
    return name.split(" ")[0];
  }
  return null;
};

const Header = () => {
  const { library, bag, handleToggleActive, handleNavOnClick } =
    useContext(AppContext);
  const { userLoggedIn, currentUser } = useAuth();

  console.log(currentUser);
  const navigate = useNavigate();
  return (
    <header>
      <a href="#" className="menu" onClick={handleToggleActive}>
        <i className="bi bi-sliders"></i>
      </a>
      <div className="userItems">
        <a
          href="#"
          className={`icon ${library.length > 0 ? "active" : ""}`}
          onClick={() => handleNavOnClick(3, "library")}
        >
          <i className="bi bi-heart-fill">
            <span className="like">{library.length}</span>
          </i>
        </a>
        <a
          href="#"
          className={`icon bag ${bag.length > 0 ? "bactive" : ""}`}
          onClick={() => handleNavOnClick(4, "myBag")}
        >
          <i className="bi bi-bag-fill">
            <span className="bag">{bag.length}</span>
          </i>
        </a>
        <div className="avatar">
          <a href="#">
            <img
              src={currentUser.photoURL ? currentUser.photoURL : userImg}
              alt="User Image"
            />
          </a>
          <div className="user">
            <span>
              {currentUser.displayName
                ? getFirstName(currentUser.displayName)
                : truncateEmail(currentUser.email)}
            </span>
            <a
              onClick={() => {
                doSignOut().then(() => {
                  navigate("/");
                });
              }}
              style={{
                color: "red",
                fontSize: "large",
                fontFamily: "serif",
                fontWeight: "bold",
                cursor: "pointer",
              }}
            >
              Logout
            </a>
          </div>
        </div>
      </div>
    </header>
  );
};
export default Header;
