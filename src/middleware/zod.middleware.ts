import {z} from "zod";


// DiscrimnatedUnion est la parce qu'on a deux model avec un format json bien différents
// Par conséquend on doit les différencier pour pouvoir les valider normalement
// Source : https://timkapitein.nl/blog/parsing-discriminated-unions-with-zod

// NOTE POUR MOI : possiblité de changement pour integré la fonctionnalité regex sur certain aspect. Déjà fait pour la date de sortie d'une saison
// À CHANGER ICI
export const mediaSchema = z.discriminatedUnion("type", [
    z.object({
      type: z.literal("Film"),
      id: z.string(),
      title: z.string().regex(/^[a-zA-Z0-9\s]+$/,"Doit contenir uniquement lettres, chiffres, espaces"),
      genre: z.string(),
      plateform: z.string().regex(/^[a-zA-Z]+$/,"Lettres seulement"),
      year: z.number().int().max(2025),
      rating: z.number().min(0).max(10),
      duration: z.string().regex(/^[1-9]\d*$/, "Entier positif").transform((duration) => Number(duration)),
      watched: z.boolean()
    }),
    z.object({ 
      type: z.literal("Serie"),
      id: z.string(),
      title: z.string().regex(/^[a-zA-Z0-9\s]+$/,"Doit contenir uniquement lettres, chiffres, espaces"),
      genre: z.string(),
      plateform: z.string(),
      year: z.number().int().max(2025),
      rating: z.number().min(0).max(10),
      // Ici j'adapte pour ma bd et le diagramme de classe. Demande d'autorisation au prof pour savoir quel version prendre  entre (/^(En cours|Terminée)$/) ou en_attente , en_cours , terminee
      status: z.string().regex(/^(terminee|en_cours|en_attente)$/),
      seasons: z.array(
        z.object({
          seasonNumber: z.number().int().positive(),
          releaseDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Date doit être au format YYYY-MM-DD"),
          episodes: z.array(
            z.object({
              id: z.string(),
              title: z.string().regex(/^[a-zA-Z0-9\s]+$/,"Doit contenir uniquement lettres, chiffres, espaces"),
              duration: z.string().regex(/^[1-9]\d*$/, "Entier positif").transform((duration) => Number(duration)),
              watched: z.boolean(),
              episodeNumber: z.number().int().positive()
            })
          )
        })
      )
    })
  ]);
  
  