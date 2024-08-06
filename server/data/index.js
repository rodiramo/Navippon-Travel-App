import mongoose from "mongoose";

const userIds = [new mongoose.Types.ObjectId(), new mongoose.Types.ObjectId()];

export const budgets = [
  {
    _id: new mongoose.Types.ObjectId(),
    name: "Low Price",
    abbreviation: "$",
    description: "Economical options",
  },
  {
    _id: new mongoose.Types.ObjectId(),
    name: "Medium",
    abbreviation: "$$",
    description: "Moderate pricing",
  },
  {
    _id: new mongoose.Types.ObjectId(),
    name: "High",
    abbreviation: "$$$",
    description: "Higher pricing",
  },
  {
    _id: new mongoose.Types.ObjectId(),
    name: "Expensive",
    abbreviation: "$$$$",
    description: "Premium options",
  },
];

export const prefectures = [
  {
    _id: new mongoose.Types.ObjectId(),
    name: "Tokyo",
    image: "tokyo.jpg",
    cities: [],
  },
  {
    _id: new mongoose.Types.ObjectId(),
    name: "Kyoto",
    image: "kyoto.jpg",
    cities: [],
  },
  {
    _id: new mongoose.Types.ObjectId(),
    name: "Osaka",
    image: "osaka.jpg",
    cities: [],
  },
  {
    _id: new mongoose.Types.ObjectId(),
    name: "Hokkaido",
    image: "hokkaido.jpg",
    cities: [],
  },
  {
    _id: new mongoose.Types.ObjectId(),
    name: "Fukuoka",
    image: "fukuoka.jpg",
    cities: [],
  },
  {
    _id: new mongoose.Types.ObjectId(),
    name: "Nagoya",
    image: "nagoya.jpg",
    cities: [],
  },
  {
    _id: new mongoose.Types.ObjectId(),
    name: "Hiroshima",
    image: "hiroshima.jpg",
    cities: [],
  },
  {
    _id: new mongoose.Types.ObjectId(),
    name: "Sendai",
    image: "sendai.jpg",
    cities: [],
  },
  {
    _id: new mongoose.Types.ObjectId(),
    name: "Okinawa",
    image: "okinawa.jpg",
    cities: [],
  },
  {
    _id: new mongoose.Types.ObjectId(),
    name: "Nara",
    image: "nara.jpg",
    cities: [],
  },
  {
    _id: new mongoose.Types.ObjectId(),
    name: "Kobe",
    image: "kobe.jpg",
    cities: [],
  },
  {
    _id: new mongoose.Types.ObjectId(),
    name: "Yokohama",
    image: "yokohama.jpg",
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

export const posts = [];

export const activities = [
  {
    _id: new mongoose.Types.ObjectId(),
    activityName: "Visit Kyoto Temples",
    description:
      "Explore historic temples in Kyoto, such as Kinkaku-ji and Kiyomizu-dera.",
    prefecture: prefectures[1]._id,
    coverPath: "kyoto-temples.jpg",
    categories: ["Sightseeing", "Culture"],
    saves: [],
    location: "Kyoto, Japan",
    budget: budgets[1]._id, // Medium
  },
  {
    _id: new mongoose.Types.ObjectId(),
    activityName: "Sushi Making Class",
    description: "Learn the art of sushi making from a local chef in Tokyo.",
    prefecture: prefectures[0]._id,
    coverPath: "sushi-class.jpg",
    categories: ["Culinary", "Experience"],
    saves: [],
    location: "Tokyo, Japan",
    budget: budgets[2]._id,
  },
  {
    _id: new mongoose.Types.ObjectId(),
    activityName: "Hike Mount Fuji",
    description:
      "Embark on a challenging hike to the summit of Mount Fuji for breathtaking views.",
    prefecture: prefectures[0]._id,
    coverPath: "mount-fuji.jpg",
    categories: ["Adventure", "Nature"],
    saves: [],
    location: "Shizuoka, Japan",
    budget: budgets[3]._id,
  },
  {
    _id: new mongoose.Types.ObjectId(),
    activityName: "Explore Okinawa Beaches",
    description:
      "Relax on the pristine beaches of Okinawa and enjoy the crystal-clear waters.",
    prefecture: prefectures[8]._id,
    coverPath: "okinawa-beach.jpg",
    categories: ["Beach", "Relaxation"],
    saves: [],
    location: "Okinawa, Japan",
    budget: budgets[0]._id,
  },
  {
    _id: new mongoose.Types.ObjectId(),
    activityName: "Visit Hiroshima Peace Memorial Park",
    description:
      "Reflect on Historical at the Hiroshima Peace Memorial Park and Museum.",
    prefecture: prefectures[6]._id,
    coverPath: "hiroshima-memorial.jpg",
    categories: ["Historical", "Sightseeing"],
    saves: [],
    location: "Hiroshima, Japan",
    budget: budgets[1]._id,
  },
  {
    _id: new mongoose.Types.ObjectId(),
    activityName: "Explore Osaka Castle",
    description:
      "Visit the historic Osaka Castle and enjoy panoramic views of the city.",
    prefecture: prefectures[2]._id,
    coverPath: "osaka-castle.jpg",
    categories: ["Historical", "Sightseeing"],
    saves: [],
    location: "Osaka, Japan",
    budget: budgets[1]._id, // Medium
  },
  {
    _id: new mongoose.Types.ObjectId(),
    activityName: "Sapporo Snow Festival",
    description:
      "Experience the famous Sapporo Snow Festival with stunning ice and snow sculptures.",
    prefecture: prefectures[3]._id,
    coverPath: "sapporo-snow-festival.jpg",
    categories: ["Festival", "Winter"],
    saves: [],
    location: "Sapporo, Japan",
    budget: budgets[0]._id,
  },
  {
    _id: new mongoose.Types.ObjectId(),
    activityName: "Relax at Beppu Hot Springs",
    description:
      "Unwind in the therapeutic hot springs of Beppu, one of Japan's premier hot spring resorts.",
    prefecture: prefectures[4]._id,
    coverPath: "beppu-hot-spring.jpg",
    categories: ["Relaxation", "Nature"],
    saves: [],
    location: "Beppu, Japan",
    budget: budgets[1]._id,
  },
  {
    _id: new mongoose.Types.ObjectId(),
    activityName: "Hiroshima Okonomiyaki Cooking Class",
    description:
      "Learn to make Hiroshima-style okonomiyaki in a fun and interactive cooking class.",
    prefecture: prefectures[6]._id,
    coverPath: "hiroshima-okonomiyaki.jpg",
    categories: ["Culinary", "Experience"],
    saves: [],
    location: "Hiroshima, Japan",
    budget: budgets[2]._id,
  },
  {
    _id: new mongoose.Types.ObjectId(),
    activityName: "Nara Deer Park Visit",
    description:
      "Meet the friendly deer in Nara Park and explore the historic temples nearby.",
    prefecture: prefectures[9]._id,
    coverPath: "nara-deer-park.jpg",
    categories: ["Nature", "Sightseeing"],
    saves: [],
    location: "Nara, Japan",
    budget: budgets[0]._id,
  },
  {
    _id: new mongoose.Types.ObjectId(),
    activityName: "Tokyo Skytree Observation Deck",
    description:
      "Enjoy breathtaking views of Tokyo from the observation deck of the Tokyo Skytree.",
    prefecture: prefectures[0]._id,
    coverPath: "tokyo-skytree.jpg",
    categories: ["Sightseeing", "Modern"],
    saves: [],
    location: "Tokyo, Japan",
    budget: budgets[1]._id,
  },
  {
    _id: new mongoose.Types.ObjectId(),
    activityName: "Fukuoka Yatai Food Tour",
    description:
      "Experience Fukuoka's street food scene with a guided tour of local yatai stalls.",
    prefecture: prefectures[4]._id,
    coverPath: "fukuoka-yatai.jpg",
    categories: ["Culinary", "Experience"],
    saves: [],
    location: "Fukuoka, Japan",
    budget: budgets[2]._id,
  },
  {
    _id: new mongoose.Types.ObjectId(),
    activityName: "Explore the Ghibli Museum",
    description:
      "Discover the magical world of Studio Ghibli at the Ghibli Museum in Mitaka.",
    prefecture: prefectures[0]._id,
    coverPath: "ghibli-museum.jpg",
    categories: ["Culture", "Museum"],
    saves: [],
    location: "Mitaka, Tokyo, Japan",
    budget: budgets[0]._id,
  },
  {
    _id: new mongoose.Types.ObjectId(),
    activityName: "Kobe Harborland Cruise",
    description:
      "Take a scenic cruise around Kobe Harbor and enjoy the city's waterfront attractions.",
    prefecture: prefectures[10]._id,
    coverPath: "kobe-harborland.jpg",
    categories: ["Sightseeing", "Experience"],
    saves: [],
    location: "Kobe, Japan",
    budget: budgets[1]._id,
  },
  {
    _id: new mongoose.Types.ObjectId(),
    activityName: "Sendai Tanabata Festival",
    description:
      "Celebrate the Sendai Tanabata Festival with colorful decorations and traditional performances.",
    prefecture: prefectures[7]._id,
    coverPath: "sendai-tanabata.jpg",
    categories: ["Festival", "Culture"],
    saves: [],
    location: "Sendai, Japan",
    budget: budgets[0]._id,
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
