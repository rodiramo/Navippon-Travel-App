import PropTypes from "prop-types";
import { Box } from "@mui/material";

const UserImage = ({ image, name, size = "60px" }) => {
  return (
    <Box width={size} height={size}>
      <img
        style={{ objectFit: "cover", borderRadius: "50%" }}
        width={size}
        height={size}
        alt={name}
        src={`http://localhost:3333/assets/${image}`}
      />
    </Box>
  );
};

UserImage.propTypes = {
  image: PropTypes.string,
  name: PropTypes.string,
  size: PropTypes.string,
};

export default UserImage;
