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

export const activities = [
  {
    _id: new mongoose.Types.ObjectId(),
    activityName: "Visitar los templos de Kioto",
    description:
      "Explora los templos históricos en Kioto, como el Kinkaku-ji y el Kiyomizu-dera.",
    prefecture: prefectures[1]._id,
    coverPath: "kyoto-temples.jpg",
    categories: ["Turismo", "Cultura", "Templos"],
    saves: [],
    budget: budgets[1]._id,
    city: prefectures[1].cities[1],
    price: 50.0,
    range_price: { min: 0.0, max: 100.0 },
    opening_time: "09:00",
    closing_time: "17:00",
    contact: "info@kioto-templos.jp",
    website: "https://kioto-templos.jp",
    location: {
      type: "Point",
      coordinates: [135.7681, 35.0116],
    },
    availability: {
      all_year: true,
      best_season: ["primavera", "otoño"],
    },
    images: ["kyoto-templo1.jpg", "kyoto-templo2.jpg"],
    reviews: [],
    icon: "activity.png",
  },
  {
    _id: new mongoose.Types.ObjectId(),
    activityName: "Clase de preparación de sushi",
    description:
      "Aprende el arte de hacer sushi de la mano de un chef local en Tokio.",
    prefecture: prefectures[0]._id,
    coverPath: "sushi-class.jpg",
    categories: ["Culinary", "Experience"],
    saves: [],
    budget: budgets[2]._id,
    price: 50.0,
    range_price: { min: 0.0, max: 100.0 },
    opening_time: "10:00",
    closing_time: "16:00",
    contact: "info@clasesushi.jp",
    website: "https://clasesushi.jp",
    location: {
      type: "Point",
      coordinates: [139.6917, 35.6895], // Coordenadas de Tokio
    },
    availability: {
      all_year: true,
      best_season: ["primavera", "verano"],
    },
    images: ["sushi1.jpg", "sushi2.jpg"],
    reviews: [],

    icon: "activity.png",
  },
  {
    _id: new mongoose.Types.ObjectId(),
    activityName: "Escalar el Monte Fuji",
    description:
      "Emprende una desafiante caminata hasta la cima del Monte Fuji para disfrutar de vistas impresionantes.",
    prefecture: prefectures[0]._id,
    coverPath: "mount-fuji.jpg",
    categories: ["Aventura", "Naturaleza"],
    saves: [],
    budget: budgets[3]._id,
    city: prefectures[0].cities[1],
    price: 10.0,
    range_price: { min: 10.0, max: 100.0 },
    opening_time: "07:00",
    closing_time: "18:00",
    contact: "info@montefuji.jp",
    website: "https://montefuji.jp",
    location: {
      type: "Point",
      coordinates: [138.7274, 35.3606], // Coordenadas del Monte Fuji
    },
    availability: {
      all_year: false,
      best_season: ["verano"],
    },
    images: ["fuji1.jpg", "fuji2.jpg"],
    reviews: [],
    icon: "activity.png",
  },
  {
    _id: new mongoose.Types.ObjectId(),
    activityName: "Explorar las playas de Okinawa",
    description:
      "Relájate en las playas prístinas de Okinawa y disfruta de sus aguas cristalinas.",
    prefecture: prefectures[8]._id,
    coverPath: "okinawa-beach.jpg",
    categories: ["Beach", "Relaxation"],
    saves: [],
    budget: budgets[0]._id,
    city: prefectures[8].cities[0],
    price: 0.0,
    range_price: { min: 0.0, max: 0.0 },
    opening_time: "08:00",
    closing_time: "20:00",
    contact: "info@okinawaplayas.jp",
    website: "https://okinawaplayas.jp",
    location: {
      type: "Point",
      coordinates: [127.6815, 26.2124], // Coordenadas de Okinawa
    },
    availability: {
      all_year: true,
      best_season: ["verano", "otoño"],
    },
    images: ["okinawa1.jpg", "okinawa2.jpg"],
    reviews: [],
    icon: "activity.png",
  },
  {
    _id: new mongoose.Types.ObjectId(),
    activityName: "Visitar el Parque Conmemorativo de la Paz en Hiroshima",
    description:
      "Reflexiona sobre la historia en el Parque Conmemorativo de la Paz y el Museo en Hiroshima.",
    prefecture: prefectures[6]._id,
    coverPath: "hiroshima-memorial.jpg",
    categories: ["Historical", "Sightseeing"],
    saves: [],
    budget: budgets[1]._id,
    city: prefectures[6].cities[0],
    price: 0.0,
    range_price: { min: 0.0, max: 0.0 },

    numero_resenas: 350,
    opening_time: "08:30",
    closing_time: "18:00",
    contact: "info@hiroshimapaz.jp",
    website: "https://hiroshimapaz.jp",
    location: {
      type: "Point",
      coordinates: [132.4536, 34.3955], // Coordenadas de Hiroshima
    },
    availability: {
      all_year: true,
      best_season: ["primavera", "otoño"],
    },
    categories: ["historia", "turismo"],
    images: ["hiroshima1.jpg", "hiroshima2.jpg"],
    reviews: [],
    icon: "activity.png",
  },
  {
    _id: new mongoose.Types.ObjectId(),
    activityName: "Explorar el Castillo de Osaka",
    description:
      "Visita el histórico Castillo de Osaka y disfruta de vistas panorámicas de la city.",
    prefecture: prefectures[2]._id,
    coverPath: "osaka-castle.jpg",
    categories: ["Histórico", "Turismo"],
    saves: [],
    location: "Osaka, Japón",
    budget: budgets[1]._id, // Medio
    city: prefectures[2].cities[0],
    price: 5.0,
    range_price: { min: 5.0, max: 20.0 },

    opening_time: "09:00",
    closing_time: "17:00",
    contact: "info@osakacastillo.jp",
    website: "https://osakacastillo.jp",
    location: {
      type: "Point",
      coordinates: [135.5231, 34.6873], // Coordenadas de Osaka
    },
    availability: {
      all_year: true,
      best_season: ["primavera", "otoño"],
    },
    images: ["osaka1.jpg", "osaka2.jpg"],
    reviews: [],
    icon: "activity.png",
  },
  {
    _id: new mongoose.Types.ObjectId(),
    activityName: "Festival de la Nieve en Sapporo",
    description:
      "Vive el famoso Festival de la Nieve de Sapporo con impresionantes esculturas de hielo y nieve.",
    prefecture: prefectures[3]._id,
    coverPath: "sapporo-snow-festival.jpg",
    categories: ["Festival", "Invierno"],
    saves: [],
    budget: budgets[0]._id, // Bajo
    city: prefectures[3].cities[0],
    price: 0.0,
    range_price: { min: 0.0, max: 0.0 },

    opening_time: "08:00",
    closing_time: "20:00",
    contact: "info@sapporonieve.jp",
    website: "https://sapporonieve.jp",
    location: {
      type: "Point",
      coordinates: [141.3545, 43.0618], // Coordenadas de Sapporo
    },
    availability: {
      all_year: false,
      best_season: ["invierno"],
    },
    images: ["sapporo1.jpg", "sapporo2.jpg"],
    reviews: [],
    icon: "activity.png",
  },
  {
    _id: new mongoose.Types.ObjectId(),
    activityName: "Relajarse en las aguas termales de Beppu",
    description:
      "Relájate en las aguas termales terapéuticas de Beppu, uno de los principales resorts termales de Japón.",
    prefecture: prefectures[4]._id,
    coverPath: "beppu-hot-spring.jpg",
    categories: ["Relajación", "Naturaleza"],
    saves: [],
    budget: budgets[1]._id, // Medio
    city: prefectures[4].cities[0],
    price: 15.0,
    range_price: { min: 10.0, max: 50.0 },

    numero_resenas: 200,
    opening_time: "09:00",
    closing_time: "21:00",
    contact: "info@beppuonsen.jp",
    website: "https://beppuonsen.jp",
    location: {
      type: "Point",
      coordinates: [131.5002, 33.2846], // Coordenadas de Beppu
    },
    availability: {
      all_year: true,
      best_season: ["invierno"],
    },
    images: ["beppu1.jpg", "beppu2.jpg"],
    reviews: [],
    icon: "activity.png",
  },
  {
    _id: new mongoose.Types.ObjectId(),
    activityName: "Clase de cocina de Okonomiyaki en Hiroshima",
    description:
      "Aprende a preparar okonomiyaki estilo Hiroshima en una divertida clase de cocina interactiva.",
    prefecture: prefectures[6]._id,
    coverPath: "hiroshima-okonomiyaki.jpg",
    categories: ["Culinaria", "Experiencia"],
    saves: [],
    location: "Hiroshima, Japón",
    budget: budgets[2]._id, // Alto
    city: prefectures[6].cities[0],
    price: 45.0,
    range_price: { min: 45.0, max: 100.0 },
    opening_time: "10:00",
    closing_time: "14:00",
    contact: "info@okonomiyaki.jp",
    website: "https://okonomiyaki.jp",
    location: {
      type: "Point",
      coordinates: [132.4596, 34.3965], // Coordenadas de Hiroshima
    },
    availability: {
      all_year: true,
      best_season: ["primavera"],
    },
    images: ["okonomiyaki1.jpg", "okonomiyaki2.jpg"],
    reviews: [],
    icon: "activity.png",
  },
  {
    _id: new mongoose.Types.ObjectId(),
    activityName: "Visita al Parque de Ciervos de Nara",
    description:
      "Conoce a los amigables ciervos del Parque de Nara y explora los templos históricos cercanos.",
    prefecture: prefectures[9]._id,
    coverPath: "nara-deer-park.jpg",
    categories: ["Naturaleza", "Turismo"],
    saves: [],
    location: "Nara, Japón",
    budget: budgets[0]._id, // Bajo
    city: prefectures[9].cities[0],
    price: 0.0,
    range_price: { min: 0.0, max: 0.0 },

    opening_time: "07:00",
    closing_time: "19:00",
    contact: "info@naraciervos.jp",
    website: "https://naraciervos.jp",
    location: {
      type: "Point",
      coordinates: [135.8398, 34.6851], // Coordenadas de Nara
    },
    availability: {
      all_year: true,
      best_season: ["primavera", "otoño"],
    },
    images: ["nara1.jpg", "nara2.jpg"],
    reviews: [],
    icon: "activity.png",
  },
  {
    _id: new mongoose.Types.ObjectId(),
    activityName: "Mirador del Tokyo Skytree",
    description:
      "Disfruta de vistas impresionantes de Tokio desde el mirador del Tokyo Skytree.",
    prefecture: prefectures[0]._id,
    coverPath: "tokyo-skytree.jpg",
    categories: ["Turismo", "Moderno"],
    saves: [],
    location: "Tokio, Japón",
    budget: budgets[1]._id, // Medio
    city: prefectures[0].cities[0], // Tokío
    price: 0.0,
    range_price: { min: 0.0, max: 0.0 },
    opening_time: "08:00",
    closing_time: "22:00",
    contact: "info@tokyo-skytree.jp",
    website: "https://www.tokyo-skytree.jp",
    location: {
      type: "Point",
      coordinates: [139.8107, 35.7106], // Coordenadas del Tokyo Skytree
    },
    availability: {
      all_year: true,
      best_season: ["primavera", "verano"],
    },
    images: ["tokyo-skytree1.jpg", "tokyo-skytree2.jpg"],
    reviews: [],
    icon: "activity.png",
  },

  {
    _id: new mongoose.Types.ObjectId(),
    activityName: "Tour Gastronómico por los Yatai de Fukuoka",
    description:
      "Experimenta la escena de comida callejera de Fukuoka con un tour guiado por los puestos de yatai locales.",
    prefecture: prefectures[4]._id,
    coverPath: "fukuoka-yatai.jpg",
    categories: ["Gastronomía", "Experiencia"],
    saves: [],
    location: "Fukuoka, Japón",
    budget: budgets[2]._id, // Alto
    city: prefectures[4].cities[0], // Fukuoka
    price: 0.0,
    range_price: { min: 0.0, max: 0.0 },
    opening_time: "17:00",
    closing_time: "23:00",
    contact: "info@fukuoka-yatai.jp",
    website: "https://fukuoka-yatai.jp",
    location: {
      type: "Point",
      coordinates: [130.4017, 33.5904], // Coordenadas de Fukuoka
    },
    availability: {
      all_year: true,
      best_season: ["primavera", "otoño"],
    },
    images: ["fukuoka-yatai1.jpg", "fukuoka-yatai2.jpg"],
    reviews: [],
    icon: "activity.png",
  },
  {
    _id: new mongoose.Types.ObjectId(),
    activityName: "Explora el Museo Ghibli",
    description:
      "Descubre el mundo mágico del Studio Ghibli en el Museo Ghibli en Mitaka.",
    prefecture: prefectures[0]._id,
    coverPath: "ghibli-museum.jpg",
    categories: ["Cultura", "Museo"],
    saves: [],
    location: "Mitaka, Tokio, Japón",
    budget: budgets[0]._id, // Bajo
    city: prefectures[0].cities[0], // Tokío
    price: 0.0,
    range_price: { min: 0.0, max: 0.0 },
    opening_time: "10:00",
    closing_time: "18:00",
    contact: "info@ghibli-museum.jp",
    website: "https://www.ghibli-museum.jp",
    location: {
      type: "Point",
      coordinates: [139.554, 35.7081], // Coordenadas del Museo Ghibli
    },
    availability: {
      all_year: true,
      best_season: ["primavera", "otoño"],
    },
    images: ["ghibli-museum1.jpg", "ghibli-museum2.jpg"],
    reviews: [],
    icon: "activity.png",
  },
  {
    _id: new mongoose.Types.ObjectId(),
    activityName: "Crucero por Kobe Harborland",
    description:
      "Realiza un crucero panorámico por el puerto de Kobe y disfruta de las atracciones frente al mar de la ciudad.",
    prefecture: prefectures[10]._id,
    coverPath: "kobe-harborland.jpg",
    categories: ["Turismo", "Experiencia"],
    saves: [],
    location: "Kobe, Japón",
    budget: budgets[1]._id, // Medio
    city: prefectures[10].cities[0], // Kobe
    price: 0.0,
    range_price: { min: 0.0, max: 0.0 },
    opening_time: "10:00",
    closing_time: "20:00",
    contact: "info@kobe-harborland.jp",
    website: "https://kobe-harborland.jp",
    location: {
      type: "Point",
      coordinates: [135.1955, 34.6901], // Coordenadas de Kobe
    },
    availability: {
      all_year: true,
      best_season: ["primavera", "verano"],
    },
    images: ["kobe-harborland1.jpg", "kobe-harborland2.jpg"],
    reviews: [],
    icon: "activity.png",
  },

  {
    _id: new mongoose.Types.ObjectId(),
    activityName: "Festival Tanabata de Sendai",
    description:
      "Celebra el Festival Tanabata de Sendai con decoraciones coloridas y actuaciones tradicionales.",
    prefecture: prefectures[7]._id,
    coverPath: "sendai-tanabata.jpg",
    categories: ["Festival", "Cultura"],
    saves: [],
    location: "Sendai, Japón",
    budget: budgets[0]._id, // Bajo
    city: prefectures[7].cities[0], // Sendai
    price: 0.0,
    range_price: { min: 0.0, max: 0.0 },
    opening_time: "09:00",
    closing_time: "22:00",
    contact: "info@sendai-tanabata.jp",
    website: "https://sendai-tanabata.jp",
    location: {
      type: "Point",
      coordinates: [140.8719, 38.2682], // Coordenadas de Sendai
    },
    availability: {
      all_year: true,
      best_season: ["verano"],
    },
    images: ["sendai-tanabata1.jpg", "sendai-tanabata2.jpg"],
    reviews: [],
    icon: "activity.png",
  },
];

export const hotels = [
  {
    _id: new mongoose.Types.ObjectId(),
    name: "Hotel Gran Tokio",
    description:
      "Un lujoso hotel en el corazón de Tokio con vistas panorámicas y excelente servicio.",
    prefecture: prefectures[0]._id,
    coverPath: "hotel-gran-tokio.jpg",
    categories: ["Alojamiento", "Lujo"],
    saves: [],
    location: "Tokio, Japón",
    budget: budgets[3]._id, // Carísimo
    city: prefectures[0].cities[0], // Tokio
    price: 250.0,
    range_price: { min: 200.0, max: 300.0 },
    opening_time: "00:00",
    closing_time: "23:59",
    contact: "reservas@hotelgrantokio.jp",
    website: "https://hotelgrantokio.jp",
    location: {
      type: "Point",
      coordinates: [139.6917, 35.6895], // Coordenadas de Tokio
    },
    availability: {
      all_year: true,
      best_season: ["primavera", "otoño"],
    },
    images: ["hotel-gran-tokio1.jpg", "hotel-gran-tokio2.jpg"],
    reviews: [],
    icon: "hotel.png",
  },
  {
    _id: new mongoose.Types.ObjectId(),
    name: "Hotel Kyoto Imperial",
    description:
      "Elegante hotel cerca de los templos históricos de Kioto con habitaciones tradicionales japonesas.",
    prefecture: prefectures[1]._id,
    coverPath: "hotel-kyoto-imperial.jpg",
    categories: ["Alojamiento", "Tradicional"],
    saves: [],
    location: "Kioto, Japón",
    budget: budgets[2]._id, // Alto
    city: prefectures[1].cities[0], // Kioto
    price: 180.0,
    range_price: { min: 150.0, max: 210.0 },
    opening_time: "00:00",
    closing_time: "23:59",
    contact: "reservas@hotelkyotoimperial.jp",
    website: "https://hotelkyotoimperial.jp",
    location: {
      type: "Point",
      coordinates: [135.7681, 35.0116], // Coordenadas de Kioto
    },
    availability: {
      all_year: true,
      best_season: ["primavera", "otoño"],
    },
    images: ["hotel-kyoto-imperial1.jpg", "hotel-kyoto-imperial2.jpg"],
    reviews: [],
    icon: "hotel.png",
  },
  {
    _id: new mongoose.Types.ObjectId(),
    name: "Hotel Osaka Bay",
    description:
      "Moderno hotel con vistas al puerto de Osaka y fácil acceso a las atracciones principales.",
    prefecture: prefectures[2]._id,
    coverPath: "hotel-osaka-bay.jpg",
    categories: ["Alojamiento", "Moderno"],
    saves: [],
    location: "Osaka, Japón",
    budget: budgets[1]._id, // Medio
    city: prefectures[2].cities[0], // Osaka
    price: 120.0,
    range_price: { min: 100.0, max: 140.0 },
    opening_time: "00:00",
    closing_time: "23:59",
    contact: "reservas@hotelosakabay.jp",
    website: "https://hotelosakabay.jp",
    location: {
      type: "Point",
      coordinates: [135.5022, 34.6937], // Coordenadas de Osaka
    },
    availability: {
      all_year: true,
      best_season: ["primavera", "verano"],
    },
    images: ["hotel-osaka-bay1.jpg", "hotel-osaka-bay2.jpg"],
    reviews: [],
    icon: "hotel.png",
  },
  {
    _id: new mongoose.Types.ObjectId(),
    name: "Hotel Hokkaido Resort",
    description:
      "Hotel de lujo en Hokkaido, ideal para disfrutar de la naturaleza y las actividades al aire libre.",
    prefecture: prefectures[3]._id,
    coverPath: "hotel-hokkaido-resort.jpg",
    categories: ["Alojamiento", "Resort"],
    saves: [],
    location: "Hokkaido, Japón",
    budget: budgets[2]._id, // Alto
    city: prefectures[3].cities[0], // Hokkaido
    price: 200.0,
    range_price: { min: 170.0, max: 230.0 },
    opening_time: "00:00",
    closing_time: "23:59",
    contact: "reservas@hotelhokkaidoresort.jp",
    website: "https://hotelhokkaidoresort.jp",
    location: {
      type: "Point",
      coordinates: [141.352, 43.0642], // Coordenadas de Hokkaido
    },
    availability: {
      all_year: true,
      best_season: ["invierno", "primavera"],
    },
    images: ["hotel-hokkaido-resort1.jpg", "hotel-hokkaido-resort2.jpg"],
    reviews: [],
    icon: "hotel.png",
  },
  {
    _id: new mongoose.Types.ObjectId(),
    name: "Hotel Fukuoka Grand",
    description:
      "Hotel elegante en Fukuoka con excelente comida y acceso fácil a las atracciones locales.",
    prefecture: prefectures[4]._id,
    coverPath: "hotel-fukuoka-grand.jpg",
    categories: ["Alojamiento", "Lujo"],
    saves: [],
    location: "Fukuoka, Japón",
    budget: budgets[3]._id, // Carísimo
    city: prefectures[4].cities[0], // Fukuoka
    price: 220.0,
    range_price: { min: 200.0, max: 250.0 },
    opening_time: "00:00",
    closing_time: "23:59",
    contact: "reservas@hotelfukuokagrand.jp",
    website: "https://hotelfukuokagrand.jp",
    location: {
      type: "Point",
      coordinates: [130.4017, 33.5904], // Coordenadas de Fukuoka
    },
    availability: {
      all_year: true,
      best_season: ["primavera", "otoño"],
    },
    images: ["hotel-fukuoka-grand1.jpg", "hotel-fukuoka-grand2.jpg"],
    reviews: [],
    icon: "hotel.png",
  },
];

export const restaurants = [
  {
    _id: new mongoose.Types.ObjectId(),
    name: "Sushi Tokyo",
    description:
      "Restaurante especializado en sushi fresco y auténtico en Tokio.",
    prefecture: prefectures[0]._id,
    coverPath: "sushi-tokyo.jpg",
    categories: ["Culinar", "Sushi"],
    saves: [],
    location: "Tokio, Japón",
    budget: budgets[1]._id, // Medio
    city: prefectures[0].cities[0], // Tokio
    price: 50.0,
    range_price: { min: 40.0, max: 60.0 },
    opening_time: "11:00",
    closing_time: "22:00",
    contact: "info@sushi-tokyo.jp",
    website: "https://sushi-tokyo.jp",
    location: {
      type: "Point",
      coordinates: [139.6917, 35.6895], // Coordenadas de Tokio
    },
    availability: {
      all_year: true,
      best_season: ["primavera", "verano"],
    },
    images: ["sushi-tokyo1.jpg", "sushi-tokyo2.jpg"],
    reviews: [],
    icon: "hotel.png",
  },
  {
    _id: new mongoose.Types.ObjectId(),
    name: "Kyoto Ramen House",
    description:
      "Disfruta de ramen auténtico y delicioso en el corazón de Kioto.",
    prefecture: prefectures[1]._id,
    coverPath: "kyoto-ramen-house.jpg",
    categories: ["Culinar", "Ramen"],
    saves: [],
    location: "Kioto, Japón",
    budget: budgets[0]._id, // Bajo
    city: prefectures[1].cities[0], // Kioto
    price: 30.0,
    range_price: { min: 20.0, max: 40.0 },
    opening_time: "10:00",
    closing_time: "21:00",
    contact: "info@kyoto-ramen-house.jp",
    website: "https://kyoto-ramen-house.jp",
    location: {
      type: "Point",
      coordinates: [135.7681, 35.0116], // Coordenadas de Kioto
    },
    availability: {
      all_year: true,
      best_season: ["primavera", "otoño"],
    },
    images: ["kyoto-ramen-house1.jpg", "kyoto-ramen-house2.jpg"],
    reviews: [],
    icon: "hotel.png",
  },
  {
    _id: new mongoose.Types.ObjectId(),
    name: "Osaka BBQ Grill",
    description:
      "Restaurante especializado en parrilladas y barbacoas en Osaka.",
    prefecture: prefectures[2]._id,
    coverPath: "osaka-bbq-grill.jpg",
    categories: ["Culinar", "Barbacoa"],
    saves: [],
    location: "Osaka, Japón",
    budget: budgets[1]._id, // Medio
    city: prefectures[2].cities[0], // Osaka
    price: 60.0,
    range_price: { min: 50.0, max: 70.0 },
    opening_time: "12:00",
    closing_time: "23:00",
    contact: "info@osaka-bbq-grill.jp",
    website: "https://osaka-bbq-grill.jp",
    location: {
      type: "Point",
      coordinates: [135.5022, 34.6937], // Coordenadas de Osaka
    },
    availability: {
      all_year: true,
      best_season: ["verano", "otoño"],
    },
    images: ["osaka-bbq-grill1.jpg", "osaka-bbq-grill2.jpg"],
    reviews: [],
    icon: "hotel.png",
  },
  {
    _id: new mongoose.Types.ObjectId(),
    name: "Hokkaido Seafood",
    description:
      "Mariscos frescos y deliciosos en un restaurante acogedor en Hokkaido.",
    prefecture: prefectures[3]._id,
    coverPath: "hokkaido-seafood.jpg",
    categories: ["Culinar", "Mariscos"],
    saves: [],
    location: "Hokkaido, Japón",
    budget: budgets[1]._id, // Medio
    city: prefectures[3].cities[0], // Hokkaido
    price: 70.0,
    range_price: { min: 60.0, max: 80.0 },
    opening_time: "11:00",
    closing_time: "22:00",
    contact: "info@hokkaido-seafood.jp",
    website: "https://hokkaido-seafood.jp",
    location: {
      type: "Point",
      coordinates: [141.352, 43.0642], // Coordenadas de Hokkaido
    },
    availability: {
      all_year: true,
      best_season: ["invierno", "primavera"],
    },
    images: ["hokkaido-seafood1.jpg", "hokkaido-seafood2.jpg"],
    reviews: [],
    icon: "hotel.png",
  },
  {
    _id: new mongoose.Types.ObjectId(),
    name: "Fukuoka Street Eats",
    description:
      "Prueba una variedad de comidas callejeras en Fukuoka en un ambiente vibrante.",
    prefecture: prefectures[4]._id,
    coverPath: "fukuoka-street-eats.jpg",
    categories: ["Culinar", "Comida Callejera"],
    saves: [],
    location: "Fukuoka, Japón",
    budget: budgets[0]._id, // Bajo
    city: prefectures[4].cities[0], // Fukuoka
    price: 40.0,
    range_price: { min: 30.0, max: 50.0 },
    opening_time: "10:00",
    closing_time: "21:00",
    contact: "info@fukuoka-street-eats.jp",
    website: "https://fukuoka-street-eats.jp",
    location: {
      type: "Point",
      coordinates: [130.4017, 33.5904], // Coordenadas de Fukuoka
    },
    availability: {
      all_year: true,
      best_season: ["primavera", "otoño"],
    },
    images: ["fukuoka-street-eats1.jpg", "fukuoka-street-eats2.jpg"],
    reviews: [],
    icon: "hotel.png",
  },
];

export const categories = [
  {
    category: "Templos",
    icon: "temples.png",
  },
  {
    category: "Naturaleza",
    icon: "nature.png",
  },
  {
    category: "Anime",
    icon: "anime.png",
  },
  {
    category: "Relajante",
    icon: "relaxing.png",
  },
  {
    category: "Diversión",
    icon: "fun.png",
  },
  {
    category: "Histórico",
    icon: "historical.png",
  },
  {
    category: "Familia",
    icon: "family.png",
  },
  {
    category: "Turismo",
    icon: "sightseeing.png",
  },
  {
    category: "Niños",
    icon: "kids.png",
  },
  {
    category: "Conciertos",
    icon: "concerts.png",
  },
  {
    category: "Eventos",
    icon: "events.png",
  },
  {
    category: "Jardín",
    icon: "garden.png",
  },
  {
    category: "Playa",
    icon: "beach.png",
  },
  {
    category: "Compras",
    icon: "shopping.png",
  },
  {
    category: "Tecnología",
    icon: "technology.png",
  },
  {
    category: "Actividades Acuáticas",
    icon: "water_activities.png",
  },
  {
    category: "Deportes",
    icon: "sport.png",
  },
  {
    category: "Museos",
    icon: "museums.png",
  },
  {
    category: "Vida Nocturna",
    icon: "night_life.png",
  },
  {
    category: "Fiesta",
    icon: "party.png",
  },
  {
    category: "Restaurantes",
    icon: "restaurants.png",
  },
  {
    category: "Gastronomía",
    icon: "culinary.png",
  },
  {
    category: "Aventura",
    icon: "adventure.png",
  },
];
