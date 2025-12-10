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
- **React Hot Toast 2.4** - Notifications toast

### Formulaires & Validation

- **React Hook Form 7.53** - Gestion des formulaires
- **Zod 3.23** - Validation de schémas TypeScript-first
- **@hookform/resolvers 3.9** - Intégration Zod avec React Hook Form

### Utilitaires

- **date-fns 4.1** - Manipulation de dates
- **Validator 13.11** - Validation de données
- **React Helmet 6.1** - Gestion du SEO
- **React Intersection Observer 9.13** - Détection de visibilité
- **clsx 2.1** - Utilitaire de classes CSS conditionnelles
- **tailwind-merge 2.5** - Fusion intelligente de classes Tailwind

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
│   ├── components/              # Composants React (28 composants)
│   │   ├── Admin/              # Dashboard administrateur (15 composants)
│   │   │   ├── AdminLayout.tsx          # Layout admin avec navigation
│   │   │   ├── AdminNavigation.tsx      # Menu de navigation admin
│   │   │   ├── EventForm.tsx            # Formulaire création/édition événement
│   │   │   ├── EventsManagement.tsx     # Gestion complète des événements
│   │   │   ├── EventItem.tsx            # Item d'événement avec actions
│   │   │   ├── DraggableEventItem.tsx   # Item draggable pour réorganisation
│   │   │   ├── GalleryManagement.tsx    # Gestion de la galerie
│   │   │   ├── GalleryImage.tsx         # Image de galerie avec actions
│   │   │   ├── DraggableGalleryImage.tsx # Image draggable
│   │   │   ├── LoginForm.tsx            # Formulaire de connexion admin
│   │   │   ├── PrivateRoute.tsx         # Protection des routes admin
│   │   │   ├── ShotgunSync.tsx          # Interface de synchronisation Shotgun
│   │   │   ├── Notification.tsx         # Système de notifications toast
│   │   │   ├── ImageUpload.tsx          # Upload d'images
│   │   │   └── ErrorBoundary.tsx        # Gestion d'erreurs React
│   │   ├── Aftermovies/         # Vidéos aftermovies
│   │   ├── BouncingText/        # Animation texte rebondissant
│   │   ├── EmailForm/           # Formulaire de contact
│   │   ├── FloatingContactButton/ # Bouton de contact flottant
│   │   ├── Gallery/             # Galerie photos publique
│   │   ├── Introduction/        # Section introduction
│   │   ├── ProfileCard/         # Cartes de profils d'artistes
│   │   ├── PuzzleGame/          # Easter egg - jeu de puzzle GSAP
│   │   ├── ShotgunEvents/       # Affichage des événements publics
│   │   ├── SocialMediaMenu/     # Menu réseaux sociaux
│   │   ├── SVGAnimation/        # Animation du logo SVG
│   │   └── TextScramble/        # Effect scramble sur le texte
│   │
│   ├── contexts/               # React Contexts (2 providers)
│   │   ├── AuthContext.tsx     # Authentification globale
│   │   └── AnimationContext.tsx # Contrôle des animations
│   │
│   ├── hooks/                  # Custom React Hooks (8 hooks)
│   │   ├── useEvents.ts        # Récupération événements publics
│   │   ├── useGallery.ts       # Récupération galerie publique
│   │   ├── useAdminEvents.ts   # Gestion événements admin
│   │   ├── useAdminGallery.ts  # Gestion galerie admin
│   │   ├── useDragAndDropList.ts # Drag & drop pour listes
│   │   ├── useSelection.ts     # Sélection multiple d'items
│   │   ├── useAdminFeedback.ts # Feedback utilisateur admin
│   │   └── useScrollPosition.ts # Position de scroll
│   │
│   ├── services/               # Services API (5 services)
│   │   ├── api.ts             # Configuration Axios + intercepteurs
│   │   ├── auth.service.ts    # Authentification & CSRF
│   │   ├── events.service.ts  # Gestion des événements
│   │   ├── gallery.service.ts # Gestion de la galerie
│   │   └── shotgun-sync.service.ts # Synchronisation Shotgun
│   │
│   ├── schemas/               # Schémas de validation Zod
│   │   ├── contactForm.ts    # Validation formulaire de contact
│   │   └── eventForm.ts      # Validation formulaire événement
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
- **Suppression groupée** avec sélection multiple
- **Compression automatique** via Cloudinary
- **Validation** : max 5MB par image, formats image/* uniquement

#### Fonctionnalités avancées

**Sélection multiple** :
- Cases à cocher pour chaque item
- Bouton "Tout sélectionner / Désélectionner"
- Actions groupées (masquer, featured, supprimer)
- Compteur d'items sélectionnés

**Notifications intelligentes** :
- Toast success/error/info avec react-hot-toast
- Messages contextuels selon l'action
- Auto-dismiss après 3 secondes
- Position personnalisable

**Gestion d'erreurs** :
- ErrorBoundary pour capturer les crashes React
- Affichage d'un message utilisateur friendly
- Possibilité de recharger la page
- Logs des erreurs pour debugging

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
- ✅ **CSRF Token** automatique via cookies et headers
- ✅ **Queue de requêtes** pendant le refresh du token

Pour plus de détails, consultez `/SECURITY_AUDIT_REPORT.md` à la racine du projet.

## 🔐 Gestion de l'authentification

### AuthContext

Le contexte d'authentification (`src/contexts/AuthContext.tsx`) gère :

#### État global
```typescript
{
  isAuthenticated: boolean    // Statut de connexion
  loading: boolean           // Chargement initial
  login: (credentials) => Promise<void>   // Connexion
  logout: () => Promise<void>             // Déconnexion
}
```

#### Fonctionnalités

**Auto-refresh du token**
- Vérifie l'expiration du token toutes les minutes
- Rafraîchit automatiquement 1 minute avant expiration
- Gère les erreurs de refresh (déconnexion auto)

**Vérification périodique**
- Vérifie l'authentification toutes les 5 minutes
- Appelle `/api/auth/verify` pour validation serveur
- Maintient la session active

**Gestion des cookies**
- Lecture automatique des tokens JWT httpOnly
- Pas de stockage en localStorage (sécurité)
- Les tokens sont gérés uniquement par le serveur

**Protection des routes**
- Composant `<PrivateRoute>` pour les routes admin
- Redirection automatique vers `/admin/login` si non authentifié
- Bloque l'accès aux ressources protégées

### Service API (api.ts)

Configuration Axios avancée :

#### Intercepteurs de requêtes
```typescript
- Ajout automatique de X-Requested-With: XMLHttpRequest
- Ajout du token CSRF dans X-CSRF-Token
- Credentials inclus (withCredentials: true)
```

#### Intercepteurs de réponses
```typescript
- Détection d'erreur 401 (token expiré)
- Refresh automatique du token
- Queue des requêtes pendant le refresh
- Retry de la requête originale après refresh
- Déconnexion si refresh échoue
```

#### Gestion CSRF
```typescript
1. Extraction du token depuis le cookie "csrf-token"
2. Envoi dans le header "X-CSRF-Token"
3. Validation côté serveur pour toutes requêtes non-GET
```

## 📋 Validation des formulaires (Zod)

Le projet utilise **Zod** pour la validation TypeScript-first avec **React Hook Form**.

### Schémas de validation

#### Formulaire de contact (`schemas/contactForm.ts`)
```typescript
{
  name: string (3-100 caractères)
  email: string (format email valide)
  subject: string (3-200 caractères)
  message: string (10-2000 caractères)
}
```

#### Formulaire événement (`schemas/eventForm.ts`)
```typescript
{
  title: string (1-200 caractères)
  city: string (1-100 caractères)
  country: string (optionnel, max 100)
  date: string (format date ISO)
  time: string (format HH:MM)
  ticketLink: string (URL valide)
  genres: string[] (array de genres)
  image: File (optionnel pour édition)
  isFeatured: boolean
  order: number
}
```

### Avantages Zod + React Hook Form

- ✅ **Type-safety** - Types TypeScript automatiques
- ✅ **Validation côté client** - Erreurs en temps réel
- ✅ **Messages d'erreur** personnalisés
- ✅ **Réutilisabilité** - Schémas partagés
- ✅ **Performance** - Validation optimisée

## 🔄 Gestion de l'état serveur (React Query)

Le projet utilise **TanStack Query (React Query v5)** pour la gestion des données serveur.

### Configuration

**Query Client** (`lib/queryClient.ts`) :
```typescript
{
  staleTime: 24 * 60 * 60 * 1000,  // 24 heures
  cacheTime: 24 * 60 * 60 * 1000,  // 24 heures
  refetchOnWindowFocus: false,     // Pas de refetch au focus
  retry: 1                          // 1 seul retry
}
```

### Hooks de données

#### Hooks publics
- `useEvents()` - Liste des événements publics (non masqués)
- `useGallery()` - Liste des images de galerie publiques

#### Hooks admin
- `useAdminEvents()` - Liste complète des événements (avec masqués)
- `useAdminGallery()` - Liste complète de la galerie

### Mutations

Toutes les mutations utilisent React Query pour :
- Invalidation automatique du cache
- Optimistic updates
- Gestion des erreurs
- Feedback utilisateur (toasts)

**Exemple de mutation** :
```typescript
const createEventMutation = useMutation({
  mutationFn: eventsService.createEvent,
  onSuccess: () => {
    queryClient.invalidateQueries(['admin-events'])
    toast.success('Événement créé !')
  },
  onError: (error) => {
    toast.error(error.message)
  }
})
```

## 🎣 Hooks personnalisés

Le projet contient 8 hooks réutilisables pour différentes fonctionnalités.

### Hooks de données (React Query)

#### `useEvents()`
- Récupère les événements publics (non masqués)
- Cache de 24h
- Tri automatique par ordre

#### `useGallery()`
- Récupère la galerie publique
- Cache de 24h
- Images triées par ordre

#### `useAdminEvents()`
- Récupère TOUS les événements (incluant masqués)
- Nécessite authentification
- Retourne aussi les mutations (create, update, delete, reorder, hide, feature)

#### `useAdminGallery()`
- Récupère TOUTE la galerie
- Nécessite authentification
- Retourne aussi les mutations (upload, delete, reorder)

### Hooks UI

#### `useDragAndDropList(items, onReorder)`
- Gestion du drag & drop pour listes
- Réorganisation visuelle en temps réel
- Callback `onReorder` pour sauvegarder le nouvel ordre
- Utilisé pour événements et galerie

**Utilisation** :
```typescript
const { items, handleDragStart, handleDragOver, handleDrop } =
  useDragAndDropList(events, (newOrder) => {
    updateOrderMutation.mutate(newOrder)
  })
```

#### `useSelection()`
- Sélection multiple d'items avec cases à cocher
- Toggle all / select individual
- Retourne l'état de sélection et les fonctions de gestion

**API** :
```typescript
{
  selectedIds: string[]           // IDs sélectionnés
  isSelected: (id) => boolean    // Vérifie si sélectionné
  toggleSelect: (id) => void     // Toggle un item
  toggleAll: (ids) => void       // Toggle tous les items
  clearSelection: () => void     // Désélectionne tout
}
```

#### `useAdminFeedback()`
- Gestion du feedback utilisateur (toasts)
- Simplification de react-hot-toast
- Messages de succès/erreur standardisés

**Utilisation** :
```typescript
const { showSuccess, showError } = useAdminFeedback()

showSuccess('Événement créé !')
showError('Erreur lors de la suppression')
```

#### `useScrollPosition()`
- Détecte la position de scroll
- Retourne si l'utilisateur a scrollé
- Utilisé pour navbar sticky, animations au scroll

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
- `src/contexts/AnimationContext.tsx` pour activer/désactiver les animations globalement
- `framer-motion` pour les animations de composants
- `GSAP` pour les animations complexes (jeu de puzzle)

## 📱 Responsive Design

L'application est entièrement responsive et optimisée pour :
- 📱 Mobile (320px+)
- 📱 Tablette (768px+)
- 💻 Desktop (1024px+)
- 🖥️ Large Desktop (1440px+)

## ⚡ Optimisations de performance

Le projet implémente plusieurs optimisations pour des performances maximales :

### Code Splitting

Configuration Vite pour chunking optimisé (`vite.config.ts`) :

```typescript
build: {
  rollupOptions: {
    output: {
      manualChunks: {
        'react-vendor': ['react', 'react-dom', 'react-router-dom'],
        'query': ['@tanstack/react-query'],
        'animations': ['framer-motion', 'gsap'],
        'forms': ['react-hook-form', 'zod', '@hookform/resolvers']
      }
    }
  }
}
```

**Résultat** :
- Bundle principal réduit
- Chargement parallèle des vendors
- Meilleur caching navigateur
- Temps de chargement initial optimisé

### Caching stratégique

**React Query** :
- 24h de cache pour les données publiques
- Pas de refetch au focus de fenêtre
- Invalidation intelligente après mutations

**Images** :
- Cloudinary pour optimisation automatique
- Lazy loading natif avec `loading="lazy"`
- Formats WebP pour compression

### Bundle Analysis

Pour analyser la taille du bundle :

```bash
npm run build
# Un fichier stats.html sera généré montrant la répartition du bundle
```

Utilisé via `rollup-plugin-visualizer` pour identifier les imports lourds.

### Optimisations supplémentaires

- ✅ **Tree-shaking** automatique (Vite/Rollup)
- ✅ **Minification** en production
- ✅ **CSS purge** via Tailwind (retire le CSS inutilisé)
- ✅ **Compression gzip/brotli** via Vite
- ✅ **Preconnect** pour Cloudinary dans l'index.html

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

**© 2024-présent Merci Lille. Tous droits réservés.**
