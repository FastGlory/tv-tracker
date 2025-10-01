import { Serie } from "../models/serie.model";
import { Season } from "../models/season.model";
import { Episode } from "../models/episode.model";
import data from "../data/db.json"

import * as fs from "fs";

const db = "./src/data/db.json";

function  writeToFileDB() {
  fs.writeFileSync(db, JSON.stringify(data, null, 2), "utf-8");
}
export class SerieService { 
    public static async getAllEpisodesBySerieId(serieId: string) {
        const serie = data.medias.find(media => media.id === serieId && media.type === "Serie") as Serie | undefined;

        if (!serie) {
            throw new Error("Série non trouvée");
        }
        
        console.log(serie)

        return serie.seasons.flatMap(Season => Season.episodes)
    }

    public static async addSeason(serieId : string, nouvelleSaison : Season){
        const serie = data.medias.find(media => media.id === serieId && media.type === "Serie") as Serie | undefined;
        if (!serie) {
            throw new Error("Série non trouvée");
        }
        const alreadyExist = serie.seasons.find(season => season.seasonNumber === nouvelleSaison.seasonNumber)
        if(alreadyExist){
            throw new Error("Saison déjà présente");
        }
        serie.seasons.push(nouvelleSaison)
        writeToFileDB()
        return nouvelleSaison
    }

    public static async addEpisode(serieId : string, seasonNumber: number, nouvelleEpisode : Episode){
        const serieExist = data.medias.find(media => media.id === serieId && media.type === "Serie") as Serie | undefined;
        if (!serieExist) {
            throw new Error("Série non trouvée");
        }
        const seasonExist = serieExist.seasons.find(saison => saison.seasonNumber === seasonNumber)
        if(!seasonExist){
            throw new Error("Saison non trouvée");
        }

        seasonExist.episodes.push(nouvelleEpisode);
        writeToFileDB();
        return nouvelleEpisode
    }

    public static async patchEpisodeWatch(serieId : string, seasonNumber: number,episodeId : string ){
        const serieExist = data.medias.find(media => media.id === serieId && media.type === "Serie") as Serie | undefined;
        if (!serieExist) {
            throw new Error("Série non trouvée");
        }
        const seasonExist = serieExist.seasons.find(saison => saison.seasonNumber === seasonNumber)
        if(!seasonExist){
            throw new Error("Saison non trouvée");
        }

        const episode = seasonExist.episodes.find(episode => episode.id === episodeId);
        if (!episode) {
            throw new Error("Épisode non trouvé");
        }
        
        episode.watched = true;
        writeToFileDB()
        return episode



    }




}

// Utilisation flatMap : https://www.samanthaming.com/tidbits/80-flatmap/  ( Dans la section Community Input)

