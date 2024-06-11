import "./Hero.css";
import GameSwiper from "../components/GameSwiper";
import GameCard from "../components/GameCard";
import { AppContext } from "../context";
import { useContext } from "react";
const Hero = () => {
  const { games, homeRef, handleNavOnClick } = useContext(AppContext);

  return (
    <section id="home" className="home active" ref={homeRef}>
      <div className="container-fluid">
        <div className="row">
          <GameSwiper />
        </div>
        <div className="row mb-4 mt-4">
          <div className="col-lg-6">
            <h2 className="sectionTitle">Games on promotion</h2>
          </div>
          <div className="col-lg-6 d-flex justify-content-end align-items-center">
            <a
              href="#"
              className="viewMore"
              onClick={() => handleNavOnClick(2, "categories")}
            >
              {" "}
              View More Games
              <i className="bi bi-arrow-right"></i>
            </a>
          </div>
        </div>
        <div className="row">
          {games.slice(0, 4).map((game) => {
            return <GameCard key={game._id} game={game} />;
          })}
        </div>
      </div>
    </section>
  );
};
export default Hero;
