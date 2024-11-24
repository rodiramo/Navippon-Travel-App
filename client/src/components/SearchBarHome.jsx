import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { fetchRegions, fetchPrefectures } from "@services/services";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import PlaceOutlinedIcon from "@mui/icons-material/PlaceOutlined";
import MapOutlinedIcon from "@mui/icons-material/MapOutlined";

const SearchBarHome = () => {
  const [regions, setRegions] = useState([]);
  const [prefectures, setPrefectures] = useState([]);
  const [filteredPrefectures, setFilteredPrefectures] = useState([]);
  const [selectedRegionId, setSelectedRegionId] = useState("");
  const [selectedPrefectureId, setSelectedPrefectureId] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const loadRegionsAndPrefectures = async () => {
      try {
        const regionsData = await fetchRegions();
        setRegions(regionsData);

        const prefecturesData = await fetchPrefectures();
        setPrefectures(prefecturesData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    loadRegionsAndPrefectures();
  }, []);

  const handleRegionChange = (event) => {
    const regionId = event.target.value;
    setSelectedRegionId(regionId);

    if (!regionId) {
      setFilteredPrefectures([]);
      setSelectedPrefectureId("");
      return;
    }

    const filtered = prefectures.filter(
      (prefecture) => prefecture.region === regionId
    );

    setFilteredPrefectures(filtered);
    setSelectedPrefectureId("");
  };

  const handleSearchSubmit = (event) => {
    event.preventDefault();

    const queryParams = new URLSearchParams({
      region: selectedRegionId || "",
      prefecture: selectedPrefectureId || "",
      query: searchQuery,
    }).toString();

    navigate(`/results?${queryParams}`);
  };

  return (
    <div style={{ zIndex: "100" }}>
      <form onSubmit={handleSearchSubmit} className="flex flex-col gap-4">
        <div className="flex flex-col md:flex-row md:items-center md:gap-4">
          {/* Search input */}
          <div className="relative flex items-center w-full md:w-9/10 lg:w-19/20 mb-4 md:mb-0">
            <SearchOutlinedIcon className="absolute left-3 text-gray-500" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="¿Qué estás buscando?"
              className="pl-10 pr-4 py-2 rounded-full w-full text-sm md:text-base lg:text-base bg-[#D7EDFC]"
            />
          </div>

          {/* Region select */}
          <div className="relative flex items-center w-full md:w-2/3 lg:w-3/4 mb-4 md:mb-0">
            <MapOutlinedIcon className="absolute left-3 text-gray-500" />
            <select
              value={selectedRegionId}
              onChange={handleRegionChange}
              className="pl-10 pr-4 py-2 rounded-full w-full text-sm md:text-base lg:text-base bg-[#D7EDFC]"
              style={{ color: "#4F4F4F" }}
            >
              <option value="">Selecciona una región (opcional)</option>
              {regions.map((region) => (
                <option key={region._id} value={region._id}>
                  {region.region}
                </option>
              ))}
            </select>
          </div>

          {/* Prefecture select */}
          <div className="relative flex items-center w-full md:w-3/4 lg:w-5/6 mb-4 md:mb-0">
            <PlaceOutlinedIcon className="absolute left-3 text-gray-500" />
            <select
              value={selectedPrefectureId}
              onChange={(e) => setSelectedPrefectureId(e.target.value)}
              className="pl-10 pr-4 py-2 rounded-full w-full text-sm md:text-base lg:text-base bg-[#D7EDFC]"
              style={{ color: "#4F4F4F" }}
              disabled={!selectedRegionId}
            >
              <option value="">Todas las prefecturas en la región</option>
              {filteredPrefectures.map((prefecture) => (
                <option key={prefecture._id} value={prefecture._id}>
                  {prefecture.name}
                </option>
              ))}
            </select>
          </div>

          {/* Search button */}
          <div className="w-full md:w-1/5 lg:w-1/6 md:ml-4 mb-4 md:mb-0">
            <button
              type="submit"
              className="bg-[#fa5564] text-white rounded-full px-6 py-3 w-full md:w-auto"
            >
              Buscar
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default SearchBarHome;
