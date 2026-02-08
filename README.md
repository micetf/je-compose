# Je Compose - Application d'acrostiches

Application web éducative pour la création d'acrostiches à l'école primaire (cycles 2 et 3).

## 📊 État du projet

| Phase                  | Statut      | Progression |
| ---------------------- | ----------- | ----------- |
| Phase 1 - Fondations   | ✅ Complété | 100%        |
| Phase 2 - Données      | ✅ Complété | 100%        |
| Phase 2 - Composants   | 🚧 En cours | 0%          |
| Phase 3 - Enseignant   | ⏳ À venir  | 0%          |
| Phase 4 - Finalisation | ⏳ À venir  | 0%          |

---

## 📋 Phase 1 - Fondations ✅

### Configuration du projet

- ✅ Vite 5.x + React 18.x
- ✅ Tailwind CSS 3.x avec configuration personnalisée
- ✅ pnpm comme gestionnaire de paquets
- ✅ React Router 6.x pour le routage
- ✅ Structure de dossiers modulaire
- ✅ ESLint configuré sans erreurs
- ✅ PropTypes sur tous les composants

### Système de design (5 composants)

- ✅ `Button` - 4 variantes, 3 tailles
- ✅ `Input` - Avec validation et helper text
- ✅ `Modal` - Accessible avec gestion focus
- ✅ `Card` - Flexible avec header/footer
- ✅ `Loading` - 3 tailles, mode fullscreen

### Architecture technique

- ✅ Context API avec reducer
- ✅ Hook useLocalStorage avec sync multi-onglets
- ✅ 15+ fonctions utilitaires acrostiche
- ✅ Validation des données
- ✅ Gestion d'état persistant
- ✅ Exports centralisés (index.js)

### Configuration

- ✅ CSS global avec Tailwind
- ✅ Aliases de chemins (@components, @utils, etc.)
- ✅ Build optimisé avec code splitting

---

## 📚 Phase 2 - Données ✅

### Exemples d'acrostiches (10 modèles)

- ✅ 4 acrostiches niveau 1 (mot par ligne)
    - CHAT, ÉCOLE, AUTOMNE, LUCAS
- ✅ 4 acrostiches niveau 2 (phrase courte)
    - LUNE, AMITIÉ, HIVER, OCÉAN
- ✅ 2 acrostiches niveau 3 (vers poétiques)
    - LIBERTÉ, PRINTEMPS

### Lexique thématique (~200 mots)

- ✅ 🐾 Animaux - ~80 mots
- ✅ 🌳 Nature - ~60 mots
- ✅ ❤️ Émotions - ~35 mots
- ✅ 📚 École - ~40 mots
- ✅ 🎨 Couleurs - ~30 mots
- ✅ 🏃 Actions - ~35 mots

### Fonctions d'export

- ✅ Export PNG (html2canvas)
- ✅ Export PDF simple (jsPDF)
- ✅ Export PDF groupé (pour enseignant)
- ✅ Copie presse-papier
- ✅ Partage par URL encodée

---

## 🚀 Installation

### Prérequis

- Node.js 18+
- pnpm (installé via `npm install -g pnpm`)

### Commandes

```bash
# Cloner le projet
git clone [url-du-repo]
cd je-compose

# Installer les dépendances
pnpm install

# Lancer en développement
pnpm dev

# Builder pour production
pnpm build

# Preview de la build
pnpm preview

# Vérifier le code
pnpm lint
pnpm lint:fix
```

L'application sera accessible sur `http://localhost:3000`

---

## 📁 Structure du projet

```
src/
├── components/
│   ├── common/                 # 5 composants réutilisables ✅
│   │   ├── Button.jsx
│   │   ├── Input.jsx
│   │   ├── Modal.jsx
│   │   ├── Card.jsx
│   │   ├── Loading.jsx
│   │   └── index.js
│   ├── student/                # Composants élève (Phase 2)
│   │   ├── AcrosticheEditor.jsx
│   │   ├── WordBank.jsx
│   │   ├── ExampleGallery.jsx
│   │   ├── PreviewPanel.jsx
│   │   └── index.js
│   └── teacher/                # Composants enseignant (Phase 3)
│       ├── SessionCreate.jsx
│       ├── SessionView.jsx
│       └── index.js
├── contexts/
│   ├── AcrosticheContext.jsx   # État global ✅
│   ├── acrosticheConstants.js  # Constantes ✅
│   └── index.js                # Export centralisé ✅
├── hooks/
│   ├── useLocalStorage.js      # Hook persistance ✅
│   ├── useAcrosticheContext.js # Hook context ✅
│   ├── useAcrostiche.js        # (Phase 2)
│   └── index.js                # Export centralisé ✅
├── utils/
│   ├── acrostiche.js           # 15+ fonctions ✅
│   ├── export.js               # 6 fonctions export ✅
│   └── index.js                # Export centralisé ✅
├── data/                       # ✅ Phase 2 complétée
│   ├── exemples.js             # 10 acrostiches ✅
│   ├── lexique.js              # ~200 mots ✅
│   ├── index.js                # Export centralisé ✅
│   └── README.md               # Documentation ✅
├── pages/                      # (Phase 2)
│   ├── Home.jsx
│   ├── StudentWorkspace.jsx
│   ├── TeacherDashboard.jsx
│   └── Examples.jsx
├── App.jsx                     # Composant racine ✅
├── main.jsx                    # Point d'entrée ✅
└── index.css                   # Styles globaux ✅
```

## 🎨 Système de design

### Couleurs

- **Primary** : Bleu (tons 50-900) - Navigation et actions principales
- **Secondary** : Violet (tons 50-900) - Accents
- **Success** : Vert - Feedback positif
- **Warning** : Orange - Alertes
- **Error** : Rouge - Erreurs

### Typographie

- **Font principale** : Inter (texte courant)
- **Font display** : Quicksand (titres)
- Tailles adaptées pour jeunes lecteurs (line-height 1.5-1.6)

### Composants communs

#### Button

```jsx
<Button variant="primary" size="medium" onClick={handleClick}>
    Cliquer ici
</Button>
```

#### Input

```jsx
<Input
    id="mot"
    label="Ton mot"
    value={mot}
    onChange={(e) => setMot(e.target.value)}
    maxLength={10}
    error={erreur}
/>
```

#### Modal

```jsx
<Modal
    isOpen={isOpen}
    onClose={() => setIsOpen(false)}
    title="Titre de la modal"
>
    Contenu
</Modal>
```

#### Card

```jsx
<Card title="Ma carte" hover>
    Contenu de la carte
</Card>
```

#### Loading

```jsx
<Loading size="medium" message="Chargement..." />
```

## 🔧 Utilitaires disponibles

### Fonctions acrostiche (`utils/acrostiche.js`)

- `creerAcrostiche(mot, niveau)` - Crée un nouvel acrostiche
- `validerMotAcrostiche(mot)` - Valide un mot (3-10 lettres)
- `validerLigneAcrostiche(ligne, niveau)` - Valide une ligne selon le niveau
- `mettreAJourLigne(acrostiche, index, contenu)` - Met à jour une ligne
- `finaliserAcrostiche(acrostiche)` - Marque comme terminé
- `estAcrosticheComplet(acrostiche)` - Vérifie si complet
- `formatterAcrostiche(acrostiche)` - Formate pour l'affichage
- `calculerStatistiques(acrostiche)` - Calcule progression et stats
- `genererCodeSeance()` - Génère un code de 6 caractères
- `getLibelleNiveau(niveau)` - Retourne les infos d'un niveau

### Hook localStorage (`hooks/useLocalStorage.js`)

```jsx
const [valeur, setValeur, removeValeur] = useLocalStorage(
    "cle",
    valeurInitiale
);
```

Fonctions utilitaires :

- `getLocalStorageSpace()` - Vérifie l'espace utilisé
- `cleanExpiredData(prefix, maxAge)` - Nettoie les données expirées
- `exportLocalStorage()` - Exporte toutes les données
- `importLocalStorage(json)` - Importe des données

### Context Acrostiche

```jsx
import { useAcrosticheContext } from "@hooks/useAcrosticheContext";
// ou
import { useAcrosticheContext } from "@hooks";

const { state, actions } = useAcrosticheContext();

// Actions disponibles
actions.creerAcrostiche(mot, niveau);
actions.modifierLigne(index, contenu);
actions.finaliserAcrostiche();
actions.chargerAcrostiche(acrostiche);
actions.reinitialiser();
actions.sauvegarderBrouillon();

// État
state.acrosticheActuel;
state.brouillons;
state.historique;
```

### Données (`data/`)

#### Exemples d'acrostiches

```jsx
import {
    getTousLesExemples,
    getExemplesParNiveau,
    getExempleAleatoire,
} from "@data";

const tous = getTousLesExemples(); // 10 exemples
const niveau1 = getExemplesParNiveau(1); // 4 exemples
const aleatoire = getExempleAleatoire(2); // Exemple niveau 2 aléatoire
```

#### Lexique thématique

```jsx
import {
    getMotsParLettre,
    getMotsParThemeEtLettre,
    compterMotsTotal,
} from "@data";

const motsC = getMotsParLettre("C", 15); // 15 mots en C
const animauxA = getMotsParThemeEtLettre("animaux", "A"); // Animaux en A
const total = compterMotsTotal(); // ~200
```

#### Export et partage

```jsx
import {
    exporterEnPNG,
    exporterEnPDF,
    copierDansPressePapier,
    genererURLPartage,
} from "@utils";

// Export PNG
await exporterEnPNG(element, "mon-acrostiche");

// Export PDF
await exporterEnPDF(acrostiche, "mon-acrostiche");

// Copier
await copierDansPressePapier(acrostiche);

// URL de partage
const url = genererURLPartage(acrostiche);
```

---

## 📝 Prochaines étapes

### Phase 2 - Composants élève (en cours)

- [ ] `AcrosticheEditor` - Composant principal de création
- [ ] `WordBank` - Banque de mots thématiques
- [ ] `ExampleGallery` - Galerie des 10 exemples
- [ ] `PreviewPanel` - Aperçu en temps réel
- [ ] `StudentWorkspace` - Page élève complète
- [ ] `Examples` - Page exemples
- [ ] `Home` - Page d'accueil

### Phase 3 - Fonctionnalités enseignant

- [ ] `SessionCreate` - Création de séance
- [ ] `SessionView` - Consultation productions
- [ ] Export PDF groupé
- [ ] Système de codes séance

### Phase 4 - Finalisation

- [ ] Tests manuels complets
- [ ] Responsive design final
- [ ] Documentation utilisateur
- [ ] Déploiement

---

## 🎯 Conventions de code

- Commentaires en français
- PropTypes sur tous les composants
- Nommage explicite des fonctions
- Un composant = un fichier
- Export named pour les utilitaires, default pour les composants
- Imports organisés : React > Libs > Aliases > Relatifs

## 📚 Technologies utilisées

- **React 18.3** - Bibliothèque UI
- **Vite 5.1** - Build tool avec SWC
- **Tailwind CSS 3.4** - Framework CSS utility-first
- **React Router 6.22** - Routage SPA
- **html2canvas 1.4** - Export PNG
- **jsPDF 2.5** - Export PDF
- **PropTypes 15.8** - Validation des props

## 📖 Documentation supplémentaire

- **README.md** (ce fichier) - Vue d'ensemble du projet
- **ARCHITECTURE.md** - Architecture détaillée et flux de données
- **QUICKSTART.md** - Guide de démarrage rapide
- **PHASE1_COMPLETE.md** - Récapitulatif Phase 1
- **PHASE2_DATA_COMPLETE.md** - Récapitulatif Phase 2 (données)
- **src/data/README.md** - Documentation du lexique et exemples

## 🐛 Problèmes courants

### Port 3000 déjà utilisé

```bash
# Modifier le port dans vite.config.js
server: {
  port: 3001,  // Changer le port
}
```

### Erreurs ESLint

```bash
pnpm lint:fix
```

### Module non trouvé

```bash
rm -rf node_modules pnpm-lock.yaml
pnpm install
```

## 📄 Licence

MIT - Projet open source éducatif

---

**Version** : 1.0.0  
**Phase actuelle** : 2 - Composants élève (en cours)  
**Date** : Février 2026  
**Développeur** : CPC Mathématiques & Numérique

**Statut global** : Phase 1 ✅ | Phase 2 Data ✅ | Phase 2 Composants 🚧

MIT - Projet open source éducatif

---

**Version** : 1.0.0 - Phase 1 complétée
**Date** : Février 2026
**Développeur** : CPC Mathématiques & Numérique
