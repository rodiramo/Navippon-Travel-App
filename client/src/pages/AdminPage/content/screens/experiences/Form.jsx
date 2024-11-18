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
  IconButton,
  MenuItem,
  Typography,
  Box,
  Link,
} from "@mui/material";
import * as yup from "yup";
import { Formik, Form, Field, ErrorMessage } from "formik";
import Dropzone from "react-dropzone";
import "@css/Items/ExperienceForm.css";
import config from "@config/config.js";
import BreadcrumbBack from "@components/BreadcrumbBack.jsx";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

const experienceSchema = yup.object().shape({
  name: yup.string().required("El nombre de la experiencia es obligatorio"),
  description: yup.string().required("La descripción es obligatoria"),
  categories: yup
    .array()
    .of(yup.string())
    .required("Se requiere al menos una categoría"),
  phone: yup.string().required("El número de teléfono es obligatorio"),
  address: yup.string().required("La dirección es obligatoria"),
  price: yup.number().required("El tipo de experiencia es obligatorio"),
  type: yup.string().required("El tipo de experiencia es obligatorio"),
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
  const handleCancel = () => {
    navigate(-1);
  };

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

        const [categoriesData, prefecturesData, budgetsData] =
          await Promise.all([
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
            name: experienceData.name || "",
            description: experienceData.description || "",
            categories: experienceData.categories || [],
            prefecture: experienceData.prefecture?._id || "",
            type: experienceData.type || "",
            budget: experienceData.budget?._id || "",
            price: experienceData.price || 0,
            image: null,
          });
          setSelectedCategories(experienceData.categories || []);
          setExistingImage(experienceData.image || null);
        } else {
          setInitialData({
            name: "",
            description: "",
            categories: [],
            prefecture: "",
            budget: "",
            type: "",
            price: 0,
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
    formData.append("name", values.name);
    formData.append("description", values.description);
    formData.append("categories", JSON.stringify(selectedCategories));
    formData.append("prefecture", values.prefecture);
    formData.append("budget", values.budget);
    formData.append("address", values.address);
    formData.append("type", values.type);
    formData.append("phone", values.phone);
    formData.append("price", values.price);
    if (values.image) {
      formData.append("picture", values.image);
      formData.append("image", values.image.name);
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
    name: "",
    description: "",
    categories: [],
    prefecture: "",
    address: "",
    budget: "",
    type: "",
    phone: "",
    price: 0,
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
    <div id="body">
      <Box>
        <Box
          style={{
            backgroundColor: palette.background.light,
            height: "150px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-end",
            borderRadius: " 0 0 10rem 10rem",
          }}
        >
          <BreadcrumbBack />
          <Typography
            variant="h1"
            gutterBottom
            style={{ color: palette.secondary.dark, textAlign: "center" }}
          >
            {isEditMode
              ? `Editar experiencia: ${initialData.name}`
              : "Crea una nueva experiencia"}
          </Typography>
          <Typography
            variant="p"
            style={{
              color: palette.secondary.dark,
              textAlign: "center",
              paddingBottom: "2rem",
            }}
          >
            Asegurate de completar todos los campos para que el usuario tenga
            toda la información.
          </Typography>
        </Box>
        <Formik
          initialValues={initialValues}
          validationSchema={experienceSchema}
          onSubmit={handleSubmit}
        >
          {({ setFieldValue, values, errors, touched, isSubmitting }) => (
            <Form className="experience-form" style={{ padding: "5rem" }}>
              <FormControl fullWidth style={{ marginBottom: spacing(2) }}>
                <Typography
                  variant="h6"
                  style={{ color: palette.text.primary }}
                >
                  Tipo de experiencia*
                </Typography>
                <Select
                  name="type"
                  value={values.type}
                  onChange={(e) => setFieldValue("type", e.target.value)}
                  error={Boolean(touched.type && errors.type)}
                  style={{
                    background: palette.background.default,
                    borderRadius: "30rem",
                    color: palette.text.primary,
                  }}
                >
                  <MenuItem value="Atractivo">Atractivo</MenuItem>
                  <MenuItem value="Restaurante">Restaurante</MenuItem>
                  <MenuItem value="Hotel">Hotel</MenuItem>
                </Select>
                <ErrorMessage
                  name="type"
                  component="div"
                  className="error-text"
                />
              </FormControl>
              <Field
                name="name"
                as={TextField}
                label="Nombre de la experiencia*"
                fullWidth
                error={Boolean(touched.name && errors.name)}
                helperText={<ErrorMessage name="name" />}
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
              <Field
                name="address"
                as={TextField}
                label="Calle*"
                fullWidth
                error={Boolean(touched.address && errors.address)}
                helperText={<ErrorMessage name="address" />}
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
              <Field
                name="price"
                as={TextField}
                type="number"
                label="Precio de la experiencia*"
                fullWidth
                error={Boolean(touched.price && errors.price)}
                helperText={<ErrorMessage name="price" />}
                style={{ marginBottom: spacing(2) }}
                InputProps={{
                  style: { color: palette.text.primary, borderRadius: "30rem" },
                }}
                InputLabelProps={{
                  style: { color: palette.text.secondary },
                }}
              />

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
                        onClick={() => handleCategoryToggle(category.category)}
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
                            src={`${config.API_URL}/assets/${category.icon}`}
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
              <div>
                <label htmlFor="phone">Número de Telefono:</label>
                <PhoneInput
                  country={"jp"}
                  value={values.phone}
                  onChange={(phone) => setFieldValue("phone", phone)}
                  inputProps={{
                    name: "phone",
                    required: true,
                    id: "phone",
                  }}
                />
                <ErrorMessage
                  name="phone"
                  component="div"
                  style={{ color: "red" }}
                />
              </div>
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
                            src={`${config.API_URL}/assets/${existingImage}`}
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
              </FormControl>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "flex-end",
                  paddingTop: 2,
                }}
              >
                <Button
                  variant="outlined"
                  onClick={handleCancel}
                  style={{
                    borderColor: "#ccc",
                    color: "#555",
                    borderRadius: "30rem",
                    padding: "10px 20px",
                    marginRight: "10px",
                  }}
                >
                  Cancelar
                </Button>

                <Button
                  variant="contained"
                  type="submit"
                  disabled={isSubmitting}
                  style={{
                    backgroundColor: palette.primary.main,
                    color: "#fff",
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
    </div>
  );
};

ExperienceForm.propTypes = {
  experienceId: PropTypes.string,
};

export default ExperienceForm;
