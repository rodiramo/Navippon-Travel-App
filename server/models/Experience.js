import mongoose from "mongoose";

const ExperienceSchema = new mongoose.Schema(
  {
    type: {
      type: String,
      enum: ["Atractivo", "Hotel", "Restaurante"],
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
      unique: true,
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    rating: {
      type: Number,
      min: 1,
      max: 5,
      required: true,
    },
    prefecture: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Prefecture",
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    mapEmbedUrl: {
      type: String,
      required: true,
    },
    locationDes: {
      type: String,
      enum: [
        "Cerca de estaciones de tren o metro",
        "Cerca de aeropuertos",
        "Cerca de áreas de puntos de interés",
      ],
      required: true,
    },
    location: {
      type: {
        type: String,
        enum: ["Point"],
        required: true,
      },
      coordinates: {
        type: [Number],
        required: true,
      },
    },
    phone: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    web: {
      type: String,
      required: true,
    },
    time: {
      type: String,
      required: true,
    },
    days: {
      type: String,
      required: true,
    },
    availability: {
      all_year: {
        type: Boolean,
        default: false,
      },
      best_season: {
        type: [String],
        default: [],
      },
    },
    price: {
      type: Number,
      required: true,
    },
    range_price: {
      min: {
        type: Number,
        required: true,
      },
      max: {
        type: Number,
        required: true,
      },
    },
    budget: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Budget",
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    categories: {
      type: String,
      required: true,
    },
    hotelType: {
      type: String,
      enum: [
        "Hoteles de Lujo",
        "Ryokan",
        "Hoteles Cápsula",
        "Hoteles de negocio",
        "Apartamentos",
        "Hostales",
        "Cabañas",
        "Campings",
        "No aplica",
      ],
      required: true,
    },
    hotelService: [
      {
        type: String,
        enum: [
          "Wi-fi",
          "Desayuno incluido",
          "Aparcamiento gratuito",
          "Transporte al aeropuerto",
          "Piscina",
          "Gimnasio",
          "Restaurante en el hotel",
          "Accesible",
          "Admite Mascotas",
        ],
      },
    ],
    tripType: {
      type: String,
      enum: [
        "Familiar",
        "Romántico",
        "Luna de Miel",
        "De negocios",
        "Mochileros",
        "Aventureros",
      ],
      required: true,
    },
    restaurantType: {
      type: String,
      enum: [
        "Tradicional",
        "Comida rápida",
        "Cafeterías",
        "Alta cocina",
        "Food Truck",
        "Ramen",
        "Sushi",
      ],
      required: true,
    },
    foodType: {
      type: String,
      enum: [
        "Tradicional",
        "Internacional",
        "Fusión",
        "Vegana",
        "Vegetariana",
        "Sin gluten",
        "Halal",
        "Kosher",
        "Rápida",
        "De autor",
        "Con espectáculo",
        "Familiar",
        "Romántica",
        "Ocasiones especiales",
      ],
      required: true,
    },
    restaurantService: [
      {
        type: String,
        enum: [
          "Wi-fi",
          "Menú en inglés",
          "Reservas en línea",
          "Entregas a domicilio",
          "Terraza",
          "Comida para llevar",
          "Admite mascotas",
          "Ingredientes orgánicos",
          "Mariscos frescos",
          "Menús infantiles",
        ],
      },
    ],
    reviews: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Review",
      },
    ],
  },
  { timestamps: true }
);

const Experience = mongoose.model("Experience", ExperienceSchema);
export default Experience;
