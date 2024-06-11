import { AppContext } from "../context";
import { useContext } from "react";
import "./GameCard.css";
import GameRatings from "./GameRatings";
import { useNavigate } from "react-router-dom";

const GameCard = ({ game }) => {
  const {
    library,
    handleAddToLibrary,
    handleRemoveFromLibrary,
    bag,
    handleAddToBag,
  } = useContext(AppContext);
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/game/${game._id}`, { state: { game } });
  };

  return (
    <div className="col-xl-3 col-lg-4 col-md-6">
      <div className="gameCard">
        <img
          src={game.img}
          alt={game.title}
          className="img-fluid"
          onClick={handleClick}
        />
        <a
          href="#"
          className={`like ${library.includes(game) ? "active" : ""}`}
          onClick={
            library.includes(game)
              ? () => handleRemoveFromLibrary(game)
              : () => handleAddToLibrary(game)
          }
        >
          <i className="bi bi-heart-fill"></i>
        </a>
        <div className="gameFeature">
          <span className="gameType">{game.level}</span>
          <GameRatings rating={game.rating} />
        </div>

        <div className="gameTitle mt-4 mb-3">{game.title}</div>
        <div className="gamePrice">
          {game.discount != 0 && (
            <>
              <span className="discount">
                <i>{game.discount * 100}% off</i>
              </span>
              <span className="prevPrice">${game.price.toFixed(2)}</span>
            </>
          )}

          <span className="currentPrice">
            ${((1 - game.discount) * game.price).toFixed(2)}
          </span>
        </div>
        <a href="#" className="addBag" onClick={() => handleAddToBag(game)}>
          <i className="bi bi-bag-plus-fill"></i>
        </a>
      </div>
    </div>
  );
};
export default GameCard;
