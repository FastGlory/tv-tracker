
import * as fs from "fs";
import data from "../data/db.json";
const dbPath = "./src/data/db.json";

export class jsonDBService {
  static save() {
    fs.writeFileSync(dbPath, JSON.stringify(data, null, 2), "utf-8");
  }
}

// Source : https://codesignal.com/learn/courses/hierarchical-and-structured-data-formats-in-ts/lessons/writing-json-files-using-typescript-and-nodejs
