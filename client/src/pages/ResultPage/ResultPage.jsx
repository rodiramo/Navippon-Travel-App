import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import NavBar from "@components/NavBar/NavBar.jsx";
import Footer from "@components/Footer/Footer.jsx";
import { fetchSearchedExperiences } from "@services/services.js";
import ExperienceWidget from "@widgets/ExperiencesWidget/ExperienceWidget.jsx";

const ResultsPage = () => {
  const location = useLocation();
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const token = useSelector((state) => state.token);

  useEffect(() => {
    const fetchResults = async () => {
      if (!token) {
        setError("User is not authenticated.");
        setLoading(false);
        return;
      }

      setLoading(true);
      setError(null);

      try {
        const params = new URLSearchParams(location.search);
        const region = params.get("region");
        const prefecture = params.get("prefecture");
        const budget = params.get("budget");
        const query = params.get("query");

        const searchedExperiences = await fetchSearchedExperiences(token, {
          region,
          budget,
          prefecture,
          query,
        });

        setResults(searchedExperiences);
      } catch (error) {
        console.error("Error fetching searched experiences:", error);
        setError(error.message || "Error al obtener experiencias.");
      } finally {
        setLoading(false);
      }
    };

    fetchResults();
  }, [location.search, token]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div id="body">
      <NavBar />
      <div style={{ height: "40vh" }}>
        <h1>Resultados</h1>
      </div>
      {results.length > 0 ? (
        results.map((experience) => (
          <ExperienceWidget
            key={experience._id}
            experienceId={experience._id}
            name={experience.name}
            description={experience.description}
            image={experience.image}
            categories={experience.categories}
            prefecture={experience.prefecture}
            price={experience.price}
          />
        ))
      ) : (
        <p>No se encontraron resultados.</p>
      )}
      <Footer />
    </div>
  );
};

export default ResultsPage;
