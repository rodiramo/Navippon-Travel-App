import { useMemo } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useSelector } from "react-redux";
import "./index.css";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { themeSettings } from "./theme.js";
import LoginPage from "./pages/LoginPage/Login.jsx";
import HomePage from "./pages/HomePage/Home.jsx";
import ProfilePage from "./pages/ProfilePage/Profile.jsx";
import ActivityDetails from "./pages/ActivitiesPage/ActivityDetails.jsx";
import ExplorePage from "./pages/ExplorePage/ExplorePage.jsx";
import AboutUsPage from "./pages/AboutUsPage/AboutUsPage.jsx";
import TripView from "./components/TripView.jsx";
import UserTripsPage from "./pages/TripPage/UserTripPage.jsx";
import BlogPage from "./pages/BlogPage/BlogPage.jsx";
import ContactPage from "./pages/ContactPage/ContactPage.jsx";
import FilteredCategoriesPage from "./pages/ActivitiesPage/FilteredCategoriesPage.jsx";
import FilteredPrefecturePage from "./pages/ActivitiesPage/FilteredPrefecturePage.jsx";
import AdminPanel from "./pages/AdminPage/AdminPanel.jsx";
import PrivateRoute from "./components/PrivateRoute.jsx";
import ActivityForm from "./pages/ActivitiesPage/ActivityForm.jsx";
import NotFound from "./pages/NotFound.jsx";

function App() {
  const mode = useSelector((state) => state.mode);
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);

  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Routes>
          {/* Home page accessible to everyone */}
          <Route path="/" element={<HomePage />} />

          {/* Login page accessible to everyone */}
          <Route path="/login" element={<LoginPage />} />

          {/* Private routes */}
          <Route element={<PrivateRoute />}>
            <Route path="/profile/:userId" element={<ProfilePage />} />
            <Route path="/posts" element={<BlogPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/activities" element={<ExplorePage />} />
            <Route
              path="/activities/filtered-category/:categoryName"
              element={<FilteredCategoriesPage />}
            />
            <Route
              path="/activities/filtered-prefecture/:prefectureId"
              element={<FilteredPrefecturePage />}
            />
            <Route path="/trips" element={<UserTripsPage />} />
            <Route path="/trips/:tripId" element={<TripView />} />
            <Route path="/activities/:id" element={<ActivityDetails />} />
            <Route path="/create-activity" element={<ActivityForm />} />
            <Route path="/edit-activity/:id" element={<ActivityForm />} />
          </Route>

          {/* About Us page accessible to everyone */}
          <Route path="/about-us" element={<AboutUsPage />} />

          {/* Admin route requiring admin role */}
          <Route element={<PrivateRoute requiredRole="admin" />}>
            <Route path="/admin" element={<AdminPanel />} />
          </Route>

          {/* 404 Not Found route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
