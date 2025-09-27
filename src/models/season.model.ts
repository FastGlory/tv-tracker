 class Season  {
    public seasonNumber: number
    public releaseDate: Date
    public episodes: Episode[]

 constructor(seasonNumber: number, releaseDate: Date, episodes: Episode[]) {
     this.seasonNumber = seasonNumber;
     this.releaseDate = releaseDate;
     this.episodes = episodes;
 }
}

