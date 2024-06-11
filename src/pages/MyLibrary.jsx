import "./MyLibrary.css";
import { Helmet } from "react-helmet";
import { AppContext } from "../context";
import { useContext } from "react";
import GameCard from "../components/GameCard";

const MyLibrary = () => {
  const { library, libraryRef } = useContext(AppContext);
  return (
    <section className="library" id="library" ref={libraryRef}>
      <div className="container-fluid">
        <div className="row mb-3">
          <h1>My Library</h1>
        </div>
        <div className="row">
          {library.length === 0 ? (
            <div className="emptyLibrary">
              <h2 className="library_h2">Your Library is Empty</h2>
              <img
                src="https://cdni.iconscout.com/illustration/premium/thumb/search-not-found-8291000-6632131.png?f=webp"
                alt="EmptyLibrary Illustration"
              />
            </div>
          ) : (
            library.map((game) => {
              return <GameCard game={game} />;
            })
          )}
        </div>
      </div>
    </section>
  );
};
export default MyLibrary;
