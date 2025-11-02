import { z } from "zod";

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const usernameRegex = /^[a-zA-Z0-9._-]{3,30}$/;
const nomRegex = /^[A-Za-zÀ-ÿ\s'-]+$/;
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;
const titleRegex = /^[A-Za-z0-9À-ÿ\s'":!?.,-]{1,200}$/;
const genreRegex = /^[A-Za-zÀ-ÿ\s-]{1,30}$/;

export const userSchema = z.object({
  email: z.string().regex(emailRegex),
  nom: z.string().regex(nomRegex),
  username: z.string().regex(usernameRegex),
  password: z.string().regex(passwordRegex),
  role: z.enum(["user", "admin"]).default("user"),
  favorites: z.array(z.string()).optional(),
});

export const movieSchema = z.object({
  title: z.string().regex(titleRegex),
  genres: z.array(z.string().regex(genreRegex)),
  synopsis: z.string().max(1000).optional(),
  releaseDate: z.string().optional(),
  durationMin: z.number().min(1).max(600),
});

export const seriesSchema = z.object({
  title: z.string().regex(titleRegex),
  genres: z.array(z.string().regex(genreRegex)),
  status: z.enum(["ongoing", "ended"]),
});

export const seasonSchema = z.object({
  seriesId: z.string().min(1),
  seasonNo: z.number().int().min(1),
  episodes: z.number().int().min(0),
});

export const episodeSchema = z.object({
  epNo: z.number().int().min(1),
  title: z.string().regex(titleRegex),
  durationMin: z.number().int().min(1).max(300),
});

export const ratingSchema = z.object({
  userId: z.string().min(1),
  target: z.enum(["movie", "episode"]),
  targetId: z.string().min(1),
  score: z.number().min(0).max(10),
  review: z.string().max(2000).optional(),
});
