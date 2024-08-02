import { Alert } from "@mui/material";
import PropTypes from "prop-types";

const SuccessMessage = ({ message }) => (
  <Alert severity="success" sx={{ width: "100%" }}>
    {message}
  </Alert>
);

SuccessMessage.propTypes = {
  message: PropTypes.string,
};

export default SuccessMessage;
