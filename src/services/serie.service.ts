import { Serie } from "../models/serie.model";
import data from "../data/db.json" 

export class SerieService { 
    public static async getAllEpisodesBySerieId(serieId: string): Promise<any[]> {
        const serie = data.medias.find(media => media.id === serieId && media.type === "Serie") as Serie | undefined;

        if (!serie) {
            throw new Error("Série non trouvée");
        }
        
        console.log(serie)

        return serie.seasons.flatMap(Season => Season.episodes)
    }


}

// Utilisation flatMap : https://www.samanthaming.com/tidbits/80-flatmap/  ( Dans la section Community Input)

