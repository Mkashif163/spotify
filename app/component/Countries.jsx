import React, { useState, useEffect } from 'react';
import Slider from 'react-slick';
import { BeatLoader } from 'react-spinners'; 
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const Countries = (props) => {
  const [loading, setLoading] = useState(true);
  const [slidesToShow, setSlidesToShow] = useState(calculateSlidesToShow());

  const countryNames = {
    US: "United States",
    GB: "United Kingdom",
    DZ: "Algeria",
    AR: "Argentina",
    AU: "Australia",
    BH: "Bahrain",
    BR: "Brazil",
    CA: "Canada",
    CL: "Chile",
    CO: "Colombia",
    CZ: "Czech Republic",
    DK: "Denmark",
    DO: "Dominican Republic",
    FI: "Finland",
    FR: "France",
    DE: "Germany",
    GR: "Greece",
    HK: "Hong Kong",
    IS: "Iceland",
    IN: "India",
    ID: "Indonesia",
    IE: "Ireland",
    IL: "Israel",
    IT: "Italy",
    JP: "Japan",
    JO: "Jordan",
    KW: "Kuwait",
    LB: "Lebanon",
    MY: "Malaysia",
    MX: "Mexico",
    MA: "Morocco",
    NL: "Netherlands",
    NZ: "New Zealand",
    NO: "Norway",
    OM: "Oman",
    PS: "Palestine",
    PH: "Philippines",
    PL: "Poland",
    PT: "Portugal",
    QA: "Qatar",
    RO: "Romania",
    SA: "Saudi Arabia",
    SG: "Singapore",
    ZA: "South Africa",
    KR: "South Korea",
    ES: "Spain",
    SE: "Sweden",
    CH: "Switzerland",
    TW: "Taiwan",
    TH: "Thailand",
    TN: "Tunisia",
    TR: "Turkey",
    AE: "United Arab Emirates",
    VN: "Vietnam",
  };

  useEffect(() => {
    // Simulate loading delay (you can replace this with actual loading logic)
    const delay = setTimeout(() => {
      setLoading(false);
    }, 1000);

    return () => clearTimeout(delay);
  }, []);

  useEffect(() => {
    setSlidesToShow(calculateSlidesToShow());
  }, [props.playlist]);

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: slidesToShow,
    slidesToScroll: calculateSlidesToScroll(slidesToShow),
    arrows: false,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 5,
          slidesToScroll: calculateSlidesToScroll(5),
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 3,
          slidesToScroll: calculateSlidesToScroll(3),
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 2,
          slidesToScroll: calculateSlidesToScroll(2),
        },
      },
    ],
  };

  function calculateSlidesToScroll(slidesToShow) {
    return Math.min(slidesToShow, calculateSlidesToShow());
  }

  
  function calculateSlidesToShow() {
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
    <div className="container mx-auto mt-8">
      <h1 className="text-2xl font-bold mb-4">
        Featured Playlists {countryNames[props.country]}
      </h1>

      {loading ? (
        <div className="flex justify-center items-center h-32">
          <BeatLoader color="#4CAF50" loading={loading} />
        </div>
      ) : props.playlist && props.playlist.length > 0 ? (
        <div className="container mx-auto mt-8">
          <Slider {...settings}>
            {props.playlist.map((pl) => (
              <div key={pl?.id} className="lg:w-1/5 md:w-1/4 p-4">
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
      ) : (
        <p>No playlists available for {countryNames[props.country]}.</p>
      )}
    </div>
  );
};

export default Countries;
