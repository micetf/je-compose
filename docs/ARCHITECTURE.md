# Architecture du projet Je Compose

> **Version** : 0.3.0  
> **Dernière mise à jour** : 8 février 2026  
> **Statut** : Phase 2 en cours (67%)

---

## 📁 Structure complète des fichiers

```
je-compose/
├── .eslintrc.cjs               # Configuration ESLint
├── .gitignore                  # Fichiers à ignorer par Git
├── package.json                # Dépendances et scripts
├── vite.config.js              # Configuration Vite
├── tailwind.config.js          # Configuration Tailwind CSS
├── postcss.config.js           # Configuration PostCSS
├── index.html                  # Point d'entrée HTML
├── README.md                   # Documentation principale
├── docs/                       # 📁 Documentation détaillée
│   ├── SRS_V3.0.md            # Spécifications (référence)
│   ├── ARCHITECTURE.md         # Ce fichier
│   └── PHASES/                # Historique par phase
│       └── tasks/             # Détails des tâches
│
└── src/
    ├── main.jsx                # Point d'entrée React
    ├── App.jsx                 # Composant racine avec routage
    ├── index.css               # Styles globaux Tailwind
    │
    ├── components/
    │   ├── common/             # ✅ 5 composants (Phase 1)
    │   │   ├── Button.jsx
    │   │   ├── Input.jsx
    │   │   ├── Modal.jsx
    │   │   ├── Card.jsx
    │   │   ├── Loading.jsx
    │   │   └── index.js        # Export centralisé
    │   │
    │   ├── student/            # ✅ 6 composants (Phase 2)
    │   │   ├── MotInput.jsx
    │   │   ├── NiveauSelector.jsx
    │   │   ├── AcrosticheEditor.jsx
    │   │   ├── WordBank.jsx
    │   │   ├── PreviewPanel.jsx
    │   │   ├── ExampleGallery.jsx
    │   │   └── index.js
    │   │
    │   └── teacher/            # ⏳ Phase 3
    │       ├── SessionCreate.jsx
    │       ├── SessionView.jsx
    │       └── index.js
    │
    ├── contexts/
    │   ├── AcrosticheContext.jsx
    │   ├── acrosticheConstants.js
    │   └── index.js
    │
    ├── hooks/
    │   ├── useLocalStorage.js
    │   ├── useAcrosticheContext.js
    │   ├── useAcrostiche.js        # (Phase 2)
    │   └── index.js
    │
    ├── utils/
    │   ├── acrostiche.js
    │   ├── export.js
    │   └── index.js
    │
    ├── data/
    │   ├── exemples.js
    │   ├── lexique.js
    │   └── index.js
    │
    └── pages/
        ├── Home.jsx                # ⏳ P1.3
        ├── StudentWorkspace.jsx    # ✅ P1.1
        ├── Examples.jsx            # ✅ P1.2
        └── TeacherDashboard.jsx    # ⏳ Phase 3
```

---

## 🔄 Flux de données

### 1. État global (Context API)

```
AcrosticheProvider (Context)
    ↓
useAcrosticheContext (Hook)
    ↓
Composants enfants
```

**Implémentation** :

```javascript
// contexts/AcrosticheContext.jsx
export const AcrosticheProvider = ({ children }) => {
  const [state, dispatch] = useReducer(acrosticheReducer, initialState);

  const actions = {
    creerAcrostiche: (mot, niveau) => { ... },
    modifierLigne: (index, contenu) => { ... },
    finaliserAcrostiche: () => { ... },
    // ...
  };

  return (
    <AcrosticheContext.Provider value={{ state, actions }}>
      {children}
    </AcrosticheContext.Provider>
  );
};
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

**Implémentation** :

```javascript
// hooks/useLocalStorage.js
const useLocalStorage = (key, initialValue) => {
  const [storedValue, setStoredValue] = useState(() => {
    const item = window.localStorage.getItem(key);
    return item ? JSON.parse(item) : initialValue;
  });

  const setValue = (value) => {
    setStoredValue(value);
    window.localStorage.setItem(key, JSON.stringify(value));
    // Événement pour sync multi-onglets
    window.dispatchEvent(new CustomEvent('localStorage', { ... }));
  };

  return [storedValue, setValue, removeValue];
};
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

---

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

---

## 📦 Exports centralisés

Chaque dossier de composants/hooks/utils dispose d'un `index.js` pour faciliter les imports :

```javascript
// Au lieu de :
import Button from "@components/common/Button";
import Input from "@components/common/Input";

// On peut écrire :
import { Button, Input } from "@components/common";
```

---

## 🛠️ Scripts disponibles

```bash
pnpm dev          # Développement (port 3000)
pnpm build        # Build production
pnpm preview      # Preview de la build
pnpm lint         # Vérifier le code
pnpm lint:fix     # Corriger automatiquement
```

---

## 🎯 Patterns utilisés

### 1. Context API avec Reducer

**Avantages** :

- État global sans Redux
- Actions typées via constantes
- Reducers testables

**Utilisation** :

```javascript
const { state, actions } = useAcrosticheContext();
actions.creerAcrostiche("CHAT", 1);
```

### 2. Custom Hooks

**Hooks disponibles** :

- `useLocalStorage(key, initialValue)` - Persistance
- `useAcrosticheContext()` - Accès au Context
- `useAcrostiche()` - Logique métier (Phase 2)

**Exemple** :

```javascript
const [brouillons, setBrouillons] = useLocalStorage("brouillons", []);
```

### 3. Compound Components

**Exemple avec Modal** :

```javascript
<Modal isOpen={isOpen} onClose={close}>
    <Modal.Header>Titre</Modal.Header>
    <Modal.Body>Contenu</Modal.Body>
    <Modal.Footer>Actions</Modal.Footer>
</Modal>
```

### 4. Render Props (si nécessaire)

**Exemple** :

```javascript
<DataProvider>
    {({ data, loading }) => (loading ? <Loading /> : <Display data={data} />)}
</DataProvider>
```

---

## 🔒 Gestion d'état

### État local vs État global

**État local (useState)** :

- UI temporaire (modal ouverte, champ en cours)
- Données volatiles (formulaire non validé)
- Interactions locales au composant

**État global (Context)** :

- Acrostiche en cours d'édition
- Brouillons sauvegardés
- Historique des créations

**localStorage** :

- Persistance entre sessions
- Synchronisation multi-onglets
- Limite 5 Mo

---

## 🎨 Système de design

### Palette de couleurs

```javascript
// tailwind.config.js
colors: {
  primary: {
    50: '#f0f9ff',
    500: '#0ea5e9',
    900: '#0c4a6e',
  },
  secondary: {
    500: '#d946ef',
  },
  success: '#10b981',
  warning: '#f59e0b',
  error: '#ef4444',
}
```

### Composants de base

```javascript
// Button
<Button variant="primary" size="large" onClick={handler}>
  Texte
</Button>

// Input
<Input
  id="mot"
  label="Ton mot"
  value={mot}
  onChange={setMot}
  error={erreur}
  maxLength={10}
/>

// Card
<Card title="Titre" hover onClick={handler}>
  Contenu
</Card>

// Modal
<Modal isOpen={isOpen} onClose={close} title="Titre">
  Contenu
</Modal>

// Loading
<Loading size="medium" message="Chargement..." />
```

---

## 📊 Métriques du projet

### Statistiques actuelles (v0.3.0)

```
Lignes de code :       ~3 500
Composants React :     17
├─ Common :            5
├─ Student :           6
└─ Teacher :           0 (Phase 3)

Hooks personnalisés :  3
Fonctions utils :      25+
Pages :                2/4
Routes actives :       2 (/eleve, /exemples)

Données :
├─ Exemples :          10
├─ Mots lexique :      ~200
└─ Thèmes :            6
```

### Performance

- **Bundle JS** : ~450 Ko (minifié, avant gzip)
- **Chargement initial** : < 3s (4G)
- **Code splitting** : Par route (React.lazy)

---

## 🚀 Évolution de l'architecture

### Phase 1 (✅ Complété)

- Fondations (Vite + React + Tailwind)
- 5 composants communs
- Context API
- Hook localStorage
- Utils acrostiche (15 fonctions)

### Phase 2 (🚧 67%)

- ✅ Données (exemples + lexique)
- ✅ Composants élève (6)
- ✅ Pages StudentWorkspace et Examples
- ⏳ Page Home
- ⏳ Navigation globale

### Phase 3 (⏳ À venir)

- Composants enseignant (2)
- Page TeacherDashboard
- Système de codes séance
- Export PDF groupé

### Phase 4 (⏳ À venir)

- Tests manuels complets
- Responsive final
- Documentation utilisateur
- Déploiement production

---

## 🔧 Configuration des outils

### Vite

```javascript
// vite.config.js
export default defineConfig({
    plugins: [react()],
    resolve: {
        alias: {
            "@": "./src",
            "@components": "./src/components",
            "@contexts": "./src/contexts",
            "@hooks": "./src/hooks",
            "@utils": "./src/utils",
            "@data": "./src/data",
        },
    },
    build: {
        target: "es2015",
        chunkSizeWarningLimit: 500,
    },
});
```

### ESLint

```javascript
// eslint.config.js
export default defineConfig([
    {
        files: ["**/*.{js,jsx}"],
        rules: {
            "no-unused-vars": ["error", { varsIgnorePattern: "^[A-Z_]" }],
        },
    },
]);
```

### Tailwind

```javascript
// tailwind.config.js
export default {
    content: ["./index.html", "./src/**/*.{js,jsx}"],
    theme: {
        extend: {
            fontFamily: {
                sans: ["Inter", "system-ui"],
                display: ["Quicksand", "sans-serif"],
            },
        },
    },
};
```

---

## 📚 Ressources

### Documentation officielle

- [React](https://react.dev)
- [Vite](https://vitejs.dev)
- [Tailwind CSS](https://tailwindcss.com)
- [React Router](https://reactrouter.com)

### Projet

- [README.md](../README.md) - Documentation principale
- [SRS_V3.0.md](./SRS_V3.0.md) - Spécifications
- [PHASES/](./PHASES/) - Historique du développement

---

**Dernière mise à jour** : 8 février 2026  
**Version** : 0.3.0 (Phase 2 - 67%)  
**Prochaine étape** : P1.3 - Home.jsx
