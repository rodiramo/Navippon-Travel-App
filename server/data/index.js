import mongoose from "mongoose";

const userIds = [
  new mongoose.Types.ObjectId(),
  new mongoose.Types.ObjectId(),
];

export const budgets = [
  { _id: new mongoose.Types.ObjectId(), name: "Low Price", abbreviation: "$", description: "Economical options" },
  { _id: new mongoose.Types.ObjectId(), name: "Medium", abbreviation: "$$", description: "Moderate pricing" },
  { _id: new mongoose.Types.ObjectId(), name: "High", abbreviation: "$$$", description: "Higher pricing" },
  { _id: new mongoose.Types.ObjectId(), name: "Expensive", abbreviation: "$$$$", description: "Premium options" },
];



export const prefectures = [
  {
    _id: new mongoose.Types.ObjectId(),
    name: "Tokyo",
    image: "/images/tokyo.jpg",
    cities: [],
  },
  {
    _id: new mongoose.Types.ObjectId(),
    name: "Kyoto",
    image: "/images/kyoto.jpg",
    cities: [],
  },
  {
    _id: new mongoose.Types.ObjectId(),
    name: "Osaka",
    image: "/images/osaka.jpg",
    cities: [],
  },
  {
    _id: new mongoose.Types.ObjectId(),
    name: "Hokkaido",
    image: "/images/hokkaido.jpg",
    cities: [],
  },
  {
    _id: new mongoose.Types.ObjectId(),
    name: "Fukuoka",
    image: "/images/fukuoka.jpg",
    cities: [],
  },
  {
    _id: new mongoose.Types.ObjectId(),
    name: "Nagoya",
    image: "/images/nagoya.jpg",
    cities: [],
  },
  {
    _id: new mongoose.Types.ObjectId(),
    name: "Hiroshima",
    image: "/images/hiroshima.jpg",
    cities: [],
  },
  {
    _id: new mongoose.Types.ObjectId(),
    name: "Sendai",
    image: "/images/sendai.jpg",
    cities: [],
  },
  {
    _id: new mongoose.Types.ObjectId(),
    name: "Okinawa",
    image: "/images/okinawa.jpg",
    cities: [],
  },
  {
    _id: new mongoose.Types.ObjectId(),
    name: "Nara",
    image: "/images/nara.jpg",
    cities: [],
  },
  {
    _id: new mongoose.Types.ObjectId(),
    name: "Kobe",
    image: "/images/kobe.jpg",
    cities: [],
  },
  {
    _id: new mongoose.Types.ObjectId(),
    name: "Yokohama",
    image: "/images/yokohama.jpg",
    cities: [],
  },
];


export const users = [
  {
    _id: userIds[0],
    firstName: "admin",
    lastName: "Rocio",
    email: "admin@gmail.com",
    password: "$2b$10$gO.ada9eeie4U5L24WZukuUng3kKVCNG96YFXfbyMCBKxH2j4Zqsq",
    picturePath: "p11.jpeg",
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

export const posts = [
 
  
];


export const activities = [
  {
    _id: new mongoose.Types.ObjectId(),
    activityName: "Visit Kyoto Temples",
    description: "Explore historic temples in Kyoto, such as Kinkaku-ji and Kiyomizu-dera.",
    prefecture: prefectures[1]._id,
    coverPath: "/images/kyoto_temples.jpg",
    categories: ["Sightseeing", "Culture"],
    saves: [],
    location: "Kyoto, Japan",
    budget: budgets[1]._id // Medium
  },
  {
    _id: new mongoose.Types.ObjectId(),
    activityName: "Sushi Making Class",
    description: "Learn the art of sushi making from a local chef in Tokyo.",
    prefecture: prefectures[0]._id,
    coverPath: "/images/sushi_class.jpg",
    categories: ["Culinary", "Experience"],
    saves: [],
    location: "Tokyo, Japan",
    budget: budgets[2]._id 
  },
  {
    _id: new mongoose.Types.ObjectId(),
    activityName: "Hike Mount Fuji",
    description: "Embark on a challenging hike to the summit of Mount Fuji for breathtaking views.",
    prefecture: prefectures[0]._id,
    coverPath: "/images/mount_fuji.jpg",
    categories: ["Adventure", "Nature"],
    saves: [],
    location: "Shizuoka, Japan",
    budget: budgets[3]._id 
  },
  {
    _id: new mongoose.Types.ObjectId(),
    activityName: "Explore Okinawa Beaches",
    description: "Relax on the pristine beaches of Okinawa and enjoy the crystal-clear waters.",
    prefecture: prefectures[8]._id,
    coverPath: "/images/okinawa_beach.jpg",
    categories: ["Beach", "Relaxation"],
    saves: [],
    location: "Okinawa, Japan",
    budget: budgets[0]._id 
  },
  {
    _id: new mongoose.Types.ObjectId(),
    activityName: "Visit Hiroshima Peace Memorial Park",
    description: "Reflect on Historical at the Hiroshima Peace Memorial Park and Museum.",
    prefecture: prefectures[6]._id,
    coverPath: "/images/hiroshima_peace.jpg",
    categories: ["Historical", "Sightseeing"],
    saves: [],
    location: "Hiroshima, Japan",
    budget: budgets[1]._id
  },
];
export const categories = [
  {
    category: "Temples",
    icon: "temples.png",
  },
  {
    category: "Nature",
    icon: "nature.png",
  },
  {
    category: "Anime",
    icon: "anime.png",
  },
  {
    category: "Relaxing",
    icon: "relaxing.png",
  },
  {
    category: "Fun",
    icon: "fun.png",
  },
  {
    category: "Historical",
    icon: "historical.png",
  },
  {
    category: "Family",
    icon: "family.png",
  }, 
  {
    category: "Sightseeing",
    icon: "sightseeing.png",
  },
  {
    category: "Kids",
    icon: "kids.png",
  },
  {
    category: "Architecture",
    icon: "architecture.png",
  },
  {
    category: "Concerts",
    icon: "concerts.png",
  },
  {
    category: "Events",
    icon: "events.png",
  },
  {
    category: "Garden",
    icon: "garden.png",
  },
  {
    category: "Beach",
    icon: "beach.png",
  },
  {
    category: "Shopping",
    icon: "shopping.png",
  },
  {
    category: "Technology",
    icon: "technology.png",
  },
  {
    category: "Water Activities",
    icon: "water_activities.png",
  },
  {
    category: "Sport",
    icon: "sport.png",
  },
  {
    category: "Museums",
    icon: "museums.png",
  },
  {
    category: "Nightlife",
    icon: "night_life.png",
  },
  {
    category: "Party",
    icon: "party.png",
  },
  {
    category: "Restaurants",
    icon: "restaurants.png",
  },
  {
    category: "Culinary",
    icon: "culinary.png", 
  },
  {
    category: "Adventure",
    icon: "adventure.png", 
  },
];
