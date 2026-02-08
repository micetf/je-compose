# Changelog

Tous les changements notables de ce projet seront documentés dans ce fichier.

Le format est basé sur [Keep a Changelog](https://keepachangelog.com/fr/1.0.0/),
et ce projet adhère au [Semantic Versioning](https://semver.org/lang/fr/).

---

## [Non publié]

### À venir

- Tests manuels exhaustifs (Phase 4)
- Polish UX/UI
- Corrections bugs identifiés
- Documentation utilisateur
- Déploiement production
- Vidéo démo

---

## [0.5.0] - 2026-02-08

### Ajouté

- **Interface enseignant complète** (Phase 3)
    - Dashboard avec 3 onglets (Créer | Consulter | Mes séances)
    - Navigation fluide entre fonctionnalités
    - Design cohérent avec interface élève

#### P3.1 - Utilitaires séances (`src/utils/session.js`)

- `genererCodeSeanceUnique()` - Génération codes 6 caractères (ex: ABC123)
- `creerSeance()` - Création séances avec durée configurable (1-7 jours)
- `sauvegarderSeance()` - Persistance localStorage (limite 20 séances)
- `recupererSeances()` - Liste séances actives avec nettoyage auto
- `recupererSeance()` - Récupération par code
- `supprimerSeance()` - Suppression individuelle
- `seanceEstActive()` - Vérification expiration
- `tempsRestant()` - Calcul jours/heures/minutes
- `formatterTempsRestant()` - Affichage temps restant lisible
- `genererURLSeance()` - URL pour élèves (`/eleve?session=CODE`)
- `obtenirStatistiquesSeances()` - Stats globales

#### P3.2 - Création de séances (`SessionCreate.jsx`)

- Formulaire simple : nom (optionnel, 50 caractères max) + durée (1-7 jours)
- Génération automatique du code séance unique
- Affichage résultat : code en grand, URL complète, temps restant
- Bouton copier URL avec feedback visuel (2 secondes)
- Instructions claires pour partage avec élèves
- Réinitialisation propre après création
- Validation entrées (durée 1-7 jours)

#### P3.3 - Système de partage (`src/utils/partage.js` + modifications StudentWorkspace)

**Utilitaires de partage :**

- `encoderAcrostiche()` - Compression JSON + base64 pour URL (~150-400 caractères)
- `decoderAcrostiche()` - Décodage productions reçues
- `genererURLPartage()` - URL complète avec code séance et production encodée
- `extraireParametresURL()` - Parse URL courante (session + production)
- `urlContientSession()` - Détecte paramètre session
- `sauvegarderProduction()` - Stockage productions enseignant (limite 50/séance)
- `recupererProductionsSeance()` - Liste par séance
- `supprimerProduction()` - Suppression individuelle
- `supprimerProductionsSeance()` - Suppression en masse
- `obtenirStatistiquesSeance()` - Stats par niveau, mots utilisés
- `validerProduction()` - Vérification structure
- `copierURLPartage()` - Copie presse-papier

**Intégration côté élève (StudentWorkspace.jsx) :**

- Détection automatique paramètre `?session=CODE` dans URL
- Badge code séance visible en header (toutes étapes)
- Section partage en étape 4 (finalisation)
- Input nom élève (optionnel, 30 caractères max)
- Génération automatique URL de partage
- Input URL readonly avec sélection au clic
- Bouton copier avec feedback "✓ Copié" (2 secondes)
- Gestion cas URL non générée (message "en cours")

#### P3.4 - Consultation productions (`SessionView.jsx`)

**Interface de consultation :**

- Input code séance manuel avec validation (6 caractères)
- Détection automatique URL avec production (`?session=CODE&production=<base64>`)
- Réception automatique : décodage + sauvegarde + message succès
- Nettoyage URL après sauvegarde (suppression paramètre production)
- Affichage infos séance (code, nom, expiration)

**Grille de productions :**

- Cards responsive (1-3 colonnes selon écran)
- Aperçu : mot, nom élève, badge niveau, 3 premières lignes
- Date de réception formatée
- Checkbox pour sélection multiple

**Filtres et tri :**

- Filtres : Tous | Niveau 1 | 2 | 3
- Tri : Date | Nom élève | Mot initial
- Ordre : Ascendant / Descendant (toggle)
- Compteur productions filtrées

**Sélection et actions :**

- Boutons : Tout sélectionner | Tout désélectionner
- Compteur "X sélectionné(s)"
- Sélection conservée entre filtres

**Modal de détail :**

- Acrostiche complet formaté
- Lettres initiales en gras et couleur
- Infos : nom élève, niveau, badge
- Actions : Supprimer | Fermer

**Gestion :**

- Suppression individuelle avec confirmation
- Suppression en masse avec alerte forte
- Changement de séance (réinitialisation état)

**Statistiques :**

- Total productions
- Répartition par niveau (1, 2, 3)
- Affichage en cards colorées

**Messages de feedback :**

- Succès (vert) : production ajoutée, suppression
- Erreur (rouge) : production invalide, échec
- Warning (jaune) : séance introuvable mais productions disponibles

#### P3.5 - Export PDF groupé (modification SessionView.jsx)

- Bouton "📥 Exporter en PDF (X)" visible si sélections > 0
- Utilisation fonction `exporterPlusieursPDF()` existante
- Format : 1 acrostiche par page A4 (en-tête, mot, niveau, vers)
- Nom fichier automatique : `acrostiches_<CODE>_<DATE>.pdf`
- État "⏳ Export en cours..." pendant génération
- Bouton désactivé pendant export (évite double-clic)
- Message succès après export
- Réinitialisation sélections après succès
- Gestion erreurs avec messages clairs

#### P3.6 - Dashboard enseignant (`TeacherDashboard.jsx`)

**Structure générale :**

- Header : Titre + description + bouton retour accueil
- Navigation par onglets sticky (3 onglets)
- Footer informatif
- Animations transitions (fade-in)

**Onglet 1 - Créer une séance :**

- Intègre composant `<SessionCreate />`
- Callback optionnel après création

**Onglet 2 - Consulter productions :**

- Intègre composant `<SessionView />`
- Prop `codeSeance` pour pré-remplissage

**Onglet 3 - Mes séances :**

- Liste cards séances actives
- Infos par séance : code, nom, temps restant, nb productions
- URL élève en lecture seule avec bouton copier
- Actions : Consulter (bascule onglet 2) | Supprimer | Rafraîchir
- Message si aucune séance
- Confirmation avant suppression
- Stats en temps réel (compte productions)

**Navigation intelligente :**

- Changement onglet sans rechargement
- État conservé entre onglets
- Bascule automatique "Mes séances" → "Consulter"

#### P3.7 - Intégration navigation

- Route `/enseignant` activée dans `App.jsx`
- Import `TeacherDashboard` ajouté
- Bouton "👨‍🏫 Enseignant" dans Header global
- 4 boutons navigation au lieu de 3
- Indication visuelle page active maintenue
- Responsive conservé (icônes sur mobile)
- Export centralisé `src/components/teacher/index.js`

### Modifié

- **StudentWorkspace.jsx** : Intégration système partage
    - 5 nouveaux états (codeSeance, modeSeance, urlPartage, urlCopiee, nomEleve)
    - 2 useEffect (détection session, génération URL)
    - Fonction copie URL avec feedback
    - Indicateur séance en header (badge vert)
    - Section partage conditionnelle étape 4
    - Gestion cas URL null avec message temporaire
    - Input HTML natif (au lieu de composant Input)
- **Header.jsx** : Navigation enrichie
    - Ajout 4ème bouton "Enseignant"
    - Détection page active `/enseignant`
    - Classes CSS cohérentes
- **App.jsx** : Activation route enseignant
    - Route `/enseignant` vers `<TeacherDashboard />`
    - 4 routes actives sur 4
- **utils/index.js** : Exports étendus
    - Export toutes fonctions `partage.js`
    - Export toutes fonctions `session.js`

### Technique

- **Encodage URL** : Base64 + compression JSON
    - Format compact : `{m, n, v, e, d}` au lieu de noms complets
    - Taille estimée : 150-400 caractères selon acrostiche
    - Limite URL : ~2000 caractères (variable selon navigateurs)
- **localStorage structure** :
    - `je-compose-sessions` - Séances enseignant (max 20)
    - `je-compose-productions` - Productions par séance (max 50/séance)
    - Try-catch sur toutes opérations
    - Validation avant sauvegarde
- **Nettoyage automatique** :
    - Séances expirées supprimées au chargement
    - Fonction `recupererSeances()` nettoie à chaque appel
- **Format codes séance** :
    - 3 lettres majuscules + 3 chiffres (ex: ABC123)
    - Génération aléatoire avec vérification unicité
    - Regex validation : `/^[A-Z]{3}[0-9]{3}$/`
- **Durée séances** :
    - 24 heures par défaut
    - Configurable 1-7 jours (slider)
    - Calcul expiration précis (Date ISO)
- **Validation productions** :
    - Vérification structure objet (motInitial, niveau, vers)
    - Vérification types (string, number, array)
    - Reject si données corrompues
- **Props avancées** :
    - SessionView accepte `codeSeance` en prop
    - SessionCreate accepte callback `onSessionCreated`
    - Communication parent → enfant pour navigation

### Sécurité et limites

**⚠️ Limitations assumées pour MVP :**

- Pas de backend : tout en localStorage navigateur
- Pas d'authentification : codes séance = sécurité minimale
- Données non chiffrées : encodage base64 ≠ chiffrement
- Pas de synchronisation : chaque navigateur = données isolées
- URL longues : limites variables selon navigateurs
- Pas de validation côté serveur
- Pas de rate limiting
- Collision codes possible (probabilité faible mais non nulle)

**✅ Acceptable pour contexte scolaire :**

- Pas de données personnelles sensibles
- Usage temporaire (séances 1-7 jours)
- Réseau local école (pas d'exposition internet)
- Objectif pédagogique, pas production critique

### Phase 3 - Bilan

**✅ Phase 3 : 100% COMPLÉTÉE**

**Fichiers créés** : 5 nouveaux fichiers

- `src/utils/session.js` (390 lignes)
- `src/utils/partage.js` (430 lignes)
- `src/components/teacher/SessionCreate.jsx` (380 lignes)
- `src/components/teacher/SessionView.jsx` (650 lignes)
- `src/pages/TeacherDashboard.jsx` (330 lignes)

**Fichiers modifiés** : 4 fichiers

- `src/pages/StudentWorkspace.jsx` (ajout système partage)
- `src/components/layout/Header.jsx` (ajout bouton enseignant)
- `src/App.jsx` (route `/enseignant`)
- `src/utils/index.js` (exports)

**Total Phase 3** : ~2 180 lignes de code

**Workflow complet fonctionnel :**

```
1. Enseignant crée séance (ABC123) sur /enseignant
2. Enseignant partage URL aux élèves : /eleve?session=ABC123
3. Élève accède, voit badge "📋 Séance : ABC123"
4. Élève crée acrostiche normalement (4 étapes)
5. Élève finalise → Section partage s'affiche
6. Élève entre son prénom (optionnel)
7. URL générée automatiquement avec production encodée
8. Élève copie URL et envoie à enseignant
9. Enseignant clique URL → Production sauvegardée auto
10. Enseignant consulte dans SessionView
11. Enseignant filtre, trie, sélectionne
12. Enseignant exporte PDF groupé
```

**Composants créés** : 20 total

- Phase 1 : 5 composants communs
- Phase 2 : 6 composants élève + 1 layout
- Phase 3 : 3 composants enseignant (SessionCreate, SessionView, TeacherDashboard)

**Pages créées** : 4/4

- Home (accueil) - Phase 2
- StudentWorkspace (création) - Phase 2
- Examples (galerie) - Phase 2
- TeacherDashboard (enseignant) - Phase 3 ← NOUVEAU

**Routes actives** : 4/4

- `/` - Home
- `/eleve` - StudentWorkspace
- `/exemples` - Examples
- `/enseignant` - TeacherDashboard ← NOUVEAU

**Fonctionnalités enseignant** :

- ✅ Création séances avec codes
- ✅ Partage URL élèves
- ✅ Réception productions automatique
- ✅ Consultation avec filtres/tri
- ✅ Sélection multiple
- ✅ Export PDF groupé
- ✅ Gestion séances (liste, suppression)
- ✅ Statistiques temps réel

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
- Composants élève : ~1 030 lignes
- Utilitaires et données : ~700 lignes

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
- Hot Module Replacement (HMR)
- Fast Refresh React
- Optimisation bundle Vite

---

**Convention de versioning** : [Semantic Versioning 2.0.0](https://semver.org/lang/fr/)

- **MAJOR** (1.0.0) : Changements incompatibles de l'API
- **MINOR** (0.X.0) : Ajout de fonctionnalités rétro-compatibles
- **PATCH** (0.0.X) : Corrections de bugs rétro-compatibles

**Phases du projet** :

- Phase 1 (v0.1.0 - v0.2.0) : Fondations
- Phase 2 (v0.3.0 - v0.4.0) : Interface élève
- Phase 3 (v0.5.0) : Interface enseignant
- Phase 4 (v1.0.0) : Finalisation et déploiement
