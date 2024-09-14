import SearchBar from "../../components/SearchBar.jsx";
import "../ActivitiesPage/Activities.css";

const FiltersWidget = () => {
  return (
    <div className="filters-widget">
      <SearchBar />
      <h2>Filter by:</h2>
    </div>
  );
};

export default FiltersWidget;
