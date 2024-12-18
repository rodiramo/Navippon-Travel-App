import PropTypes from "prop-types";
import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Typography,
  List,
  ListItem,
  Divider,
} from "@mui/material";
import { format } from "date-fns";
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";
const formatDate = (dateString) => format(new Date(dateString), "dd.MM.yyyy");

const DaysList = ({ days }) => {
  return (
    <Box
      sx={{
        display: "flex",
        overflowX: "auto",
        gap: 2,
        padding: 2,
        scrollBehavior: "smooth",
        width: "100%",
        whiteSpace: "nowrap",
      }}
    >
      {days.map((day, index) => (
        <Box
          key={day._id}
          sx={{
            minWidth: 300,
            flex: "0 0 auto",
          }}
        >
          <Card sx={{ height: "100%" }}>
            <CardHeader
              title={`Day ${index + 1}`}
              subheader={formatDate(day.date)}
              sx={{ textAlign: "center" }}
            />
            <CardContent>
              {" "}
              <AddCircleOutlineOutlinedIcon />
              <Typography variant="body2" color="textSecondary">
                {day.prefecture?.name || "Unknown Prefecture"} -{" "}
                {day.city || "Unknown City"}
              </Typography>
              {day.notes && (
                <Typography variant="body2" sx={{ mt: 1, fontStyle: "italic" }}>
                  Notes: {day.notes}
                </Typography>
              )}
              {day.dailyBudget && (
                <Typography variant="body2" sx={{ mt: 1, fontWeight: "bold" }}>
                  Daily Budget: ${day.dailyBudget.toFixed(2)}
                </Typography>
              )}
              <Divider sx={{ my: 2 }} />
              <Typography variant="h6" sx={{ mb: 1 }}>
                Schedule
              </Typography>
              <List>
                {day.schedule.map((item, idx) => (
                  <ListItem
                    key={idx}
                    sx={{
                      flexDirection: "column",
                      alignItems: "flex-start",
                      mb: 1,
                    }}
                  >
                    <Typography variant="body1">{item.time}</Typography>
                    {item.experience ? (
                      <Typography variant="body2" color="textPrimary">
                        Experience: {item.experience.name} at{" "}
                        {item.experience.location}
                      </Typography>
                    ) : (
                      <Typography variant="body2" color="textSecondary">
                        Custom: {item.custom.name} -{" "}
                        {item.custom.location || "No location"}
                      </Typography>
                    )}
                    {item.custom?.description && (
                      <Typography variant="body2" color="textSecondary">
                        Description: {item.custom.description}
                      </Typography>
                    )}
                    {item.custom?.cost && (
                      <Typography variant="body2" color="textSecondary">
                        Cost: ${item.custom.cost.toFixed(2)}
                      </Typography>
                    )}
                  </ListItem>
                ))}
              </List>
            </CardContent>
          </Card>
        </Box>
      ))}
    </Box>
  );
};

DaysList.propTypes = {
  days: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      date: PropTypes.string.isRequired,
      prefecture: PropTypes.shape({
        name: PropTypes.string,
      }),
      city: PropTypes.string,
      schedule: PropTypes.arrayOf(
        PropTypes.shape({
          time: PropTypes.string.isRequired,
          experience: PropTypes.shape({
            name: PropTypes.string.isRequired,
            location: PropTypes.string.isRequired,
          }),
          custom: PropTypes.shape({
            name: PropTypes.string,
            location: PropTypes.string,
            description: PropTypes.string,
            cost: PropTypes.number,
          }),
        })
      ),
      notes: PropTypes.string,
      dailyBudget: PropTypes.number,
    })
  ).isRequired,
};

export default DaysList;
