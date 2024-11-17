import { useState, useEffect } from "react";
import {
  Box,
  CircularProgress,
  Table,
  TableBody,
  Modal,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  IconButton,
  Button,
} from "@mui/material";
import { Edit as EditIcon, Delete as DeleteIcon } from "@mui/icons-material";
import { fetchExperiences } from "@services/services.js";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import config from "@config/config.js";

const ExperiencesList = () => {
  const token = useSelector((state) => state.token);
  const [experiences, setExperiences] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedExperience, setSelectedExperience] = useState(null);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const getExperiences = async () => {
      try {
        const data = await fetchExperiences(token);
        setExperiences(data);
      } catch (err) {
        setError("Failed to fetch experiences");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    getExperiences();
  }, [token]);

  const handleDelete = async () => {
    try {
      const response = await fetch(
        `${config.API_URL}/experiences/${selectedExperience._id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (!response.ok) {
        throw new Error("Failed to delete experience");
      }

      setExperiences(
        experiences.filter((exp) => exp._id !== selectedExperience._id)
      );
      setOpenDeleteModal(false);
    } catch (err) {
      setError("Failed to delete experience");
      console.error(err);
    }
  };

  const openDeleteConfirmationModal = (experience) => {
    setSelectedExperience(experience);
    setOpenDeleteModal(true);
  };

  const closeDeleteConfirmationModal = () => {
    setOpenDeleteModal(false);
    setSelectedExperience(null);
  };

  const handleCreateExperience = () => {
    navigate("/create-experience");
  };

  const handleEditExperience = (id) => {
    navigate(`/edit-experience/${id}`);
  };

  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "85vh",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Typography color="error" variant="h6">
        {error}
      </Typography>
    );
  }

  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography variant="h4" gutterBottom>
          Experiences List
        </Typography>
        <Button
          variant="contained"
          color="primary"
          onClick={handleCreateExperience}
        >
          Create New Experience
        </Button>
      </Box>

      <TableContainer component={Paper}>
        <Table aria-label="experiences table">
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Nombre</TableCell>
              <TableCell>Descripción</TableCell>
              <TableCell>Fecha de Creación</TableCell>
              <TableCell>Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {experiences.map((experience) => (
              <TableRow key={experience._id}>
                <TableCell>{experience._id}</TableCell>
                <TableCell>{experience.name}</TableCell>
                <TableCell>{experience.description}</TableCell>
                <TableCell>
                  {new Date(experience.createdAt).toLocaleDateString()}
                </TableCell>
                <TableCell>
                  {/* Edit Button */}
                  <IconButton
                    color="primary"
                    onClick={() => handleEditExperience(experience._id)}
                  >
                    <EditIcon />
                  </IconButton>

                  {/* Delete Button */}
                  <IconButton
                    color="error"
                    onClick={() => openDeleteConfirmationModal(experience)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Delete Confirmation Modal */}
      <Modal open={openDeleteModal} onClose={closeDeleteConfirmationModal}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            backgroundColor: "white",
            padding: 2,
            borderRadius: 1,
            boxShadow: 24,
            minWidth: 300,
          }}
        >
          <Typography variant="h6">Confirmar Eliminación</Typography>
          <Typography>
            ¿Estás seguro de que quieres eliminar esta experiencia? Esta acción
            no se puede deshacer.
          </Typography>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              marginTop: 2,
            }}
          >
            <Button onClick={closeDeleteConfirmationModal}>Cancelar</Button>
            <Button onClick={handleDelete} color="error">
              Eliminar
            </Button>
          </Box>
        </Box>
      </Modal>
    </Box>
  );
};

export default ExperiencesList;
