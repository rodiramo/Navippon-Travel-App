import mongoose from "mongoose";

const userIds = [new mongoose.Types.ObjectId(), new mongoose.Types.ObjectId()];

export const budgets = [
  {
    _id: new mongoose.Types.ObjectId(),
    name: "Bajo Precio",
    abbreviation: "$",
    description: "Opciones económicas",
  },
  {
    _id: new mongoose.Types.ObjectId(),
    name: "Medio",
    abbreviation: "$$",
    description: "Precios moderados",
  },
  {
    _id: new mongoose.Types.ObjectId(),
    name: "Alto",
    abbreviation: "$$$",
    description: "Precios elevados",
  },
  {
    _id: new mongoose.Types.ObjectId(),
    name: "Carísimo",
    abbreviation: "$$$$",
    description: "Opciones premium",
  },
];

export const prefectures = [
  {
    _id: new mongoose.Types.ObjectId(),
    name: "Tokio",
    image: "tokyo.jpg",
    cities: ["Shibuya", "Shinjuku", "Asakusa", "Akihabara"],
  },
  {
    _id: new mongoose.Types.ObjectId(),
    name: "Kioto",
    image: "kyoto.jpg",
    cities: ["Gion", "Arashiyama", "Kinkaku-ji", "Fushimi Inari"],
  },
  {
    _id: new mongoose.Types.ObjectId(),
    name: "Osaka",
    image: "osaka.jpg",
    cities: ["Namba", "Umeda", "Shin-Osaka", "Tennoji"],
  },
  {
    _id: new mongoose.Types.ObjectId(),
    name: "Hokkaido",
    image: "hokkaido.jpg",
    cities: ["Sapporo", "Hakodate", "Asahikawa", "Otaru"],
  },
  {
    _id: new mongoose.Types.ObjectId(),
    name: "Fukuoka",
    image: "fukuoka.jpg",
    cities: ["Hakata", "Tenjin", "Ohori Park", "Fukuoka Tower"],
  },
  {
    _id: new mongoose.Types.ObjectId(),
    name: "Nagoya",
    image: "nagoya.jpg",
    cities: ["Sakae", "Nagoya Station", "Osu", "Atsuta"],
  },
  {
    _id: new mongoose.Types.ObjectId(),
    name: "Hiroshima",
    image: "hiroshima.jpg",
    cities: [
      "Hiroshima City",
      "Miyajima",
      "Hiroshima Peace Memorial",
      "Shukkeien Garden",
    ],
  },
  {
    _id: new mongoose.Types.ObjectId(),
    name: "Sendai",
    image: "sendai.jpg",
    cities: ["Aoba-dori", "Sendai Station", "Zuihoden", "Jozenji-dori"],
  },
  {
    _id: new mongoose.Types.ObjectId(),
    name: "Okinawa",
    image: "okinawa.jpg",
    cities: ["Naha", "Okinawa City", "Ishigaki", "Nago"],
  },
  {
    _id: new mongoose.Types.ObjectId(),
    name: "Nara",
    image: "nara.jpg",
    cities: ["Nara City", "Todaiji Temple", "Nara Park", "Kasuga Taisha"],
  },
  {
    _id: new mongoose.Types.ObjectId(),
    name: "Kobe",
    image: "kobe.jpg",
    cities: ["Kobe City", "Port Island", "Sannomiya", "Kitano"],
  },
  {
    _id: new mongoose.Types.ObjectId(),
    name: "Yokohama",
    image: "yokohama.jpg",
    cities: [
      "Minato Mirai",
      "Chinatown",
      "Yokohama Landmark Tower",
      "Sankeien Garden",
    ],
  },
];

export const users = [
  {
    _id: userIds[0],
    firstName: "admin",
    lastName: "Rocio",
    email: "admin@gmail.com",
    password: "$2b$10$gO.ada9eeie4U5L24WZukuUng3kKVCNG96YFXfbyMCBKxH2j4Zqsq",
    picturePath: "admin-pfp.jpg",
    activities: [],
    location: "BS. AS",
    interests: [],
    role: "admin",
    createdAt: 1115211422,
    updatedAt: 1115211422,
    __v: 0,
  },
  {
    _id: userIds[1],
    firstName: "David",
    lastName: "User",
    email: "user@gmail.com",
    password: "$2b$10$SwPRC0cEJ7jR10.Ck6Em8OqTV1legCXlUdwGCLOp7Cy2zlnIbyxPS",
    picturePath: "p3.jpeg",
    activities: [],
    location: "Hamburg, GE",
    interests: [],
    createdAt: 1595589072,
    updatedAt: 1595589072,
    __v: 0,
  },
];

export const experiences = [
  {
    type: "Atractivo",
    image: "hiroshima-okonomiyaki.jpg",
    name: "Actividad de Okonomiyaki en Hiroshima",
    author: users[0]._id,
    rating: 4,
    prefecture: prefectures[1]._id,
    city: prefectures[1].cities[1],
    address: "Calle XYZ, Hiroshima, Japón",
    mapEmbedUrl: "https://www.google.com/maps/embed?pb=...",
    locationDes: "Cerca de estaciones de tren o metro",
    location: {
      type: "Point",
      coordinates: [135.7681, 35.0116],
    },
    phone: "123-456-789",
    email: "info@okonomiyaki.com",
    web: "http://www.okonomiyaki.com",
    time: "10:00 AM - 8:00 PM",
    days: "Lunes a Domingo",
    availability: {
      all_year: true,
      best_season: ["primavera", "otoño"],
    },
    price: 2000,
    range_price: { min: 10.0, max: 100.0 },
    budget: budgets[1]._id,
    description: "Aprende a hacer Okonomiyaki, un plato tradicional japonés.",
    categories: "Gastronomía",
    hotelType: "Hoteles de Lujo",
    hotelService: ["Wi-fi", "Piscina"],
    tripType: "Familiar",
    restaurantType: "Tradicional",
    foodType: "Tradicional",
    restaurantService: ["Wi-fi", "Menú en inglés"],
    reviews: [],
  },
  {
    type: "Hotel",
    image: "luxury-hotel.jpg",
    name: "Hotel Lujo Hiroshima",
    author: users[0]._id,
    rating: 5,
    prefecture: prefectures[3]._id,
    city: prefectures[3].cities[0],
    range_price: { min: 10.0, max: 100.0 },
    address: "Calle ABC, Hiroshima, Japón",
    mapEmbedUrl: "https://www.google.com/maps/embed?pb=...",
    locationDes: "Cerca de estaciones de tren o metro",
    location: {
      type: "Point",
      coordinates: [135.7681, 35.0116],
    },
    phone: "987-654-321",
    email: "contact@luxuryhotel.com",
    web: "http://www.luxuryhotel.com",
    time: "24/7",
    days: "Lunes a Domingo",
    availability: {
      all_year: true,
      best_season: ["primavera", "verano"],
    },
    price: 30000,
    budget: budgets[2]._id,
    description: "Un hotel de lujo con todas las comodidades.",
    categories: "Naturaleza",
    hotelType: "Hoteles de Lujo",
    hotelService: ["Wi-fi", "Desayuno incluido", "Piscina", "Gimnasio"],
    tripType: "De negocios",
    restaurantType: "Alta cocina",
    foodType: "Internacional",
    restaurantService: ["Reservas en línea", "Terraza", "Comida para llevar"],
    reviews: [],
  },
  {
    type: "Restaurante",
    image: "restaurant-image.jpg",
    name: "Restaurante Sushi Master",
    author: users[0]._id,
    range_price: { min: 10.0, max: 100.0 },
    rating: 5,
    prefecture: prefectures[0]._id,
    city: prefectures[0].cities[1],
    address: "Calle DEF, Tokio, Japón",
    mapEmbedUrl: "https://www.google.com/maps/embed?pb=...",
    locationDes: "Cerca de áreas de puntos de interés",
    location: {
      type: "Point",
      coordinates: [138.7274, 35.3606],
    },
    phone: "321-654-987",
    email: "contact@sushimaster.com",
    web: "http://www.sushimaster.com",
    time: "12:00 PM - 10:00 PM",
    days: "Martes a Domingo",
    availability: {
      all_year: true,
      best_season: ["primavera", "otoño"],
    },
    price: 1500,
    budget: budgets[1]._id,
    description: "Disfruta de sushi de alta calidad en un ambiente moderno.",
    categories: "Gastronomía",
    hotelType: "No aplica",
    hotelService: [],
    tripType: "Romántico",
    restaurantType: "Sushi",
    foodType: "De autor",
    restaurantService: ["Wi-fi", "Menú en inglés", "Reservas en línea"],
    reviews: [],
  },
];

export const categories = [
  {
    icon: "MdOutlineForest",
    category: "Naturaleza",
  },
  {
    icon: "MdOutlineBeachAccess",
    category: "Playa",
  },
  {
    icon: "TbBuildingMonument",
    category: "Monumento",
  },
  {
    icon: "MdOutlineRamenDining",
    category: "Gastronomía",
  },
  {
    icon: "LiaCocktailSolid",
    category: "Noche",
  },
  {
    icon: "GiGreekTemple",
    category: "Museo",
  },
  {
    icon: "MdOutlineCoffee",
    category: "Cafés",
  },
  {
    icon: "MdOutlineShoppingBag",
    category: "Shopping",
  },
  {
    icon: "FaRegStar",
    category: "Ocio",
  },
  {
    icon: "GiPartyPopper",
    category: "Festival",
  },
  {
    icon: "BsRobot",
    category: "Tecnología",
  },
  {
    icon: "LiaGamepadSolid",
    category: "Juegos",
  },
  {
    icon: "VscOctoface",
    category: "Anime",
  },
  {
    icon: "LuFerrisWheel",
    category: "Parques temáticos",
  },
  {
    icon: "GiSamuraiHelmet",
    category: "Samurai",
  },
  {
    icon: "MdOutlineTempleBuddhist",
    category: "Templo Budista",
  },
  {
    icon: "PiBirdBold",
    category: "Reserva de Aves",
  },
  {
    icon: "MdOutlineCastle",
    category: "Castillos",
  },
  {
    icon: "PiCross",
    category: "Templo Cristiano",
  },
  {
    icon: "TbTorii",
    category: "Templo Sintoísta",
  },
  {
    icon: "MdOutlineTempleHindu",
    category: "Templo Hindu",
  },
  {
    icon: "PiHandEyeLight",
    category: "Templo Jainita",
  },
  {
    icon: "FaRegMoon",
    category: "Templo islámico",
  },
  {
    icon: "PiStarOfDavid",
    category: "Templo judío",
  },
  {
    icon: "GiYinYang",
    category: "Templo Taoísta",
  },
  {
    icon: "GiAncientRuins",
    category: "Ruinas",
  },
  {
    icon: "MdOutlineHotTub",
    category: "Onsen",
  },
  {
    icon: "GiGrapes",
    category: "Viñedos",
  },
  {
    icon: "PiPawPrint",
    category: "Vida Silvestre",
  },
  {
    icon: "PiEyeBold",
    category: "Punto de interés",
  },
  {
    icon: "MdOutlineSurfing",
    category: "Surf",
  },
  {
    icon: "MdKayaking",
    category: "Kayak",
  },
  {
    icon: "FaPersonSkiing",
    category: "Esquí",
  },
  {
    icon: "GiProtectionGlasses",
    category: "Buceo",
  },
  {
    icon: "MdHiking",
    category: "Senderismo",
  },
];
