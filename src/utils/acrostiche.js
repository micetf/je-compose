/**
 * Génère un ID unique pour un acrostiche
 * @returns {string} ID au format timestamp-random
 */
export const genererIdAcrostiche = () => {
    return `acro_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
};

/**
 * Génère un code de séance aléatoire (6 caractères)
 * @returns {string} Code au format ABC123
 */
export const genererCodeSeance = () => {
    const lettres = "ABCDEFGHJKLMNPQRSTUVWXYZ"; // Sans I et O pour éviter confusion
    const chiffres = "23456789"; // Sans 0 et 1

    let code = "";
    for (let i = 0; i < 3; i++) {
        code += lettres.charAt(Math.floor(Math.random() * lettres.length));
    }
    for (let i = 0; i < 3; i++) {
        code += chiffres.charAt(Math.floor(Math.random() * chiffres.length));
    }

    return code;
};

/**
 * Valide un mot pour l'acrostiche
 * @param {string} mot - Mot à valider
 * @returns {Object} { valide: boolean, erreur: string }
 */
export const validerMotAcrostiche = (mot) => {
    if (!mot || mot.trim().length === 0) {
        return { valide: false, erreur: "Le mot ne peut pas être vide" };
    }

    if (mot.length < 3) {
        return {
            valide: false,
            erreur: "Le mot doit contenir au moins 3 lettres",
        };
    }

    if (mot.length > 10) {
        return {
            valide: false,
            erreur: "Le mot ne peut pas dépasser 10 lettres",
        };
    }

    // Vérifier que le mot ne contient que des lettres (avec accents)
    const regexLettres = /^[a-zA-ZÀ-ÿ]+$/;
    if (!regexLettres.test(mot)) {
        return {
            valide: false,
            erreur: "Le mot ne doit contenir que des lettres",
        };
    }

    return { valide: true, erreur: "" };
};

/**
 * Valide une ligne d'acrostiche selon le niveau
 * @param {string} ligne - Ligne à valider
 * @param {number} niveau - Niveau (1, 2 ou 3)
 * @returns {Object} { valide: boolean, erreur: string }
 */
export const validerLigneAcrostiche = (ligne, niveau) => {
    if (!ligne || ligne.trim().length === 0) {
        return { valide: false, erreur: "La ligne ne peut pas être vide" };
    }

    const longueur = ligne.trim().split(/\s+/).length;

    switch (niveau) {
        case 1: // Un mot
            if (longueur > 1) {
                return {
                    valide: false,
                    erreur: "Niveau 1 : un seul mot par ligne",
                };
            }
            break;

        case 2: // Phrase courte (2-8 mots)
            if (longueur < 2) {
                return {
                    valide: false,
                    erreur: "Niveau 2 : au moins 2 mots par ligne",
                };
            }
            if (longueur > 8) {
                return {
                    valide: false,
                    erreur: "Niveau 2 : maximum 8 mots par ligne",
                };
            }
            break;

        case 3: // Vers poétique (pas de limite stricte)
            if (longueur > 15) {
                return {
                    valide: false,
                    erreur: "Niveau 3 : essaie d'être plus concis (max 15 mots)",
                };
            }
            break;

        default:
            return { valide: false, erreur: "Niveau invalide" };
    }

    return { valide: true, erreur: "" };
};

/**
 * Crée un nouvel acrostiche vide
 * @param {string} motInitial - Mot de base de l'acrostiche
 * @param {number} niveau - Niveau de difficulté (1, 2 ou 3)
 * @returns {Object} Acrostiche initialisé
 */
export const creerAcrostiche = (motInitial, niveau) => {
    const lettres = motInitial.toUpperCase().split("");

    return {
        id: genererIdAcrostiche(),
        motInitial: motInitial.toUpperCase(),
        niveau: niveau,
        vers: lettres.map(() => ""), // Tableau de lignes vides
        dateCreation: new Date().toISOString(),
        dateModification: new Date().toISOString(),
        statut: "brouillon", // 'brouillon' | 'termine'
    };
};

/**
 * Met à jour une ligne de l'acrostiche
 * @param {Object} acrostiche - Acrostiche à modifier
 * @param {number} index - Index de la ligne
 * @param {string} contenu - Nouveau contenu
 * @returns {Object} Acrostiche mis à jour
 */
export const mettreAJourLigne = (acrostiche, index, contenu) => {
    const nouveauxVers = [...acrostiche.vers];
    nouveauxVers[index] = contenu;

    return {
        ...acrostiche,
        vers: nouveauxVers,
        dateModification: new Date().toISOString(),
    };
};

/**
 * Marque un acrostiche comme terminé
 * @param {Object} acrostiche - Acrostiche à finaliser
 * @returns {Object} Acrostiche finalisé
 */
export const finaliserAcrostiche = (acrostiche) => {
    return {
        ...acrostiche,
        statut: "termine",
        dateModification: new Date().toISOString(),
    };
};

/**
 * Vérifie si un acrostiche est complet
 * @param {Object} acrostiche - Acrostiche à vérifier
 * @returns {boolean} True si toutes les lignes sont remplies
 */
export const estAcrosticheComplet = (acrostiche) => {
    return acrostiche.vers.every((vers) => vers.trim().length > 0);
};

/**
 * Formatte un acrostiche pour l'affichage
 * @param {Object} acrostiche - Acrostiche à formatter
 * @returns {string} Texte formaté avec lettres initiales en majuscules
 */
export const formatterAcrostiche = (acrostiche) => {
    return acrostiche.vers
        .map((vers, index) => {
            const lettre = acrostiche.motInitial[index];
            return `${lettre}${vers.substring(1) || ""}`;
        })
        .join("\n");
};

/**
 * Calcule les statistiques d'un acrostiche
 * @param {Object} acrostiche - Acrostiche à analyser
 * @returns {Object} Statistiques (progression, mots, caractères)
 */
export const calculerStatistiques = (acrostiche) => {
    const lignesRemplies = acrostiche.vers.filter(
        (v) => v.trim().length > 0
    ).length;
    const progression = Math.round(
        (lignesRemplies / acrostiche.vers.length) * 100
    );

    const texteComplet = acrostiche.vers.join(" ");
    const nombreMots = texteComplet
        .trim()
        .split(/\s+/)
        .filter((m) => m.length > 0).length;
    const nombreCaracteres = texteComplet.replace(/\s/g, "").length;

    return {
        progression,
        lignesRemplies,
        lignesTotal: acrostiche.vers.length,
        nombreMots,
        nombreCaracteres,
    };
};

/**
 * Obtient le libellé d'un niveau
 * @param {number} niveau - Numéro du niveau
 * @returns {Object} { titre, description, icone }
 */
export const getLibelleNiveau = (niveau) => {
    const niveaux = {
        1: {
            titre: "Un mot par ligne",
            description: "Choisis un mot qui commence par chaque lettre",
            icone: "🟢",
            badge: "badge-niveau-1",
        },
        2: {
            titre: "Une phrase par ligne",
            description: "Écris une courte phrase pour chaque lettre",
            icone: "🟠",
            badge: "badge-niveau-2",
        },
        3: {
            titre: "Des vers poétiques",
            description: "Compose des vers qui riment ou sonnent bien",
            icone: "🔴",
            badge: "badge-niveau-3",
        },
    };

    return niveaux[niveau] || niveaux[1];
};
