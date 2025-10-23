export abstract class Media {
    public id: string
    public title: string
    public genre: string
    public plateform: string
    public year: number
    public rating: number

    constructor(id: string, title: string, genre: string, year: number, rating: number , plateform: string) {
        this.id = id;
        this.title = title;
        this.genre = genre;
        this.year = year;
        this.rating = rating;
        this.plateform = plateform;
    }

    getSummary(): string {
        return `${this.title} (${this.year}) - Genre: ${this.genre}, Rating: ${this.rating}/10, Plateforme: ${this.plateform}`;
    }
 
}
