import express from "express";
import https from "https";
import http from "http";
import fs from "fs";
import path from "path";
import config from "config";
import app from "./app"; 

const httpsPort = config.get<number>("server.https.port");
const httpPort = config.get<number>("server.http.port");

const keyPath = path.join(__dirname, "../cert/key.pem");
const certPath = path.join(__dirname, "../cert/cert.pem");

if (!fs.existsSync(keyPath) || !fs.existsSync(certPath)) {
  console.error("❌ Certificat ou clé manquants. Générez-les avec openssl.");
  process.exit(1);
}

const options = {
  key: fs.readFileSync(keyPath),
  cert: fs.readFileSync(certPath),
};

app.use(express.json());

app.get("/", (req, res) => {
  res.send("✅ Connexion HTTPS sécurisée !");
});

https.createServer(options, app).listen(httpsPort, () => {
  console.log(`🔒 Serveur HTTPS actif sur https://localhost:${httpsPort}`);
});

http.createServer((req, res) => {
  const redirectUrl = `https://localhost:${httpsPort}${req.url}`;
  res.writeHead(301, { Location: redirectUrl });
  res.end();
}).listen(httpPort, () => {
  console.log(`🌐 Serveur HTTP actif sur http://localhost:${httpPort}`);
});
