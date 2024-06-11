import { Helmet } from "react-helmet";
import Sidebar from "../components/Sidebar";
import "./Home.css";
import Header from "../components/Header";
import { AppContext } from "../context";
import { useContext, useEffect } from "react";
import Hero from "./Hero";
import Categories from "./Categories";
import MyLibrary from "./MyLibrary";
import MyBag from "./MyBag";
import { useAuth } from "../authContext";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import GameSlide from "./GameSlide";

const Home = () => {
  const { active, handleSectionActive } = useContext(AppContext);
  const { userLoggedIn, currentUser } = useAuth();

  const checkLoginStatus = () => {
    if (userLoggedIn === true) {
    } else {
      toast.dismiss();
      toast.warning("You need to to Log In or SignUp first");
    }
  };

  useEffect(() => {
    checkLoginStatus();
  }, [userLoggedIn]);
  return (
    <div className="d-flex justify-content-center align-items-center vw-100 vh-100">
      {userLoggedIn ? (
        <main>
          <Helmet>
            <title>Game-Store</title>
          </Helmet>
          <Sidebar />
          <div className={`banner ${active ? "active" : ""}`}>
            <Header />
            <div className="container-fluid">
              <Hero />
              <Categories />
              <MyLibrary />
              <MyBag />
              <GameSlide />
            </div>
          </div>
        </main>
      ) : (
        <div className="template d-flex w-100 justify-content-center align-items-center vh-100 aliceblue">
          <div
            className="form_container p-5 w-50 h-50 rounded bg-white text-center align-items-center d-flex flex-row"
            style={{
              alignItems: "center",
              justifyContent: "center",
              minWidth: "fit-content",
            }}
          >
            <Link className="btn shadow-sm btn-primary btn-home m-2 " to={"/"}>
              Login
            </Link>
            <Link
              className="btn shadow-sm btn-success btn-home m-2"
              to={"/signup"}
            >
              Register New Account
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};
export default Home;
