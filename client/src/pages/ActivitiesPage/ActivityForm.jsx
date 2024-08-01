import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import PropTypes from "prop-types";
import {
  TextField,
  MenuItem,
  Button,
  Select,
  useTheme,
  FormControl,
  InputLabel,
  CircularProgress,
  Typography,
  Box,
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

  const handleSubmit = async (values, { setSubmitting }) => {
    const formData = new FormData();
    formData.append("activityName", values.activityName);
    formData.append("description", values.description);
    formData.append("categories", JSON.stringify(values.categories));
    formData.append("prefecture", values.prefecture);
    formData.append("budget", values.budget);
    if (values.image) {
      formData.append("picture", values.image);
      formData.append("coverPath", values.image.name);
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
      <Formik
        initialValues={initialValues}
        validationSchema={activitySchema}
        onSubmit={handleSubmit}
      >
        {({ setFieldValue, values, errors, touched, isSubmitting }) => (
          <Form className="activity-form" style={{ padding: spacing(3) }}>
            <Typography
              variant="h1"
              gutterBottom
              style={{ color: palette.primary.main }}
            >
              {isEditMode ? "Edit Activity" : "Create New Activity"}
            </Typography>
            <Field
              name="activityName"
              as={TextField}
              label="Activity Name"
              fullWidth
              error={Boolean(touched.activityName && errors.activityName)}
              helperText={<ErrorMessage name="activityName" />}
              style={{ marginBottom: spacing(2) }}
              InputProps={{
                style: { color: palette.text.primary },
              }}
              InputLabelProps={{
                style: { color: palette.text.secondary },
              }}
            />
            <Field
              name="description"
              as={TextField}
              label="Description"
              fullWidth
              error={Boolean(touched.description && errors.description)}
              helperText={<ErrorMessage name="description" />}
              style={{ marginBottom: spacing(2) }}
              InputProps={{
                style: { color: palette.text.primary },
              }}
              InputLabelProps={{
                style: { color: palette.text.secondary },
              }}
            />
            <FormControl fullWidth style={{ marginBottom: spacing(2) }}>
              <InputLabel style={{ color: palette.text.primary }}>
                Categories
              </InputLabel>
              <Select
                name="categories"
                multiple
                value={values.categories}
                onChange={(e) => setFieldValue("categories", e.target.value)}
                error={Boolean(touched.categories && errors.categories)}
                renderValue={(selected) => (
                  <Box>
                    {selected.map((value) => (
                      <Typography
                        key={value}
                        style={{ color: palette.text.primary }}
                      >
                        {value}
                      </Typography>
                    ))}
                  </Box>
                )}
                style={{ color: palette.text.primary }}
              >
                {categories.map((category) => (
                  <MenuItem
                    key={category.category}
                    value={category.category}
                    style={{ color: palette.text.primary }}
                  >
                    {category.category}
                  </MenuItem>
                ))}
              </Select>
              <ErrorMessage
                name="categories"
                component="div"
                style={{ color: palette.error.main }}
              />
            </FormControl>
            <FormControl fullWidth style={{ marginBottom: spacing(2) }}>
              <InputLabel style={{ color: palette.text.primary }}>
                Prefecture
              </InputLabel>
              <Select
                name="prefecture"
                value={values.prefecture}
                onChange={(e) => setFieldValue("prefecture", e.target.value)}
                error={Boolean(touched.prefecture && errors.prefecture)}
                style={{ color: palette.text.primary }}
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
              <InputLabel style={{ color: palette.text.primary }}>
                Budget
              </InputLabel>
              <Select
                name="budget"
                value={values.budget}
                onChange={(e) => setFieldValue("budget", e.target.value)}
                error={Boolean(touched.budget && errors.budget)}
                style={{ color: palette.text.primary }}
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
                      borderRadius: spacing(1),
                      textAlign: "center",
                      color: palette.text.secondary,
                    }}
                  >
                    <input {...getInputProps()} />
                    <Typography>
                      Drag and drop a image here, or click to select one
                    </Typography>
                  </div>
                  {values.image && (
                    <div style={{ marginTop: spacing(2) }}>
                      <Typography>
                        Selected file: {values.image.name}
                      </Typography>
                    </div>
                  )}
                </section>
              )}
            </Dropzone>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              disabled={isSubmitting}
              style={{ marginTop: spacing(2) }}
            >
              {isEditMode ? "Update Activity" : "Create Activity"}
            </Button>
          </Form>
        )}
      </Formik>
      <Footer />
    </>
  );
};

ActivityForm.propTypes = {
  isEditMode: PropTypes.bool,
};

export default ActivityForm;
