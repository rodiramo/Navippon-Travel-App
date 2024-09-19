import { Box, Typography } from "@mui/material";
import Form from "./Form";

const LoginPage = () => {
  return (
    <Box
      sx={{
        width: "1440px",
        height: "970px",
        position: "relative",
        background: "white",
      }}
    >
      <Box
        sx={{
          width: "1440px",
          height: "68px",
          position: "absolute",
          top: 0,
          left: 0,
          background: "white",
        }}
      />
      <Typography
        variant="h1"
        sx={{
          position: "absolute",
          top: "191px",
          left: "871px",
          width: "401px",
          height: "32px",
          textAlign: "center",
          color: "#181818",
          fontSize: "28px",
          fontFamily: "Poppins",
          fontWeight: "900",
          wordWrap: "break-word",
        }}
      >
        Log In
      </Typography>
      <Box
        sx={{
          width: "400px",
          position: "absolute",
          top: "487px",
          left: "872px",
          padding: "12px 18px",
          background: "#FA5564",
          borderRadius: "30px",
          display: "inline-flex",
          justifyContent: "center",
          alignItems: "center",
          gap: "10px",
        }}
      >
        <Typography
          sx={{
            color: "white",
            fontSize: "15px",
            fontFamily: "Poppins",
            fontWeight: "500",
            lineHeight: "20px",
            letterSpacing: "0.30px",
            wordWrap: "break-word",
          }}
        >
          Log In
        </Typography>
      </Box>
      <Box
        sx={{
          width: "400px",
          position: "absolute",
          top: "595px",
          left: "872px",
          padding: "12px 18px",
          background: "white",
          borderRadius: "32px",
          border: "1px solid #FA5564",
          display: "inline-flex",
          justifyContent: "center",
          alignItems: "center",
          gap: "10px",
        }}
      >
        <img
          src="https://via.placeholder.com/20x20"
          alt="Google icon"
          style={{ width: "20px", height: "20px" }}
        />
        <Typography
          sx={{
            color: "#4F4F4F",
            fontSize: "15px",
            fontFamily: "Poppins",
            fontWeight: "500",
            lineHeight: "20px",
            letterSpacing: "0.30px",
            wordWrap: "break-word",
          }}
        >
          Continua con Google
        </Typography>
      </Box>
      <Typography
        sx={{
          position: "absolute",
          top: "261px",
          left: "872px",
          color: "#181818",
          fontSize: "14px",
          fontFamily: "Poppins",
          fontWeight: "500",
          lineHeight: "19.60px",
          letterSpacing: "0.28px",
          wordWrap: "break-word",
        }}
      >
        Email:*
      </Typography>
      <Box
        sx={{
          width: "400px",
          position: "absolute",
          top: "755px",
          left: "872px",
          textAlign: "center",
        }}
      >
        <span
          style={{
            color: "#4F4F4F",
            fontSize: "16px",
            fontFamily: "Poppins",
            fontWeight: "400",
            letterSpacing: "0.32px",
            wordWrap: "break-word",
          }}
        >
          ¿No tienes una cuenta?{" "}
        </span>
        <span
          style={{
            color: "#FA5564",
            fontSize: "16px",
            fontFamily: "Poppins",
            fontWeight: "400",
            textDecoration: "underline",
            letterSpacing: "0.32px",
            wordWrap: "break-word",
          }}
        >
          Registrate
        </span>
      </Box>
      <Typography
        sx={{
          position: "absolute",
          top: "350px",
          left: "872px",
          color: "#181818",
          fontSize: "14px",
          fontFamily: "Poppins",
          fontWeight: "500",
          lineHeight: "19.60px",
          letterSpacing: "0.28px",
          wordWrap: "break-word",
        }}
      >
        Contraseña:*
      </Typography>
      <Typography
        sx={{
          position: "absolute",
          width: "218px",
          height: "20px",
          top: "439px",
          right: "1054px",
          color: "#FA5564",
          fontSize: "14px",
          fontFamily: "Poppins",
          fontWeight: "500",
          textDecoration: "underline",
          letterSpacing: "0.28px",
          wordWrap: "break-word",
          textAlign: "right",
        }}
      >
        ¿Olvidaste tu contraseña?
      </Typography>
      <Box
        sx={{
          width: "210px",
          height: "20px",
          position: "absolute",
          top: "439px",
          left: "872px",
        }}
      >
        <Box
          sx={{
            width: "182px",
            height: "20px",
            position: "absolute",
            color: "#4F4F4F",
            fontSize: "14px",
            fontFamily: "Poppins",
            fontWeight: "400",
            letterSpacing: "0.28px",
            wordWrap: "break-word",
          }}
        >
          Mantenerme logueado
        </Box>
        <Box
          sx={{
            width: "20px",
            height: "20px",
            position: "absolute",
            background: "white",
            borderRadius: "5px",
            border: "1px solid #BDBDBD",
          }}
        />
      </Box>
      <Box
        sx={{
          width: "400px",
          position: "absolute",
          top: "375px",
          left: "872px",
          padding: "11px 12px",
          background: "#F2F2F2",
          boxShadow: "0px 0px 6px rgba(189.86, 202.17, 210.37, 0.89)",
          borderRadius: "29px",
          display: "inline-flex",
          alignItems: "center",
          gap: "10px",
        }}
      >
        <Typography
          sx={{
            color: "#F2F2F2",
            fontSize: "15px",
            fontFamily: "Poppins",
            fontWeight: "400",
            lineHeight: "21px",
            letterSpacing: "0.30px",
            wordWrap: "break-word",
          }}
        >
          Enter password
        </Typography>
        <Box
          sx={{
            width: "20px",
            height: "20px",
            padding: "3.10px 1.85px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Box
            sx={{
              width: "16.31px",
              height: "13.79px",
              position: "relative",
            }}
          >
            <Box
              sx={{
                width: "5.97px",
                height: "5.97px",
                position: "absolute",
                border: "1.50px solid #4F4F4F",
              }}
            />
            <Box
              sx={{
                width: "16.31px",
                height: "13.79px",
                position: "absolute",
                border: "1.50px solid #4F4F4F",
              }}
            />
          </Box>
        </Box>
      </Box>
      <Box
        sx={{
          width: "400px",
          height: "44px",
          position: "absolute",
          top: "287px",
          left: "872px",
          padding: "11px 20px",
          background: "#F2F2F2",
          borderRadius: "29px",
        }}
      >
        <input
          type="text"
          placeholder="Enter email"
          style={{
            width: "100%",
            height: "100%",
            background: "#F2F2F2",
            border: "none",
            fontSize: "16px",
            color: "#4F4F4F",
            padding: "0 20px",
            borderRadius: "29px",
          }}
        />
      </Box>
      <Form />
    </Box>
  );
};

export default LoginPage;
