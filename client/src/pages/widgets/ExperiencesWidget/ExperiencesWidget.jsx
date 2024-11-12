import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Box, Typography, Pagination, Skeleton } from "@mui/material";
import ExperienceWidget from "./ExperienceWidget.jsx";

const ExperiencesWidget = ({ experience, experiences }) => {
  const [loading, setLoading] = useState(true); // Set loading to true initially
  const [currentPage, setCurrentPage] = useState(1);
  const experiencesPerPage = 8;

  // Filter by name (case-insensitive)
  const filteredByName = experiences.filter((exp) =>
    exp.name.toLowerCase().includes(experience.toLowerCase())
  );

  // Filter by type
  const filteredByType = experiences.filter((exp) => exp.type === experience);

  // Combine both filters - if both are applied, they will intersect
  const filteredExperiences = filteredByName.filter((exp) =>
    filteredByType.some((filteredExp) => filteredExp._id === exp._id)
  );

  console.log("Filtered experiences by name and type:", filteredExperiences);

  // Calculate total pages
  const totalPages = Math.ceil(filteredExperiences.length / experiencesPerPage);

  // Handle pagination
  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  const indexOfLastExperience = currentPage * experiencesPerPage;
  const indexOfFirstExperience = indexOfLastExperience - experiencesPerPage;
  const currentExperiences = filteredExperiences.slice(
    indexOfFirstExperience,
    indexOfLastExperience
  );

  useEffect(() => {
    if (experiences.length > 0) {
      setLoading(false);
    }
  }, [experiences]);

  if (loading) {
    return (
      <Box
        sx={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
        }}
      >
        <Skeleton variant="text" width={300} height={40} />
        <Skeleton
          variant="rectangular"
          width={350}
          height={200}
          sx={{ marginTop: 2, borderRadius: "8px" }}
        />
      </Box>
    );
  }

  return (
    <Box
      sx={{
        flex: 1,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      {filteredExperiences.length === 0 ? (
        <Typography variant="h6" color="text.secondary">
          No experiences available
        </Typography>
      ) : (
        <Box>
          {currentExperiences.map((experience) => (
            <ExperienceWidget
              key={experience._id}
              experienceId={experience._id}
              name={experience.name}
              description={experience.description}
              image={experience.image}
              categories={experience.categories}
              prefecture={experience.prefecture}
              price={experience.price}
              type={experience.type}
              onSave={() => {}}
              onDelete={() => {}}
            />
          ))}
        </Box>
      )}

      {totalPages > 1 && (
        <Box sx={{ marginTop: 4, marginBottom: 4 }}>
          <Pagination
            count={totalPages}
            page={currentPage}
            onChange={handlePageChange}
            sx={{ display: "flex", justifyContent: "center" }}
          />
        </Box>
      )}
    </Box>
  );
};

// Prop validation
ExperiencesWidget.propTypes = {
  experience: PropTypes.string.isRequired, // Experience type (e.g., "Atractivo", "Hotel", "Restaurante")
  experiences: PropTypes.array.isRequired, // Array of experiences to be filtered
};

export default ExperiencesWidget;
