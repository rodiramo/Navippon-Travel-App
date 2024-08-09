import PropTypes from "prop-types";
import { Box, Card, CardContent, CardHeader, Typography } from "@mui/material";
import { format } from "date-fns";

const formatDate = (dateString) => format(new Date(dateString), "dd.MM.yyyy");

const DaysList = ({ days }) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexWrap: "wrap",
        gap: 2,
        width: "100%",
      }}
    >
      {days.map((day, index) => (
        <Card key={day} sx={{ width: "100%", maxWidth: 300, mb: 2 }}>
          <CardHeader
            title={`Day ${index + 1}`}
            subheader={formatDate(day)}
            sx={{ textAlign: "center" }}
          />
          <CardContent>
            <Typography variant="body2">
              Activities for Day {index + 1} will be added here.
            </Typography>
          </CardContent>
        </Card>
      ))}
    </Box>
  );
};

DaysList.propTypes = {
  days: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default DaysList;
