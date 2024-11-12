// IconMapping.js
import * as MdIcons from "react-icons/md";
import * as PiIcons from "react-icons/pi";
import * as TbIcons from "react-icons/tb";
import * as FaIcons from "react-icons/fa6";
import * as GiIcons from "react-icons/gi";
import * as LiaIcons from "react-icons/lia";
import * as BsIcons from "react-icons/bs";
import * as BiIcons from "react-icons/bi";
import * as VscIcons from "react-icons/vsc";
import * as LuIcons from "react-icons/lu";
import PropTypes from "prop-types";

const IconMapping = ({ iconName }) => {
  const icons = {
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
    LuShoppingBasket: LuIcons.LuShoppingBasket,
    GiSamuraiHelmet: GiIcons.GiSamuraiHelmet,
    MdOutlineTempleBuddhist: MdIcons.MdOutlineTempleBuddhist,
    PiBirdBold: PiIcons.PiBirdBold,
    PiBowlFoodBold: PiIcons.PiBowlFoodBold,
    MdOutlineCastle: MdIcons.MdOutlineCastle,
    PiCross: PiIcons.PiCross,
    TbTorii: TbIcons.TbTorii,
    TbBuildingBank: TbIcons.TbBuildingBank,
    MdOutlineTempleHindu: MdIcons.MdOutlineTempleHindu,
    PiHandEyeLight: PiIcons.PiHandEyeLight,
    FaRegMoon: FaIcons.FaRegMoon,
    MdOutlineSportsVolleyball: MdIcons.MdOutlineSportsVolleyball,
    BiCameraMovie: BiIcons.BiCameraMovie,
    PiStarOfDavid: PiIcons.PiStarOfDavid,
    GiYinYang: GiIcons.GiYinYang,
    GiAncientRuins: GiIcons.GiAncientRuins,
    MdOutlineHotTub: MdIcons.MdOutlineHotTub,
    GiGrapes: GiIcons.GiGrapes,
    PiPawPrint: PiIcons.PiPawPrint,
    PiEyeBold: PiIcons.PiEyeBold,
    MdOutlineSurfing: MdIcons.MdOutlineSurfing,
    MdOutlineSpa: MdIcons.MdOutlineSpa,
    MdOutlineSchool: MdIcons.MdOutlineSchool,
    MdOutlineEvent: MdIcons.MdOutlineEvent,
    MdOutlineLocalBar: MdIcons.MdOutlineLocalBar,
    MdKayaking: MdIcons.MdKayaking,
    FaPersonSkiing: FaIcons.FaPersonSkiing,
    GiProtectionGlasses: GiIcons.GiProtectionGlasses,
    MdHiking: MdIcons.MdHiking,
  };

  const IconComponent = icons[iconName];

  return IconComponent ? (
    <IconComponent color="#fa5564" size="2em" />
  ) : (
    <span>No Icon</span>
  );
};

IconMapping.propTypes = {
  iconName: PropTypes.string.isRequired,
};

export default IconMapping;
