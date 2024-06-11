import { AppContext } from "../context";
import { useContext, useEffect, useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/effect-coverflow";
import "swiper/css/autoplay";

import "./GameSwiper.css";

import { EffectCoverflow, Navigation, Autoplay } from "swiper/modules";

const GameSwiper = () => {
  const { games, handleAddToBag } = useContext(AppContext);
  const [active, setActive] = useState(false);
  const swiperRef = useRef(null);
  const playersRef = useRef({});

  useEffect(() => {
    // Load YouTube IFrame API
    const tag = document.createElement("script");
    tag.src = "https://www.youtube.com/iframe_api";
    const firstScriptTag = document.getElementsByTagName("script")[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

    window.onYouTubeIframeAPIReady = () => {
      games.forEach((game, index) => {
        const player = new YT.Player(`iframe-${index}`, {
          events: {
            onReady: (event) => {
              playersRef.current[game._id] = event.target;
            },
          },
        });
      });
    };
  }, [games]);

  const handleToggleVideo = (gameId) => {
    setActive(!active);
    if (swiperRef.current) {
      if (active) {
        swiperRef.current.swiper.autoplay.start();
      } else {
        swiperRef.current.swiper.autoplay.stop();
      }
    }
    if (playersRef.current[gameId]) {
      const player = playersRef.current[gameId];
      if (active) {
        player.pauseVideo();
      } else {
        player.playVideo();
      }
    }
  };

  return (
    <Swiper
      effect={"coverflow"}
      grabCursor={true}
      navigation={true}
      loop={true}
      centeredSlides={true}
      slidesPerView={"auto"}
      coverflowEffect={{
        rotate: 35,
        stretch: 200,
        depth: 250,
        modifier: 1,
        slideShadows: true,
      }}
      autoplay={{
        delay: 3000,
        disableOnInteraction: false,
      }}
      modules={[EffectCoverflow, Navigation, Autoplay]}
      className="gameSwiper"
      ref={swiperRef}
    >
      {games.map((game, index) => (
        <SwiperSlide key={game._id}>
          <div className="gameSlider">
            <img src={game.img} alt="Game Image" />
            <div className={`video ${active ? "active" : ""}`}>
              <iframe
                id={`iframe-${index}`}
                width="1280"
                height="720"
                src={`${game.trailer}?enablejsapi=1`}
                title={game.title}
                frameBorder="0"
                allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
            <div className="content">
              <h2>{game.title}</h2>
              <p>{game.headline}</p>
              <div className="buttons">
                <a
                  href="#"
                  className="orderBtn"
                  onClick={() => handleAddToBag(game)}
                >
                  Order Now
                </a>
                <a
                  href="#"
                  className={`playBtn ${active ? "active" : ""}`}
                  onClick={() => handleToggleVideo(game._id)}
                >
                  <span className="pause">
                    <i className="bi bi-pause-fill"></i>
                  </span>
                  <span className="play">
                    <i className="bi bi-play-fill"></i>
                  </span>
                </a>
              </div>
            </div>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default GameSwiper;
