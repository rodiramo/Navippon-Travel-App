import { useEffect, useState } from "react";
import { Typography, Box, ListItem, ListItemText } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Slider from "react-slick";
import config from "@config/config.js";
import { fetchPrefectures } from "@services/services";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const PrefecturesWidget = () => {
  const [prefectures, setPrefectures] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const getPrefectures = async () => {
      try {
        const data = await fetchPrefectures();
        setPrefectures(data);
      } catch (error) {
        setError(error.message);
      }
    };

    getPrefectures();
  }, []);

  const handleClick = (prefectureId) => {
    navigate(`/experiences/filtered-prefecture/${prefectureId}`);
  };

  if (error) return <Typography color="error">Error: {error}</Typography>;

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 5,
    autoplay: true,
    autoplaySpeed: 3000,
    pauseOnHover: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 4,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
    ],
  };

  return (
    <Box className="mb-20">
      <Slider {...settings}>
        {prefectures.map((prefecture) => (
          <ListItem
            key={prefecture._id}
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              margin: 1,
              textAlign: "center",
              cursor: "pointer",
              padding: 2,
            }}
            onClick={() => handleClick(prefecture._id)}
          >
            <Box
              component="img"
              src={`${config.API_URL}/assets/${prefecture.image}`}
              alt={prefecture.name}
              sx={{
                width: 120,
                height: 120,
                borderRadius: "50%",
                marginBottom: 1,
                transition: "opacity 0.3s ease",
                opacity: 1,
                "&:hover": {
                  opacity: 0.8,
                },
                display: "block",
                marginLeft: "auto",
                marginRight: "auto",
              }}
            />
            <ListItemText
              primary={prefecture.name}
              secondary={`Experiencias: ${prefecture.experienceCount}`}
              sx={{
                textAlign: "center",
                marginTop: 1,
                display: "block",
                marginLeft: "auto",
                marginRight: "auto",
              }}
            />
          </ListItem>
        ))}
      </Slider>
    </Box>
  );
};

export default PrefecturesWidget;
