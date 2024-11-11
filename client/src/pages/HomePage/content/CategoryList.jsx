import { useState, useEffect } from "react";
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

const CategoryList = () => {
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState(null);
  const [showAll, setShowAll] = useState(false); // State to toggle between showing all categories or just the initial ones
  const [visibleCategories, setVisibleCategories] = useState(5); // Initially show 5 categories
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

  const handleLoadMore = () => {
    if (showAll) {
      setShowAll(false);
      setVisibleCategories(10);
    } else {
      setShowAll(true);
      setVisibleCategories(categories.length);
    }
  };

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="category-list my-12 p-6">
      <h2 className="text-left mb-4 text-2xl">Navega por categoría</h2>

      {/* Categories Container with Animated Transition */}
      <div
        className="category-container"
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          alignItems: "center",
          gap: "15px",
          maxHeight: showAll ? "1000px" : "300px",
          overflow: "hidden",
          opacity: showAll ? 1 : 0.7,
          transition: "all 0.5s ease-in-out",
        }}
      >
        {categories.slice(0, visibleCategories).map((category, index) => {
          const IconComponent = iconMapping[category.icon];
          return (
            <div
              key={index}
              className="category-item p-4 cursor-pointer"
              onClick={() => handleCategoryClick(category.category)}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                textAlign: "center",
              }}
            >
              <div
                className="icon-container mb-4 shadow-lg rounded-full flex justify-center items-center"
                style={{
                  width: "80px",
                  height: "80px",
                  justifyContent: "center",
                  alignItems: "center",
                }}
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
          );
        })}
      </div>

      {/* Load More Button */}
      <div className="load-more-container flex justify-center mt-6">
        <button
          onClick={handleLoadMore}
          style={{ color: "#fa5564" }}
          className="load-more-btn flex items-center px-4 py-2 rounded-lg"
        >
          {showAll ? (
            <>
              <span>Ver Menos Categorías</span>
              <FaIcons.FaArrowUp className="ml-2" />
            </>
          ) : (
            <>
              <span>Cargar Más Categorías</span>
              <FaIcons.FaArrowDown className="ml-2" />
            </>
          )}
        </button>
      </div>
    </div>
  );
};

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

export default CategoryList;
