import { useLocation, useParams, Link } from "react-router-dom";
import "./GameSlide.css";
import GameRatings from "../components/GameRatings";
import { useContext } from "react";
import { AppContext } from "../context";

const GameSlide = () => {
  const { id } = useParams();
  const location = useLocation();
  const game = location.state?.game;
  const { handleAddToBag } = useContext(AppContext);

  if (!game) {
    return <div>Loading...</div>;
  }

  return (
    <div
      className="gameSlide"
      style={{ backgroundImage: `url(${game.background})` }}
    >
      <Link to="/home" className="backButton">
        Go Back
      </Link>
      <div className="overlay">
        <h1>{game.title}</h1>
        <div className="container">
          <div className="gameInfo">
            <img src={game.img} alt={game.title} className="gameImage" />
            <div className="gameDetails">
              <p>{game.description}</p>
              <div>
                <p className="rating">
                  <GameRatings rating={game.rating} />
                </p>

                <h4>
                  Current Price: $
                  {((1 - game.discount) * game.price).toFixed(2)}
                </h4>
                <p>Type: {game.category}</p>
                <p>
                  Level:{" "}
                  <span
                    className={
                      game.level === "High"
                        ? "red"
                        : game.level === "Median"
                        ? "yellow"
                        : "green"
                    }
                  >
                    {game.level}
                  </span>
                </p>

                <div className="gamePrice">
                  {game.discount != 0 && (
                    <>
                      <span className="discount">
                        <p>
                          Discount: <i>{game.discount * 100}% off</i>
                        </p>
                      </span>
                      <span className="prevPrice">
                        {" "}
                        <p> Original Price: ${game.price.toFixed(2)}</p>
                      </span>
                    </>
                  )}
                </div>
                <a
                  className="addBag"
                  onClick={() => {
                    handleAddToBag(game);
                  }}
                >
                  <i className="bi bi-bag-plus-fill"> Add To Cart</i>
                </a>
              </div>
            </div>
          </div>
          <iframe
            src={game.trailer}
            title={game.title}
            frameBorder="0"
            allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
      </div>
    </div>
  );
};

export default GameSlide;
