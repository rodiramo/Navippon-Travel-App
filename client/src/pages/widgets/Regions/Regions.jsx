import { useEffect, useState } from "react";
import { Typography, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import config from "@config/config.js";
import "@css/Regions.css";
import { fetchRegions } from "@services/services";

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
const Regions = () => {
  const [regions, setRegions] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const getRegions = async () => {
      try {
        const data = await fetchRegions();
        setRegions(data);
      } catch (error) {
        setError(error.message);
      }
    };

    getRegions();
  }, []);

  const handleClick = (regionId) => {
    navigate(`/experiences/filtered-region/${regionId}`);
  };
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 6,
    slidesToScroll: 6,
    autoplay: true,
    autoplaySpeed: 2500,
    pauseOnHover: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  if (error) return <Typography color="error">Error: {error}</Typography>;

  return (
    <Box className="px-4 py-10">
      <div>
        <Slider {...settings}>
          {regions.map((region) => (
            <div
              key={region._id}
              onClick={() => handleClick(region._id)}
              className="card-wrap"
            >
              <div className="card-tipos">
                <img
                  src={`${config.API_URL}/assets/${region.image}`}
                  alt={region.region}
                  className="card__image"
                />

                <div className="card__overlay">
                  <div className="card__header">
                    <div>
                      <h3 className="card__title">{region.region}</h3>
                    </div>
                  </div>

                  <p className="card__description">
                    {region.description || "No description available."}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </Box>
  );
};

export default Regions;
