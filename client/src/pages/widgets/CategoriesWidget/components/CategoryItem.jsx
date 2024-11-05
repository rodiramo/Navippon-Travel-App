import { IconButton, Typography } from "@mui/material";
import PropTypes from "prop-types";
// Import all the necessary icons
import {
  MdOutlineForest,
  MdOutlineBeachAccess,
  MdOutlineTempleBuddhist,
  MdOutlineCastle,
  MdOutlineTempleHindu,
  MdOutlineHotTub,
  MdOutlineSurfing,
  MdKayaking,
  MdHiking,
  MdOutlineRamenDining,
  MdOutlineCoffee,
  MdOutlineShoppingBag,
} from "react-icons/md";
import {
  PiBirdBold,
  PiCross,
  PiStarOfDavid,
  PiPawPrint,
  PiEyeBold,
  PiHandEyeLight,
} from "react-icons/pi";
import { TbTorii, TbBuildingMonument } from "react-icons/tb";
import { FaRegMoon, FaPersonSkiing, FaRegStar } from "react-icons/fa6";
import {
  GiGreekTemple,
  GiAncientRuins,
  GiYinYang,
  GiGrapes,
  GiProtectionGlasses,
  GiPartyPopper,
  GiSamuraiHelmet,
} from "react-icons/gi";
import { LiaCocktailSolid, LiaGamepadSolid } from "react-icons/lia";
import { BsRobot } from "react-icons/bs";
import { VscOctoface } from "react-icons/vsc";
import { LuFerrisWheel } from "react-icons/lu";

// Create a mapping of string names to React icon components
const iconMapping = {
  MdOutlineForest,
  MdOutlineBeachAccess,
  MdOutlineTempleBuddhist,
  MdOutlineCastle,
  MdOutlineTempleHindu,
  MdOutlineHotTub,
  MdOutlineSurfing,
  MdKayaking,
  MdHiking,
  MdOutlineRamenDining,
  MdOutlineCoffee,
  MdOutlineShoppingBag,
  PiBirdBold,
  PiCross,
  PiStarOfDavid,
  PiPawPrint,
  PiEyeBold,
  PiHandEyeLight,
  TbTorii,
  TbBuildingMonument,
  FaRegMoon,
  FaPersonSkiing,
  FaRegStar,
  GiGreekTemple,
  GiAncientRuins,
  GiYinYang,
  GiGrapes,
  GiProtectionGlasses,
  GiPartyPopper,
  GiSamuraiHelmet,
  LiaCocktailSolid,
  LiaGamepadSolid,
  BsRobot,
  VscOctoface,
  LuFerrisWheel,
};

const CategoryItem = ({
  category: { _id, icon, category: categoryName, count },
  handleCategoryClick,
}) => {
  // Get the icon component from the mapping
  const IconComponent = iconMapping[icon];

  return (
    <div key={_id} className="p-4">
      <div className="flex flex-col items-center text-center">
        <IconButton
          onClick={() => handleCategoryClick(categoryName)}
          className="icon-container mb-4 bg-white shadow-lg rounded-full flex justify-center items-center"
          sx={{ width: "80px", height: "80px" }}
        >
          {IconComponent ? (
            <IconComponent
              color="#fa5564" // Customize color as needed
              size="2em" // Customize size as needed
            />
          ) : (
            <Typography variant="caption">No Icon</Typography>
          )}
        </IconButton>
        <Typography variant="body2" className="text-[#8F9BB3]">
          {categoryName} ({count || 0})
        </Typography>
      </div>
    </div>
  );
};

CategoryItem.propTypes = {
  category: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired, // Expecting the name of the category
    icon: PropTypes.string.isRequired, // Expecting the icon name as a string
    count: PropTypes.number,
  }).isRequired,
  handleCategoryClick: PropTypes.func.isRequired,
};

export default CategoryItem;
