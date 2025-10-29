import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import  UserModels  from '../models/user.models'; 
const SECRET_KEY = process.env.JWT_SECRET || 'your_secret_key';
const TOKEN_EXPIRATION = '1h';

export class AuthentificationService {

    


    static async registerUser(email: string, nom: string, username: string, password: string) {


        const existingUser = await UserModels.findOne({ email });
        if (existingUser) {
            throw new Error('Email ou nom d\'utilisateur déjà utilisé');
        }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const passwordRegex =/^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_\-+={}[\]|:;"'<>,.?/`~])[A-Za-z\d!@#$%^&*()_\-+={}[\]|:;"'<>,.?/`~]{8,}$/;

        if (!emailRegex.test(email)) {
            throw new Error('Format d\'email invalide');
        }
        if (!passwordRegex.test(password)) {
            throw new Error('Le mot de passe doit contenir au moins 8 caractères, une majuscule, un chiffre et un caractère spécial');
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        // pas besoin de mettre role vu qu'on a une valeur par défaut dans le model
        const user = new UserModels({ email, nom, username, password: hashedPassword });
        await user.save();
        const token = jwt.sign({ id: user._id }, SECRET_KEY, { expiresIn: TOKEN_EXPIRATION });
        return { token };
    }
    static async loginUser(email: string, password: string) {
        const user = await UserModels.findOne({ email });
        if (!user) {
            throw new Error('Utilisateur non trouvé');
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            throw new Error('Mot de passe incorrect');
        }
        const token = jwt.sign({ username: user.username }, SECRET_KEY, { expiresIn: TOKEN_EXPIRATION });
        return { token };
    }

    public static async verifyToken(token: string) {
    try {
      return jwt.verify(token, SECRET_KEY);
    } catch {
      throw new Error('Token invalide ou expiré');
    }
  }

}
