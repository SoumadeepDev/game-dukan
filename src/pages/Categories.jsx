import "./CateGories.css";
import { Helmet } from "react-helmet";
import { AppContext } from "../context";
import { useContext, useEffect, useState } from "react";
import GameCard from "../components/GameCard";
import { CSSTransition, TransitionGroup } from "react-transition-group";

const Categories = () => {
  const { games, categoriesRef, categories } = useContext(AppContext);
  const [filteredGames, setFilteredGames] = useState(games);
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    setFilteredGames(games);
  }, [games]);

  const handleFilter = (category) => {
    setActiveCategory(category);
    filterGames(category, searchQuery);
  };

  const handleSearch = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    filterGames(activeCategory, query);
  };

  const filterGames = (category, query) => {
    let filtered = games;
    if (category !== "All") {
      filtered = filtered.filter((game) => game.category === category);
    }
    if (query) {
      filtered = filtered.filter((game) =>
        game.title.toLowerCase().includes(query.toLowerCase())
      );
    }
    setFilteredGames(filtered);
  };

  return (
    <section id="categories" className="categories" ref={categoriesRef}>
      <div className="container-fluid mt-2">
        <div className="row">
          <div className="col-lg-8 d-flex align-items-center justify-content-start">
            <ul className="filters">
              <li>
                <button
                  className={activeCategory === "All" ? "active" : ""}
                  onClick={() => handleFilter("All")}
                >
                  All
                </button>
              </li>
              {categories.map((category) => (
                <li key={category}>
                  <button
                    className={activeCategory === category ? "active" : ""}
                    onClick={() => handleFilter(category)}
                  >
                    {category}
                  </button>
                </li>
              ))}
            </ul>
          </div>
          <div className="col-lg-4 d-flex align-items-center justify-content-end">
            <div className="search">
              <i className="bi bi-search"></i>
              <input
                type="text"
                name="search"
                placeholder="Search games"
                onChange={handleSearch}
              />
            </div>
          </div>
          <div className="row gameList">
            <TransitionGroup component={null}>
              {filteredGames.map((game) => (
                <CSSTransition key={game._id} timeout={300} classNames="game">
                  <GameCard key={game._id} game={game} />
                </CSSTransition>
              ))}
            </TransitionGroup>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Categories;
