# 🎬 TV Tracker – API Médias

> Une **API RESTful** développée avec **Node.js**, **Express** et **TypeScript** pour gérer un catalogue de **films**, **séries**, **saisons** et **épisodes**.  
> Les données sont stockées dans un fichier **JSON local** jouant le rôle de **base de données simulée**.

---

<p align="center">
  <img src="https://img.shields.io/badge/Node.js-18+-green?style=for-the-badge&logo=node.js" />
  <img src="https://img.shields.io/badge/Express.js-Framework-blue?style=for-the-badge&logo=express" />
  <img src="https://img.shields.io/badge/TypeScript-💙-blue?style=for-the-badge&logo=typescript" />
  <img src="https://img.shields.io/badge/Postman-API-orange?style=for-the-badge&logo=postman" />
</p>

---

## ⚙️ Prérequis

- ✅ **Node.js** ≥ 18  
- ✅ **npm** ou **yarn**  
- ✅ **Postman** (ou tout autre client HTTP)

---

## 🚀 Installation

```bash
# 1. Cloner le projet
git clone https://github.com/FastGlory/tv-tracker.git
cd tv-tracker

# 2. Installer les dépendances
npm i
```

---

## ▶️ Lancer le projet

En mode développement (avec rechargement automatique) :

```bash
npm start
```

---

## 📚 Endpoints disponibles

### 🎥 Médias
| ⚡ Méthode | 🌍 Route            | 📝 Description                                    |
|-----------|--------------------|--------------------------------------------------|
| **GET**   | `/api/media`       | Lister tous les contenus                         |
| **GET**   | `/api/media/:id`   | Récupérer un contenu par son identifiant         |
| **GET**   | `/api/mediaFilter` | Filtrer les contenus (par type, genre, année, …) |
| **POST**  | `/api/media`       | ➕ Ajouter un contenu                             |
| **PUT**   | `/api/media/:id`   | 🔄 Modifier un contenu                            |
| **DELETE**| `/api/media/:id`   | ❌ Supprimer un contenu                           |

---

### 📺 Séries
| ⚡ Méthode | 🌍 Route                                                        | 📝 Description                                   |
|-----------|----------------------------------------------------------------|-------------------------------------------------|
| **GET**   | `/api/series/:id/episodes`                                     | 🎬 Lister tous les épisodes d’une série         |
| **POST**  | `/api/series/:id/seasons`                                      | ➕ Ajouter une saison à une série               |
| **POST**  | `/api/series/:id/episodes`                                     | 🎞️ Ajouter un épisode à une série              |
| **PATCH** | `/api/series/:serieId/seasons/:seasonNumber/episodes/:episodeId` | 🛠️ Mettre à jour les infos d’un épisode        |

---

### 👤 Utilisateurs
| ⚡ Méthode | 🌍 Route                      | 📝 Description                                   |
|-----------|------------------------------|------------------------------------------------|
| **GET**   | `/api/users/:id/favorites`   | ⭐ Obtenir tous les médias favoris d’un utilisateur |

---

### 📝 Logs
| ⚡ Méthode | 🌍 Route | 📝 Description |
|-----------|----------|----------------|
| **GET**   | `/api/log` | 📜 Récupérer la dernière ligne du fichier de logs |

---

## 💾 Structure des données (`db.json`)

- 🎥 **medias** — Films, séries et mini-séries  
- 👤 **users** — Liste des utilisateurs  
- 📺 **seasons** — Informations sur les saisons  
- 🎞️ **episodes** — Informations sur les épisodes  

⚠️ **Note** : Les données sont générées automatiquement par une **IA** et fournies à titre d’exemple. + Le readMe pour le style (modification faites) 

---

## 📁 Collection Postman

👉 Importez la collection Postman pour tester rapidement tous les endpoints :  
🔗 [Lien vers la collection](https://documenter.getpostman.com/view/48233777/2sB3QDwDRA)

---

## 👨‍💻 Auteur

**Juba Redjradj** ✨  


<p align="center">
  🙏 100 % pour le tp s'il vous plait...🙏
</p>

