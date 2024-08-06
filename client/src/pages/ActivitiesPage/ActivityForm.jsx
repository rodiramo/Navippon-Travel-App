import { useState, useEffect } from "react";
import { useParams, useNavigate, Link as RouterLink } from "react-router-dom";
import { useSelector } from "react-redux";
import PropTypes from "prop-types";
import {
  TextField,
  Button,
  useTheme,
  FormControl,
  CircularProgress,
  Select,
  MenuItem,
  Typography,
  Box,
  IconButton,
  Breadcrumbs,
  Link,
} from "@mui/material";
import * as yup from "yup";
import { Formik, Form, Field, ErrorMessage } from "formik";
import Dropzone from "react-dropzone";
import NavBar from "../../components/NavBar/Navbar.jsx";
import Footer from "../../components/Footer/Footer.jsx";
import "./ActivityForm.css";

const activitySchema = yup.object().shape({
  activityName: yup.string().required("Activity Name is required"),
  description: yup.string().required("Description is required"),
  categories: yup
    .array()
    .of(yup.string())
    .required("At least one category is required"),
  prefecture: yup.string().required("Prefecture is required"),
  budget: yup.string().required("Budget is required"),
  image: yup.mixed(),
});

const ActivityForm = () => {
  const { id: activityId } = useParams();
  const [categories, setCategories] = useState([]);
  const [prefectures, setPrefectures] = useState([]);
  const [budgets, setBudgets] = useState([]);
  const [initialData, setInitialData] = useState(null);
  const token = useSelector((state) => state.token);
  const { palette, spacing } = useTheme();
  const navigate = useNavigate();
  const isEditMode = Boolean(activityId);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [existingImage, setExistingImage] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [categoriesRes, prefecturesRes, budgetsRes] = await Promise.all([
          fetch("http://localhost:3333/categories"),
          fetch("http://localhost:3333/prefectures"),
          fetch("http://localhost:3333/budget"),
        ]);

        if (!categoriesRes.ok || !prefecturesRes.ok || !budgetsRes.ok) {
          throw new Error("Failed to fetch data");
        }

        const [
          categoriesData,
          prefecturesData,
          budgetsData,
        ] = await Promise.all([
          categoriesRes.json(),
          prefecturesRes.json(),
          budgetsRes.json(),
        ]);

        setCategories(categoriesData);
        setPrefectures(prefecturesData);
        setBudgets(budgetsData);

        if (isEditMode) {
          const activityRes = await fetch(
            `http://localhost:3333/activities/${activityId}`,
            {
              headers: { Authorization: `Bearer ${token}` },
            }
          );

          if (!activityRes.ok) {
            throw new Error("Failed to fetch activity data");
          }

          const activityData = await activityRes.json();
          setInitialData({
            activityName: activityData.activityName || "",
            description: activityData.description || "",
            categories: activityData.categories || [],
            prefecture: activityData.prefecture?._id || "",
            budget: activityData.budget?._id || "",
            image: null,
          });
          setSelectedCategories(activityData.categories || []);
          setExistingImage(activityData.coverPath || null);
        } else {
          setInitialData({
            activityName: "",
            description: "",
            categories: [],
            prefecture: "",
            budget: "",
            image: null,
          });
        }
      } catch (error) {
        console.error("Failed to fetch data", error);
      }
    };

    fetchData();
  }, [isEditMode, activityId, token]);

  const handleCategoryToggle = (category) => {
    setSelectedCategories((prevSelected) =>
      prevSelected.includes(category)
        ? prevSelected.filter((c) => c !== category)
        : [...prevSelected, category]
    );
  };

  const handleSubmit = async (values, { setSubmitting }) => {
    const formData = new FormData();
    formData.append("activityName", values.activityName);
    formData.append("description", values.description);
    formData.append("categories", JSON.stringify(selectedCategories));
    formData.append("prefecture", values.prefecture);
    formData.append("budget", values.budget);

    if (values.image) {
      formData.append("picture", values.image);
      formData.append("coverPath", values.image.name);
    } else if (existingImage) {
      formData.append("picture", existingImage);
    }

    const url = isEditMode
      ? `http://localhost:3333/activities/${activityId}`
      : `http://localhost:3333/activities`;

    const method = isEditMode ? "PATCH" : "POST";

    try {
      const response = await fetch(url, {
        method,
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Failed to submit activity: ${errorText}`);
      }

      const result = await response.json();

      console.log("Activity saved successfully:", result);

      if (isEditMode) {
        navigate(`/activities/${result._id}`);
      } else {
        navigate("/activities");
      }
    } catch (error) {
      console.error("Error saving activity:", error);
    } finally {
      setSubmitting(false);
    }
  };

  const initialValues = initialData || {
    activityName: "",
    description: "",
    categories: [],
    prefecture: "",
    budget: "",
    image: null,
  };

  if (
    !categories.length ||
    !prefectures.length ||
    !budgets.length ||
    (isEditMode && !initialData)
  ) {
    return <CircularProgress />;
  }

  return (
    <>
      <NavBar />
      <Box sx={{ padding: spacing(3) }}>
        <Box className="breadcrumbs-container">
          <Breadcrumbs
            aria-label="breadcrumb"
            style={{ marginBottom: spacing(3) }}
          >
            <Link component={RouterLink} to="/home">
              Home
            </Link>
            <Link component={RouterLink} to="/activities">
              Activities
            </Link>
            <Typography color="textPrimary">
              {isEditMode
                ? `Edit Activity: ${initialData.activityName}`
                : "Create New Activity"}
            </Typography>
          </Breadcrumbs>
        </Box>
        <Formik
          initialValues={initialValues}
          validationSchema={activitySchema}
          onSubmit={handleSubmit}
        >
          {({ setFieldValue, values, errors, touched, isSubmitting }) => (
            <Form className="activity-form">
              <Typography
                variant="h1"
                gutterBottom
                style={{ color: palette.primary.main }}
              >
                {isEditMode
                  ? `Edit Activity: ${initialData.activityName}`
                  : "Create New Activity"}
              </Typography>
              <Field
                name="activityName"
                as={TextField}
                label="Activity Name*"
                fullWidth
                error={Boolean(touched.activityName && errors.activityName)}
                helperText={<ErrorMessage name="activityName" />}
                style={{ marginBottom: spacing(2) }}
                InputProps={{
                  style: { color: palette.text.primary, borderRadius: "30rem" },
                }}
                InputLabelProps={{
                  style: { color: palette.text.secondary },
                }}
              />
              <Field
                name="description"
                as={TextField}
                label="Description*"
                fullWidth
                error={Boolean(touched.description && errors.description)}
                helperText={<ErrorMessage name="description" />}
                style={{ marginBottom: spacing(2) }}
                InputProps={{
                  style: { color: palette.text.primary, borderRadius: "30rem" },
                }}
                InputLabelProps={{
                  style: { color: palette.text.secondary },
                }}
              />
              <FormControl fullWidth style={{ marginBottom: spacing(2) }}>
                <Typography
                  variant="h6"
                  style={{ color: palette.text.primary }}
                >
                  Prefecture*
                </Typography>
                <Select
                  name="prefecture"
                  value={values.prefecture}
                  onChange={(e) => setFieldValue("prefecture", e.target.value)}
                  error={Boolean(touched.prefecture && errors.prefecture)}
                  style={{ color: palette.text.primary, borderRadius: "30rem" }}
                >
                  {prefectures.map((prefecture) => (
                    <MenuItem
                      key={prefecture._id}
                      value={prefecture._id}
                      style={{ color: palette.text.primary }}
                    >
                      {prefecture.name}
                    </MenuItem>
                  ))}
                </Select>
                <ErrorMessage
                  name="prefecture"
                  component="div"
                  style={{ color: palette.error.main }}
                />
              </FormControl>
              <FormControl fullWidth style={{ marginBottom: spacing(2) }}>
                <Typography
                  variant="h6"
                  style={{ color: palette.text.primary }}
                >
                  Budget*
                </Typography>
                <Select
                  name="budget"
                  value={values.budget}
                  onChange={(e) => setFieldValue("budget", e.target.value)}
                  error={Boolean(touched.budget && errors.budget)}
                  style={{ color: palette.text.primary, borderRadius: "30rem" }}
                >
                  {budgets.map((budget) => (
                    <MenuItem
                      key={budget._id}
                      value={budget._id}
                      style={{ color: palette.text.primary }}
                    >
                      {budget.abbreviation}
                    </MenuItem>
                  ))}
                </Select>
                <ErrorMessage
                  name="budget"
                  component="div"
                  style={{ color: palette.error.main }}
                />
              </FormControl>
              <FormControl fullWidth style={{ marginBottom: spacing(2) }}>
                <Typography
                  variant="h6"
                  style={{ color: palette.text.primary }}
                >
                  Cover Image* (Unfortunately you have to upload a new image to
                  update the activity)
                </Typography>
                <Dropzone
                  acceptedFiles=".jpg,.jpeg,.png"
                  multiple={false}
                  onDrop={(acceptedFiles) =>
                    setFieldValue("image", acceptedFiles[0])
                  }
                >
                  {({ getRootProps, getInputProps }) => (
                    <section>
                      <div
                        {...getRootProps({ className: "dropzone" })}
                        style={{
                          border: `2px dashed ${palette.primary.main}`,
                          padding: spacing(2),
                          marginBottom: "20px",
                          borderRadius: "30rem",
                          textAlign: "center",
                          color: palette.text.secondary,
                        }}
                      >
                        <input {...getInputProps()} />
                        <Typography>
                          {values.image
                            ? `Selected file: ${values.image.name}`
                            : existingImage
                            ? `Current file: ${existingImage.split("/").pop()}`
                            : "Drag and drop an image here, or click to select one"}
                        </Typography>
                      </div>
                      {existingImage && !values.image && (
                        <div style={{ marginTop: spacing(2) }}>
                          <Typography>Current image:</Typography>
                          <img
                            src={`http://localhost:3333/assets/${existingImage}`}
                            alt="Existing activity"
                            style={{
                              width: "100px",
                              height: "100px",
                              objectFit: "cover",
                              borderRadius: "10px",
                            }}
                          />
                        </div>
                      )}
                    </section>
                  )}
                </Dropzone>

                <Box style={{ marginBottom: spacing(2) }}>
                  <Typography
                    variant="h6"
                    style={{ color: palette.text.primary }}
                  >
                    Categories*
                  </Typography>
                  <Box display="flex" flexWrap="wrap">
                    {categories.map((category) => (
                      <Box
                        key={category.category}
                        style={{
                          textAlign: "center",
                          display: "flex",
                          flexWrap: "wrap",
                          flexDirection: "column",
                        }}
                      >
                        <IconButton
                          onClick={() =>
                            handleCategoryToggle(category.category)
                          }
                          style={{
                            textAlign: "center",
                            display: "flex",
                            flexWrap: "wrap",
                            margin: "0.7rem",
                            boxShadow: `0px 1px 8px #CDD9E1`,
                            flexDirection: "column",
                            backgroundColor: selectedCategories.includes(
                              category.category
                            )
                              ? palette.primary.light
                              : "#fff",
                            color: palette.text.primary,
                          }}
                        >
                          <Box
                            sx={{
                              display: "flex",
                            }}
                          >
                            <Box
                              component="img"
                              src={`http://localhost:3333/assets/${category.icon}`}
                              alt={category.category}
                              sx={{
                                padding: "0.4rem",
                                width: "50px",
                                height: "50px",
                              }}
                            />
                          </Box>
                        </IconButton>
                        <Typography variant="body2">
                          {category.category}
                        </Typography>
                      </Box>
                    ))}
                  </Box>
                  <ErrorMessage
                    name="categories"
                    component="div"
                    style={{ color: palette.error.main }}
                  />
                </Box>
              </FormControl>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                className="button"
                disabled={isSubmitting}
                style={{ marginTop: spacing(2) }}
              >
                {isEditMode ? "Update Activity" : "Create Activity"}
              </Button>
            </Form>
          )}
        </Formik>
      </Box>
      <Footer />
    </>
  );
};

ActivityForm.propTypes = {
  isEditMode: PropTypes.bool,
};

export default ActivityForm;
