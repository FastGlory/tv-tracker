import mongoose from 'mongoose';


export const connectDB = async () => {
    try {
        const mongoUri = process.env.MONGO_URI 
        if (!mongoUri) {
            throw new Error("la variable d'environnement MONGO_URI n'est pas définie");
        }
        await mongoose.connect(mongoUri);
        console.log("Connecté à MongoDB");
    } catch (error) {
        console.error("Erreur de connexion à MongoDB :", error);
        // Arrêter l'application en cas d'erreur de connexion
        process.exit(1);
    }
};