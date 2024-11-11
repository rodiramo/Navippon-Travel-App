import { useState, useEffect } from "react";
import Slider from "react-slick";
import { useNavigate } from "react-router-dom";
import * as MdIcons from "react-icons/md";
import * as PiIcons from "react-icons/pi";
import * as TbIcons from "react-icons/tb";
import * as FaIcons from "react-icons/fa6";
import * as GiIcons from "react-icons/gi";
import * as LiaIcons from "react-icons/lia";
import * as BsIcons from "react-icons/bs";
import * as VscIcons from "react-icons/vsc";
import * as LuIcons from "react-icons/lu";
import { fetchCategoryDetails } from "@services/services";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const CategoryCarousel = () => {
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const loadCategories = async () => {
      try {
        const data = await fetchCategoryDetails();
        setCategories(data);
      } catch (error) {
        setError(error.message);
      }
    };
    loadCategories();
  }, []);

  const handleCategoryClick = (categoryName) => {
    navigate(`/experiences/filtered-category/${categoryName}`);
  };

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 10,
    slidesToScroll: 10,
    autoplay: true,
    autoplaySpeed: 2500,
    pauseOnHover: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 5,
          slidesToScroll: 5,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
        },
      },
    ],
  };

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="category-carousel my-12 p-6">
      <h2 className="text-left mb-4 text-2xl">Navega por categoría</h2>
      <Slider {...settings}>
        {categories.map((category, index) => {
          const IconComponent = iconMapping[category.icon];
          return (
            <div
              key={index}
              className="p-4 cursor-pointer"
              onClick={() => handleCategoryClick(category.category)}
            >
              <div className="flex flex-col items-center text-center">
                <div
                  className="icon-container mb-4 bg-white shadow-lg rounded-full flex justify-center items-center"
                  style={{ width: "80px", height: "80px" }}
                >
                  {IconComponent ? (
                    <IconComponent color="#fa5564" size="2em" />
                  ) : (
                    <span>No Icon</span>
                  )}
                </div>
                <span className="text-[#8F9BB3]">
                  {category.category}
                  {` (${category.count})`}
                </span>
              </div>
            </div>
          );
        })}
      </Slider>
    </div>
  );
};

// Icon mapping for dynamic icon rendering
const iconMapping = {
  MdOutlineForest: MdIcons.MdOutlineForest,
  MdOutlineBeachAccess: MdIcons.MdOutlineBeachAccess,
  TbBuildingMonument: TbIcons.TbBuildingMonument,
  MdOutlineRamenDining: MdIcons.MdOutlineRamenDining,
  LiaCocktailSolid: LiaIcons.LiaCocktailSolid,
  GiGreekTemple: GiIcons.GiGreekTemple,
  MdOutlineCoffee: MdIcons.MdOutlineCoffee,
  MdOutlineShoppingBag: MdIcons.MdOutlineShoppingBag,
  FaRegStar: FaIcons.FaRegStar,
  GiPartyPopper: GiIcons.GiPartyPopper,
  BsRobot: BsIcons.BsRobot,
  LiaGamepadSolid: LiaIcons.LiaGamepadSolid,
  VscOctoface: VscIcons.VscOctoface,
  LuFerrisWheel: LuIcons.LuFerrisWheel,
  GiSamuraiHelmet: GiIcons.GiSamuraiHelmet,
  MdOutlineTempleBuddhist: MdIcons.MdOutlineTempleBuddhist,
  PiBirdBold: PiIcons.PiBirdBold,
  MdOutlineCastle: MdIcons.MdOutlineCastle,
  PiCross: PiIcons.PiCross,
  TbTorii: TbIcons.TbTorii,
  MdOutlineTempleHindu: MdIcons.MdOutlineTempleHindu,
  PiHandEyeLight: PiIcons.PiHandEyeLight,
  FaRegMoon: FaIcons.FaRegMoon,
  PiStarOfDavid: PiIcons.PiStarOfDavid,
  GiYinYang: GiIcons.GiYinYang,
  GiAncientRuins: GiIcons.GiAncientRuins,
  MdOutlineHotTub: MdIcons.MdOutlineHotTub,
  GiGrapes: GiIcons.GiGrapes,
  PiPawPrint: PiIcons.PiPawPrint,
  PiEyeBold: PiIcons.PiEyeBold,
  MdOutlineSurfing: MdIcons.MdOutlineSurfing,
  MdKayaking: MdIcons.MdKayaking,
  FaPersonSkiing: FaIcons.FaPersonSkiing,
  GiProtectionGlasses: GiIcons.GiProtectionGlasses,
  MdHiking: MdIcons.MdHiking,
};

export default CategoryCarousel;
