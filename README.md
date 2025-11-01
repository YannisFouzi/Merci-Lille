# 🎉 Merci Lille - Frontend

![React](https://img.shields.io/badge/React-18.2-blue?logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?logo=typescript)
![Vite](https://img.shields.io/badge/Vite-4.4-purple?logo=vite)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.4-blue?logo=tailwindcss)

Application web moderne pour la gestion et la présentation d'événements électro à Lille. Site vitrine avec système d'administration complet.

## 📋 Table des matières

- [Aperçu](#-aperçu)
- [Technologies](#-technologies)
- [Installation](#-installation)
- [Scripts disponibles](#-scripts-disponibles)
- [Structure du projet](#-structure-du-projet)
- [Fonctionnalités](#-fonctionnalités)
- [Configuration](#-configuration)
- [Déploiement](#-déploiement)

## 🎯 Aperçu

Merci Lille est une plateforme complète pour la gestion d'événements musicaux comprenant :

- **Site vitrine** : Présentation des événements, galerie photos, formulaire de contact
- **Dashboard administrateur** : Gestion des événements et de la galerie
- **Intégration Shotgun** : Synchronisation automatique des événements depuis l'API Shotgun
- **Système d'authentification** : Sécurisé avec JWT et refresh tokens

## 🚀 Technologies

### Core

- **React 18.2** - Bibliothèque UI
- **TypeScript 5.0** - Typage statique
- **Vite 4.4** - Build tool ultra-rapide
- **React Router 6.27** - Routing

### UI & Styling

- **TailwindCSS 3.4** - Framework CSS utility-first
- **Framer Motion 11.11** - Animations fluides
- **GSAP 3.12** - Animations avancées
- **SASS 1.80** - Préprocesseur CSS
- **Styled Components 6.1** - CSS-in-JS

### State Management & Data Fetching

- **TanStack Query 5.85** (React Query) - Gestion du state serveur
- **Axios 1.7** - Client HTTP

### Composants UI

- **Radix UI** - Composants accessibles
- **Lucide React** - Icônes modernes
- **FontAwesome 6.6** - Bibliothèque d'icônes
- **Heroicons 2.2** - Icônes Tailwind

### Utilitaires

- **date-fns 4.1** - Manipulation de dates
- **Validator 13.11** - Validation de données
- **React Helmet 6.1** - Gestion du SEO
- **React Intersection Observer 9.13** - Détection de visibilité

## 📦 Installation

### Prérequis

- Node.js 18+ 
- npm ou yarn
- Backend configuré et lancé (voir `/backend-merci-lille`)

### Étapes d'installation

```bash
# Cloner le repository
git clone <votre-repo>

# Naviguer vers le dossier frontend
cd frontend-merci-lille

# Installer les dépendances
npm install

# Configurer les variables d'environnement
cp .env.example .env.local

# Démarrer le serveur de développement
npm run dev
```

L'application sera accessible sur `http://localhost:5173`

## 🛠 Scripts disponibles

```bash
# Développement - Lance le serveur avec hot reload
npm run dev

# Build - Compile pour la production
npm run build

# Preview - Prévisualise le build de production
npm run preview
```

## 📁 Structure du projet

```
frontend-merci-lille/
├── public/                      # Fichiers statiques
│   ├── favicon.ico
│   ├── mercilillelogo.png
│   └── sitemap.xml
│
├── src/
│   ├── components/              # Composants React
│   │   ├── Admin/              # Dashboard administrateur
│   │   │   ├── AdminLayout.tsx
│   │   │   ├── AdminNavigation.tsx
│   │   │   ├── EventForm.tsx
│   │   │   ├── EventsManagement.tsx
│   │   │   ├── GalleryManagement.tsx
│   │   │   ├── LoginForm.tsx
│   │   │   ├── PrivateRoute.tsx
│   │   │   └── ShotgunSync.tsx
│   │   ├── Aftermovies/
│   │   ├── BouncingText/
│   │   ├── EmailForm/
│   │   ├── FloatingContactButton/
│   │   ├── Gallery/
│   │   ├── Introduction/
│   │   ├── ProfileCard/
│   │   ├── PuzzleGame/          # Easter egg game
│   │   ├── ShotgunEvents/       # Affichage des événements
│   │   ├── SocialMediaMenu/
│   │   ├── SVGAnimation/
│   │   └── TextScramble/
│   │
│   ├── contexts/               # React Contexts
│   │   └── AnimationContext.tsx
│   │
│   ├── hooks/                  # Custom React Hooks
│   │   ├── useEvents.ts
│   │   ├── useGallery.ts
│   │   └── useScrollPosition.ts
│   │
│   ├── services/               # Services API
│   │   ├── api.ts             # Configuration Axios + intercepteurs
│   │   ├── auth.service.ts    # Authentification
│   │   ├── events.service.ts  # Gestion des événements
│   │   ├── gallery.service.ts # Gestion de la galerie
│   │   └── shotgun-sync.service.ts
│   │
│   ├── layouts/               # Layouts de pages
│   │   └── AdminLayout.tsx
│   │
│   ├── page/                  # Pages principales
│   │   └── App.tsx
│   │
│   ├── lib/                   # Utilitaires
│   │   ├── queryClient.ts
│   │   └── utils.ts
│   │
│   ├── media/                 # Assets (images, sons)
│   │   ├── artist/
│   │   ├── event/
│   │   └── gallery/
│   │
│   ├── index.tsx              # Point d'entrée
│   └── index.scss             # Styles globaux
│
├── dist/                      # Build de production
├── .env.local                 # Variables d'environnement (local)
├── .env.production            # Variables d'environnement (production)
├── vite.config.ts             # Configuration Vite
├── tailwind.config.js         # Configuration Tailwind
├── tsconfig.json              # Configuration TypeScript
└── package.json
```

## ✨ Fonctionnalités

### 🌐 Site Public

#### Page d'accueil
- **Animation SVG du logo** au chargement
- **Text scramble effect** pour le titre principal
- **Introduction** de l'association
- **Liste des événements** avec intégration Shotgun
  - Affichage des événements à venir
  - Événements phares mis en avant
  - Filtrage automatique des événements passés
  - Lien direct vers la billetterie
- **Aftermovies** des événements passés
- **Profils des artistes** résidents
- **Galerie photos** interactive avec lightbox
- **Formulaire de contact** avec validation
- **Réseaux sociaux** avec liens directs
- **Easter egg** - Jeu de puzzle caché (cliquez sur "Terrorclown")

#### Galerie complète (`/gallerie`)
- Affichage en grille responsive
- Chargement lazy des images
- Lightbox pour visualisation plein écran

### 🔐 Dashboard Administrateur

Accessible via `/admin/login`

#### Authentification
- **Login sécurisé** avec JWT
- **Refresh tokens** automatiques
- **HttpOnly cookies** pour la sécurité
- **Protection CSRF** sur toutes les routes
- **Session persistante** avec auto-refresh

#### Gestion des événements (`/admin/events`)
- **CRUD complet** : Créer, lire, modifier, supprimer
- **Upload d'images** via Cloudinary
- **Drag & drop** pour réorganiser l'ordre
- **Masquer/afficher** des événements
- **Marquer comme événement phare**
- **Gestion des genres musicaux**
- **Synchronisation Shotgun** en un clic
  - Test de connexion API
  - Prévisualisation des événements à importer
  - Import automatique avec gestion des doublons
  - Téléchargement et upload automatique des images

#### Gestion de la galerie (`/admin/gallery`)
- **Upload multiple** (jusqu'à 10 images simultanées)
- **Drag & drop** pour réorganiser
- **Suppression groupée**
- **Compression automatique** via Cloudinary

## ⚙️ Configuration

### Variables d'environnement

Créez un fichier `.env.local` à la racine du projet frontend :

```env
# URL de l'API backend
VITE_APP_API_URL=http://localhost:3000/api

# Pour la production
# VITE_APP_API_URL=https://votre-backend.com/api
```

### Proxy de développement

Le fichier `vite.config.ts` configure un proxy pour éviter les problèmes CORS en développement :

```typescript
server: {
  proxy: {
    '/api': {
      target: 'http://localhost:3000',
      changeOrigin: true,
    }
  }
}
```

## 🔒 Sécurité

Le projet implémente plusieurs mesures de sécurité :

### Frontend
- ✅ **HttpOnly Cookies** pour les tokens JWT
- ✅ **Headers anti-CSRF** (`X-Requested-With`)
- ✅ **Validation des formulaires** côté client
- ✅ **Auto-refresh des tokens** avant expiration
- ✅ **Protection des routes admin** avec `PrivateRoute`
- ✅ **Redirection automatique** si déconnecté

### Communication API
- ✅ **Credentials inclus** (`withCredentials: true`)
- ✅ **Intercepteurs Axios** pour refresh automatique
- ✅ **Gestion des erreurs** centralisée
- ✅ **Rate limiting** respecté

Pour plus de détails, consultez `/SECURITY_AUDIT_REPORT.md` à la racine du projet.

## 🎨 Personnalisation

### Couleurs et thème

Les couleurs sont définies dans `tailwind.config.js` et peuvent être personnalisées :

```javascript
theme: {
  extend: {
    colors: {
      primary: '#your-color',
      secondary: '#your-color'
    }
  }
}
```

### Animations

Les animations peuvent être configurées dans :
- `tailwind.config.js` pour les animations Tailwind
- `src/contexts/AnimationContext.tsx` pour activer/désactiver les animations

## 📱 Responsive Design

L'application est entièrement responsive et optimisée pour :
- 📱 Mobile (320px+)
- 📱 Tablette (768px+)
- 💻 Desktop (1024px+)
- 🖥️ Large Desktop (1440px+)

## 🚀 Déploiement

### Build de production

```bash
npm run build
```

Le dossier `dist/` contiendra les fichiers optimisés.

### Déploiement sur Vercel

Le projet est configuré pour Vercel avec `vercel.json` :

```bash
# Installer Vercel CLI
npm i -g vercel

# Déployer
vercel --prod
```

### Variables d'environnement en production

N'oubliez pas de configurer `VITE_APP_API_URL` sur votre plateforme de déploiement.

## 🐛 Debugging

### Mode développement

```bash
# Lancer avec logs détaillés
npm run dev -- --debug

# Vérifier le build
npm run build && npm run preview
```

### Problèmes courants

**Erreur CORS**
- Vérifiez que le backend autorise l'origine du frontend
- En dev, le proxy Vite devrait gérer cela

**Images ne s'affichent pas**
- Vérifiez la configuration Cloudinary
- Vérifiez les URLs dans la console réseau

**Authentification échoue**
- Vérifiez que `withCredentials: true` est activé
- Vérifiez les cookies dans DevTools
- Vérifiez la configuration backend CORS

## 🤝 Contribution

Pour contribuer au projet :

1. Fork le projet
2. Créer une branche feature (`git checkout -b feature/AmazingFeature`)
3. Commit les changements (`git commit -m 'Add AmazingFeature'`)
4. Push vers la branche (`git push origin feature/AmazingFeature`)
5. Ouvrir une Pull Request

## 📄 License

Ce projet est la propriété de **Merci Lille**.

## 👨‍💻 Développement

Développé par [fouzi-dev.fr](https://fouzi-dev.fr)

## 📞 Support

Pour toute question ou problème :
- Consultez la documentation du backend : `/backend-merci-lille/README.md`
- Consultez le guide d'intégration Shotgun : `/SHOTGUN_INTEGRATION_GUIDE.md`
- Consultez le rapport de sécurité : `/SECURITY_AUDIT_REPORT.md`

---

**© 2024 Merci Lille. Tous droits réservés.**
