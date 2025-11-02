import MovieModel from '../models/movie.models';

export class MoviesService {
    public static async getMovieFilters( title?: string,genre?: string,minYear?: number,maxDur?: number,page: number = 1,limit: number = 100) {
        const filter: any = {};

        if (title) {
            filter.title = { $regex: title, $options: 'i' }; // Recherche insensible à la casse
        }

        if (genre) {
            filter.genres = { $regex: genre, $options: 'i' }; // Recherche insensible à la casse
        }

        if (minYear) {
        // on va débuter à l'année de départ
        const startDate = new Date(`${minYear}-01-01`);
        filter.releaseDate = { $gte: startDate };
        }

        if (maxDur) {
        filter.durationMin = { $lte: maxDur };
        }
        const skip = (page - 1) * limit;
        const movies = await MovieModel.find(filter).skip(skip).limit(limit);
        return movies;
    }

    public static async getMovieById(movieId: string) {
        const movie = await MovieModel.findById(movieId);
        if (!movie) {
            throw new Error("Film non trouvé");
        }
        return movie;
    }


    public static async postMovie(data: any) {
        const Movie = new MovieModel({
            title: data.title,
            genres: data.genres,
            synopsis: data.synopsis,
            releaseDate: data.releaseDate,
            durationMin: data.durationMin
        });
        await Movie.save();
        return Movie;
    }

    public static async patchMovie(movieId: string, data: any) {
        const patchMovie: any = {};
        if (data.title) {
            patchMovie.title = data.title;
        }
        if (data.genre) {
            patchMovie.genres = data.genre;
        }
        if (data.releaseDate) {
            patchMovie.releaseDate = data.releaseDate;
        }
        if (data.durationMin) {
            patchMovie.durationMin = data.durationMin;
        }
        if (data.durationMax) {
            patchMovie.durationMax = data.durationMax;
        }

        const updatedMovie = await MovieModel.findByIdAndUpdate(movieId, patchMovie, { new: true, runValidators: true });
        if (!updatedMovie) {
            throw new Error("Film non trouvé");
        }
        return updatedMovie;
    
    }

    public static async deleteMovie(movieId: string) {
        const deletedMovie = await MovieModel.findByIdAndDelete(movieId);
        if (!deletedMovie) {
            throw new Error("Film non trouvé");
        }
        return deletedMovie;
    }
}


// https://mongoosejs.com/docs/queries.html
// J'ai plus la source de skip limit mais c'est dans la doc mongoose aussi