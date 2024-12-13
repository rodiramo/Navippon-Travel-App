import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Typography, IconButton, useTheme } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import WarningAmberOutlinedIcon from "@mui/icons-material/WarningAmberOutlined";

const Toast = ({ message, type = "info", onClose, duration = 3000 }) => {
  const [isVisible, setIsVisible] = useState(true);
  const theme = useTheme();

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      onClose();
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  if (!isVisible) return null;

  const colors = {
    success: "#81c784",
    error: theme.palette.primary.main,
    info: "#64b5f6",
    warning: "#ffb74d",
  };

  const icons = {
    success: (
      <CheckCircleOutlineIcon
        style={{ marginRight: "8px", color: theme.palette.primary.white }}
      />
    ),
    error: (
      <ErrorOutlineIcon
        style={{ marginRight: "8px", color: theme.palette.primary.white }}
      />
    ),
    info: (
      <InfoOutlinedIcon
        style={{ marginRight: "8px", color: theme.palette.primary.white }}
      />
    ),
    warning: (
      <WarningAmberOutlinedIcon
        style={{ marginRight: "8px", color: theme.palette.primary.white }}
      />
    ),
  };

  const backgroundColor = colors[type] || colors.info;

  return (
    <div
      style={{
        position: "fixed",
        bottom: "20px",
        right: "20px",
        backgroundColor,
        color: "#fff",
        borderRadius: "8px",
        padding: "16px 24px",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
        display: "flex",
        alignItems: "center",
        zIndex: 9999,
      }}
    >
      {icons[type]}
      <Typography variant="body1" style={{ marginRight: "16px" }}>
        {message}
      </Typography>
      <IconButton size="small" style={{ color: "#fff" }} onClick={onClose}>
        <CloseIcon />
      </IconButton>
    </div>
  );
};

Toast.propTypes = {
  message: PropTypes.string.isRequired,
  type: PropTypes.oneOf(["success", "error", "info", "warning"]),
  onClose: PropTypes.func.isRequired,
  duration: PropTypes.number,
};

export default Toast;
