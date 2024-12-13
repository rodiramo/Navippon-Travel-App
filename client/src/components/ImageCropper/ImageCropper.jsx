import React, { useState, useCallback } from "react";
import Cropper from "react-easy-crop";
import { Slider, Button, Box } from "@mui/material";
import getCroppedImg from "../../utils/cropImage.js";

const ImageCropper = ({ imageSrc, onCropComplete, onClose, filename }) => {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);

  const handleCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  const handleSave = async () => {
    try {
      const croppedBlob = await getCroppedImg(imageSrc, croppedAreaPixels);
      const croppedFile = new File([croppedBlob], filename, {
        type: "image/jpeg",
      });
      onCropComplete(croppedFile); // Pass the cropped File
      onClose();
    } catch (error) {
      console.error("Error cropping the image: ", error);
    }
  };

  return (
    <Box>
      <Box sx={{ position: "relative", width: "100%", height: "300px" }}>
        <Cropper
          image={imageSrc}
          crop={crop}
          zoom={zoom}
          aspect={1}
          onCropChange={setCrop}
          onZoomChange={setZoom}
          onCropComplete={handleCropComplete}
        />
      </Box>
      <Box
        sx={{
          mt: 2,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Slider
          value={zoom}
          min={1}
          max={3}
          step={0.1}
          aria-labelledby="Zoom"
          onChange={(e, zoom) => setZoom(zoom)}
          sx={{ width: "70%" }}
        />
        <Button variant="contained" color="primary" onClick={handleSave}>
          Guardar
        </Button>
        <Button variant="outlined" color="secondary" onClick={onClose}>
          Cancelar
        </Button>
      </Box>
    </Box>
  );
};

export default ImageCropper;
