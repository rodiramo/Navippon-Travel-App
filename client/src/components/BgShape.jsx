import { useTheme } from "@mui/material";
import "@css/HomePage/Home.css";

const BgShape = () => {
  const { palette } = useTheme();

  return (
    <div
      className="bg-shape"
      style={{
        background: palette.background.default,
        position: "relative",
        zIndex: 0,
        height: "70px",
        width: "100%",
        marginTop: "-70px",
      }}
    ></div>
  );
};

export default BgShape;
