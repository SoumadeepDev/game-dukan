import { createContext, useEffect, useState, useRef } from "react";
import { navListData, socialData } from "./data/data";
import { toast } from "react-toastify";

export const AppContext = createContext();

const AppProvider = ({ children }) => {
  const [navData, setNavData] = useState([]);
  const [social, setSocial] = useState([]);
  const [active, setActive] = useState(false);
  const [games, setGames] = useState([]);
  const [library, setLibrary] = useState([]);
  const [bag, setBag] = useState([]);

  const homeRef = useRef();
  const categoriesRef = useRef();
  const libraryRef = useRef();
  const bagRef = useRef();

  const categories = [...new Set(games.map((game) => game.category))];

  const sections = [
    { name: "home", ref: homeRef, active: true },
    { name: "categories", ref: categoriesRef, active: false },
    { name: "library", ref: libraryRef, active: false },
    { name: "myBag", ref: bagRef, active: false },
  ];

  const handleSectionActive = (target) => {
    sections.map((section) => {
      section.ref.current.classList.remove("active");
      if (section.ref.current.id === target) {
        section.ref.current.classList.add("active");
      }
      return section;
    });
  };

  useEffect(() => {
    setNavData(navListData);
    setSocial(socialData);
  }, []);

  const fetchData = () => {
    fetch("/api/gamesData.json")
      .then((res) => res.json())
      .then((data) => {
        setGames(data);
      })
      .catch((e) => toast.error(e.message));
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleToggleActive = () => {
    setActive(!active);
  };

  const handleNavOnClick = (id, target) => {
    console.log(id);
    const newNavData = navData.map((nav) => {
      nav.active = false;
      return {
        ...nav, // Spread the existing properties of nav
        active: nav._id === id, // Set active to true if nav._id matches id, otherwise false
      };
    });
    setNavData(newNavData);
    handleSectionActive(target);
  };

  const handleAddToLibrary = (game) => {
    setLibrary([...library, game]);
    toast.dismiss();
    toast.success(`${game.title} added to My Library`);
  };

  const handleRemoveFromLibrary = (game) => {
    setLibrary(library.filter((item) => item._id !== game._id));
    toast.dismiss();
    toast.info(`${game.title} removed from My Library`);
  };

  const handleAddToBag = (game) => {
    if (bag.some((item) => item._id === game._id)) {
      toast.dismiss();
      toast.warning(`${game.title} is already in the cart`);
      return;
    }
    setBag([...bag, game]);
    toast.dismiss();
    toast.success(`${game.title} added to the Cart`);
  };

  const handleDeleteFromBag = (game) => {
    setBag((prevBag) => {
      const updatedBag = prevBag.filter((item) => item._id !== game._id);
      toast.dismiss();
      toast.success(`${game.title} removed from Cart`);
      return updatedBag;
    });
  };

  return (
    <AppContext.Provider
      value={{
        navData,
        social,
        handleToggleActive,
        active,
        games,
        handleNavOnClick,
        homeRef,
        categoriesRef,
        libraryRef,
        bagRef,
        handleSectionActive,
        categories,
        library,
        handleAddToLibrary,
        handleRemoveFromLibrary,
        bag,
        handleAddToBag,
        handleDeleteFromBag,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppProvider;
