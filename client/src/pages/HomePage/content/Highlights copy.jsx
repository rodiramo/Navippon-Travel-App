import { useTheme } from "@mui/material";
import "@css/Universal.css";

const Highlights = () => {
  const theme = useTheme();

  return (
    <div
      className="p-0 m-0 mb-3 mt-3"
      style={{
        backgroundColor: theme.palette.background.grey,
      }}
    >
      <div className="w-full flex flex-col md:flex-row items-center p-0 m-0">
        {/* Image Section */}
        <div className="md:w-1/2 mb-0 md:mb-0 md:ml-0 flex-shrink-0 p-0 m-0">
          <img
            src="/assets/home-japan.jpg"
            alt="templo de kyoto"
            className="w-full h-full object-cover m-0"
          />
        </div>

        {/* Text Section */}
        <div
          className="md:w-1/2 text-black p-8"
          style={{ color: theme.palette.neutral.dark }}
        >
          <h2
            className="text-3xl mb-4"
            style={{ color: theme.palette.primary.main }}
          >
            Haz de tu viaje un gran éxito con Navippon
          </h2>
          <p className="mb-6">
            Con Navippon, cada paso de tu viaje se transforma en una experiencia
            inolvidable. Personaliza tu aventura, descubre lugares únicos y crea
            recuerdos que durarán toda la vida. Deja que Navippon sea tu guía
            confiable en el viaje de tus sueños.
          </p>
          <button
            type="submit"
            className="rounded-full px-6 py-3 w-full md:w-auto"
            style={{
              backgroundColor: theme.palette.primary.main,
              color: theme.palette.primary.white,
            }}
          >
            Explorar destinos
          </button>
        </div>
      </div>
    </div>
  );
};

export default Highlights;
