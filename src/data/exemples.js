/**
 * Exemples d'acrostiches pour la galerie
 * 10 acrostiches modèles répartis sur les 3 niveaux
 */

export const exemplesAcrostiches = [
    // ==========================================
    // NIVEAU 1 - Un mot par ligne (4 exemples)
    // ==========================================
    {
        id: "exemple_01",
        motInitial: "CHAT",
        niveau: 1,
        vers: ["Câlin", "Heureux", "Adorable", "Tigré"],
        theme: "Animaux",
        explication:
            "Chaque ligne commence par une lettre du mot CHAT. Un seul mot décrit le chat.",
        auteur: "Exemple CE1",
        dateCreation: "2024-11-15T10:00:00Z",
        statut: "termine",
    },

    {
        id: "exemple_02",
        motInitial: "ÉCOLE",
        niveau: 1,
        vers: ["Écrire", "Compter", "Observer", "Lire", "Écouter"],
        theme: "École",
        explication: "Les mots décrivent des actions qu'on fait à l'école.",
        auteur: "Exemple CE1",
        dateCreation: "2024-11-20T10:00:00Z",
        statut: "termine",
    },

    {
        id: "exemple_03",
        motInitial: "AUTOMNE",
        niveau: 1,
        vers: [
            "Arbre",
            "Vent",
            "Température",
            "Orange",
            "Marron",
            "Nuage",
            "Écureuil",
        ],
        theme: "Saisons",
        explication:
            "Chaque mot évoque l'automne : les couleurs, la nature, le temps.",
        auteur: "Exemple CE2",
        dateCreation: "2024-10-05T10:00:00Z",
        statut: "termine",
    },

    {
        id: "exemple_04",
        motInitial: "LUCAS",
        niveau: 1,
        vers: ["Loyal", "Unique", "Courageux", "Agréable", "Sportif"],
        theme: "Prénom",
        explication:
            "Des qualités qui commencent par chaque lettre du prénom Lucas.",
        auteur: "Exemple CE2",
        dateCreation: "2024-12-01T10:00:00Z",
        statut: "termine",
    },

    // ==========================================
    // NIVEAU 2 - Phrase courte (4 exemples)
    // ==========================================
    {
        id: "exemple_05",
        motInitial: "LUNE",
        niveau: 2,
        vers: [
            "Lumière douce dans le ciel",
            "Un croissant brillant la nuit",
            "Nuits magiques et étoilées",
            "Elle veille sur nos rêves",
        ],
        theme: "Nature",
        explication: "Chaque phrase fait 4 à 6 mots et parle de la lune.",
        auteur: "Exemple CM1",
        dateCreation: "2024-09-12T10:00:00Z",
        statut: "termine",
    },

    {
        id: "exemple_06",
        motInitial: "AMITIÉ",
        niveau: 2,
        vers: [
            "Avec toi je me sens bien",
            "Main dans la main on avance",
            "Impossible de te quitter mon ami",
            "Toujours là dans les moments durs",
            "Inséparables pour la vie",
            "Ensemble on rigole et on joue",
        ],
        theme: "Sentiments",
        explication: "Des phrases courtes qui expriment ce qu'est l'amitié.",
        auteur: "Exemple CM1",
        dateCreation: "2024-11-08T10:00:00Z",
        statut: "termine",
    },

    {
        id: "exemple_07",
        motInitial: "HIVER",
        niveau: 2,
        vers: [
            "Habits chauds et gros manteaux",
            "Il neige sur les toits",
            "Vent glacé qui souffle fort",
            "Enfants jouent dans la neige",
            "Repos au coin du feu",
        ],
        theme: "Saisons",
        explication:
            "Chaque ligne décrit une scène d'hiver avec une petite phrase.",
        auteur: "Exemple CM1",
        dateCreation: "2024-01-18T10:00:00Z",
        statut: "termine",
    },

    {
        id: "exemple_08",
        motInitial: "OCÉAN",
        niveau: 2,
        vers: [
            "Oh que l'eau est bleue",
            "Comme c'est grand et profond",
            "Énormes vagues qui se cassent",
            "Algues vertes qui dansent en dessous",
            "Navires qui voyagent au loin",
        ],
        theme: "Nature",
        explication: "Des phrases courtes qui décrivent l'océan.",
        auteur: "Exemple CM2",
        dateCreation: "2024-06-22T10:00:00Z",
        statut: "termine",
    },

    // ==========================================
    // NIVEAU 3 - Vers poétiques (2 exemples)
    // ==========================================
    {
        id: "exemple_09",
        motInitial: "LIBERTÉ",
        niveau: 3,
        vers: [
            "Laisse-moi voler comme l'oiseau dans le ciel",
            "Invente ton chemin sans suivre celui des autres",
            "Brise les chaînes qui t'emprisonnent le cœur",
            "Élance-toi vers tes rêves les plus fous",
            "Respire à pleins poumons l'air de la vie",
            "Ton destin t'appartient et à personne d'autre",
            "Écoute ta voix intérieure qui te guide",
        ],
        theme: "Valeurs",
        explication:
            "Vers poétiques avec des rimes et un rythme. Le texte est plus long et expressif.",
        auteur: "Exemple CM2",
        dateCreation: "2024-03-14T10:00:00Z",
        statut: "termine",
    },

    {
        id: "exemple_10",
        motInitial: "PRINTEMPS",
        niveau: 3,
        vers: [
            "Petites fleurs qui s'ouvrent au soleil",
            "Rires d'enfants dans les jardins en éveil",
            "Insectes bourdonnent autour des boutons",
            "Nature qui renaît après l'hiver grison",
            "Tout reverdit dans une douce lumière",
            "Espoir nouveau qui chasse les nuages",
            "Merveilleux spectacle à chaque tournant",
            "Parfums sucrés portés par le vent",
            "Saison des couleurs et du renouveau charmant",
        ],
        theme: "Saisons",
        explication:
            "Un acrostiche avec des vers qui riment (soleil/éveil, boutons/grison, etc.). Le texte évoque la beauté du printemps.",
        auteur: "Exemple CM2",
        dateCreation: "2024-04-20T10:00:00Z",
        statut: "termine",
    },
];

/**
 * Récupère tous les exemples
 * @returns {Array} Tableau de tous les acrostiches exemples
 */
export const getTousLesExemples = () => {
    return exemplesAcrostiches;
};

/**
 * Récupère les exemples d'un niveau spécifique
 * @param {number} niveau - Niveau (1, 2 ou 3)
 * @returns {Array} Acrostiches du niveau demandé
 */
export const getExemplesParNiveau = (niveau) => {
    return exemplesAcrostiches.filter((ex) => ex.niveau === niveau);
};

/**
 * Récupère les exemples d'un thème spécifique
 * @param {string} theme - Nom du thème
 * @returns {Array} Acrostiches du thème demandé
 */
export const getExemplesParTheme = (theme) => {
    return exemplesAcrostiches.filter((ex) => ex.theme === theme);
};

/**
 * Récupère un exemple par son ID
 * @param {string} id - ID de l'exemple
 * @returns {Object|null} Acrostiche correspondant ou null
 */
export const getExempleParId = (id) => {
    return exemplesAcrostiches.find((ex) => ex.id === id) || null;
};

/**
 * Récupère un exemple aléatoire
 * @param {number} niveau - Niveau optionnel pour filtrer
 * @returns {Object} Acrostiche aléatoire
 */
export const getExempleAleatoire = (niveau = null) => {
    let exemples = exemplesAcrostiches;

    if (niveau) {
        exemples = exemplesAcrostiches.filter((ex) => ex.niveau === niveau);
    }

    const index = Math.floor(Math.random() * exemples.length);
    return exemples[index];
};

/**
 * Liste des thèmes disponibles dans les exemples
 */
export const themesExemples = [
    "Animaux",
    "École",
    "Saisons",
    "Prénom",
    "Nature",
    "Sentiments",
    "Valeurs",
];

export default exemplesAcrostiches;
