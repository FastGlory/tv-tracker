import { Serie } from "../models/serie.model";
import data from "../data/db.json" 

export class SerieService { 


    public static async getAllEpisodesBySerieId(serieId: string) : Promise<Serie | undefined> {
        return data.medias.find(media => media.id === serieId && media.type === "serie") as Serie | undefined;
    }
    

}

