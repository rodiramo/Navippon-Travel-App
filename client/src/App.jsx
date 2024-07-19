import { useMemo } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { themeSettings } from "./theme.js";
import LoginPage from "./pages/LoginPage/Login.jsx";
import HomePage from "./pages/HomePage/Home.jsx";
import ProfilePage from "./pages/ProfilePage/Profile.jsx";
import ActivitiesPage from "./pages/ActivitiesPage/ActivitiesPage.jsx";
import DiscoverPage from "./pages/DiscoverPage/DiscoverPage.jsx";
import AboutUsPage from "./pages/AboutUsPage/AboutUsPage.jsx";
import BlogPage from "./pages/BlogPage/BlogPage.jsx";

function App() {
  const mode = useSelector((state) => state.mode);
  const isAuthenticated = useSelector((state) => !!state.token);
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);

  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route
            path="/home"
            element={isAuthenticated ? <HomePage /> : <Navigate to="/" />}
          />
          <Route
            path="/profile/:userId"
            element={isAuthenticated ? <ProfilePage /> : <Navigate to="/" />}
          />
                  <Route path="/posts"
            element={isAuthenticated ? <BlogPage /> : <Navigate to="/" />} />
          <Route path="/activities"            element={isAuthenticated ? <ActivitiesPage /> : <Navigate to="/" />}/>
          <Route path="/discover" element={<DiscoverPage />} />
          <Route path="/about-us" element={<AboutUsPage />} />
        </Routes>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
