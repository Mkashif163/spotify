import React from "react";
import Slider from "react-slick";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Countries = (props) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: calculateSlidesToShow(),
    slidesToScroll: 1,
    arrows: false,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 4,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 2,
        },
      },
    ],
  };

  function calculateSlidesToShow() {
    // Adjust the number of slides based on screen width
    const screenWidth = window.innerWidth;
    if (screenWidth >= 1024) {
      return 5;
    } else if (screenWidth >= 768) {
      return 4;
    } else if (screenWidth >= 480) {
      return 3;
    } else {
      return 2;
    }
  }

  return (
    <>
      <div className="container mx-auto mt-8">
        <h1 className="text-2xl font-bold mb-4">
          Featured Playlists {props.country}
        </h1>
      </div>
      <div className="container mx-auto mt-8">
        <Slider {...settings}>
          {props.playlist &&
            props.playlist.map((pl) => (
              <div key={pl.id} className="lg:w-1/5 md:w-1/4 p-4">
                <div className="flex relative">
                  <div className="slidr-slide p-4">
                    <div className="rounded-lg">
                      <a href={`${pl?.external_urls.spotify}`}>
                        <img
                          alt={`${pl?.name}`}
                          className="h-full w-full"
                          src={`${pl?.images[0]?.url}`}
                        />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            ))}
        </Slider>
      </div>
    </>
  );
};

export default Countries;
