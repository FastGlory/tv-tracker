class Episode {
    public id: string
    public title: string
    public duration: number
    public episodeNumber: number
    public watched: boolean

    constructor(id: string, title: string, duration: number, episodeNumber: number, watched: boolean) {
        this.id = id
        this.title = title
        this.duration = duration
        this.episodeNumber = episodeNumber
        this.watched = watched
    }
}