# ⚠️ DOCUMENT DE RÉFÉRENCE - ARCHIVÉ

> **Ce document est la version 3.0 des spécifications initiales du projet, datée du 7 février 2026.**  
> **Il s'agit d'un document FIGÉ qui ne sera plus mis à jour.**
>
> **Pour l'état actuel du projet, consulter : [README.md](../README.md)**

---

<img src="https://r2cdn.perplexity.ai/pplx-full-logo-primary-dark%402x.png" style="height:64px;margin-right:32px"/>

# Spécifications des Exigences Logicielles (SRS) v3.0 - Réaliste

## Application Web : **Je Compose**

### _Acrostiches et poésie à l'école primaire_

---

## 1. Introduction

### 1.1 Objectif du document

Ce document définit les spécifications fonctionnelles et techniques d'une application web développée en solo, permettant aux élèves de cycles 2 et 3 de créer des acrostiches de manière guidée. L'application privilégie la simplicité, la maintenabilité et une approche progressive par itérations.[^1][^2][^3]

### 1.2 Portée du produit

Application web légère facilitant la création d'acrostiches selon trois niveaux de difficulté. L'accent est mis sur l'interface élève et un tableau de bord enseignant minimaliste. Les fonctionnalités sont priorisées pour un développement solo réaliste (3-4 mois).[^4][^5]

### 1.3 Public cible

- **Élèves** : CE1, CE2, CM1, CM2
- **Enseignants** : usage simple sans formation préalable
- **Contextes d'usage principaux** :
    - Individuel sur tablette (priorité 1)
    - Collectif au TBI pour découverte (priorité 2)
    - Groupes (version future)

### 1.4 Références

- Programmes français cycles 2 et 3 (2020)[^4]
- Principes de charge cognitive (Tricot)[^2][^6]
- Pédagogie de l'acrostiche[^3][^7]

---

## 2. Périmètre MVP (Minimum Viable Product)

### 2.1 Fonctionnalités INCLUSES

#### Pour les élèves

✅ Création d'acrostiches en 3 niveaux (mot, phrase courte, vers)
✅ Banque de mots thématiques simple (5-6 thèmes)
✅ Aide contextuelle basique (liste de mots par lettre)
✅ Visualisation temps réel de l'acrostiche
✅ Export image PNG
✅ Sauvegarde locale navigateur (brouillons)
✅ 10 exemples d'acrostiches commentés

#### Pour les enseignants

✅ Lien de séance simple (accès direct sans compte)
✅ Consultation des productions via code séance (24h)
✅ Export PDF groupé (toutes les productions d'une séance)

### 2.2 Fonctionnalités EXCLUES du MVP (versions futures)

❌ Mode collaboration temps réel
❌ Tableau de bord sophistiqué avec stats
❌ Gestion de compétences et LSU
❌ Correcteur orthographique intégré
❌ Dictée vocale et synthèse vocale
❌ Génération d'images par IA
❌ Système de comptes utilisateurs
❌ API et intégration ENT
❌ Mode hors ligne (PWA) complet
❌ Tutoriel interactif animé
❌ Dictionnaire intégré

---

## 3. Architecture technique simplifiée

### 3.1 Stack technologique

- **Frontend** : React 18.x + Vite 5.x
- **Styling** : Tailwind CSS 3.x (configuration minimale)
- **State management** : Context API + useState/useReducer (pas de Redux)
- **Routage** : React Router 6.x (3-4 pages max)
- **Stockage** : localStorage uniquement (pas de backend dans MVP)
- **Gestionnaire paquets** : pnpm

### 3.2 Structure modulaire simplifiée

```
src/
├── components/
│   ├── common/           # Button, Input, Modal (5-6 composants)
│   ├── student/
│   │   ├── AcrosticheEditor.jsx      # Composant principal création
│   │   ├── WordBank.jsx              # Banque de mots
│   │   ├── ExampleGallery.jsx        # Galerie exemples
│   │   └── PreviewPanel.jsx          # Aperçu acrostiche
│   └── teacher/
│       ├── SessionCreate.jsx         # Créer une séance (simple)
│       └── SessionView.jsx           # Voir productions
├── contexts/
│   └── AcrosticheContext.js          # État global application
├── hooks/
│   ├── useAcrostiche.js              # Logique métier
│   └── useLocalStorage.js            # Persistance locale
├── utils/
│   ├── acrostiche.js                 # Fonctions utilitaires
│   └── export.js                     # Export PNG/PDF
├── data/
│   ├── exemples.js                   # 10 exemples codés en dur
│   └── lexique.js                    # Banques de mots (objets JS)
└── App.jsx
```

### 3.3 Pas de backend dans MVP

- Tout en localStorage (5 Mo max suffisant)
- Partage via URL encodée (productions dans le hash)
- Pas de base de données
- Pas de serveur à gérer

---

## 4. Fonctionnalités détaillées MVP

### 4.1 Interface élève - Création d'acrostiche

#### F1 : Choix du mot-acrostiche

- **Priorité** : Haute
- Input texte simple (3-10 caractères, lettres uniquement)
- 15 suggestions prédéfinies (boutons cliquables) : AUTOMNE, ÉCOLE, CHAT, LIBERTÉ, AMITIÉ, etc.
- Validation immédiate

#### F2 : Sélection du niveau

- **Priorité** : Haute
- 3 boutons clairs avec icônes :
    - **Niveau 1** : "Un mot par ligne" 🟢
    - **Niveau 2** : "Une phrase par ligne" 🟠
    - **Niveau 3** : "Des vers poétiques" 🔴
- Explication courte (1 phrase) sous chaque niveau

#### F3 : Création ligne par ligne

- **Priorité** : Haute
- Une seule ligne visible à la fois (focus)
- Lettre initiale affichée en grand (non modifiable)
- Zone de texte libre
- **Aide simple** :
    - Bouton "Besoin d'aide ?" → liste de 10-15 mots commençant par la lettre
    - Mots génériques (pas de filtre thématique sophistiqué dans MVP)
- Boutons "Valider" et "Ligne suivante"
- Possibilité de revenir en arrière

#### F4 : Aperçu et finalisation

- **Priorité** : Haute
- Panneau latéral (desktop) ou bas d'écran (mobile) montrant l'acrostiche complet
- Lettre initiale mise en évidence (gras + couleur)
- Bouton "Modifier" par ligne
- Choix mise en forme basique : 2 polices, 3 couleurs de fond
- Bouton "Télécharger en image" (PNG via html2canvas ou équivalent)
- Bouton "Recommencer"

### 4.2 Interface élève - Galerie d'exemples

#### F5 : Exemples commentés

- **Priorité** : Moyenne
- 10 acrostiches modèles (codés en dur dans data/exemples.js)
- Répartition : 4 niveau 1, 4 niveau 2, 2 niveau 3
- Thèmes variés : prénoms, animaux, saisons, sentiments
- Annotation simple : badge niveau + 1 phrase d'explication
- Pas d'interaction complexe (juste lecture)

### 4.3 Interface enseignant

#### F6 : Créer une séance

- **Priorité** : Moyenne
- Formulaire ultra-simple :
    - Nom de la séance (optionnel)
    - Date d'expiration (24h par défaut, max 7 jours)
- Génération d'un code séance aléatoire (6 caractères)
- Affichage du lien à partager aux élèves
- Stockage du code dans localStorage enseignant

#### F7 : Consulter les productions

- **Priorité** : Moyenne
- Saisie du code séance
- Liste simple des acrostiches créés (lecture seule)
- Affichage : mot-acrostiche, niveau, date/heure
- Bouton "Exporter tout en PDF" (1 acrostiche par page)
- **Limitation** : stockage temporaire (24h max), pas de comptes

**Note** : Système basique avec URL partagée. Les productions sont stockées localement côté élève puis envoyées via URL encodée (ou QR code) vers l'enseignant. Pas de serveur.

---

## 5. Modalités d'usage (simplifiées)

### 5.1 Usage individuel (priorité 1)

- **Configuration** : 1 tablette ou ordinateur par élève
- **Durée estimée** : 15-30 min selon niveau
- **Scénario type** :

1. Élève accède via lien séance ou URL directe
2. Choisit son mot et son niveau
3. Crée son acrostiche avec aides disponibles
4. Télécharge l'image ou partage le code à l'enseignant

### 5.2 Usage collectif (priorité 2)

- **Configuration** : TBI/VPI + ordinateur enseignant
- **Durée estimée** : 20-30 min
- **Scénario type** :

1. Enseignant projette la galerie d'exemples
2. Création collective d'un acrostiche (enseignant saisit les propositions orales)
3. Discussion et amélioration collective

### 5.3 Usage en groupes (hors MVP)

Prévu pour version 2.0

---

## 6. Interface et UX simplifiées

### 6.1 Principes de design

- **Simplicité avant tout** : 1 action = 1 écran
- **Guidance visuelle** : numéros d'étapes, progression visible
- **Feedback immédiat** : messages courts et positifs
- **Responsive basique** : desktop et tablette (mobile en mode portrait limité)

### 6.2 Adaptations selon modalité

**Mode individuel**

- Interface complète avec toutes les aides
- Sauvegarde automatique toutes les 60 secondes

**Mode collectif (TBI)**

- Police agrandie automatiquement
- Zone de saisie centrée
- Masquage du panneau d'aide (enseignant guide oralement)

### 6.3 Accessibilité de base

- Contraste WCAG AA minimum (4.5:1)
- Navigation clavier possible
- Textes alt sur images
- Labels explicites sur formulaires

---

## 7. Données et stockage

### 7.1 Modèle de données minimal

#### Acrostiche (localStorage élève)

```javascript
{
  id: string,
  motInitial: string,
  niveau: number,
  vers: string[],
  dateCreation: timestamp,
  statut: 'brouillon' | 'termine'
}
```

#### Séance (localStorage enseignant)

```javascript
{
  code: string,
  nom: string,
  dateCreation: timestamp,
  dateExpiration: timestamp
}
```

### 7.2 Persistance

- **Élève** : localStorage (max 5 acrostiches sauvegardés)
- **Enseignant** : localStorage (max 10 séances)
- **Pas de synchronisation** entre appareils dans MVP
- **Nettoyage automatique** : suppressions des données expirées au chargement

---

## 8. Exigences non-fonctionnelles réalistes

### 8.1 Performance

- Chargement initial < 5s (4G)
- Application légère : bundle JS < 500 Ko (minifié)
- Pas d'optimisation avancée dans MVP (code splitting facultatif)

### 8.2 Compatibilité

- **Navigateurs** : Chrome 100+, Firefox 100+, Safari 15+, Edge 100+
- **Appareils** : Tablettes 10 pouces min, ordinateurs
- Pas de support mobile < 8 pouces dans MVP

### 8.3 Sécurité

- Pas de données sensibles collectées
- Pas de système d'authentification (pas de mot de passe)
- localStorage uniquement (pas d'exposition serveur)

### 8.4 Maintenabilité

- Code commenté en français
- Composants avec PropTypes
- Architecture simple et lisible
- **Tests** : manuels uniquement (pas de tests automatisés dans MVP)
- Documentation README pour installation et développement

---

## 9. Plan de développement solo

### 9.1 Phase 1 - Fondations (3-4 semaines)

- Setup projet (Vite + React + Tailwind)
- Système de design basique (10 composants communs max)
- Structure de données et utils
- Composant AcrosticheEditor (version basique niveau 1)

### 9.2 Phase 2 - Fonctionnalités élève (4-5 semaines)

- Création acrostiche 3 niveaux
- Banque de mots simple (5-6 thèmes, ~200 mots total)
- Aperçu et export PNG
- Galerie exemples (10 acrostiches codés)
- Sauvegarde localStorage

### 9.3 Phase 3 - Fonctionnalités enseignant (2-3 semaines)

- Création séance (formulaire simple)
- Système de codes séance
- Consultation productions
- Export PDF basique

### 9.4 Phase 4 - Finalisation (2-3 semaines)

- Responsive design (desktop + tablette)
- Tests manuels sur différents navigateurs
- Corrections bugs
- Documentation utilisateur (1 page A4)
- Déploiement (Vercel, Netlify ou similaire)

**Total réaliste : 12-16 semaines** (3-4 mois à temps partiel)

---

## 10. Critères d'acceptation MVP

### 10.1 Tests manuels

**Parcours élève**

- ✅ Créer un acrostiche niveau 1 de A à Z en < 10 min
- ✅ Utiliser l'aide "mots suggérés" au moins 1 fois
- ✅ Télécharger l'image PNG (qualité lisible)
- ✅ Sauvegarder et reprendre un brouillon
- ✅ Consulter les exemples

**Parcours enseignant**

- ✅ Créer une séance et obtenir un lien fonctionnel
- ✅ Recevoir une production élève (via code ou URL)
- ✅ Exporter 3 productions en PDF

**Technique**

- ✅ Application fonctionne sur Chrome, Firefox, Safari
- ✅ Responsive sur tablette 10 pouces et desktop
- ✅ Pas d'erreur console critique
- ✅ localStorage fonctionne correctement

### 10.2 Tests utilisateurs (légers)

- 3-5 enseignants testeurs (retours informels)
- 1 classe test (15-20 élèves, 1 séance)
- Questionnaire satisfaction simple (5 questions)
- Ajustements mineurs selon retours

---

## 11. Évolutions futures (post-MVP)

### Version 1.1 (+ 1-2 mois)

- Mode hors ligne complet (PWA)
- Correcteur orthographique basique (API gratuite)
- 20 exemples au lieu de 10
- Amélioration export (choix format, résolution)

### Version 1.5 (+ 3-4 mois)

- Mode groupe basique (sans temps réel, par tour)
- Tableau de bord enseignant avec statistiques simples
- Banque de mots enrichie (15 thèmes, ~500 mots)
- Tutoriel interactif

### Version 2.0 (+ 6+ mois)

- Collaboration temps réel (si pertinence confirmée)
- Backend léger (Node.js + SQLite)
- Comptes enseignants optionnels
- Extension à d'autres formes poétiques

---

## 12. Contraintes et limitations assumées

### Ce que l'application NE FAIT PAS (volontairement)

❌ Pas de correcteur orthographique avancé (les élèves peuvent utiliser celui du navigateur)
❌ Pas de dictionnaire intégré (resteront sur supports papier/autres outils)
❌ Pas de gestion de compétences LSU (trop complexe pour un solo)
❌ Pas de synchronisation multi-appareils (hors périmètre MVP)
❌ Pas de modération de contenus (responsabilité enseignant)
❌ Pas d'analytics ou statistiques avancées
❌ Pas de support technique dédié (documentation + FAQ uniquement)
❌ Pas de tests automatisés (uniquement manuels)

### Risques identifiés et atténuation

- **Risque** : Limitation localStorage (5 Mo)
    - **Atténuation** : Limiter à 5 acrostiches max, nettoyage auto
- **Risque** : Pas de backend = pas de backup
    - **Atténuation** : Export immédiat recommandé, messages préventifs
- **Risque** : Bugs non détectés (pas de tests auto)
    - **Atténuation** : Tests manuels rigoureux, phase beta avec enseignants testeurs

---

## 13. Livrables

### MVP (fin développement)

1. Application web déployée (URL publique)
2. Code source sur GitHub (licence open source MIT)
3. README.md (installation, utilisation, contribution)
4. Documentation utilisateur 1 page (PDF) :
    - Guide élève (créer un acrostiche)
    - Guide enseignant (créer une séance)
5. 10 exemples d'acrostiches intégrés

### Post-MVP

- Vidéo démo 3 min (screencast)
- Article de présentation (blog pédagogique)
- Retours utilisateurs compilés (anonymisés)

---

## Conclusion

Cette version réaliste des SRS privilégie :

- **Simplicité** : fonctionnalités essentielles uniquement
- **Faisabilité** : développement solo en 3-4 mois
- **Maintenabilité** : code clair sans sur-ingénierie
- **Pragmatisme** : tests manuels, localStorage, pas de backend

L'objectif est de livrer une application **fonctionnelle et utile** plutôt qu'une application **complète mais inachevée**.

---

**Version** : 3.0 - Réaliste Solo
**Date** : 7 février 2026
**Développeur** : CPC Mathématiques & Numérique
**Planning prévisionnel** : Mars - Juin 2026 (MVP)

<div align="center">₁</div>

[^1]: https://synapses-lamap.org/2020/01/07/interview-quest-ce-que-la-charge-cognitive/

[^2]: https://lead.ube.fr/wp-content/uploads/2023/09/3-Andre-Tricot.pdf

[^3]: https://www.pass-education.fr/ecriture-poetique-ecrire-un-acrostiche-cycle-3-ce2-cm1-cm2/

[^4]: https://www.education.gouv.fr/sites/default/files/ensel620_annexe1.pdf

[^5]: https://materiel-educatif.nathan.fr/dme/le-mag/travailler-en-groupe-2018-11-12.html

[^6]: https://segpa.org/apprendre-malgre-la-charge-cognitive-eclairages-dandre-tricot-pour-mieux-differencier-en-classe/

[^7]: https://www.edumoov.com/fiche-de-preparation-sequence/214551/ecriture/ce2-cm1/acrostiches
