import { Schema, model, Document } from 'mongoose';
import bcrypt from 'bcryptjs';

export interface IUser extends Document {
  email: string;
  nom: string;
  username: string;
  password: string;
  role: 'user' | 'admin';
  favorites?: Schema.Types.ObjectId[];
  isValidPassword(password: string): Promise<boolean>;
}

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const usernameRegex = /^[a-zA-Z0-9._-]{3,30}$/;
const nomRegex = /^[A-Za-z\s]+$/;
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;

const UserSchema = new Schema<IUser>(
  {
    email: { type: String, required: true, unique: true, match: emailRegex },
    nom: { type: String, required: true, match: nomRegex },
    username: { type: String, required: true, unique: true, match: usernameRegex },
    password: { type: String, required: true, match: passwordRegex },
    role: { type: String, enum: ['user', 'admin'], default: 'user' },
    favorites: [{ type: Schema.Types.ObjectId, ref: 'Movie' }],
  },
  { timestamps: true }
);

UserSchema.pre<IUser>('save', async function (next) {
  try {
    if (!this.isModified('password')) return next();
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (err) {
    next(err as any);
  }
});

UserSchema.methods.isValidPassword = async function (password: string): Promise<boolean> {
  return bcrypt.compare(password, this.password);
};

const UserModel = model<IUser>('User', UserSchema);
export default UserModel;

// https://medium.com/@finnkumar6/mastering-user-authentication-building-a-secure-user-schema-with-mongoose-and-bcrypt-539b9394e5d9