import { useState } from "react";
import {
  Box,
  Button,
  TextField,
  useMediaQuery,
  Typography,
  useTheme,
} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { Formik } from "formik";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import Dropzone from "react-dropzone";
import { setLogin } from "../../state/state.js";
import FlexBetween from "../../components/FlexBetween.jsx";
import config from "../../config.js";

// Validation schemas
const registerSchema = yup.object().shape({
  firstName: yup.string().required("required"),
  lastName: yup.string().required("required"),
  email: yup.string().email("Invalid Email").required("required"),
  password: yup.string().required("required"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "Passwords must match")
    .required("required"),
  picture: yup.string(),
});

const loginSchema = yup.object().shape({
  email: yup.string().email("invalid email").required("required"),
  password: yup.string().required("required"),
});

// Initial values
const initialValuesRegister = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  confirmPassword: "",
  picture: "",
};

const initialValuesLogin = {
  email: "",
  password: "",
};

const Form = () => {
  const theme = useTheme();
  const [pageType, setPageType] = useState("login");
  const { palette } = useTheme();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const isLogin = pageType === "login";
  const isRegister = pageType === "register";
  const [generalError, setGeneralError] = useState(null);

  //register
  const register = async (values, onSubmitProps) => {
    const formData = new FormData();
    for (let value in values) {
      formData.append(value, values[value]);
    }
    formData.append("picturePath", values.picture.name);

    const savedUserResponse = await fetch(`${config.API_URL}/auth/register`, {
      method: "POST",
      body: formData,
    });

    const savedUser = await savedUserResponse.json();
    onSubmitProps.resetForm();
    if (savedUser) {
      setPageType("login");
    }
  };

  // login
  const login = async (values, onSubmitProps) => {
    try {
      const loggedInResponse = await fetch(`${config.API_URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      if (!loggedInResponse.ok) {
        throw new Error("User info not found");
      }

      const loggedIn = await loggedInResponse.json();
      onSubmitProps.resetForm();
      console.log("Logged In User:", loggedIn.user);
      dispatch(
        setLogin({
          user: loggedIn.user,
          token: loggedIn.token,
        })
      );
      navigate("/");
    } catch (error) {
      console.error("Login error:", error.message);
      setGeneralError(error.message);
    }
  };

  //submit
  const handleFormSubmit = async (values, onSubmitProps) => {
    setGeneralError(null);
    if (isLogin) await login(values, onSubmitProps);
    if (isRegister) await register(values, onSubmitProps);
  };

  return (
    <Formik
      backgroundColor={theme.palette.primary.white}
      onSubmit={handleFormSubmit}
      initialValues={isLogin ? initialValuesLogin : initialValuesRegister}
      validationSchema={isLogin ? loginSchema : registerSchema}
    >
      {({
        values,
        errors,
        touched,
        handleBlur,
        handleChange,
        handleSubmit,
        setFieldValue,
        resetForm,
      }) => (
        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{
            backgroundColor: "white",
            padding: "2rem",
            borderRadius: "8px",
            boxShadow: `0px 0px 10px ${theme.palette.grey[300]}`,
            maxWidth: "500px",
            margin: "auto",
          }}
        >
          <Box
            display="grid"
            gap="30px"
            gridTemplateColumns="repeat(4, minmax(0, 1fr))"
            sx={{
              "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
            }}
          >
            {generalError && (
              <Typography color="error" gridColumn="span 4">
                {generalError}
              </Typography>
            )}
            {isRegister && (
              <>
                <TextField
                  label="Nombre*"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.firstName}
                  name="firstName"
                  error={
                    Boolean(touched.firstName) && Boolean(errors.firstName)
                  }
                  helperText={touched.firstName && errors.firstName}
                  sx={{ gridColumn: "span 2" }}
                  InputProps={{
                    sx: {
                      borderRadius: "10rem",
                      background: theme.palette.background.grey,
                      border: "none",
                    },
                    classes: {
                      focused: "Mui-focused",
                      error: "Mui-error",
                    },
                  }}
                />
                <TextField
                  label="Apellido*"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.lastName}
                  name="lastName"
                  error={Boolean(touched.lastName) && Boolean(errors.lastName)}
                  helperText={touched.lastName && errors.lastName}
                  sx={{ gridColumn: "span 2" }}
                  InputProps={{
                    sx: {
                      borderRadius: "10rem",
                      background: theme.palette.background.grey,
                      border: "none",
                    },
                    classes: {
                      focused: "Mui-focused",
                      error: "Mui-error",
                    },
                  }}
                />
                <Box
                  gridColumn="span 4"
                  border={`none`}
                  borderRadius="10rem"
                  p="1rem"
                  sx={{
                    backgroundColor: theme.palette.background.grey,
                  }}
                >
                  <Dropzone
                    acceptedFiles=".jpg,.jpeg,.png"
                    multiple={false}
                    onDrop={(acceptedFiles) =>
                      setFieldValue("picture", acceptedFiles[0])
                    }
                  >
                    {({ getRootProps, getInputProps }) => (
                      <Box
                        {...getRootProps()}
                        border={`2px dashed ${palette.primary.main}`}
                        p="1rem"
                        sx={{
                          borderRadius: "10rem",
                          "&:hover": { cursor: "pointer" },
                        }}
                      >
                        <input {...getInputProps()} />
                        {!values.picture ? (
                          <p>Agrega un Avatar Aquí</p>
                        ) : (
                          <FlexBetween>
                            <Typography>{values.picture.name}</Typography>
                          </FlexBetween>
                        )}
                      </Box>
                    )}
                  </Dropzone>
                </Box>
              </>
            )}
            <TextField
              label="Email*"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.email}
              name="email"
              error={Boolean(touched.email) && Boolean(errors.email)}
              helperText={touched.email && errors.email}
              sx={{ gridColumn: "span 4" }}
              InputProps={{
                sx: {
                  borderRadius: "10rem",
                  background: theme.palette.background.grey,
                  border: "none",
                },
                classes: {
                  focused: "Mui-focused",
                  error: "Mui-error",
                },
              }}
            />
            <TextField
              label="Contraseña*"
              type={values.showPassword ? "text" : "password"}
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.password}
              name="password"
              error={Boolean(touched.password) && Boolean(errors.password)}
              helperText={touched.password && errors.password}
              sx={{ gridColumn: "span 4" }}
              InputProps={{
                sx: {
                  borderRadius: "10rem",
                  background: theme.palette.background.grey,
                  border: "none",
                },
                endAdornment: (
                  <IconButton
                    onClick={() =>
                      setFieldValue("showPassword", !values.showPassword)
                    }
                  >
                    {values.showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                ),
                classes: {
                  focused: "Mui-focused",
                  error: "Mui-error",
                },
              }}
            />

            {isRegister && (
              <TextField
                label="Confirmar Contraseña*"
                type={values.showPassword ? "text" : "password"}
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.confirmPassword}
                name="confirmPassword"
                error={
                  Boolean(touched.confirmPassword) &&
                  Boolean(errors.confirmPassword)
                }
                helperText={touched.confirmPassword && errors.confirmPassword}
                sx={{ gridColumn: "span 4" }}
                InputProps={{
                  sx: {
                    borderRadius: "10rem",
                    background: theme.palette.background.grey,
                    border: "none",
                  },
                  classes: {
                    focused: "Mui-focused",
                    error: "Mui-error",
                  },
                }}
              />
            )}
            <Box sx={{ gridColumn: "span 4", textAlign: "center" }}>
              <Button
                type="submit"
                sx={{
                  width: "100%",
                  m: "2rem 0",
                  p: "1rem",
                  borderRadius: "20rem",
                  textTransform: "none",
                  backgroundColor: palette.primary.main,
                  color: palette.background.alt,
                  "&:hover": { color: palette.primary.main },
                }}
              >
                {isLogin ? "Iniciar Sesión" : "Completar Registro"}
              </Button>
              <Typography
                onClick={() => {
                  setPageType(isLogin ? "register" : "login");
                  resetForm();
                }}
                sx={{
                  textDecoration: "underline",
                  color: palette.primary.main,
                  "&:hover": {
                    cursor: "pointer",
                    color: palette.primary.light,
                  },
                  textAlign: "center",
                  width: "100%",
                }}
              >
                {isLogin
                  ? "¿No tienes una cuenta? Regístrate aquí:"
                  : "¿Ya tienes una cuenta? Inicia sesión aquí:"}
              </Typography>
            </Box>
          </Box>
        </Box>
      )}
    </Formik>
  );
};

export default Form;
