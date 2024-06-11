import { useContext } from "react";
import "./ShopBagItem.css";
import { AppContext } from "../context";
const ShopBagItem = ({ index, game }) => {
  const { handleDeleteFromBag } = useContext(AppContext);
  return (
    <tr className="shopBagItem">
      <th scope="row">{index + 1}</th>
      <td>
        <img src={game.img} alt={game.title} className="img-fluid" />
      </td>
      <td className="gameTitle">{game.title}</td>
      <td>${game.price.toFixed(2)}</td>
      <td>{game.discount * 100}%</td>
      <td>${(game.price * (1 - game.discount)).toFixed(2)}</td>
      <td>
        <a href="#" onClick={() => handleDeleteFromBag(game)}>
          <i className="bi bi-trash"></i>
        </a>
      </td>
    </tr>
  );
};
export default ShopBagItem;
