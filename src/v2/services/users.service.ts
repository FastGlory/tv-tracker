import UserModel from "../models/user.models";

export class UsersService {
  static async getCurrentUser(userId: string) {
    const user = await UserModel.findById(userId).select("-password");
    if (!user) {
      throw new Error("Utilisateur non trouvé");
    }
    return user;
  }

  static async patchCurrentUser(userId: string, data: any) {
    const usernameRegex = /^[a-zA-Z0-9._-]{3,30}$/;

    const patchUser: any = {};

    // Validation et mise à jour du username
    if (data.username) {
      if (!usernameRegex.test(data.username)) {
        throw new Error("Nom d'utilisateur invalide (3–30 caractères alphanumériques ._- autorisés)");
      }
      patchUser.username = data.username;
    }

    // Mise à jour des favoris 
    if (data.favorites) {patchUser.favorites = data.favorites;}

    const user = await UserModel.findByIdAndUpdate(userId, patchUser, {new: true,runValidators: true,}).select("-password");

    if (!user) {
      throw new Error("Utilisateur introuvable pour mise à jour");
    }

    return user;
  }

  static async getUserById(userId: string) {
    const user = await UserModel.findById(userId).select("-password");
    if (!user) {
      throw new Error("Utilisateur non trouvé");
    }
    return user;
  }
}

// https://mongoosejs.com/docs/validation.html#update-validators
