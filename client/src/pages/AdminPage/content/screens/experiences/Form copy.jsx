import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import PropTypes from "prop-types";
import {
  TextField,
  Button,
  useTheme,
  IconButton,
  InputLabel,
  ListItemText,
  FormControl,
  CircularProgress,
  Select,
  MenuItem,
  Typography,
  Box,
  Checkbox,
  FormControlLabel,
} from "@mui/material";
import * as yup from "yup";
import { Formik, Form, Field, ErrorMessage } from "formik";
import Dropzone from "react-dropzone";
import "@css/Items/ExperienceForm.css";
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
  city: yup.string().required("La ciudad es obligatoria"),
  address: yup.string().required("La dirección es obligatoria"),
  phone: yup.string().nullable(),
  email: yup.string().nullable(),
  web: yup.string().nullable(),
  time: yup.string().nullable(),
  days: yup.string().nullable(),
  availability_all_year: yup.boolean().nullable(),
  best_season: yup.array().of(yup.string()),
  price: yup.number().nullable(),
  range_price_min: yup.number().nullable(),
  range_price_max: yup.number().nullable(),
  subcategory: yup.string().nullable(),
  hotelType: yup.string().nullable(),
  hotelService: yup.array().of(yup.string()),
  tripType: yup.string().nullable(),
  restaurantType: yup.string().nullable(),
  foodType: yup.string().nullable(),
  restaurantService: yup.array().of(yup.string()),
  image: yup.mixed(),
});

const ExperienceForm = () => {
  const { id: experienceId } = useParams();
  const [categories, setCategories] = useState([]);
  const [prefectures, setPrefectures] = useState([]);
  const [budgets, setBudgets] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);
  const [selectedSubcategories, setSelectedSubcategories] = useState([]);
  const [existingImage, setExistingImage] = useState(null);
  const [initialData, setInitialData] = useState(null);
  const token = useSelector((state) => state.token);
  const { palette, spacing } = useTheme();
  const navigate = useNavigate();
  const isEditMode = Boolean(experienceId);

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
            experienceName: experienceData.name || "",
            description: experienceData.description || "",
            categories: experienceData.categories || [],
            prefecture: experienceData.prefecture?._id || "",
            budget: experienceData.budget?._id || "",
            city: experienceData.city || "",
            address: experienceData.address || "",
            phone: experienceData.phone || "",
            email: experienceData.email || "",
            web: experienceData.web || "",
            time: experienceData.time || "",
            days: experienceData.days || "",
            availability_all_year:
              experienceData.availability?.all_year || false,
            best_season: experienceData.availability?.best_season || [],
            price: experienceData.price || null,
            range_price_min: experienceData.range_price?.min || null,
            range_price_max: experienceData.range_price?.max || null,
            subcategory: experienceData.subcategory || "",
            hotelType: experienceData.hotelType || "",
            hotelService: experienceData.hotelService || [],
            tripType: experienceData.tripType || "",
            restaurantType: experienceData.restaurantType || "",
            foodType: experienceData.foodType || "",
            restaurantService: experienceData.restaurantService || [],
            image: experienceData.image || null,
          });

          setSelectedCategories(experienceData.categories || []);
          setSelectedSubcategories(experienceData.subcategory || []);
          setExistingImage(experienceData.image || null);
        } else {
          setInitialData({
            experienceName: "",
            description: "",
            categories: [],
            prefecture: "",
            budget: "",
            city: "",
            address: "",
            phone: "",
            email: "",
            web: "",
            time: "",
            days: "",
            availability_all_year: false,
            best_season: [],
            price: null,
            range_price_min: null,
            range_price_max: null,
            subcategory: "",
            hotelType: "",
            hotelService: [],
            tripType: "",
            restaurantType: "",
            foodType: "",
            restaurantService: [],
            image: null,
          });
        }
      } catch (error) {
        console.error("Error al obtener los datos", error);
      }
    };

    fetchData();
  }, [isEditMode, experienceId, token]);

  // Toggle category selection
  const handleCategoryToggle = (category) => {
    setSelectedCategories((prevSelected) =>
      prevSelected.includes(category)
        ? prevSelected.filter((c) => c !== category)
        : [...prevSelected, category]
    );
    // Fetch subcategories based on the selected categories
    fetchSubcategories(category);
  };

  // Fetch subcategories when a category is selected
  const fetchSubcategories = async (categoryId) => {
    try {
      const res = await fetch(
        `${config.API_URL}/categories/${categoryId}/subcategories`
      );
      if (!res.ok) {
        throw new Error("Error al obtener las subcategorías");
      }
      const subcategoriesData = await res.json();
      setSubcategories(subcategoriesData);
    } catch (error) {
      console.error("Error al obtener las subcategorías", error);
    }
  };

  // Toggle subcategory selection
  const handleSubcategoryToggle = (subcategory) => {
    setSelectedSubcategories((prevSelected) =>
      prevSelected.includes(subcategory)
        ? prevSelected.filter((s) => s !== subcategory)
        : [...prevSelected, subcategory]
    );
  };

  const handleSubmit = async (values, { setSubmitting }) => {
    console.log(values);
    setSubmitting(false);
  };

  if (!categories.length || !prefectures.length || !budgets.length) {
    return <CircularProgress />;
  }

  return (
    <div>
      <Box sx={{ padding: spacing(3) }}>
        <Formik
          initialValues={initialData}
          validationSchema={experienceSchema}
          onSubmit={handleSubmit}
        >
          {({ setFieldValue, values, errors, touched, isSubmitting }) => (
            <Form className="experience-form">
              <Field
                name="experienceName"
                as={TextField}
                label="Nombre de la experiencia*"
                fullWidth
                error={Boolean(touched.experienceName && errors.experienceName)}
                helperText={<ErrorMessage name="experienceName" />}
                style={{ marginBottom: spacing(2) }}
              />
              <Field
                name="description"
                as={TextField}
                label="Descripción*"
                fullWidth
                error={Boolean(touched.description && errors.description)}
                helperText={<ErrorMessage name="description" />}
                style={{ marginBottom: spacing(2) }}
              />

              {/* Categories */}
              <FormControl fullWidth style={{ marginBottom: spacing(2) }}>
                <Typography
                  variant="h6"
                  style={{ color: palette.text.primary }}
                >
                  Categorías*
                </Typography>
                <Box sx={{ display: "flex", flexWrap: "wrap" }}>
                  {categories.map((category) => (
                    <Box key={category.category}>
                      <IconButton
                        onClick={() => handleCategoryToggle(category.category)}
                        style={{
                          backgroundColor: selectedCategories.includes(
                            category.category
                          )
                            ? palette.primary.light
                            : "#fff",
                        }}
                      >
                        <Box
                          component="img"
                          src={`${config.API_URL}/assets/${category.icon}`}
                          alt={category.category}
                          style={{ width: "50px", height: "50px" }}
                        />
                      </IconButton>
                      <Typography variant="body2">
                        {category.category}
                      </Typography>
                    </Box>
                  ))}
                </Box>
              </FormControl>
              {/* Subcategory Multi-Select */}
              {selectedCategories.length > 0 && (
                <FormControl fullWidth margin="normal">
                  <InputLabel>Subcategories</InputLabel>
                  <Select
                    multiple
                    value={selectedSubcategories}
                    onChange={(e) => {
                      // Call handleSubcategoryToggle when user selects or deselects subcategory
                      handleSubcategoryToggle(e.target.value);
                    }}
                    renderValue={(selected) => selected.join(", ")}
                    label="Subcategories"
                  >
                    {subcategories.map((subcategory) => (
                      <MenuItem key={subcategory._id} value={subcategory.name}>
                        <Checkbox
                          checked={selectedSubcategories.includes(
                            subcategory.name
                          )}
                        />
                        <ListItemText primary={subcategory.name} />
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              )}
              {/* Prefecture */}
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
                >
                  {prefectures.map((prefecture) => (
                    <MenuItem key={prefecture._id} value={prefecture._id}>
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

              {/* Budget */}
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
                >
                  {budgets.map((budget) => (
                    <MenuItem key={budget._id} value={budget._id}>
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

              {/* City */}
              <Field
                name="city"
                as={TextField}
                label="Ciudad*"
                fullWidth
                error={Boolean(touched.city && errors.city)}
                helperText={<ErrorMessage name="city" />}
                style={{ marginBottom: spacing(2) }}
              />

              {/* Address */}
              <Field
                name="address"
                as={TextField}
                label="Dirección*"
                fullWidth
                error={Boolean(touched.address && errors.address)}
                helperText={<ErrorMessage name="address" />}
                style={{ marginBottom: spacing(2) }}
              />

              {/* Phone */}
              <Field
                name="phone"
                as={TextField}
                label="Teléfono"
                fullWidth
                error={Boolean(touched.phone && errors.phone)}
                helperText={<ErrorMessage name="phone" />}
                style={{ marginBottom: spacing(2) }}
              />

              {/* Email */}
              <Field
                name="email"
                as={TextField}
                label="Email"
                fullWidth
                error={Boolean(touched.email && errors.email)}
                helperText={<ErrorMessage name="email" />}
                style={{ marginBottom: spacing(2) }}
              />

              {/* Web */}
              <Field
                name="web"
                as={TextField}
                label="Sitio Web"
                fullWidth
                error={Boolean(touched.web && errors.web)}
                helperText={<ErrorMessage name="web" />}
                style={{ marginBottom: spacing(2) }}
              />

              {/* Time */}
              <Field
                name="time"
                as={TextField}
                label="Horario"
                fullWidth
                error={Boolean(touched.time && errors.time)}
                helperText={<ErrorMessage name="time" />}
                style={{ marginBottom: spacing(2) }}
              />

              {/* Days */}
              <Field
                name="days"
                as={TextField}
                label="Días"
                fullWidth
                error={Boolean(touched.days && errors.days)}
                helperText={<ErrorMessage name="days" />}
                style={{ marginBottom: spacing(2) }}
              />

              {/* Availability */}
              <FormControlLabel
                control={
                  <Checkbox
                    name="availability_all_year"
                    checked={values.availability_all_year}
                    onChange={(e) =>
                      setFieldValue("availability_all_year", e.target.checked)
                    }
                  />
                }
                label="Disponibilidad todo el año"
              />

              {/* Best Season */}
              <FormControl fullWidth style={{ marginBottom: spacing(2) }}>
                <Typography
                  variant="h6"
                  style={{ color: palette.text.primary }}
                >
                  Mejor temporada
                </Typography>
                <Select
                  multiple
                  name="best_season"
                  value={values.best_season}
                  onChange={(e) => setFieldValue("best_season", e.target.value)}
                  renderValue={(selected) => selected.join(", ")}
                >
                  {["Invierno", "Primavera", "Verano", "Otoño"].map(
                    (season) => (
                      <MenuItem key={season} value={season}>
                        {season}
                      </MenuItem>
                    )
                  )}
                </Select>
              </FormControl>

              {/* Price */}
              <Field
                name="price"
                as={TextField}
                label="Precio"
                type="number"
                fullWidth
                error={Boolean(touched.price && errors.price)}
                helperText={<ErrorMessage name="price" />}
                style={{ marginBottom: spacing(2) }}
              />

              {/* Range Price */}
              <Field
                name="range_price_min"
                as={TextField}
                label="Rango de precio mínimo"
                type="number"
                fullWidth
                error={Boolean(
                  touched.range_price_min && errors.range_price_min
                )}
                helperText={<ErrorMessage name="range_price_min" />}
                style={{ marginBottom: spacing(2) }}
              />
              <Field
                name="range_price_max"
                as={TextField}
                label="Rango de precio máximo"
                type="number"
                fullWidth
                error={Boolean(
                  touched.range_price_max && errors.range_price_max
                )}
                helperText={<ErrorMessage name="range_price_max" />}
                style={{ marginBottom: spacing(2) }}
              />

              {/* Hotel Type */}
              <FormControl fullWidth style={{ marginBottom: spacing(2) }}>
                <Typography
                  variant="h6"
                  style={{ color: palette.text.primary }}
                >
                  Tipo de hotel
                </Typography>
                <Select
                  name="hotelType"
                  value={values.hotelType}
                  onChange={(e) => setFieldValue("hotelType", e.target.value)}
                >
                  {["Hotel", "Hostal", "Apartamento", "Resort"].map((type) => (
                    <MenuItem key={type} value={type}>
                      {type}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              {/* Hotel Service */}
              <FormControl fullWidth style={{ marginBottom: spacing(2) }}>
                <Typography
                  variant="h6"
                  style={{ color: palette.text.primary }}
                >
                  Servicios del hotel
                </Typography>
                <Select
                  multiple
                  name="hotelService"
                  value={values.hotelService}
                  onChange={(e) =>
                    setFieldValue("hotelService", e.target.value)
                  }
                  renderValue={(selected) => selected.join(", ")}
                >
                  {["Wifi", "Piscina", "Restaurante", "Gimnasio"].map(
                    (service) => (
                      <MenuItem key={service} value={service}>
                        {service}
                      </MenuItem>
                    )
                  )}
                </Select>
              </FormControl>

              {/* Trip Type */}
              <FormControl fullWidth style={{ marginBottom: spacing(2) }}>
                <Typography
                  variant="h6"
                  style={{ color: palette.text.primary }}
                >
                  Tipo de viaje
                </Typography>
                <Select
                  name="tripType"
                  value={values.tripType}
                  onChange={(e) => setFieldValue("tripType", e.target.value)}
                >
                  {["Aventura", "Relajación", "Cultural", "De negocios"].map(
                    (type) => (
                      <MenuItem key={type} value={type}>
                        {type}
                      </MenuItem>
                    )
                  )}
                </Select>
              </FormControl>

              {/* Restaurant Type */}
              <FormControl fullWidth style={{ marginBottom: spacing(2) }}>
                <Typography
                  variant="h6"
                  style={{ color: palette.text.primary }}
                >
                  Tipo de restaurante
                </Typography>
                <Select
                  name="restaurantType"
                  value={values.restaurantType}
                  onChange={(e) =>
                    setFieldValue("restaurantType", e.target.value)
                  }
                >
                  {["Gastronómico", "Buffet", "Fast food"].map((type) => (
                    <MenuItem key={type} value={type}>
                      {type}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              {/* Food Type */}
              <Field
                name="foodType"
                as={TextField}
                label="Tipo de comida"
                fullWidth
                error={Boolean(touched.foodType && errors.foodType)}
                helperText={<ErrorMessage name="foodType" />}
                style={{ marginBottom: spacing(2) }}
              />

              {/* Restaurant Service */}
              <FormControl fullWidth style={{ marginBottom: spacing(2) }}>
                <Typography
                  variant="h6"
                  style={{ color: palette.text.primary }}
                >
                  Servicios del restaurante
                </Typography>
                <Select
                  multiple
                  name="restaurantService"
                  value={values.restaurantService}
                  onChange={(e) =>
                    setFieldValue("restaurantService", e.target.value)
                  }
                  renderValue={(selected) => selected.join(", ")}
                >
                  {["Wi-Fi", "Parqueo", "Delivery", "Comida vegetariana"].map(
                    (service) => (
                      <MenuItem key={service} value={service}>
                        {service}
                      </MenuItem>
                    )
                  )}
                </Select>
              </FormControl>

              {/* Image Upload */}
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
              {/* Submit Button */}

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
                    backgroundColor: "#007bff",
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
