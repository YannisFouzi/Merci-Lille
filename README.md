# Merci Lille - Frontend

![React](https://img.shields.io/badge/React-18.2-blue?logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?logo=typescript)
![Vite](https://img.shields.io/badge/Vite-5.4-purple?logo=vite)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.4-blue?logo=tailwindcss)

Application web du site Merci Lille : page publique, dashboard admin, galerie, contact et synchronisation Shotgun.

## Table des matieres

- [Apercu](#apercu)
- [Mises a jour 2026](#mises-a-jour-2026)
- [Stack](#stack)
- [Installation](#installation)
- [Scripts](#scripts)
- [Structure](#structure)
- [Admin](#admin)
- [Authentification](#authentification)
- [Synchronisation Shotgun](#synchronisation-shotgun)
- [Configuration](#configuration)
- [Deploiement](#deploiement)
- [Notes](#notes)

## Apercu

Le frontend couvre aujourd'hui :

- le site public avec home, evenements, galerie et contact
- un dashboard admin pour les events et la galerie
- une authentification admin basee sur cookies httpOnly + refresh
- une synchronisation Shotgun avec preview detaillee
- une interface admin alignee visuellement avec les cartes publiques

## Mises a jour 2026

- Migration de l'outillage vers Vite 5 et API moderne Sass.
- Configuration Vite renommee en `vite.config.mts`.
- `/admin` redirige automatiquement vers `/admin/events`.
- `AuthContext` est maintenant la source de verite unique pour la session admin.
- Le login et le logout admin passent tous les deux par `AuthContext`.
- La redirection apres login renvoie vers la route admin initialement demandee.
- Le rendu des cartes admin reutilise la meme base visuelle que la page publique.
- Le tri admin suit le meme principe que le site public : ordre manuel si defini, sinon date du plus recent au plus ancien.
- Sur la page d'accueil, `Evenements a venir` apparait avant `Evenements phares`.
- La preview Shotgun affiche maintenant un vrai resume metier : total analyse, nombre a ajouter, nombre a mettre a jour, liste des creations et details `avant / apres`.
- `Synchroniser tout` passe par une preview locale du rendu final dans la grille admin avant validation.
- `Renumeroter` est de nouveau disponible, avec preview locale puis validation.
- La renumerotation attribue maintenant le plus grand numero au haut de la liste.

## Stack

### Core

- React 18
- TypeScript 5
- Vite 5
- React Router 6

### UI et styles

- TailwindCSS
- Framer Motion
- GSAP
- Sass
- Styled Components

### Data et formulaires

- TanStack Query
- Axios
- React Hook Form
- Zod

## Installation

### Prerequis

- Node.js 18+
- backend `backend-merci-lille` configure et lance

### Setup

```bash
cd frontend-merci-lille
npm install
cp .env.example .env.local
npm run dev
```

Application disponible sur `http://localhost:5173`.

## Scripts

```bash
npm run dev
npm run build
npm run preview
```

## Structure

```text
frontend-merci-lille/
|-- public/
|-- src/
|   |-- components/
|   |   |-- Admin/
|   |   `-- ShotgunEvents/
|   |-- contexts/
|   |-- hooks/
|   |-- services/
|   |-- utils/
|   |-- page/
|   `-- index.tsx
|-- dist/
|-- vite.config.mts
|-- tsconfig.json
`-- package.json
```

Fichiers a connaitre :

- `src/page/App.tsx` : routing principal
- `src/contexts/AuthContext.tsx` : session admin
- `src/components/Admin/EventsManagement.tsx` : ecran principal de gestion des events
- `src/components/Admin/ShotgunSync.tsx` : preview et validation de la sync Shotgun
- `src/components/ShotgunEvents/components/EventCard/EventCard.tsx` : base visuelle partagee par les cartes publiques et admin
- `src/services/api.ts` : client Axios, CSRF, refresh automatique

## Admin

### Routes

- `/admin` -> redirection vers `/admin/events`
- `/admin/login`
- `/admin/events`
- `/admin/gallery`

### Gestion des evenements

Le dashboard `/admin/events` permet :

- CRUD complet
- upload d'images
- drag and drop de l'ordre manuel
- masquage / affichage
- marquage `phare`
- selection multiple
- synchronisation Shotgun
- renumerotation avec preview locale

Comportements importants :

- les cartes admin affichent les memes infos de base que la page publique
- les numeros caches ou temporaires ne sont pas affiches comme de vrais numeros
- la renumerotation manuelle donne le plus grand numero au premier event visible

### Gestion de la galerie

Le dashboard `/admin/gallery` permet :

- upload multiple
- reorganisation par drag and drop
- suppression unitaire ou multiple

## Authentification

Le frontend utilise `AuthContext` comme source de verite pour l'etat de session.

Etat principal :

```ts
type AuthStatus = "loading" | "authenticated" | "unauthenticated" | "expired";
```

Le flux actuel :

- verification initiale de session au chargement
- `PrivateRoute` bloque les routes admin si le statut n'est pas `authenticated`
- la route demandee est conservee dans `location.state`
- apres login, l'utilisateur est renvoye vers cette route
- logout via `AuthContext.logout()`

Le client API :

- ajoute `X-Requested-With` sur les requetes mutantes
- recupere et renvoie le token CSRF
- gere le refresh automatique en cas de `401` expire
- notifie le contexte d'auth en cas de session invalide

## Synchronisation Shotgun

### Cote public

La page d'accueil affiche :

- les evenements a venir
- ensuite les evenements phares
- ensuite les evenements passes

### Cote admin

Le bloc Shotgun dans `/admin/events` supporte maintenant deux niveaux de preview.

#### `Previsualiser`

Affiche un resume detaille :

- total d'evenements analyses
- nombre a ajouter
- nombre a mettre a jour
- titres des events a ajouter
- details `avant / apres` des champs modifies pour les events a mettre a jour

#### `Synchroniser tout`

Le bouton :

1. recupere une preview backend
2. applique une preview locale dans la grille admin
3. bloque les actions d'edition pendant cet apercu
4. attend une validation explicite avant ecriture

Cela permet de voir le rendu final avant import reel.

#### `Renumeroter`

Le bouton :

1. simule la renumerotation dans la grille admin
2. attribue le plus grand numero au haut de la liste
3. ne persiste rien tant que la validation finale n'est pas faite

## Configuration

### Variables d'environnement

Creer `.env.local` :

```env
VITE_APP_API_URL=http://localhost:3000/api
```

Exemple de cible de production :

```env
VITE_APP_API_URL=https://api.mercilille.com/api
```

### Proxy de developpement

`vite.config.mts` configure un proxy local vers le backend :

```ts
server: {
  proxy: {
    "/api": {
      target: "http://localhost:3000",
      changeOrigin: true,
    },
  },
}
```

Le meme fichier force aussi l'API moderne de Sass pour eviter les warnings `legacy-js-api`.

## Deploiement

Build production :

```bash
npm run build
```

Points a retenir :

- penser a configurer `VITE_APP_API_URL`
- le frontend attend une API backend compatible cookies et CSRF
- le build regenere `dist/`, qui est actuellement suivi dans ce projet

## Notes

- Le tri admin et le tri public ne sont plus deux systemes distincts.
- La numerotation visible et l'ordre de drag and drop ne doivent pas etre confondus : le site affiche selon l'ordre ou la date, puis la renumerotation permet de remettre les `#` en coherence.
- La synchronisation `shotnotif -> Merci Lille` est documentee cote backend, pas dans ce README frontend.
