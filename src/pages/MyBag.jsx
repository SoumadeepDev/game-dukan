import { Helmet } from "react-helmet";
import "./MyBag.css";
import { AppContext } from "../context";
import { useContext, useState, useEffect } from "react";
import ShopBagItem from "../components/ShopBagItem";

const MyBag = () => {
  const { bag, bagRef } = useContext(AppContext);
  const [total, setTotal] = useState(0);

  const handleTotalPayment = () => {
    return bag
      .map((game) => game.price * (1 - game.discount))
      .reduce((acc, curr) => acc + curr, 0)
      .toFixed(2);
  };

  useEffect(() => {
    setTotal(handleTotalPayment());
  }, [bag]);

  return (
    //id should be same as of target because we are using useRef for reference
    <section className="bag" id="myBag" ref={bagRef}>
      <div className="container-fluid">
        <div className="row mb-3">
          <h1>My Bag</h1>
        </div>
        <div className="row mb-3">
          {bag.length === 0 ? (
            <div className="emptyBag">
              <h2 className="bag_h2">Your Cart is Empty</h2>
              <img
                src="https://cdni.iconscout.com/illustration/premium/thumb/empty-cart-2130356-1800917.png"
                alt="EmptyCart Illustration"
              />
            </div>
          ) : (
            <>
              <div className="table-responsive">
                <table className="shopBagTable table table-borderless align-middle">
                  <thead>
                    <tr>
                      <th scope="col">No.</th>
                      <th scope="col">Preview</th>
                      <th scope="col">Game</th>
                      <th scope="col">Price</th>
                      <th scope="col">Discount</th>
                      <th scope="col">Payment</th>
                      <th scope="col">Remove</th>
                    </tr>
                  </thead>
                  <tbody>
                    {bag.map((game, index) => {
                      return (
                        <ShopBagItem index={index} key={game._id} game={game} />
                      );
                    })}
                  </tbody>
                </table>
              </div>
              <div className="row d-flex justify-content-between mt-5">
                <div className="col-lg-2 d-flex align-items-center">
                  <p className="itemCount">Total Items : {bag.length}</p>
                </div>
                <div className="col-lg-10 d-flex justify-content-end">
                  <div className="payment">
                    Total: ${total}
                    <a href="#">
                      Check Out <i className="bi bi-wallet-fill"></i>
                    </a>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  );
};
export default MyBag;
