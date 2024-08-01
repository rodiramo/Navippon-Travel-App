import { useMemo } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useSelector } from "react-redux";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { themeSettings } from "./theme.js";
import LoginPage from "./pages/LoginPage/Login.jsx";
import HomePage from "./pages/HomePage/Home.jsx";
import ProfilePage from "./pages/ProfilePage/Profile.jsx";
import ActivityDetails from "./pages/ActivitiesPage/ActivityDetails.jsx";
import ActivitiesPage from "./pages/ActivitiesPage/ActivitiesPage.jsx";
import DiscoverPage from "./pages/DiscoverPage/DiscoverPage.jsx";
import AboutUsPage from "./pages/AboutUsPage/AboutUsPage.jsx";
import BlogPage from "./pages/BlogPage/BlogPage.jsx";
import FilteredActivities from "./pages/ActivitiesPage/FilteredActivities.jsx";
import AdminPanel from "./pages/AdminPage/AdminPanel.jsx";
import PrivateRoute from "./components/PrivateRoute.jsx";
import ActivityForm from "./pages/ActivitiesPage/ActivityForm.jsx";
import useAuth from "./hooks/useAuth.js";

function App() {
  const mode = useSelector((state) => state.mode);
  const { isAuthenticated, isAdmin } = useAuth();
  console.log("Is Authenticated:", isAuthenticated);
  console.log("Is Admin:", isAdmin);

  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);

  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route element={<PrivateRoute />}>
            <Route path="/home" element={<HomePage />} />
            <Route path="/profile/:userId" element={<ProfilePage />} />
            <Route path="/posts" element={<BlogPage />} />
            <Route path="/activities" element={<ActivitiesPage />} />
            <Route
              path="/filtered-activities"
              element={<FilteredActivities />}
            />
            <Route path="/activities/:id" element={<ActivityDetails />} />
            <Route path="/create-activity" element={<ActivityForm />} />
            <Route path="/edit-activity/:id" element={<ActivityForm />} />
          </Route>
          <Route path="/discover" element={<DiscoverPage />} />
          <Route path="/about-us" element={<AboutUsPage />} />
          <Route element={<PrivateRoute requiredRole="admin" />}>
            <Route path="/admin" element={<AdminPanel />} />
          </Route>
        </Routes>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
