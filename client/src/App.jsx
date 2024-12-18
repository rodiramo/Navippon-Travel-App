import { useMemo } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useSelector } from "react-redux";
import "./index.css";
import { ToastProvider } from "@components/Toast/ToastManager.jsx";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { themeSettings } from "./theme.js";
import LoginPage from "./pages/LoginPage/Login.jsx";
import HomePage from "./pages/HomePage/Home.jsx";
import ProfilePage from "./pages/ProfilePage/ProfilePage.jsx";
import ExperienceDetails from "./pages/ExperiencesPage/ExperienceDetails.jsx";
import ExplorePage from "./pages/ExplorePage/ExplorePage.jsx";
import AboutUsPage from "./pages/AboutUsPage/AboutUsPage.jsx";
import TripView from "./pages/TripPage/TripView.jsx";
import UserTripsPage from "./pages/TripPage/UserTripPage.jsx";
import BlogPage from "./pages/BlogPage/BlogPage.jsx";
import ContactPage from "./pages/ContactPage/ContactPage.jsx";
import RegionFilteredPage from "./pages/FilteredPages/RegionFilteredPage.jsx";
import FilteredCategoriesPage from "./pages/ExperiencesPage/FilteredCategoriesPage.jsx";
import FilteredPrefecturePage from "./pages/ExperiencesPage/FilteredPrefecturePage.jsx";
import AdminPanel from "./pages/AdminPage/AdminLayout.jsx";
import PrivateRoute from "./components/PrivateRoute.jsx";
import ExperienceForm from "./pages/AdminPage/content/screens/experiences/Form.jsx";
import FavoritesPage from "./pages/FavoritesPage/FavoritesPage.jsx";
import NotFound from "./pages/NotFound.jsx";
import CreateTripPage from "./pages/TripPage/CreateTripPage.jsx";
import ResultPage from "./pages/ResultPage/ResultPage.jsx";
function App() {
  const mode = useSelector((state) => state.mode);
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);

  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <ToastProvider>
          <CssBaseline />
          <Routes>
            {" "}
            {/*Accessible to everyone */}
            <Route path="/" element={<HomePage />} />
            <Route path="/about-us" element={<AboutUsPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/contact" element={<ContactPage />} />
            {/* Private routes */}
            <Route element={<PrivateRoute />}>
              <Route path="/results" element={<ResultPage />} />
              <Route path="/favorites" element={<FavoritesPage />} />
              <Route path="/profile/:userId" element={<ProfilePage />} />
              <Route path="/posts" element={<BlogPage />} />
              <Route path="/experiences" element={<ExplorePage />} />
              <Route
                path="/experiences/filtered-category/:categoryName"
                element={<FilteredCategoriesPage />}
              />{" "}
              <Route
                path="/experiences/filtered-region/:regionId"
                element={<RegionFilteredPage />}
              />
              <Route
                path="/experiences/filtered-prefecture/:prefectureId"
                element={<FilteredPrefecturePage />}
              />
              <Route path="/trips/create-trip" element={<CreateTripPage />} />
              <Route path="/trips" element={<UserTripsPage />} />
              <Route path="/trips/:tripId" element={<TripView />} />
              <Route path="/experiences/:id" element={<ExperienceDetails />} />
              <Route path="/create-experience" element={<ExperienceForm />} />
              <Route path="/edit-experience/:id" element={<ExperienceForm />} />
            </Route>
            {/* Admin route requiring admin role */}
            <Route element={<PrivateRoute requiredRole="admin" />}>
              <Route path="/admin" element={<AdminPanel />} />
            </Route>
            {/* 404 Not Found route */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </ToastProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
