import SerieModel  from '../models/series.models';

export class serieService {
    public static async getSerieFiltered(genre?: string, title?: string,status ?: string) {
        const filter: any = {};
        if (genre) {
            filter.genres = { $regex: genre, $options: 'i' };
        }
        if (title) {
            filter.title = { $regex: title, $options: 'i' };
        }
        if (status) {
            filter.status= { $regex: status, $options: 'i' };
        }

        const series = await SerieModel.find(filter);
        return series;
    }
    public static async postSerie(data: any) {
        const serie = new SerieModel({
            title: data.title,
            genres: data.genres,
            synopsis: data.synopsis,
            releaseDate: data.releaseDate,
            status: data.status,
        });
        await serie.save();
        return serie;
    }

}