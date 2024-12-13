import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Box, Typography, Pagination, Skeleton } from "@mui/material";
import ExperienceWidget from "./ExperienceWidget.jsx";

const ExperiencesWidget = ({ experience, experiences, filterBy }) => {
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const experiencesPerPage = 8;

  const filteredExperiences =
    filterBy === "name"
      ? experiences.filter((exp) =>
          exp.name.toLowerCase().includes(experience.toLowerCase())
        )
      : filterBy === "type"
      ? experiences.filter((exp) => exp.type === experience)
      : experiences;

  console.log("Filtered experiences:", filteredExperiences);

  const totalPages = Math.ceil(filteredExperiences.length / experiencesPerPage);

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
        alignItems: "stretch",
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
  experience: PropTypes.string.isRequired,
  experiences: PropTypes.array.isRequired,
  filterBy: PropTypes.oneOf(["name", "type"]).isRequired,
};

export default ExperiencesWidget;
