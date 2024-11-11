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
  Breadcrumbs,
  Link,
} from "@mui/material";
import * as yup from "yup";
import { Formik, Form, Field, ErrorMessage } from "formik";
import Dropzone from "react-dropzone";
import NavBar from "@components/NavBar/NavBar.jsx";
import Footer from "@components/Footer/Footer.jsx";
import "@css/Items/ExperienceForm.css"; // Changed to ExperienceForm.css
import config from "@config/config.js";

const experienceSchema = yup.object().shape({
  experienceName: yup
    .string()
    .required("El nombre de la experiencia es obligatorio"),
  description: yup.string().required("La descripción es obligatoria"),
  categories: yup
    .array()
    .of(yup.string())
    .required("Se requiere al menos una categoría"),
  prefecture: yup.string().required("La prefectura es obligatoria"),
  budget: yup.string().required("El presupuesto es obligatorio"),
  image: yup.mixed(),
});

const ExperienceForm = () => {
  const { id: experienceId } = useParams();
  const [categories, setCategories] = useState([]);
  const [prefectures, setPrefectures] = useState([]);
  const [budgets, setBudgets] = useState([]);
  const [initialData, setInitialData] = useState(null);
  const token = useSelector((state) => state.token);
  const { palette, spacing } = useTheme();
  const navigate = useNavigate();
  const isEditMode = Boolean(experienceId);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [existingImage, setExistingImage] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [categoriesRes, prefecturesRes, budgetsRes] = await Promise.all([
          fetch(`${config.API_URL}/categories`),
          fetch(`${config.API_URL}/prefectures`),
          fetch(`${config.API_URL}/budget`),
        ]);

        if (!categoriesRes.ok || !prefecturesRes.ok || !budgetsRes.ok) {
          throw new Error("Error al obtener los datos");
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
          const experienceRes = await fetch(
            `${config.API_URL}/experiences/${experienceId}`,
            {
              headers: { Authorization: `Bearer ${token}` },
            }
          );

          if (!experienceRes.ok) {
            throw new Error("Error al obtener los datos de la experiencia");
          }

          const experienceData = await experienceRes.json();
          setInitialData({
            experienceName: experienceData.experienceName || "",
            description: experienceData.description || "",
            categories: experienceData.categories || [],
            prefecture: experienceData.prefecture?._id || "",
            budget: experienceData.budget?._id || "",
            image: null,
          });
          setSelectedCategories(experienceData.categories || []);
          setExistingImage(experienceData.coverPath || null);
        } else {
          setInitialData({
            experienceName: "",
            description: "",
            categories: [],
            prefecture: "",
            budget: "",
            image: null,
          });
        }
      } catch (error) {
        console.error("Error al obtener los datos", error);
      }
    };

    fetchData();
  }, [isEditMode, experienceId, token]);

  const handleCategoryToggle = (category) => {
    setSelectedCategories((prevSelected) =>
      prevSelected.includes(category)
        ? prevSelected.filter((c) => c !== category)
        : [...prevSelected, category]
    );
  };

  const handleSubmit = async (values, { setSubmitting }) => {
    const formData = new FormData();
    formData.append("experienceName", values.experienceName);
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
      ? `${config.API_URL}/experiences/${experienceId}`
      : `${config.API_URL}/experiences`;

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
        throw new Error(`Error al enviar la experiencia: ${errorText}`);
      }

      const result = await response.json();

      console.log("Experiencia guardada exitosamente:", result);

      if (isEditMode) {
        navigate(`/experiences/${result._id}`);
      } else {
        navigate("/experiences");
      }
    } catch (error) {
      console.error("Error al guardar la experiencia:", error);
    } finally {
      setSubmitting(false);
    }
  };

  const initialValues = initialData || {
    experienceName: "",
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
              Inicio
            </Link>
            <Link component={RouterLink} to="/experiences">
              Experiencias
            </Link>
            <Typography color="textPrimary">
              {isEditMode
                ? `Editar experiencia: ${initialData.experienceName}`
                : "Crear nueva experiencia"}
            </Typography>
          </Breadcrumbs>
        </Box>
        <Formik
          initialValues={initialValues}
          validationSchema={experienceSchema}
          onSubmit={handleSubmit}
        >
          {({ setFieldValue, values, errors, touched, isSubmitting }) => (
            <Form className="experience-form">
              <Typography
                variant="h1"
                gutterBottom
                style={{ color: palette.primary.main }}
              >
                {isEditMode
                  ? `Editar experiencia: ${initialData.experienceName}`
                  : "Crear nueva experiencia"}
              </Typography>
              <Field
                name="experienceName"
                as={TextField}
                label="Nombre de la experiencia*"
                fullWidth
                error={Boolean(touched.experienceName && errors.experienceName)}
                helperText={<ErrorMessage name="experienceName" />}
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
                label="Descripción*"
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
                  Prefectura*
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
                  Presupuesto*
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
                      {budget.name}
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
                  Categorías*
                </Typography>
                <Box sx={{ display: "flex", flexWrap: "wrap" }}>
                  {categories.map((category) => (
                    <Button
                      key={category._id}
                      variant={
                        selectedCategories.includes(category._id)
                          ? "contained"
                          : "outlined"
                      }
                      onClick={() => handleCategoryToggle(category._id)}
                      style={{
                        margin: "5px",
                        borderRadius: "30rem",
                        color: palette.text.primary,
                        borderColor: palette.text.primary,
                      }}
                    >
                      {category.name}
                    </Button>
                  ))}
                </Box>
                <ErrorMessage
                  name="categories"
                  component="div"
                  style={{ color: palette.error.main }}
                />
              </FormControl>
              <Dropzone
                onDrop={(acceptedFiles) =>
                  setFieldValue("image", acceptedFiles[0])
                }
                accept="image/*"
                maxFiles={1}
              >
                {({ getRootProps, getInputProps }) => (
                  <div
                    {...getRootProps()}
                    className="dropzone"
                    style={{
                      backgroundColor: palette.background.paper,
                      borderRadius: "8px",
                      padding: "20px",
                      textAlign: "center",
                      border: `2px dashed ${palette.primary.main}`,
                    }}
                  >
                    <input {...getInputProps()} />
                    <p style={{ color: palette.text.secondary }}>
                      Arrastra o selecciona una imagen
                    </p>
                    {existingImage && !values.image && (
                      <p style={{ color: palette.text.primary }}>
                        Imagen existente: {existingImage}
                      </p>
                    )}
                  </div>
                )}
              </Dropzone>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "flex-end",
                  paddingTop: spacing(2),
                }}
              >
                <Button
                  variant="contained"
                  type="submit"
                  disabled={isSubmitting}
                  style={{
                    backgroundColor: palette.primary.main,
                    color: palette.common.white,
                    borderRadius: "30rem",
                    padding: "10px 20px",
                  }}
                >
                  {isSubmitting ? (
                    <CircularProgress size={24} style={{ color: "#fff" }} />
                  ) : (
                    "Guardar experiencia"
                  )}
                </Button>
              </Box>
            </Form>
          )}
        </Formik>
      </Box>
      <Footer />
    </>
  );
};

ExperienceForm.propTypes = {
  experienceId: PropTypes.string,
};

export default ExperienceForm;
