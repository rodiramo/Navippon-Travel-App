
import PropTypes from "prop-types";
import {
  ShareOutlined,
} from "@mui/icons-material";
import {
  IconButton,
  Typography,
} from "@mui/material";
import FlexBetween from "../../components/FlexBetween.jsx";
import WidgetWrapper from "../../components/Wrapper.jsx";

const ActivityWidget = ({
    activityId,
   name,
  description,
  coverPath,
  categories,
}) => {


  return (
    <WidgetWrapper m="2rem 0">
      <img
        src={`http://localhost:3333/assets/${coverPath}`}
        alt={name}
        style={{ width: "100%", height: "auto", borderRadius: "0.75rem", marginTop: "0.75rem" }}
      />
      <Typography variant="h4" color="primary" mt="1rem">
      {activityId}{name}
      </Typography>
      <Typography color="text.secondary" mt="0.5rem">
        {description}
      </Typography>
      <Typography color="text.secondary" mt="0.5rem">
        Categories: {categories.map((category) => category.name).join(", ")}
      </Typography>
      <FlexBetween mt="0.5rem">
    
        <FlexBetween gap="1rem">
          <IconButton>
            <ShareOutlined />
          </IconButton>
        </FlexBetween>
      </FlexBetween>
    </WidgetWrapper>
  );
};

ActivityWidget.propTypes = {
activityId: PropTypes.string,
  name: PropTypes.string,
  description: PropTypes.string,
  coverPath: PropTypes.string,
  saves: PropTypes.bool,
  categories: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string,
      name: PropTypes.string,
    })
  ),
};

export default ActivityWidget;
