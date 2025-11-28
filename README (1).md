🔷 1. Aperçu du projet

Ce projet démontre une chaîne d’authentification complète :

Application Mobile NativeScript
↔
API REST Express (Node.js)
↔
Base de données MySQL

Les fonctionnalités incluent :

Inscription

Connexion

Accès profil de l’utilisateur connecté (JWT)

Déconnexion

Gestion sécurisée du token

Validation des entrées + gestion d’erreurs centrale

Ce dépôt suit une structure monorepo avec :

/api → serveur Express

/mobile → application mobile NativeScript

2. Installation & démarrage — API (Node.js + Express)
2.1. Prérequis

Node.js 18+

MySQL 5.7+ ou MySQL 8

Postman (pour tester les routes)

2.2. Installation
cd api
npm install

2.3. Fichier .env

Créer votre fichier .env :

cp .env.example .env


Remplir :

PORT=3000
JWT_SECRET=votre_secret_jwt
JWT_EXPIRES_IN=24h

DB_HOST=localhost
DB_USER=root
DB_PASSWORD=*****
DB_NAME=auth_app_db


2.4. Initialiser la base de données

Importer le script SQL :

DROP DATABASE IF EXISTS auth_app_db;
CREATE DATABASE auth_app_db;
USE auth_app_db;

CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  full_name VARCHAR(255) NOT NULL,
  role ENUM('user','admin') DEFAULT 'user',
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

2.5. Démarrer l’API
npm run dev


L’API est disponible à :

http://localhost:3000

Pour l’émulateur Android :
http://10.0.2.2:3000

3. Routes API (REST)
Méthode	Endpoint	Description	Auth
POST	/auth/register	Créer un utilisateur
POST	/auth/login	Connecter un utilisateur (JWT)
POST	/auth/logout	"Déconnexion" côté client
GET	/users/me	Profil utilisateur connecté JWT

Exemple — Register
POST /auth/register
{
  "email": "test@example.com",
  "password": "password123",
  "full_name": "John Doe"
}

Exemple — Login
POST /auth/login
{
  "email": "test@example.com",
  "password": "password123"
}


Réponse :

{
  "token": "eyJhbGciOiJIUzI1NiIs..."
}

Exemple — Profil
GET /users/me
Authorization: Bearer <token>


4. Installation & exécution — Application Mobile (NativeScript)
4.1. Prérequis

NativeScript CLI :

npm install -g nativescript


Android Studio (SDK 34, Build-tools 34.x)

4.2. Installation des dépendances
cd mobile
npm install

4.3. Configuration API (important)

Ouvrir :
mobile/app/config/api-config.ts

export const API_BASE_URL = 'http://10.0.2.2:3000';  // émulateur Android

4.4. Autoriser HTTP (Android 9+)

Dans :
App_Resources/Android/src/main/AndroidManifest.xml

Ajouter dans <application> :

android:usesCleartextTraffic="true"
android:networkSecurityConfig="@xml/network_security_config"


Créer :
App_Resources/Android/src/main/res/xml/network_security_config.xml

<?xml version="1.0" encoding="utf-8"?>
<network-security-config>
    <domain-config cleartextTrafficPermitted="true">
        <domain includeSubdomains="true">10.0.2.2</domain>
    </domain-config>
</network-security-config>

4.5. Lancer l'application
ns clean
ns run android


5. Collection Postman

POST [/auth/register]:(http://localhost:3000/auth/register)

POST [/auth/login]:(http://localhost:3000/auth/login)

GET [/users/me]:(http://localhost:3000/users/me)

POST [/auth/logout]:(http://localhost:3000/auth/logout)