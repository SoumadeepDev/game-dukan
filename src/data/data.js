const navListData = [
  {
    _id: 1,
    target: "home",
    name: `Home`,
    icon: "bi-house-door",
    active: true,
  },
  {
    _id: 2,
    target: "categories",
    name: `Categories`,
    icon: " bi-window-stack",
    active: false,
  },
  {
    _id: 3,
    target: "library",
    name: `My Library`,
    icon: "bi-heart",
    active: false,
  },
  {
    _id: 4,
    target: "myBag",
    name: `My Bag`,
    icon: "bi-bag",
    active: false,
  },
];

const socialData = [
  {
    _id: 1,
    icon: "bi-meta",
    target: "https://www.facebook.com/",
  },
  {
    _id: 2,
    icon: "bi-twitter-x",
    target: "https://x.com/",
  },
  {
    _id: 3,
    icon: "bi-youtube",
    target: "https://www.youtube.com/",
  },
  {
    _id: 4,
    icon: "bi-share",
    target: "",
  },
];

export { navListData, socialData };
