# Changelog

Tous les changements notables de ce projet seront documentés dans ce fichier.

Le format est basé sur [Keep a Changelog](https://keepachangelog.com/fr/1.0.0/),
et ce projet adhère au [Semantic Versioning](https://semver.org/lang/fr/).

---

## [Non publié]

### À venir

- Interface enseignant (Phase 3)
- Dashboard enseignant
- Gestion de séances
- Export PDF groupé

---

## [0.4.0] - 2026-02-08

### Ajouté

- **Page Home.jsx** (P1.3) : Page d'accueil complète
    - Hero section avec gradient et 2 CTA principaux
    - Section explicative "C'est quoi un acrostiche ?" avec exemple CHAT
    - Présentation des 3 niveaux de difficulté avec visuels
    - Workflow détaillé en 3 étapes illustrées (Choisir → Créer → Télécharger)
    - CTA finale vers création
    - Footer complet avec navigation
    - Design responsive et accessible
- **Composant Header.jsx** (P1.4) : Navigation globale réutilisable
    - Logo et titre cliquables vers accueil
    - 3 boutons navigation (Accueil, Créer, Exemples)
    - Indication visuelle de la page active
    - Responsive mobile (icônes seules sur petit écran)
    - Intégrable dans toutes les pages
- **Routes complètes** : 3/3 routes actives
    - `/` - Home.jsx (accueil)
    - `/eleve` - StudentWorkspace.jsx (création)
    - `/exemples` - Examples.jsx (galerie)

### Modifié

- **README.md** : Mise à jour complète v0.4.0
    - Badge version 0.4.0
    - Badge phase "2 (100%)" en vert
    - Tableau d'avancement : Phase 2 complétée à 100%
    - Documentation des 3 routes actives
    - Ajout section "Parcours utilisateur" détaillée
    - Mise à jour roadmap (Phase 3 en cours)
    - Métriques du projet actualisées
- **App.jsx** : Routes activées
    - Route `/` active vers Home.jsx
    - Toutes les routes décommentées

### Corrigé

- Erreur ESLint React Hooks dans `AcrosticheEditor.jsx` (ligne 107)
    - Séparation en 2 `useEffect` distincts (sync data + focus DOM)
    - Conformité aux règles des Hooks React
    - Dépendances optimisées

### Phase 2 - Bilan

**✅ Phase 2 : 100% COMPLÉTÉE**

**Composants créés** : 13 composants

- 5 composants communs (Phase 1)
- 6 composants élève (Phase 2)
- 1 composant layout (Phase 2)
- 3 pages complètes (Phase 2)

**Routes fonctionnelles** : 3/3

- Home (accueil pédagogique)
- StudentWorkspace (création complète)
- Examples (galerie interactive)

**Parcours élève** : 100% fonctionnel

- Workflow complet en 4 étapes
- Sauvegarde automatique
- Export PNG haute résolution
- Banque de mots thématiques
- Navigation fluide

**Lignes de code** : ~3 300 lignes

- Home.jsx : 320 lignes
- StudentWorkspace.jsx : 432 lignes
- Examples.jsx : 240 lignes
- Header.jsx : 80 lignes
-   - 6 composants élève
-   - Utilitaires et données

---

## [0.3.0] - 2026-02-08

### Ajouté

- **Page StudentWorkspace** : Parcours complet de création d'acrostiche en 4 étapes
    - Étape 1 : Choix du mot (3-10 lettres)
    - Étape 2 : Sélection du niveau (1, 2 ou 3)
    - Étape 3 : Création ligne par ligne avec aide contextuelle
    - Étape 4 : Finalisation avec export PNG
- **Page Examples** : Galerie des 10 acrostiches modèles
    - Filtrage par niveau
    - Modal de détail avec explications
    - 5 CTA vers création
- **Composants élève** (6 nouveaux) :
    - `MotInput` : Saisie du mot initial
    - `NiveauSelector` : Choix du niveau
    - `AcrosticheEditor` : Éditeur ligne par ligne
    - `WordBank` : Banque de mots thématiques
    - `PreviewPanel` : Aperçu temps réel
    - `ExampleGallery` : Galerie d'exemples
- **Routes actives** :
    - `/eleve` - Espace de création
    - `/exemples` - Galerie d'exemples
- **Fonctionnalités** :
    - Sauvegarde automatique toutes les 60 secondes
    - Reprise de brouillon au chargement
    - Export PNG haute résolution (html2canvas)
    - Messages d'encouragement personnalisés selon le niveau
    - Navigation retour entre étapes du workflow

### Modifié

- **README.md** : Mise à jour complète v0.3.0
    - Ajout badges statut/version/phase
    - Tableau d'avancement détaillé
    - Documentation des routes actives
    - Roadmap clarifiée
    - Métriques du projet
- **Documentation** : Réorganisation complète
    - Déplacement SRS → `docs/SRS_V3.0.md`
    - Déplacement ARCHITECTURE → `docs/`
    - Création `docs/PHASES/` pour historique
    - Création `docs/PHASES/tasks/` pour détails tâches

### Corrigé

- Violations ESLint React Hooks dans `AcrosticheEditor.jsx`
- Violations ESLint React Hooks dans `WordBank.jsx`
- Warnings Fast Refresh avec PropTypes

---

## [0.2.0] - 2026-02-01

### Ajouté

- **Données** : Lexique thématique (~200 mots, 6 thèmes)
    - 🐾 Animaux (~80 mots)
    - 🌳 Nature (~60 mots)
    - ❤️ Émotions (~35 mots)
    - 📚 École (~40 mots)
    - 🎨 Couleurs (~30 mots)
    - 🏃 Actions (~35 mots)
- **Données** : 10 exemples d'acrostiches
    - 4 niveau 1 (un mot par ligne)
    - 4 niveau 2 (phrase courte)
    - 2 niveau 3 (vers poétiques)
- **Utilitaires export** :
    - `exporterEnPNG()` - Export image PNG
    - `exporterEnPDF()` - Export PDF simple
    - `exporterPlusieursPDF()` - Export PDF groupé
    - `copierDansPressePapier()` - Copie texte
    - `genererURLPartage()` - Partage par URL
    - `decoderURLPartage()` - Décodage URL

### Modifié

- Enrichissement du lexique avec fonctions helper
- Documentation des exemples avec métadonnées complètes

---

## [0.1.0] - 2026-01-25

### Ajouté

- **Configuration projet** :
    - Setup Vite 5.1 + React 18.3
    - Configuration Tailwind CSS 3.4
    - Configuration ESLint
    - Configuration pnpm
    - React Router 6.22
- **Composants communs** (5) :
    - `Button` - 4 variantes, 3 tailles
    - `Input` - Validation et messages d'erreur
    - `Modal` - Accessible avec gestion focus
    - `Card` - Flexible avec header/footer
    - `Loading` - 3 tailles, mode fullscreen
- **Context API** :
    - `AcrosticheContext` avec reducer
    - Actions typées (CREER, MODIFIER, FINALISER, etc.)
    - État global persistant
- **Hooks personnalisés** :
    - `useLocalStorage` - Persistance avec sync multi-onglets
    - `useAcrosticheContext` - Accès au Context
- **Utilitaires acrostiche** (15+ fonctions) :
    - `creerAcrostiche()` - Création nouvel acrostiche
    - `validerMotAcrostiche()` - Validation mot 3-10 lettres
    - `validerLigneAcrostiche()` - Validation selon niveau
    - `mettreAJourLigne()` - Mise à jour ligne
    - `finaliserAcrostiche()` - Finalisation
    - `estAcrosticheComplet()` - Vérification complétude
    - `formatterAcrostiche()` - Formatage affichage
    - `calculerStatistiques()` - Progression et stats
    - `genererCodeSeance()` - Code séance 6 caractères
    - `getLibelleNiveau()` - Infos niveau
- **Système de design** :
    - Palette couleurs adaptée enfants
    - Typographies (Inter + Quicksand)
    - Tailles de texte pour jeunes lecteurs
    - Classes utilitaires Tailwind personnalisées
- **Documentation** :
    - README.md avec guide installation
    - ARCHITECTURE.md détaillé
    - SRS v3.0 (spécifications complètes)

### Technique

- Aliases de chemins (@components, @utils, etc.)
- Exports centralisés (index.js)
- PropTypes sur tous les composants
- Code splitting par route
- Bundle JS < 500 Ko

---

## Structure du Changelog

### Types de changements

- **Ajouté** : nouvelles fonctionnalités
- **Modifié** : changements sur fonctionnalités existantes
- **Déprécié** : fonctionnalités bientôt retirées
- **Retiré** : fonctionnalités retirées
- **Corrigé** : corrections de bugs
- **Sécurité** : corrections de vulnérabilités

### Format de version

- **MAJEUR** : changements incompatibles de l'API
- **MINEUR** : ajout de fonctionnalités rétro-compatibles
- **CORRECTIF** : corrections de bugs rétro-compatibles

Exemple : `1.2.3`

- 1 = version majeure
- 2 = version mineure
- 3 = correctif

---

## Liens

- [Keep a Changelog](https://keepachangelog.com/fr/1.0.0/)
- [Semantic Versioning](https://semver.org/lang/fr/)
- [Dépôt GitHub](https://github.com/MiserySGH/je-compose)

---

**Dernière mise à jour** : 8 février 2026  
**Version actuelle** : 0.4.0  
**Prochaine version** : 0.5.0 (Phase 3 - Interface enseignant)
