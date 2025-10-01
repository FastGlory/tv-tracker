import data from "../data/db.json";
import * as fs from "fs";

const db = "./src/data/db.json";

function  writeToFileDB() {
  fs.writeFileSync(db, JSON.stringify(data, null, 2), "utf-8");
}
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
  // Je vais intégrer zod plus tard pour faire une validation plus poussée
  
 // Possiblemment enlevé toute les vérifications ici vu que on le fait déjà dans le zod.middleware.ts
  public static async postMedia(media: any) {
    const typeList = ["Film", "Serie"];
    if (!media.type || !typeList.includes(media.type)) {
      throw new Error("Erreur dans le type");
    }
    if (media.type === "Film") {
      if (!media.id ||!media.title ||!media.genre ||typeof media.duration !== "number" ||typeof media.watched !== "boolean") {
        throw new Error("Film invalide, champs non corrects");
      }
    }
    if (media.type === "Serie") {
        if (!media.id || !media.title || !media.genre || !media.seasons) {
        throw new Error("Série invalide");
        }
    }
    const exists = data.medias.find(m => m.id === media.id);
    if (exists) {
        throw new Error("Ce média existe déjà !");
    }

    data.medias.push(media);
    writeToFileDB();

    return media;
  }

  public static async deleteMedia(id: string) {
    const index = data.medias.findIndex((media) => media.id === id);
    if (index === -1) {
      throw new Error("Média non trouvé");
    }
    data.medias.splice(index, 1);
    writeToFileDB();
    return true;
  }
  


public static async updateMedia(id: string, mediaChanging: any) {
  const index = data.medias.findIndex((media) => media.id === id);
  if (index === -1) {
    throw new Error("Média non trouvé");
  }

  data.medias[index] = mediaChanging;
  writeToFileDB();
  return data.medias[index];
}



}

// https://stackoverflow.com/questions/35546421/how-to-get-a-variable-type-in-typescript pour le typeof




