# Architecture du projet Je Compose

## 📁 Structure complète des fichiers

```
je-compose/
├── .eslintrc.cjs               # Configuration ESLint
├── .gitignore                  # Fichiers à ignorer par Git
├── package.json                # Dépendances et scripts
├── vite.config.js              # Configuration Vite
├── tailwind.config.js          # Configuration Tailwind CSS
├── postcss.config.js           # Configuration PostCSS (auto-généré)
├── index.html                  # Point d'entrée HTML
├── README.md                   # Documentation principale
│
└── src/
    ├── main.jsx                # Point d'entrée React
    ├── App.jsx                 # Composant racine avec routage
    ├── index.css               # Styles globaux Tailwind
    │
    ├── components/
    │   ├── common/
    │   │   ├── Button.jsx
    │   │   ├── Input.jsx
    │   │   ├── Modal.jsx
    │   │   ├── Card.jsx
    │   │   ├── Loading.jsx
    │   │   └── index.js        # Export centralisé
    │   │
    │   ├── student/            # (Phase 2)
    │   │   ├── AcrosticheEditor.jsx
    │   │   ├── WordBank.jsx
    │   │   ├── ExampleGallery.jsx
    │   │   ├── PreviewPanel.jsx
    │   │   └── index.js
    │   │
    │   └── teacher/            # (Phase 3)
    │       ├── SessionCreate.jsx
    │       ├── SessionView.jsx
    │       └── index.js
    │
    ├── contexts/
    │   ├── AcrosticheContext.jsx
    │   ├── acrosticheConstants.js  # Constantes séparées
    │   └── index.js                # Export centralisé
    │
    ├── hooks/
    │   ├── useLocalStorage.js
    │   ├── useAcrosticheContext.js # Hook séparé
    │   ├── useAcrostiche.js        # (Phase 2)
    │   └── index.js                # Export centralisé
    │
    ├── utils/
    │   ├── acrostiche.js
    │   └── export.js               # (Phase 2)
    │
    ├── data/                       # (Phase 2)
    │   ├── exemples.js
    │   └── lexique.js
    │
    └── pages/                      # (Phase 2)
        ├── Home.jsx
        ├── StudentWorkspace.jsx
        ├── TeacherDashboard.jsx
        └── Examples.jsx
```

## 🔄 Flux de données

### 1. État global (Context API)

```
AcrosticheProvider (Context)
    ↓
useAcrosticheContext (Hook)
    ↓
Composants enfants
```

### 2. Persistance (localStorage)

```
Composant
    ↓
useLocalStorage hook
    ↓
localStorage (navigateur)
    ↓
Synchronisation entre onglets
```

### 3. Structure de données

#### Acrostiche

```javascript
{
  id: "acro_1234567890_xyz",
  motInitial: "CHAT",
  niveau: 1,  // 1, 2 ou 3
  vers: ["Câlin", "Heureux", "Adorable", "Tigré"],
  dateCreation: "2026-02-07T10:00:00Z",
  dateModification: "2026-02-07T10:05:00Z",
  statut: "termine"  // "brouillon" | "termine"
}
```

#### État du Context

```javascript
{
  acrosticheActuel: {...},  // Acrostiche en cours
  brouillons: [...],        // Max 5 brouillons
  historique: [...]         // Acrostiches terminés
}
```

## 🎨 Conventions de code

### Imports

```javascript
// 1. Imports React
import { useState, useEffect } from "react";

// 2. Imports de bibliothèques tierces
import PropTypes from "prop-types";

// 3. Imports depuis @aliases
import { Button, Input } from "@components/common";
import useAcrosticheContext from "@hooks/useAcrosticheContext";
import { creerAcrostiche } from "@utils/acrostiche";

// 4. Imports relatifs
import "./styles.css";
```

### Nommage

- **Composants** : PascalCase (Button.jsx, AcrosticheEditor.jsx)
- **Hooks** : camelCase avec préfixe "use" (useLocalStorage.js)
- **Utils** : camelCase (acrostiche.js, export.js)
- **Constants** : UPPER_SNAKE_CASE (ACTIONS.CREER_ACROSTICHE)
- **Variables/fonctions** : camelCase (creerAcrostiche, nouveauVers)

### Structure d'un composant

```javascript
import PropTypes from "prop-types";

/**
 * Description du composant
 * @param {Object} props - Props du composant
 */
const MonComposant = ({ prop1, prop2 }) => {
    // 1. Hooks
    const [state, setState] = useState(null);

    // 2. Fonctions utilitaires
    const handleClick = () => {
        // ...
    };

    // 3. Effets
    useEffect(() => {
        // ...
    }, []);

    // 4. Rendu
    return <div>{/* JSX */}</div>;
};

// PropTypes
MonComposant.propTypes = {
    prop1: PropTypes.string.isRequired,
    prop2: PropTypes.number,
};

export default MonComposant;
```

## 📦 Exports centralisés

Chaque dossier de composants/hooks/utils dispose d'un `index.js` pour faciliter les imports :

```javascript
// Au lieu de :
import Button from "@components/common/Button";
import Input from "@components/common/Input";

// On peut écrire :
import { Button, Input } from "@components/common";
```

## 🛠️ Scripts disponibles

```bash
pnpm dev          # Développement (port 3000)
pnpm build        # Build production
pnpm preview      # Preview de la build
pnpm lint         # Vérifier le code
pnpm lint:fix     # Corriger automatiquement
```

## ✅ Checklist Phase 1

- [x] Configuration Vite + React + Tailwind
- [x] Structure de dossiers
- [x] 5 composants communs
- [x] Context API avec reducer
- [x] Hook useLocalStorage
- [x] Utilitaires acrostiche (15+ fonctions)
- [x] Configuration ESLint
- [x] Exports centralisés (index.js)
- [x] Documentation README
- [x] Corrections Fast Refresh
- [x] Gestion erreurs ESLint

## 🚀 Prêt pour la Phase 2

Le projet est maintenant prêt pour développer les fonctionnalités élève :

- AcrosticheEditor (composant principal)
- WordBank (banque de mots)
- ExampleGallery (10 exemples)
- PreviewPanel (aperçu temps réel)
- Export PNG
- Data (exemples.js + lexique.js)
