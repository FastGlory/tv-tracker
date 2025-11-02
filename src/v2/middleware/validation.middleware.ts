import { z } from "zod";

const emailRegex   = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const usernameRegex = /^[a-zA-Z0-9._-]{3,30}$/;
const nomRegex     = /^[A-Za-zÀ-ÿ\s'-]+$/;
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;
const titleRegex   = /^[A-Za-z0-9À-ÿ\s'":!?.,-]{1,200}$/;
const genreRegex   = /^[A-Za-zÀ-ÿ\s-]{1,30}$/;

export const userSchema = z.object({
  email:     z.string().regex(emailRegex,{ message: "L’adresse courriel est invalide. Veuillez entrer un format valide (exemple : utilisateur@domaine.com)." }),
  nom:       z.string().regex(nomRegex,{ message: "Le nom ne doit contenir que des lettres, espaces, apostrophes ou tirets." }),
  username:  z.string().regex(usernameRegex,{ message: "Le nom d’utilisateur doit comporter entre 3 et 30 caractères et ne contenir que des lettres, chiffres, points, tirets ou underscores." }),
  password:  z.string().regex(passwordRegex,{ message: "Le mot de passe doit contenir au moins 8 caractères, incluant une majuscule, un chiffre et un symbole spécial." }),
  role:      z.enum(["user","admin"],{ message: "Le rôle doit être soit 'user' soit 'admin'." }).default("user"),
  favorites: z.array(z.string(),{ message: "La liste des favoris doit contenir uniquement des identifiants valides." }).optional(),
});

export const movieSchema = z.object({
  title:       z.string().regex(titleRegex, { message: "Le titre doit comporter entre 1 et 200 caractères et ne contenir que des lettres, chiffres ou ponctuations simples." }),
  genres:      z.array(z.string().regex(genreRegex, { message: "Chaque genre doit comporter entre 1 et 30 caractères alphabétiques." })),
  synopsis:    z.string().max(1000,         { message: "Le synopsis ne peut pas dépasser 1000 caractères." }).optional(),
  releaseDate: z.string().optional(),
  durationMin: z.number().min(1,{ message: "La durée doit être d'au moins 1 minute." }).max(600,{ message: "La durée maximale autorisée est de 600 minutes." }),
});

export const seriesSchema = z.object({
  title:  z.string().regex(titleRegex, { message: "Le titre de la série doit être valide et contenir entre 1 et 200 caractères." }),
  genres: z.array(z.string().regex(genreRegex, { message: "Chaque genre doit comporter entre 1 et 30 caractères alphabétiques." })),
  status: z.enum(["ongoing","ended"], { message: "Le statut de la série doit être 'ongoing' (en cours) ou 'ended' (terminée)." }),
});

export const seasonSchema = z.object({
  seriesId: z.string().min(1, { message: "L’identifiant de la série est requis et doit être une chaîne valide." }),
  seasonNo: z.number().int({ message: "Le numéro de la saison doit être un entier valide." }).min(1, { message: "Le numéro de la saison doit être supérieur ou égal à 1." }),
  episodes: z.number().int({ message: "Le nombre d’épisodes doit être un entier valide." }).min(0, { message: "Le nombre d’épisodes doit être supérieur ou égal à 0." }),
});

export const episodeSchema = z.object({
  epNo:        z.number().int({ message: "Le numéro de l’épisode doit être un entier valide." }).min(1, { message: "Le numéro de l’épisode doit être supérieur ou égal à 1." }),
  title:       z.string().regex(titleRegex, { message: "Le titre de l’épisode doit comporter entre 1 et 200 caractères valides." }),
  durationMin: z.number().int({ message: "La durée de l’épisode doit être un entier valide." }).min(1, { message: "La durée minimale d’un épisode est de 1 minute." }).max(300, { message: "La durée maximale d’un épisode est de 300 minutes." }),
});

export const ratingSchema = z.object({
  userId:  z.string().min(1, { message: "L’identifiant de l’utilisateur est requis." }),
  target:  z.enum(["movie","episode"], { message: "La cible du rating doit être 'movie' ou 'episode'." }),
  targetId:z.string().min(1, { message: "L’identifiant du média à noter est requis." }),
  score:   z.number().min(0, { message: "La note doit être d’au moins 0." }).max(10, { message: "La note maximale est de 10." }),
  review:  z.string().max(2000, { message: "Le commentaire ne peut pas dépasser 2000 caractères." }).optional(),
});
