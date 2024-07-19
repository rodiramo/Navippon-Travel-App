import PropTypes from "prop-types";
import {
  ShareOutlined,
  EditOutlined,
  ThumbUpOutlined,
  DeleteOutlined
} from "@mui/icons-material";
import {
  IconButton,
  Typography,
} from "@mui/material";
import FlexBetween from "../../components/FlexBetween.jsx";
import WidgetWrapper from "../../components/Wrapper.jsx";

const ActivityWidget = ({
  activityId,
  activityName,
  description,
  coverPath,
  categories,
  onEdit,
  onDelete,
}) => {

  const handleEdit = () => {
    if (onEdit) onEdit(activityId);
  };

  const handleDelete = () => {
    if (onDelete) onDelete(activityId);
  };

  return (
    <WidgetWrapper m="2rem 0">
      <img
        src={`http://localhost:3333/assets/${coverPath}`}
        alt={activityName}
        style={{ width: "100%", height: "auto", borderRadius: "0.75rem", marginTop: "0.75rem" }}
      />
      <Typography variant="h4" color="primary" mt="1rem">
        {activityName}
      </Typography>
      <Typography color="text.secondary" mt="0.5rem">
        {description}
      </Typography>
      <Typography color="text.secondary" mt="0.5rem">
        Categories: {categories.map((category) => category.activityName).join(", ")}
      </Typography>
      <FlexBetween mt="0.5rem">
        <FlexBetween gap="1rem">
        <IconButton>
          <ThumbUpOutlined />
          </IconButton>
          <IconButton onClick={handleEdit}>
            <EditOutlined />
          </IconButton>
          <IconButton onClick={handleDelete}>
            <DeleteOutlined />
          </IconButton>
          <IconButton>
            <ShareOutlined />
          </IconButton>
        </FlexBetween>
      </FlexBetween>
    </WidgetWrapper>
  );
};

ActivityWidget.propTypes = {
  activityId: PropTypes.string.isRequired,
  activityName: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  coverPath: PropTypes.string.isRequired,
  categories: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string,
      activityName: PropTypes.string,
    })
  ).isRequired,
  onEdit: PropTypes.func,
  onDelete: PropTypes.func,
};

export default ActivityWidget;
