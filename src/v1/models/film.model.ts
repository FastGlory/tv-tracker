import { Media } from './media.model';

export class Film extends Media {
    public duration: number
    public watched: boolean

    constructor(id: string,title: string,genre: string,year: number,rating: number,duration: number, watched: boolean) {
        super(id, title, genre, year, rating,"");
        this.duration = duration;
        this.watched = watched;
    }
}


// Source Heritage : https://www.typescripttutorial.net/typescript-tutorial/typescript-inheritance