import { Box, Button } from "@mui/material";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const role = useSelector((state) => state.user.role);
  const navigate = useNavigate();

  const handleCreateActivity = () => {
    navigate("/create-activity");
  };
  return (
    <Box className="header" sx={{ textAlign: "center", mb: 4, paddingTop: 20 }}>
      <h1>Explora todas nuestras Actividades, Hoteles y Restaurantes</h1>
      <p>
        Puedes filtrar para encontrar lo que necesitas, fácil, rápido e ideal
        para hacer tu experiencia como viajero mucho más relajadora.
      </p>
      {role === "admin" && (
        <Button
          variant="contained"
          color="primary"
          className="button-create"
          onClick={handleCreateActivity}
          sx={{ marginBottom: "20px" }}
        >
          Crear Actividad
        </Button>
      )}
    </Box>
  );
};

export default Header;
