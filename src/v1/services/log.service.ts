import * as fs from "fs";
import * as path from "path";


const cheminForLog = path.resolve(__dirname, "../logs/app.log");


export class  LogService { 
    public static async getLastLog() {
    const logValues = fs.readFileSync(cheminForLog, 'utf8');
    const logFormated = logValues.split('\n')
    if(logFormated.length === 0 ){
        throw new Error("oups...pas de log pour l'instant ! ");
    }

    // pourquoi -3 ? 
    // si on fait -1 on récupère un \n donc un valeur null, si on fait -2 on récupère /api/log 
    // ce qui n'est pas intéressant par conséquend nous devons faire -3
    
    const logLastLigne =logFormated[logFormated.length - 3];
    console.log("last log from log ; " + logLastLigne)
    return logLastLigne;
  }
}