import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import PropTypes from "prop-types"; // Import PropTypes for validation
import { setExperiences } from "@state/state.js";
import ExperienceWidget from "./ExperienceWidget.jsx";
import { Skeleton, Typography, Box, Pagination } from "@mui/material";
import { fetchExperiences } from "@services/services.js";

const ExperiencesWidget = ({ experience }) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const experiencesPerPage = 8;
  const token = useSelector((state) => state.token);
  const allExperiences = useSelector((state) => state.experiences);

  const filteredExperiences = allExperiences.filter(
    (exp) => exp.type === experience
  );
  const totalPages = Math.ceil(filteredExperiences.length / experiencesPerPage);

  useEffect(() => {
    const loadExperiences = async () => {
      setLoading(true);
      try {
        const data = await fetchExperiences(token);
        dispatch(setExperiences(data));
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    loadExperiences();
  }, [dispatch, token]);

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  const indexOfLastExperience = currentPage * experiencesPerPage;
  const indexOfFirstExperience = indexOfLastExperience - experiencesPerPage;
  const currentExperiences = filteredExperiences.slice(
    indexOfFirstExperience,
    indexOfLastExperience
  );

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

  if (error) {
    return <Typography color="error">Error: {error}</Typography>;
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
  experience: PropTypes.string.isRequired,
};

export default ExperiencesWidget;
