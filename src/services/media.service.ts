import data from "../data/db.json";

const outputFilePath: string =  "./src/data/db.json";
export class MediaService {

  public static async getAllMedia() {
    return data.medias;
  }

  public static async getMediaById(id: string) {
    return data.medias.find((media) => media.id === id);
  }

  // On mets any car cela est possible d'avoir un film ou une série, donc on ne peut pas typer précisément 
  // on plus ca va etre beaucoup plus simple de laisser la possibilité de faire des erreurs a l'utilisateur et de le corriger ensuite
  
  
  
  
  // Ca Protège uniquement des erreurs très très basique, si l'utilisateur arrive a casser ca, il se peut que le post accepte et envoie une valeur null qui peut casser/vider la db. 
  // Je vais intégrer zod plus tard pour faire une validation plus poussée dans le controller
  public static async postMedia(media: any) {
    if (!media.type || !["Film", "Serie"].includes(media.type)) {
      throw new Error("Erreur dans le type");
    }
    if (media.type === "Film") {
      if (!media.id ||!media.title ||!media.genre ||typeof media.duration !== "number" ||typeof media.watched !== "boolean") {
        throw new Error("Film invalide, champs non corrects");
      }
    }
    if (media.type === "Serie") {
      if (!media.id || !media.title || !media.genre || !Array.isArray(media.seasons)) {
        throw new Error("Série invalide, champs non corrects.");
      }
    }
    const exists = data.medias.some((m) => m.id === media.id);
    if (exists) {
      throw new Error("Ce média existe déjà ! (Essayé avec un autre id)");
    }
    data.medias.push(media);

    return media;
  }
}


