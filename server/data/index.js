import mongoose from "mongoose";

const userIds = [
  new mongoose.Types.ObjectId(),
  new mongoose.Types.ObjectId(),
  new mongoose.Types.ObjectId(),
  new mongoose.Types.ObjectId(),
  new mongoose.Types.ObjectId(),
];

export const users = [
  {
    _id: userIds[0],
    firstName: "user",
    lastName: "test",
    email: "user@gmail.com",
    password: "$2b$10$dsasdgsagasda//G9JxQ4bQ8KXf4OAIe/X/AK9skyWUy",
    picturePath: "p11.jpeg",
    activities: [],
    location: "BS. AS",
    interests: [],
    createdAt: 1115211422,
    updatedAt: 1115211422,
    __v: 0,
  },
  {
    _id: userIds[1],
    firstName: "Steve",
    lastName: "Ralph",
    email: "thataaa@gmail.com",
    password: "$!FEAS@!O)_IDJda//G9JxQ4bQ8KXf4OAIe/X/AK9skyWUy",
    picturePath: "p3.jpeg",
    activities: [],
    location: "New York, CA",
    interests: [],
    createdAt: 1595589072,
    updatedAt: 1595589072,
    __v: 0,
  },
  {
    _id: userIds[2],
    firstName: "Some",
    lastName: "Guy",
    email: "someguy@gmail.com",
    password: "da39a3ee5e6b4b0d3255bfef95601890afd80709",
    picturePath: "p4.jpeg",
    activities: [],
    location: "Canada, CA",
    interests: [],
    createdAt: 1288090662,
    updatedAt: 1288090662,
    __v: 0,
  },
  {
    _id: userIds[3],
    firstName: "Whatcha",
    lastName: "Doing",
    email: "whatchadoing@gmail.com",
    password: "$2b$10$dsasdgsagasda//G9JxQ4bQ8KXf4OAIe/X/AK9skyWUy",
    picturePath: "p6.jpeg",
    activities: [],
    location: "Korea, CA",
    interests: [],
    createdAt: 1219214568,
    updatedAt: 1219214568,
    __v: 0,
  },
  {
    _id: userIds[4],
    firstName: "Jane",
    lastName: "Doe",
    email: "janedoe@gmail.com",
    password: "$2b$10$dsasdgsagasda//G9JxQ4bQ8KXf4OAIe/X/AK9skyWUy",
    picturePath: "p5.jpeg",
    activities: [],
    location: "Utah, CA",
    interests: [],
    createdAt: 1493463661,
    updatedAt: 1493463661,
    __v: 0,
  },
];

export const posts = [
  {
    _id: new mongoose.Types.ObjectId(),
    userId: userIds[1],
    firstName: "Steve",
    lastName: "Ralph",
    location: "New York, CA",
    description: "Some really long random description",
    picturePath: "post1.jpeg",
    userPicturePath: "p3.jpeg",
    likes: new Map([
      [userIds[0], true],
      [userIds[2], true],
      [userIds[3], true],
      [userIds[4], true],
    ]),
    comments: [
    ],
  },
  {
    _id: new mongoose.Types.ObjectId(),
    userId: userIds[3],
    firstName: "Whatcha",
    lastName: "Doing",
    location: "Korea, CA",
    description:
      "Another really long random description. This one is longer than the previous one.",
    picturePath: "post2.jpeg",
    userPicturePath: "p6.jpeg",
    likes: new Map([
      [userIds[4], true],
      [userIds[1], true],
      [userIds[2], true],
    ]),
    comments: [
     
    ],
  },
  {
    _id: new mongoose.Types.ObjectId(),
    userId: userIds[4],
    firstName: "Jane",
    lastName: "Doe",
    location: "Utah, CA",
    description:
      "This is the last really long random description. This one is longer than the previous one.",
    picturePath: "post3.jpeg",
    userPicturePath: "p5.jpeg",
    likes: new Map([
      [userIds[1], true],
      [userIds[3], true],
    ]),
    comments: [
   
    ],
  },  
  
];


export const activities = [
  {
    _id: new mongoose.Types.ObjectId(),
    activityName: "Visit Kyoto Temples",
    description:
      "Explore historic temples in Kyoto, such as Kinkaku-ji and Kiyomizu-dera.",
    prefecture: "Kyoto",
    coverPath: "/images/kyoto_temples.jpg",
    categories: ["Sightseeing", "Culture"],
    saves: [],
    location: "Kyoto, Japan",
  },
  {
    _id: new mongoose.Types.ObjectId(),
    activityName: "Sushi Making Class",
    description:
      "Learn the art of sushi making from a local chef in Tokyo.",
    prefecture: "Tokyo",
    coverPath: "/images/sushi_class.jpg",
    categories: ["Culinary", "Experience"],
    saves: [],
    location: "Tokyo, Japan",
  },
  {
    _id: new mongoose.Types.ObjectId(),
    activityName: "Hike Mount Fuji",
    description:
      "Embark on a challenging hike to the summit of Mount Fuji for breathtaking views.",
    prefecture: "Shizuoka",
    coverPath: "/images/mount_fuji.jpg",
    categories: ["Adventure", "Nature"],
    saves: [],
    location: "Shizuoka, Japan",
  },
  {
    _id: new mongoose.Types.ObjectId(),
    activityName: "Explore Okinawa Beaches",
    description:
      "Relax on the pristine beaches of Okinawa and enjoy the crystal-clear waters.",
    prefecture: "Okinawa",
    coverPath: "/images/okinawa_beach.jpg",
    categories: ["Beach", "Relaxation"],
    saves: [],
    location: "Okinawa, Japan",
  },
  {
    _id: new mongoose.Types.ObjectId(),
    activityName: "Visit Hiroshima Peace Memorial Park",
    description:
      "Reflect on history at the Hiroshima Peace Memorial Park and Museum.",
    prefecture: "Hiroshima",
    coverPath: "/images/hiroshima_peace.jpg",
    categories: ["History", "Sightseeing"],
    saves: [],
    location: "Hiroshima, Japan",
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
