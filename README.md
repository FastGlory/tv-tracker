# 🎬 TV Tracker – API Médias v2 (Sécurisée)

> Une **API RESTful** professionnelle développée avec **Node.js**, **Express** et **TypeScript**, connectée à **MongoDB**, et sécurisée par **JWT**, **CORS**, **rôles**, **rate-limiting** et **HTTPS**.
> Cette version **v2** fait évoluer le projet du **TP1** vers une architecture complète, persistante et configurable par environnement.

---

<p align="center">
  <img src="https://img.shields.io/badge/Node.js-18+-green?style=for-the-badge&logo=node.js" />
  <img src="https://img.shields.io/badge/Express.js-Framework-blue?style=for-the-badge&logo=express" />
  <img src="https://img.shields.io/badge/TypeScript-💙-blue?style=for-the-badge&logo=typescript" />
  <img src="https://img.shields.io/badge/MongoDB-Database-green?style=for-the-badge&logo=mongodb" />
  <img src="https://img.shields.io/badge/JWT-Security-red?style=for-the-badge&logo=jsonwebtokens" />
  <img src="https://img.shields.io/badge/Postman-Tests-orange?style=for-the-badge&logo=postman" />
</p>

---

## 🧠 Objectif du TP2

Le **TP2 – Gestion d’une application de suivi de médias (séries et films)** a pour but d’évoluer une API vers un service complet, sécurisé et documenté.
Cette version **v2** introduit :

* 🔐 Authentification **JWT** et gestion de **rôles (user/admin)**
* 🧩 **Versionnement** des routes (`/api/v1` et `/api/v2`)
* ⚙️ **Configuration multi-environnements** via `config/` et `.env`
* 🧱 **Persistance MongoDB** avec **Mongoose** et validations (regex + schéma)
* 🧮 **Agrégations** pour calculer les moyennes de notations
* 🚦 **Sécurité complète** : CORS, HTTPS, rate-limiting et redirection automatique

---

## ⚙️ Prérequis

* ✅ **Node.js** ≥ 18
* ✅ **MongoDB Atlas** ou instance locale
* ✅ **Postman** (pour tester les endpoints v2)

---

## 🚀 Installation & Configuration

```bash
# 1. Cloner le projet
git clone https://github.com/FastGlory/tv-tracker.git
cd tv-tracker

# 2. Installer les dépendances
npm install

# 3. Créer un fichier .env à partir de l’exemple
cp .env.example .env

# Générer les certificats auto-signés (valide 365 jours)
mkdir cert
openssl req -x509 -nodes -days 365 -newkey rsa:2048 \
  -keyout cert/key.pem -out cert/cert.pem \
  -subj "/C=CA/ST=Quebec/L=Montreal/O=TVTracker/OU=Dev/CN=localhost"


# 4. Lancer le serveur
npm run dev
```

---

## 🧩 Structure de configuration (`config/`)

| Fichier                             | Description                                      |
| ----------------------------------- | ------------------------------------------------ |
| `default.json`                      | Configuration de base (ports, JWT, CORS, etc.)   |
| `development.json`                  | Config pour le mode développeur                  |
| `test.json`                         | Config de test (identique à dev)                 |
| `production.json`                   | HTTPS, redirection et sécurisation               |
| `custom-environment-variables.json` | Liaison entre variables `.env` et config interne |

---

## 🔐 Sécurité intégrée

* **Authentification JWT** : `Authorization: Bearer <token>`
* **Rôles** :

  * `admin` : CRUD complet sur films/séries/saisons/épisodes
  * `user` : lecture, filtres, notations et recommandations
* **HTTPS** : redirection automatique (HTTP → HTTPS)
* **CORS** : origines autorisées (localhost ou front spécifique)
* **Rate Limiting** : sur `/auth/login` et `/ratings`
* **Validation Zod** : regex, min/max, enum, pattern strict

---

## 📚 Endpoints v2 disponibles

### 🔑 Authentification & Utilisateurs

| Méthode   | Route                   | Description                                 |
| --------- | ----------------------- | ------------------------------------------- |
| **POST**  | `/api/v2/auth/register` | Inscription d’un nouvel utilisateur         |
| **POST**  | `/api/v2/auth/login`    | Connexion (retourne un JWT)                 |
| **GET**   | `/api/v2/users/me`      | Récupérer son profil (JWT requis)           |
| **PATCH** | `/api/v2/users/me`      | Modifier son profil / favoris               |
| **GET**   | `/api/v2/users/:id`     | Récupérer un utilisateur (admin uniquement) |

---

### 🎬 Films

| Méthode    | Route                | Description                                            |
| ---------- | -------------------- | ------------------------------------------------------ |
| **GET**    | `/api/v2/movies`     | Liste paginée avec filtres (genre, année, durée, etc.) |
| **GET**    | `/api/v2/movies/:id` | Détails d’un film                                      |
| **POST**   | `/api/v2/movies`     | ➕ Ajouter un film (admin)                              |
| **PATCH**  | `/api/v2/movies/:id` | 🛠️ Modifier un film (admin)                           |
| **DELETE** | `/api/v2/movies/:id` | ❌ Supprimer un film (admin)                            |

---

### 📺 Séries, Saisons & Épisodes

| Méthode  | Route                                                 | Description                                           |
| -------- | ----------------------------------------------------- | ----------------------------------------------------- |
| **GET**  | `/api/v2/series`                                      | Lister les séries avec filtres (titre, genre, statut) |
| **POST** | `/api/v2/series`                                      | ➕ Créer une série (admin)                             |
| **POST** | `/api/v2/series/:seriesId/seasons`                    | ➕ Ajouter une saison à une série (admin)              |
| **POST** | `/api/v2/series/:seriesId/seasons/:seasonId/episodes` | 🎞️ Ajouter un épisode (admin)                        |
| **GET**  | `/api/v2/series/:seriesId/seasons/:seasonId/episodes` | 🎬 Lister les épisodes / filtrer par durée            |

---

### ⭐ Notations (Ratings)

| Méthode  | Route                                  | Description                                             |
| -------- | -------------------------------------- | ------------------------------------------------------- |
| **POST** | `/api/v2/ratings`                      | Ajouter une note (user)                                 |
| **GET**  | `/api/v2/ratings/avg/movie/:movieId`   | Moyenne des notes d’un film                             |
| **GET**  | `/api/v2/ratings/avg/series/:seriesId` | Moyenne des notes d’une série (agrégation par épisodes) |

---

### 🤖 Recommandations

| Méthode | Route                                  | Description                         |
| ------- | -------------------------------------- | ----------------------------------- |
| **GET** | `/api/v2/reco/movies/similar/:movieId` | Recommandations de films similaires |

---

## 🧠 Validation & Schémas

Chaque entité est validée par **Zod** et **Mongoose** :

* `User` : email, username, mot de passe hashé, rôle, favoris
* `Movie` : titre (regex), genres[], durée (1–600 min)
* `Series` : statut `ongoing | ended`, genres[]
* `Season` : numérotation ≥1
* `Episode` : durée 1–300 min, titre regex
* `Rating` : score 0–10, review ≤2000 caractères (HTML nettoyé)

---

## 🔒 Exemple de configuration sécurisée (extrait)

```json
{
 "app": { "basePath": "/api" },
 "server": {
   "http": { "enabled": true, "port": 3000 },
   "https": { "enabled": true, "port": 3333, "redirectAllHttpToHttps": true }
 },
 "db": { "uri": "mongodb+srv://<user>:<pwd>@cluster.mongodb.net/tv-tracker-db" },
 "security": {
   "jwt": { "secret": "dev-secret", "expiresIn": "1h" },
   "cors": { "origins": ["http://localhost:3000", "https://localhost:3333"] },
   "rateLimit": { "windowMs": 900000, "max": 100 }
 }
}
```

---

## 🗡️ Attaque par DDOS

```bash
for i in {1..120}; do curl -s -o /dev/null -w "%{http_code}\n" http://localhost:3000/api/v2/movies; done

seq 1 120 | xargs -n1 -P20 -I{} curl -s -o /dev/null -w "%{http_code}\n" -k https://localhost:3333/api/v2/movies
```


## 🧪 Collection Postman

Une collection complète a été créée pour tester :

* ✅ Cas de succès / erreur / rôles
* ✅ Validation Zod
* ✅ Pagination & filtres
* ✅ Moyennes & agrégations

## 📁 Collection Postman

👉 Importez la collection Postman pour tester rapidement tous les endpoints :  
🔗 [Lien vers la collection](https://documenter.getpostman.com/view/33928412/2sB3WpRg7G#b3456fb1-3634-4d42-9320-69ba3fcfd71c)
---

## 📘 Documentation Swagger

| Version | URL        | Description                                        |
| ------- | ---------- | -------------------------------------------------- |
| v1      | `/docs/v1` | Ancienne API (lecture seule, dépréciée)            |
| v2      | `/docs/v2` | API complète avec modèles, validations et sécurité |

---

## 👨‍💻 Auteur

**Juba Redjradj**
Développé dans le cadre du cours **420-514 – Collecte et interprétation de données (Cégep Marie-Victorin)**

<p align="center">
  🚀 API complète, sécurisée et documentée – 100 % TP2 validé 💪
</p>
