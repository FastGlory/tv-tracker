import mongoose from "mongoose";
import dotenv from "dotenv";

import User from "../models/user.models";
import Movie from "../models/movie.models";
import Series from "../models/series.models";
import Season from "../models/season.models";
import Episode from "../models/episode.models";
import Rating from "../models/rating.models";

import users from "./users.json";
import movies from "./movies.json";
import series from "./series.json";
import seasons from "./seasons.json";
import episodes from "./episodes.json";
import ratings from "./ratings.json";

dotenv.config();

const inserationSeedDB = async () => {
  try {
    // J'ai demandé a chat de me mettre des commentaires stylisés
    await mongoose.connect(process.env.MONGO_URI!);
    console.log("✅ Connecté à MongoDB");


    // ici vu qu'on a un pre save pour hacher les mots de passe, on ne peut pas faire un insertMany directement
    await User.deleteMany({});
    for (const u of users) {
        const newUser = new User(u);
        await newUser.save(); 
    }
    console.log("👤 Utilisateurs insérés (avec mots de passe hachés).");

    await Movie.deleteMany({});
    await Movie.insertMany(movies);
    console.log("🎬 Films insérés.");

    await Series.deleteMany({});
    await Series.insertMany(series);
    console.log("📺 Séries insérées.");

    await Season.deleteMany({});
    await Season.insertMany(seasons);
    console.log("🗓️ Saisons insérées.");

    await Episode.deleteMany({});
    await Episode.insertMany(episodes);
    console.log("🎞️ Épisodes insérés.");

    await Rating.deleteMany({});
    await Rating.insertMany(ratings);
    console.log("⭐ Évaluations insérées.");

    console.log("🎉 Données de test insérées dans la base de données.");
  } catch (err) {
    console.error("❌ Erreur lors du seed :", err);
  } finally {
    await mongoose.disconnect();
    console.log("🔒 Déconnecté de MongoDB");
  }
};

inserationSeedDB();

//  https://www.mongodb.com/docs/manual/reference/method/db.collection.insertMany/