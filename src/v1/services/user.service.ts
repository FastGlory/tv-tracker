import data from "../data/db.json";

export class UserService {

    public static getFavoriteByUserId(id: string) {
        const user = data.users.find(user => user.id === id);
        if (user) {
            return user.favorites;
        }
        return [];
    }


}