# Je Compose - Application d'acrostiches

Application web éducative pour la création d'acrostiches à l'école primaire (cycles 2 et 3).

![Statut](https://img.shields.io/badge/statut-en%20développement-yellow)
![Version](https://img.shields.io/badge/version-0.3.0-blue)
![Phase](<https://img.shields.io/badge/phase-2%20(67%25)-green>)

---

## 📊 État du projet

| Phase                              | Statut      | Progression | Durée     |
| ---------------------------------- | ----------- | ----------- | --------- |
| **Phase 1** - Fondations           | ✅ Complété | 100%        | 4 sem.    |
| **Phase 2** - Parcours élève       | 🚧 En cours | 67%         | 2/3 sem.  |
| └─ Données                         | ✅ Complété | 100%        | -         |
| └─ P1.1 StudentWorkspace           | ✅ Complété | 100%        | 2 jours   |
| └─ P1.2 Examples                   | ✅ Complété | 100%        | 1 jour    |
| └─ P1.3 Home                       | ⏳ À venir  | 0%          | 1-2 jours |
| └─ P1.4 Navigation                 | ⏳ À venir  | 0%          | 1 jour    |
| **Phase 3** - Interface enseignant | ⏳ À venir  | 0%          | 2-3 sem.  |
| **Phase 4** - Finalisation         | ⏳ À venir  | 0%          | 2-3 sem.  |

**Dernière mise à jour** : 8 février 2026

---

## 🎯 Objectif du projet

**Je Compose** est une application web permettant aux élèves de CE1, CE2, CM1 et CM2 de créer des acrostiches de manière guidée, avec trois niveaux de difficulté progressifs.

### Fonctionnalités principales

#### ✅ Pour les élèves (MVP)

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

#### ⏳ Pour les enseignants (Phase 3)

- ⏳ Création de séances simples
- ⏳ Consultation des productions élèves
- ⏳ Export PDF groupé

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
git clone https://github.com/votre-username/je-compose.git
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

## 📱 Parcours utilisateur actuel

### Route `/eleve` - Espace élève ✅

**Workflow en 4 étapes :**

1. **Choix du mot** (3-10 lettres)

    - Saisie libre ou suggestions
    - Validation automatique

2. **Choix du niveau**

    - 3 niveaux avec explications claires
    - Navigation retour possible

3. **Création ligne par ligne**

    - Éditeur avec lettre initiale
    - Banque de mots par lettre
    - Aperçu temps réel (sidebar)
    - Sauvegarde auto toutes les 60s

4. **Finalisation**
    - Export PNG haute résolution
    - Messages d'encouragement
    - Options : Modifier / Recommencer / Voir exemples

### Route `/exemples` - Galerie d'exemples ✅

- 10 acrostiches modèles (4 niveau 1, 4 niveau 2, 2 niveau 3)
- Filtrage par niveau
- Modal de détail avec explications
- CTA vers création

### Route `/` - Accueil ⏳

Actuellement : page temporaire avec CTA  
**P1.3** : vraie page d'accueil (en développement)

---

## 🏗️ Architecture technique

### Stack

- **Frontend** : React 18.3 + Vite 5.1
- **Styling** : Tailwind CSS 3.4
- **Routage** : React Router 6.22
- **State** : Context API + useReducer
- **Stockage** : localStorage (pas de backend dans MVP)
- **Export** : html2canvas + jsPDF
- **Package manager** : pnpm

### Structure du projet

```
je-compose/
├── src/
│   ├── components/
│   │   ├── common/              # 5 composants réutilisables ✅
│   │   │   ├── Button.jsx
│   │   │   ├── Input.jsx
│   │   │   ├── Modal.jsx
│   │   │   ├── Card.jsx
│   │   │   └── Loading.jsx
│   │   └── student/             # Composants élève ✅
│   │       ├── MotInput.jsx
│   │       ├── NiveauSelector.jsx
│   │       ├── AcrosticheEditor.jsx
│   │       ├── WordBank.jsx
│   │       ├── PreviewPanel.jsx
│   │       └── ExampleGallery.jsx
│   ├── contexts/
│   │   └── AcrosticheContext.jsx  # État global ✅
│   ├── hooks/
│   │   ├── useLocalStorage.js     # Persistance ✅
│   │   └── useAcrosticheContext.js
│   ├── utils/
│   │   ├── acrostiche.js          # 15+ fonctions ✅
│   │   └── export.js              # Export PNG/PDF ✅
│   ├── data/
│   │   ├── exemples.js            # 10 acrostiches ✅
│   │   └── lexique.js             # ~200 mots ✅
│   ├── pages/
│   │   ├── StudentWorkspace.jsx   # ✅ P1.1
│   │   ├── Examples.jsx           # ✅ P1.2
│   │   ├── Home.jsx               # ⏳ P1.3
│   │   └── (teacher/)             # ⏳ Phase 3
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── docs/
│   └── SRS_V3.0.md               # Spécifications (référence)
├── README.md
└── package.json
```

### Fonctionnalités clés implémentées

#### Context API avec reducer ✅

```javascript
import { useAcrosticheContext } from "@hooks";

const { state, actions } = useAcrosticheContext();
actions.creerAcrostiche(mot, niveau);
```

#### Sauvegarde localStorage ✅

- Auto-sauvegarde toutes les 60s
- Limite de 5 brouillons (FIFO)
- Synchronisation multi-onglets
- Nettoyage automatique données expirées

#### Export multi-format ✅

```javascript
import { exporterEnPNG, exporterEnPDF } from "@utils/export";

await exporterEnPNG(element, "mon-acrostiche");
await exporterEnPDF(acrostiche, "mon-acrostiche");
```

#### Lexique thématique ✅

```javascript
import { getMotsParLettre } from "@data/lexique";

const mots = getMotsParLettre("C", 15); // 15 mots en C
```

---

## 🎨 Design système

### Palette de couleurs

- **Primary** : Bleu (#0ea5e9) - Actions principales
- **Secondary** : Violet (#d946ef) - Accents
- **Success** : Vert (#10b981) - Feedback positif
- **Warning** : Orange (#f59e0b) - Alertes
- **Error** : Rouge (#ef4444) - Erreurs

### Typographie

- **Font principale** : Inter (lisibilité optimale)
- **Font display** : Quicksand (titres enfants)
- **Line-height** : 1.5-1.6 (confort de lecture)

### Composants réutilisables

```jsx
// Button
<Button variant="primary" size="large" onClick={handler}>
  Créer mon acrostiche
</Button>

// Input avec validation
<Input
  id="mot"
  label="Ton mot"
  value={mot}
  onChange={setMot}
  error={erreur}
  maxLength={10}
/>

// Modal accessible
<Modal isOpen={isOpen} onClose={close} title="Titre">
  Contenu
</Modal>

// Card flexible
<Card title="Ma carte" hover onClick={handler}>
  Contenu
</Card>
```

---

## 📚 Documentation

### Guides disponibles

- **README.md** (ce fichier) - Vue d'ensemble et démarrage
- **docs/SRS_V3.0.md** - Spécifications complètes (référence)
- **TASK_P1.1_COMPLETE.md** - Documentation StudentWorkspace
- **TASK_P1.2_COMPLETE.md** - Documentation Examples
- **src/data/README.md** - Documentation lexique et exemples (à créer)

### Exemples d'utilisation

#### Créer un acrostiche (code)

```javascript
import { creerAcrostiche, validerMotAcrostiche } from "@utils/acrostiche";

// Valider le mot
const { valide, erreur } = validerMotAcrostiche("CHAT");

// Créer l'acrostiche
if (valide) {
    const acrostiche = creerAcrostiche("CHAT", 1); // niveau 1
    // {
    //   id: "acro_...",
    //   motInitial: "CHAT",
    //   niveau: 1,
    //   vers: ["", "", "", ""],
    //   statut: "brouillon"
    // }
}
```

#### Utiliser le Context

```javascript
import useAcrosticheContext from "@hooks/useAcrosticheContext";

function MonComposant() {
    const { state, actions } = useAcrosticheContext();

    const handleCreate = () => {
        actions.creerAcrostiche("CHAT", 1);
    };

    const handleUpdate = (index, contenu) => {
        actions.modifierLigne(index, contenu);
    };

    return (
        <div>
            {state.acrosticheActuel && (
                <p>
                    Progression :{" "}
                    {state.acrosticheActuel.vers.filter((v) => v).length} lignes
                </p>
            )}
        </div>
    );
}
```

---

## 🧪 Tests

### Tests manuels (MVP)

Le projet utilise actuellement des **tests manuels** uniquement.

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

### Version 0.3.0 (actuelle) - Phase 2 en cours

- [x] P1.1 : StudentWorkspace (parcours création)
- [x] P1.2 : Examples (galerie)
- [ ] P1.3 : Home (accueil)
- [ ] P1.4 : Navigation (header persistant)

**Livrable** : Parcours élève complet fonctionnel

### Version 0.4.0 - Phase 3 (2-3 semaines)

- [ ] Interface enseignant minimaliste
- [ ] Création de séances
- [ ] Consultation productions
- [ ] Export PDF groupé
- [ ] Système de codes séance

**Livrable** : MVP complet élève + enseignant

### Version 1.0.0 - Phase 4 (2-3 semaines)

- [ ] Tests manuels complets
- [ ] Responsive final (tablette + desktop)
- [ ] Corrections bugs
- [ ] Documentation utilisateur (PDF)
- [ ] Déploiement production
- [ ] Vidéo démo 3 min

**Livrable** : Application déployée et utilisable

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
3. **Partager avec des enseignants** pour avoir des retours terrain

### Conventions de code

- **Langue** : Commentaires et variables en français
- **Style** : ESLint configuré (Airbnb-like)
- **Commits** : Format conventionnel (`feat:`, `fix:`, `docs:`)
- **Props** : PropTypes obligatoires sur tous les composants
- **Imports** : Organisés (React > Libs > @aliases > Relatifs)

### Structure commit

```bash
feat(scope): description courte

- Point détaillé 1
- Point détaillé 2

Refs: SRS Phase X, Tâche Y
```

---

## 📄 Licence

**MIT License** - Projet open source éducatif

Copyright (c) 2026 CPC Mathématiques & Numérique

---

## 📞 Contact et support

- **Développeur** : CPC Mathématiques & Numérique
- **Repo GitHub** : [github.com/votre-username/je-compose](https://github.com/votre-username/je-compose)
- **Issues** : Pour les bugs et suggestions
- **Discussions** : Pour les questions générales

---

## 🙏 Remerciements

- **Enseignants testeurs** (à venir en Phase 4)
- **Communauté React** pour les outils open source
- **Programmes français cycles 2 et 3** pour le cadre pédagogique
- **Travaux d'André Tricot** sur la charge cognitive

---

## 📈 Statistiques du projet

```
Lignes de code :       ~3 500 (src/)
Composants React :     17
Fonctions utilitaires : 25+
Exemples d'acrostiches : 10
Mots dans le lexique :  ~200
Routes actives :        2/4
Tests manuels :         En cours
```

---

**Version** : 0.3.0 (Phase 2 - 67%)  
**Dernière mise à jour** : 8 février 2026  
**Statut** : 🚧 En développement actif  
**Prochaine étape** : P1.3 - Home.jsx
