import { Media } from './media.model';
export class User {
    public id: string
    public email: string    
    public password: string
    public role: "admin" | "user"
    public favorites: Media[]

    constructor(id: string, email: string, password: string, role: "admin" | "user", favorites: Media[]) {
        this.id = id;
        this.email = email;
        this.password = password;
        this.role = role;
        this.favorites = favorites;
    }

    // Ici on va prendre le paramètre media de type Media. On va ensuite verifier si le média est déjà dans la liste des favoris.

    addFavorite(media: Media): void {
        // ic on verifie si l'id de favoris dans la 
        if (!this.favorites.find(fav => fav.id === media.id)) {
            // Si non on l'ajoute simplement
            this.favorites.push(media);
        } else {
            throw new Error("Favoris est déjà dans la liste.");
        }

    }
    removeFavorite(mediaId: string): void {
        // réduit la taille du code on le mettant dans un const
        // on cherche l'index du média dans la liste des favoris
       const indexFavoris = this.favorites.findIndex(fav => fav.id === mediaId);
       // le -1 ca veut dire que qu'il est pas présent dans la liste
       if (indexFavoris === -1) {
           throw new Error("Le favoris n'est pas dans la liste.");
       } else {
            // Ici on le supprime    
             this.favorites.splice(indexFavoris, 1);
       }
    }
}


// Source : https://www.geeksforgeeks.org/typescript/typescript-array-find-method
// Source : https://stackoverflow.com/questions/15292278/how-do-i-remove-an-array-item-in-typescript
