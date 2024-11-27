import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import NavBar from "@components/NavBar/NavBar.jsx";
import Footer from "@components/Footer/Footer.jsx";
import FiltersWidget from "./content/FiltersContainer.jsx";
import Header from "./content/Header.jsx";
import ExperiencesWidget from "../widgets/ExperiencesWidget/ExperiencesWidget.jsx";
import { useTheme } from "@mui/material";
import config from "@config/config.js";

const ExplorePage = () => {
  const [experience, setExperience] = useState("todo");
  const [searchResults, setSearchResults] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const theme = useTheme();
  const { primary, text } = theme.palette;

  const token = useSelector((state) => state.token);

  const handleButtonClick = (experience) => {
    setExperience(experience);
    setSearchQuery("");
  };

  const handleSearch = async (query) => {
    try {
      const response = await fetch(
        `${config.API_URL}/experiences/search?query=${query}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      const data = await response.json();
      setSearchResults(data);
      setSearchQuery(query);
      setExperience("resultados");
    } catch (err) {
      console.error("Error fetching search results:", err);
    }
  };

  useEffect(() => {
    const fetchAllExperiences = async () => {
      try {
        const response = await fetch(`${config.API_URL}/experiences/search`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await response.json();
        setSearchResults(data);
      } catch (err) {
        console.error("Error fetching experiences:", err);
      }
    };

    fetchAllExperiences();
  }, [token]);

  return (
    <div id="body" className="flex flex-col min-h-screen">
      <NavBar />
      <Header />
      <div className="content p-4">
        <FiltersWidget onSearch={handleSearch} />

        <div className="mb-4 flex gap-2 flex-col">
          <div className="flex">
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
                  borderRadius: "30px 30px 30px 30px",
                  marginRight: "10px",
                }}
                className="py-2 px-4 hover:bg-opacity-90"
              >
                Resultados
              </button>
            )}
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
          </div>

          {/* Render search results or default experiences based on selected tab */}
          <div className="my-4">
            {experience === "resultados" ? (
              searchResults.length > 0 ? (
                <ExperiencesWidget
                  experiences={searchResults}
                  experience={searchQuery}
                  filterBy="name"
                />
              ) : (
                <p>No se encontraron resultados.</p>
              )
            ) : (
              <>
                {experience === "todo" && (
                  <ExperiencesWidget
                    experiences={searchResults}
                    experience=""
                    filterBy=""
                  />
                )}

                {experience === "atractivos" && (
                  <ExperiencesWidget
                    experiences={searchResults}
                    experience="Atractivo"
                    filterBy="type"
                  />
                )}

                {experience === "hoteles" && (
                  <ExperiencesWidget
                    experiences={searchResults}
                    experience="Hotel"
                    filterBy="type"
                  />
                )}

                {experience === "restaurantes" && (
                  <ExperiencesWidget
                    experiences={searchResults}
                    experience="Restaurante"
                    filterBy="type"
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
