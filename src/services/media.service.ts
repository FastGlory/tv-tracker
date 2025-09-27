import data from '../data/db.json';
export class MediaService {
    getAllMedia() {
        return data.medias;
    }

    getMediaById(id: string) {
        return data.medias.find((media: { id: string; }) => media.id === id);
    }

}


