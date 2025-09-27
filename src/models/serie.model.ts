import { Media } from './media.model';
import { Season } from './season.model';
export class Serie extends Media {
    public status: "En cours" | "Terminée"
    public seasons: Season[]

    constructor(id: string, title: string, genre: string, year: number, rating: number, status: "En cours" | "Terminée", seasons: Season[]) {
        super(id, title, genre, year, rating,"");
        this.status = status;
        this.seasons = seasons;
    }

}


