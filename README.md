# Je Compose - Application d'acrostiches

Application web éducative pour la création d'acrostiches à l'école primaire (cycles 2 et 3).

![Statut](https://img.shields.io/badge/statut-en%20développement-yellow)
![Version](https://img.shields.io/badge/version-0.5.0-blue)
![Phase](<https://img.shields.io/badge/phase-3%20(100%25)-green>)

---

## 📊 État du projet

| Phase                              | Statut      | Progression | Durée    |
| ---------------------------------- | ----------- | ----------- | -------- |
| **Phase 1** - Fondations           | ✅ Complété | 100%        | 4 sem.   |
| **Phase 2** - Parcours élève       | ✅ Complété | 100%        | 3 sem.   |
| └─ Données                         | ✅ Complété | 100%        | -        |
| └─ Composants                      | ✅ Complété | 100%        | -        |
| └─ P1.1 StudentWorkspace           | ✅ Complété | 100%        | 2 jours  |
| └─ P1.2 Examples                   | ✅ Complété | 100%        | 1 jour   |
| └─ P1.3 Home                       | ✅ Complété | 100%        | 1 jour   |
| └─ P1.4 Navigation                 | ✅ Complété | 100%        | 1 jour   |
| **Phase 3** - Interface enseignant | ✅ Complété | 100%        | 2 sem.   |
| └─ P3.1 Utilitaires séances        | ✅ Complété | 100%        | 1 jour   |
| └─ P3.2 SessionCreate              | ✅ Complété | 100%        | 1 jour   |
| └─ P3.3 Système partage            | ✅ Complété | 100%        | 1 jour   |
| └─ P3.4 SessionView                | ✅ Complété | 100%        | 1 jour   |
| └─ P3.5 Export PDF                 | ✅ Complété | 100%        | 1 jour   |
| └─ P3.6 TeacherDashboard           | ✅ Complété | 100%        | 1 jour   |
| └─ P3.7 Navigation                 | ✅ Complété | 100%        | 1 jour   |
| **Phase 4** - Finalisation         | ⏳ À venir  | 0%          | 2-3 sem. |

**Dernière mise à jour** : 8 février 2026

---

## 🎯 Objectif du projet

**Je Compose** est une application web permettant aux élèves de CE1, CE2, CM1 et CM2 de créer des acrostiches de manière guidée, avec trois niveaux de difficulté progressifs.

### Fonctionnalités principales

#### ✅ Pour les élèves (Phase 2 complétée)

- ✅ Création d'acrostiches en 3 niveaux :
    - 🟢 **Niveau 1** : Un mot par ligne
    - 🟠 **Niveau 2** : Une phrase courte par ligne
    - 🔴 **Niveau 3** : Des vers poétiques
- ✅ Banque de mots thématiques (~200 mots, 6 thèmes)
- ✅ Aide contextuelle par lettre
- ✅ Aperçu en temps réel
- ✅ Export image PNG
- ✅ Sauvegarde automatique (brouillons)
- ✅ Galerie de 10 exemples commentés
- ✅ Page d'accueil pédagogique
- ✅ Navigation globale fluide

#### ✅ Pour les enseignants (Phase 3 complétée)

**Gestion de séances**

- ✅ Création de séances avec code unique (6 caractères)
- ✅ Durée configurable (1-7 jours, 24h par défaut)
- ✅ URL de partage automatique pour les élèves
- ✅ Liste des séances actives avec temps restant

**Réception des productions**

- ✅ Système de partage élève → enseignant via URL
- ✅ Réception automatique (clic sur lien)
- ✅ Stockage local par code séance

**Consultation et filtrage**

- ✅ Affichage en grille avec aperçu (3 premières lignes)
- ✅ Filtres par niveau (1, 2, 3)
- ✅ Tri par date, nom élève, ou mot initial
- ✅ Modal de détail (acrostiche complet formaté)
- ✅ Statistiques en temps réel (total, par niveau)

**Export et gestion**

- ✅ Sélection multiple avec checkboxes
- ✅ Export PDF groupé (1 acrostiche/page A4)
- ✅ Suppression individuelle ou en masse
- ✅ Nom fichier automatique (séance + date)

**Interface**

- ✅ Dashboard avec 3 onglets (Créer | Consulter | Mes séances)
- ✅ Navigation fluide entre fonctionnalités
- ✅ Bouton "Enseignant" dans header global

---

## 🚀 Démarrage rapide

### Prérequis

- **Node.js** 18.0+
- **pnpm** 8.0+ (gestionnaire de paquets)

```bash
# Installer pnpm si nécessaire
npm install -g pnpm
```

### Installation

```bash
# Cloner le dépôt
git clone https://github.com/MiserySGH/je-compose.git
cd je-compose

# Installer les dépendances
pnpm install

# Lancer en développement
pnpm dev
```

L'application sera accessible sur **http://localhost:3000**

### Commandes disponibles

```bash
pnpm dev          # Serveur de développement (port 3000)
pnpm build        # Build de production
pnpm preview      # Aperçu de la build
pnpm lint         # Vérifier le code (ESLint)
pnpm lint:fix     # Corriger automatiquement
```

---

## 📱 Parcours utilisateur

### Route `/` - Accueil ✅

**Page d'accueil pédagogique avec :**

- Hero section accueillante avec gradient
- Explication "C'est quoi un acrostiche ?" avec exemple visuel (CHAT)
- Présentation des 3 niveaux de difficulté
- Workflow détaillé en 3 étapes illustrées
- Multiples CTA vers création et exemples
- Footer avec navigation complète

### Route `/eleve` - Espace élève ✅

**Workflow complet de création en 4 étapes :**

1. **Choix du mot** (3-10 lettres)

    - Saisie libre ou suggestions
    - Validation automatique

2. **Sélection du niveau**

    - 3 niveaux détaillés avec exemples
    - Aide à la décision

3. **Création ligne par ligne**

    - Éditeur intelligent avec contraintes selon niveau
    - Banque de mots thématiques filtrables (6 thèmes)
    - Aide contextuelle par lettre
    - Navigation entre lignes
    - Aperçu temps réel en sidebar (desktop)

4. **Finalisation et export**
    - Statistiques de création
    - Export PNG haute résolution
    - Messages d'encouragement personnalisés
    - Option recommencer

**Fonctionnalités transversales :**

- ✅ Sauvegarde automatique toutes les 60 secondes
- ✅ Reprise de brouillon au chargement
- ✅ Limite 5 brouillons (FIFO)

### Route `/exemples` - Galerie d'exemples ✅

**Galerie interactive de 10 acrostiches :**

- 4 exemples niveau 1 (un mot par ligne)
- 4 exemples niveau 2 (phrase courte)
- 2 exemples niveau 3 (vers poétiques)
- Filtrage par niveau
- Modal détaillé avec explications pédagogiques
- 5 CTA vers création d'acrostiche

---

## 🏗️ Architecture technique

### Stack

- **Frontend** : React 18.3 + Vite 5.1
- **Styling** : Tailwind CSS 3.4
- **Routing** : React Router 6.22
- **State** : Context API + Reducer
- **Storage** : localStorage (sync multi-onglets)
- **Export** : html2canvas + jsPDF
- **Package Manager** : pnpm 8.0+
- **Gestion séances** : localStorage avec nettoyage auto
- **Partage productions** : URL encodées (base64)
- **Export PDF** : jsPDF (déjà présent, maintenant utilisé côté enseignant)

### Structure du projet

```
je-compose/
├── src/
│   ├── components/
│   │   ├── common/         # 5 composants réutilisables
│   │   ├── student/        # 6 composants élève
│   │   └── layout/         # Header, Footer
│   ├── pages/
│   │   ├── Home.jsx        # ✅ Accueil (320 lignes)
│   │   ├── StudentWorkspace.jsx  # ✅ Création (432 lignes)
│   │   └── Examples.jsx    # ✅ Galerie (240 lignes)
│   ├── context/
│   │   └── AcrosticheContext.jsx  # État global
│   ├── hooks/
│   │   ├── useLocalStorage.js
│   │   └── useAcrosticheContext.js
│   ├── utils/
│   │   ├── acrostiche.js   # 15+ fonctions
│   │   ├── export.js       # 6 fonctions export
│   │   └── validation.js
│   ├── data/
│   │   ├── exemples.js     # 10 acrostiches
│   │   └── lexique.js      # ~200 mots, 6 thèmes
│   └── App.jsx             # Routes principales
├── docs/
│   ├── SRS_V3.0.md         # Spécifications (figé)
│   ├── ARCHITECTURE.md     # Documentation technique
│   ├── CHANGELOG.md        # Historique des versions
│   └── PHASES/             # Documentation phases
└── README.md               # Ce fichier
```

### Composants créés (Phase 2)

#### Composants communs (Phase 1)

- `Button` - 4 variantes, 3 tailles
- `Input` - Validation et messages d'erreur
- `Modal` - Accessible avec gestion focus
- `Card` - Flexible avec header/footer
- `Loading` - 3 tailles, mode fullscreen

#### Composants élève (Phase 2)

- `MotInput` - Saisie du mot initial avec validation
- `NiveauSelector` - Choix du niveau avec descriptions
- `AcrosticheEditor` - Éditeur ligne par ligne intelligent
- `WordBank` - Banque de mots avec filtres thématiques
- `PreviewPanel` - Aperçu temps réel + stats + export
- `ExampleGallery` - Galerie d'exemples avec filtres

#### Composants layout (Phase 2)

- `Header` - Navigation globale réutilisable

---

## 📦 Données disponibles

### Exemples d'acrostiches (10)

| Niveau | Mot                         | Nombre |
| ------ | --------------------------- | ------ |
| 1      | CHAT, LUNE, SOLEIL, LIVRE   | 4      |
| 2      | ÉCOLE, OCÉAN, FORÊT, AMITIÉ | 4      |
| 3      | LIBERTÉ, COURAGE            | 2      |

Chaque exemple inclut :

- Le texte complet
- Le niveau
- Une explication pédagogique
- Des mots-clés thématiques

### Lexique thématique (~200 mots)

| Thème       | Nombre de mots |
| ----------- | -------------- |
| 🐾 Animaux  | ~80            |
| 🌳 Nature   | ~60            |
| ❤️ Émotions | ~35            |
| 📚 École    | ~40            |
| 🎨 Couleurs | ~30            |
| 🏃 Actions  | ~35            |

---

## 🧪 Tests

### Tests manuels recommandés

#### Checklist parcours élève

- [ ] **Étape 1** : Saisir "CHAT" → Validation OK
- [ ] **Étape 2** : Sélectionner Niveau 1 → Passage étape 3
- [ ] **Étape 3** : Remplir 4 lignes avec aide
- [ ] **Étape 4** : Export PNG fonctionnel
- [ ] **Sauvegarde** : Recharger page → Brouillon repris
- [ ] **Navigation** : Tous les liens fonctionnent
- [ ] **Responsive** : Tablette 10" et desktop OK

#### Tests navigateurs

- [x] Chrome 100+
- [x] Firefox 100+
- [ ] Safari 15+
- [ ] Edge 100+

### Tests automatisés (Phase 4)

Tests unitaires et E2E prévus pour la finalisation.

---

## 📊 Métriques du projet

### Lignes de code

```
Total :                  ~5 500 lignes
├─ Phase 1 :             ~1 500 lignes
├─ Phase 2 :             ~1 850 lignes
└─ Phase 3 :             ~2 150 lignes
```

### Composants

```
Total :                  20 composants
├─ Common :              5  (Phase 1)
├─ Student :             6  (Phase 2)
├─ Teacher :             3  (Phase 3)
└─ Layout :              1  (Phase 2)
```

### Pages et routes

```
Pages créées :           4/4
├─ Home                  ✅ (320 lignes)
├─ StudentWorkspace      ✅ (432 lignes)
├─ Examples              ✅ (240 lignes)
└─ TeacherDashboard      ✅ (330 lignes)

Routes actives :         4/4
├─ /                     ✅ Accueil
├─ /eleve                ✅ Création
├─ /exemples             ✅ Galerie
└─ /enseignant           ✅ Interface enseignant
```

### Fichiers utilitaires

```
Total :                  4 fichiers
├─ acrostiche.js         ✅ (Phase 1)
├─ export.js             ✅ (Phase 2)
├─ session.js            ✅ (Phase 3)
└─ partage.js            ✅ (Phase 3)
```

---

## 🚧 Limitations connues (MVP)

### Volontaires (scope MVP)

- ❌ Pas de correcteur orthographique avancé
- ❌ Pas de dictionnaire intégré
- ❌ Pas de collaboration temps réel
- ❌ Pas de backend (tout en localStorage)
- ❌ Pas de synchronisation multi-appareils
- ❌ Support mobile < 8 pouces limité

### Techniques

- **localStorage** limité à ~5 Mo
    - Limite : 5 acrostiches + brouillons
    - Nettoyage auto des données expirées
- **Export PNG** peut être lent sur tablettes anciennes
- **Pas de tests automatisés** dans MVP

---

## 🛣️ Roadmap

### ✅ Version 0.4.0 (actuelle) - Phase 2 complétée

- [x] P1.1 : StudentWorkspace (parcours création)
- [x] P1.2 : Examples (galerie)
- [x] P1.3 : Home (accueil)
- [x] P1.4 : Navigation (header persistant)

**Livrable** : Parcours élève complet et fonctionnel

### ✅ Version 0.5.0 - Phase 3 complétée

- [x] P3.1 : Utilitaires séances (codes, gestion)
- [x] P3.2 : SessionCreate (création séances)
- [x] P3.3 : Système partage (élève → enseignant)
- [x] P3.4 : SessionView (consultation productions)
- [x] P3.5 : Export PDF groupé
- [x] P3.6 : TeacherDashboard (interface complète)
- [x] P3.7 : Navigation (bouton enseignant)

**Livrable** : MVP complet élève + enseignant

### 🚧 Version 1.0.0 - Phase 4 (en cours)

- [ ] Tests manuels complets
- [ ] Responsive final (tablette + desktop)
- [ ] Corrections bugs identifiés
- [ ] Polish UX/UI
- [ ] Documentation utilisateur
- [ ] Déploiement production
- [ ] Vidéo démo

**Livrable** : Application déployée et utilisable en classe

### Versions futures (post-MVP)

#### v1.1 (+1-2 mois)

- Mode hors ligne (PWA)
- Correcteur orthographique basique
- 20 exemples au lieu de 10

#### v1.5 (+3-4 mois)

- Mode groupe (sans temps réel)
- Tableau de bord enseignant avec stats
- Banque de mots enrichie (500 mots)

#### v2.0 (+6+ mois)

- Backend léger (Node.js + SQLite)
- Comptes enseignants
- Collaboration temps réel
- Extension à d'autres formes poétiques

---

## 🤝 Contribution

### Contribuer au projet

Le projet est actuellement en développement solo. Les contributions seront ouvertes après la Phase 4.

Si vous souhaitez participer :

1. **Tester l'application** et remonter les bugs via Issues
2. **Proposer des améliorations** dans Discussions
3. **Attendre la Phase 4** pour contributions code

---

## 📄 Licence

À définir (probablement MIT ou similaire pour usage éducatif libre).

---

## 📞 Contact

**Projet** : Je Compose - Acrostiches pour l'école primaire  
**Développeur** : CPC Numérique  
**Usage** : Éducation nationale française (cycles 2 et 3)

---

## 📚 Documentation complémentaire

- [CHANGELOG.md](./docs/CHANGELOG.md) - Historique des versions
- [ARCHITECTURE.md](./docs/ARCHITECTURE.md) - Documentation technique
- [SRS_V3.0.md](./docs/SRS_V3.0.md) - Spécifications détaillées (figé)
- [PHASES/](./docs/PHASES/) - Documentation par phase

---

**Dernière mise à jour** : 8 février 2026  
**Version actuelle** : 0.5.0  
**Prochaine version** : 1.0.0 (Phase 4 - Finalisation)
