import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import NavBar from "@components/NavBar/NavBar.jsx";
import Footer from "@components/Footer/Footer.jsx";
import FiltersWidget from "./content/FiltersWidget.jsx";
import Header from "./content/Header.jsx";
import ExperiencesWidget from "../widgets/ExperiencesWidget/ExperiencesWidget.jsx";
import { useTheme } from "@mui/material";
import config from "@config/config.js";
const ExplorePage = () => {
  const [experience, setExperience] = useState("todo");
  const [searchResults, setSearchResults] = useState([]); // Store search results
  const [searchQuery, setSearchQuery] = useState(""); // To store search query
  const [allExperiences, setAllExperiences] = useState([]); // Store all experiences
  const theme = useTheme();
  const { primary, text } = theme.palette;
  const token = useSelector((state) => state.token);

  const handleButtonClick = (experience) => {
    setExperience(experience);
    setSearchQuery("");
  };

  const handleSearch = (query) => {
    setSearchQuery(query);

    const filteredExperiences = allExperiences.filter((experienceItem) =>
      experienceItem.name.toLowerCase().includes(query.toLowerCase())
    );

    console.log("Filtered search results:", filteredExperiences);
    setSearchResults(filteredExperiences);
  };

  useEffect(() => {
    const fetchAllExperiences = async () => {
      try {
        const response = await fetch(`${config.API_URL}/experiences/search`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await response.json();
        setAllExperiences(data); // Store all experiences
        setSearchResults(data); // Initially show all experiences
      } catch (err) {
        console.error("Error fetching experiences:", err);
      }
    };

    fetchAllExperiences(); // Fetch data when component mounts
  }, [token]);

  return (
    <div id="body" className="flex flex-col min-h-screen">
      <NavBar />
      <Header />
      <div className="content p-4">
        <FiltersWidget onSearch={handleSearch} />

        {/* Tab Buttons */}
        <div className="mb-4 flex gap-2 flex-col">
          <div className="flex">
            <button
              onClick={() => handleButtonClick("todo")}
              style={{
                backgroundColor:
                  experience === "todo" ? primary.main : primary.light,
                color:
                  experience === "todo" ? primary.contrastText : text.primary,
                border: `1px solid ${primary.main}`,
                borderRadius: "30px 0px 0px 30px",
              }}
              className="py-2 px-4 hover:bg-opacity-90"
            >
              Todo el contenido
            </button>
            <button
              onClick={() => handleButtonClick("atractivos")}
              style={{
                backgroundColor:
                  experience === "atractivos" ? primary.main : primary.light,
                color:
                  experience === "atractivos"
                    ? primary.contrastText
                    : text.primary,
                border: `1px solid ${primary.main}`,
              }}
              className="py-2 px-4 hover:bg-opacity-90"
            >
              Atractivos
            </button>
            <button
              onClick={() => handleButtonClick("hoteles")}
              style={{
                backgroundColor:
                  experience === "hoteles" ? primary.main : primary.light,
                color:
                  experience === "hoteles"
                    ? primary.contrastText
                    : text.primary,
                border: `1px solid ${primary.main}`,
              }}
              className="py-2 px-4 hover:bg-opacity-90"
            >
              Hoteles
            </button>
            <button
              onClick={() => handleButtonClick("restaurantes")}
              style={{
                backgroundColor:
                  experience === "restaurantes" ? primary.main : primary.light,
                color:
                  experience === "restaurantes"
                    ? primary.contrastText
                    : text.primary,
                border: `1px solid ${primary.main}`,
                borderRadius: "0px 30px 30px 0px",
              }}
              className="py-2 px-4 hover:bg-opacity-90"
            >
              Restaurantes
            </button>

            {/* Resultados Tab (Only show if there's a search query) */}
            {searchQuery && (
              <button
                onClick={() => setExperience("resultados")}
                style={{
                  backgroundColor:
                    experience === "resultados" ? primary.main : primary.light,
                  color:
                    experience === "resultados"
                      ? primary.contrastText
                      : text.primary,
                  border: `1px solid ${primary.main}`,
                  borderRadius: "0px 30px 30px 0px",
                }}
                className="py-2 px-4 hover:bg-opacity-90"
              >
                Resultados
              </button>
            )}
          </div>

          <div className="my-4">
            {experience === "resultados" ? (
              searchResults.length > 0 ? (
                searchResults.map((experienceItem) => (
                  <ExperiencesWidget
                    key={experienceItem._id}
                    experience={experienceItem.name}
                    experiences={searchResults}
                  />
                ))
              ) : (
                <p>No results found.</p>
              )
            ) : (
              <>
                {experience === "todo" && (
                  <>
                    <ExperiencesWidget
                      experience="Atractivo"
                      experiences={allExperiences}
                    />
                    <ExperiencesWidget
                      experience="Hotel"
                      experiences={allExperiences}
                    />
                    <ExperiencesWidget
                      experience="Restaurante"
                      experiences={allExperiences}
                    />
                  </>
                )}

                {experience === "atractivos" && (
                  <ExperiencesWidget
                    experience="Atractivo"
                    experiences={allExperiences}
                  />
                )}

                {experience === "hoteles" && (
                  <ExperiencesWidget
                    experience="Hotel"
                    experiences={allExperiences}
                  />
                )}

                {experience === "restaurantes" && (
                  <ExperiencesWidget
                    experience="Restaurante"
                    experiences={allExperiences}
                  />
                )}
              </>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ExplorePage;
