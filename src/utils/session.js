/**
 * Utilitaires pour la gestion des séances enseignant
 * @module utils/session
 */

// ============================================================================
// CONSTANTES
// ============================================================================

const SESSIONS_STORAGE_KEY = "je-compose-sessions";
const DUREE_DEFAUT_HEURES = 24; // 24h par défaut
const DUREE_MAX_JOURS = 7; // Maximum 7 jours

// ============================================================================
// GÉNÉRATION DE CODE SÉANCE
// ============================================================================

/**
 * Génère un code séance aléatoire de 6 caractères
 * Format: 3 lettres majuscules + 3 chiffres (ex: "ABC123")
 * @returns {string} Code séance unique
 */
export const genererCodeSeance = () => {
    const lettres = "ABCDEFGHJKLMNPQRSTUVWXYZ"; // Sans I, O pour éviter confusion
    const chiffres = "0123456789";

    let code = "";

    // 3 lettres
    for (let i = 0; i < 3; i++) {
        code += lettres.charAt(Math.floor(Math.random() * lettres.length));
    }

    // 3 chiffres
    for (let i = 0; i < 3; i++) {
        code += chiffres.charAt(Math.floor(Math.random() * chiffres.length));
    }

    return code;
};

/**
 * Vérifie si un code séance est déjà utilisé
 * @param {string} code - Code à vérifier
 * @returns {boolean} True si le code existe déjà
 */
const codeSeanceExiste = (code) => {
    const sessions = recupererSeances();
    return sessions.some((session) => session.code === code);
};

/**
 * Génère un code séance unique (non utilisé)
 * @returns {string} Code séance unique
 */
export const genererCodeSeanceUnique = () => {
    let code = genererCodeSeance();
    let tentatives = 0;
    const maxTentatives = 10;

    // Régénérer si le code existe déjà (rare, mais possible)
    while (codeSeanceExiste(code) && tentatives < maxTentatives) {
        code = genererCodeSeance();
        tentatives++;
    }

    if (tentatives >= maxTentatives) {
        // Fallback: ajouter un timestamp
        code = genererCodeSeance() + Date.now().toString().slice(-2);
    }

    return code;
};

// ============================================================================
// CRÉATION ET GESTION DES SÉANCES
// ============================================================================

/**
 * Crée une nouvelle séance
 * @param {string} nom - Nom de la séance (optionnel)
 * @param {number} dureeJours - Durée en jours (par défaut: 1 jour = 24h)
 * @returns {Object} Objet séance créé
 */
export const creerSeance = (nom = "", dureeJours = 1) => {
    // Validation de la durée
    if (dureeJours < 0 || dureeJours > DUREE_MAX_JOURS) {
        throw new Error(
            `La durée doit être entre 0 et ${DUREE_MAX_JOURS} jours`
        );
    }

    const maintenant = new Date();
    const dateExpiration = new Date(
        maintenant.getTime() + dureeJours * 24 * 60 * 60 * 1000
    );

    const seance = {
        code: genererCodeSeanceUnique(),
        nom: nom.trim() || "Séance sans nom",
        dateCreation: maintenant.toISOString(),
        dateExpiration: dateExpiration.toISOString(),
        statut: "active",
        nombreProductions: 0, // Compteur pour statistiques
    };

    return seance;
};

/**
 * Sauvegarde une séance dans le localStorage
 * @param {Object} seance - Objet séance à sauvegarder
 * @returns {boolean} True si succès
 */
export const sauvegarderSeance = (seance) => {
    try {
        const sessions = recupererSeances();

        // Vérifier si la séance existe déjà (mise à jour)
        const index = sessions.findIndex((s) => s.code === seance.code);

        if (index !== -1) {
            // Mise à jour
            sessions[index] = seance;
        } else {
            // Nouvelle séance
            sessions.push(seance);
        }

        // Limiter à 20 séances max (nettoyage auto des plus anciennes)
        if (sessions.length > 20) {
            sessions.sort(
                (a, b) => new Date(b.dateCreation) - new Date(a.dateCreation)
            );
            sessions.splice(20); // Garder les 20 plus récentes
        }

        localStorage.setItem(SESSIONS_STORAGE_KEY, JSON.stringify(sessions));
        return true;
    } catch (error) {
        console.error("Erreur lors de la sauvegarde de la séance:", error);
        return false;
    }
};

/**
 * Récupère toutes les séances depuis le localStorage
 * @returns {Array} Tableau des séances
 */
export const recupererSeances = () => {
    try {
        const data = localStorage.getItem(SESSIONS_STORAGE_KEY);
        if (!data) return [];

        const sessions = JSON.parse(data);

        // Nettoyer automatiquement les séances expirées
        const sessionsActives = sessions.filter((s) => seanceEstActive(s));

        // Si des séances ont été supprimées, mettre à jour le storage
        if (sessionsActives.length !== sessions.length) {
            localStorage.setItem(
                SESSIONS_STORAGE_KEY,
                JSON.stringify(sessionsActives)
            );
        }

        return sessionsActives;
    } catch (error) {
        console.error("Erreur lors de la récupération des séances:", error);
        return [];
    }
};

/**
 * Récupère une séance par son code
 * @param {string} code - Code de la séance
 * @returns {Object|null} Objet séance ou null si introuvable
 */
export const recupererSeance = (code) => {
    const sessions = recupererSeances();
    return sessions.find((s) => s.code === code) || null;
};

/**
 * Supprime une séance
 * @param {string} code - Code de la séance à supprimer
 * @returns {boolean} True si succès
 */
export const supprimerSeance = (code) => {
    try {
        const sessions = recupererSeances();
        const sessionsFiltrees = sessions.filter((s) => s.code !== code);

        localStorage.setItem(
            SESSIONS_STORAGE_KEY,
            JSON.stringify(sessionsFiltrees)
        );
        return true;
    } catch (error) {
        console.error("Erreur lors de la suppression de la séance:", error);
        return false;
    }
};

/**
 * Supprime toutes les séances expirées
 * @returns {number} Nombre de séances supprimées
 */
export const supprimerSeancesExpirees = () => {
    try {
        const sessions = recupererSeances();
        const sessionsActives = sessions.filter((s) => seanceEstActive(s));
        const nombreSuppressions = sessions.length - sessionsActives.length;

        if (nombreSuppressions > 0) {
            localStorage.setItem(
                SESSIONS_STORAGE_KEY,
                JSON.stringify(sessionsActives)
            );
        }

        return nombreSuppressions;
    } catch (error) {
        console.error(
            "Erreur lors de la suppression des séances expirées:",
            error
        );
        return 0;
    }
};

// ============================================================================
// VALIDATION ET VÉRIFICATIONS
// ============================================================================

/**
 * Vérifie si une séance est encore active (non expirée)
 * @param {Object} seance - Objet séance
 * @returns {boolean} True si la séance est active
 */
export const seanceEstActive = (seance) => {
    if (!seance || !seance.dateExpiration) return false;

    const maintenant = new Date();
    const expiration = new Date(seance.dateExpiration);

    return maintenant < expiration;
};

/**
 * Valide le format d'un code séance
 * @param {string} code - Code à valider
 * @returns {boolean} True si le format est valide
 */
export const validerFormatCodeSeance = (code) => {
    if (!code || typeof code !== "string") return false;

    // Format: 6 caractères (3 lettres + 3 chiffres)
    const regex = /^[A-Z]{3}[0-9]{3}$/;
    return regex.test(code);
};

/**
 * Calcule le temps restant avant expiration
 * @param {Object} seance - Objet séance
 * @returns {Object} { jours, heures, minutes, expire: boolean }
 */
export const tempsRestant = (seance) => {
    if (!seance || !seance.dateExpiration) {
        return { jours: 0, heures: 0, minutes: 0, expire: true };
    }

    const maintenant = new Date();
    const expiration = new Date(seance.dateExpiration);
    const diff = expiration - maintenant;

    if (diff <= 0) {
        return { jours: 0, heures: 0, minutes: 0, expire: true };
    }

    const jours = Math.floor(diff / (1000 * 60 * 60 * 24));
    const heures = Math.floor(
        (diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));

    return { jours, heures, minutes, expire: false };
};

/**
 * Formate le temps restant en texte lisible
 * @param {Object} seance - Objet séance
 * @returns {string} Texte formaté (ex: "2 jours 5 heures")
 */
export const formatterTempsRestant = (seance) => {
    const temps = tempsRestant(seance);

    if (temps.expire) {
        return "Expirée";
    }

    if (temps.jours > 0) {
        return `${temps.jours} jour${temps.jours > 1 ? "s" : ""} ${temps.heures}h`;
    }

    if (temps.heures > 0) {
        return `${temps.heures}h ${temps.minutes}min`;
    }

    return `${temps.minutes} minute${temps.minutes > 1 ? "s" : ""}`;
};

// ============================================================================
// GÉNÉRATION D'URLs
// ============================================================================

/**
 * Génère l'URL élève pour une séance
 * @param {string} code - Code de la séance
 * @returns {string} URL complète pour les élèves
 */
export const genererURLSeance = (code) => {
    const baseURL = window.location.origin;
    return `${baseURL}/eleve?session=${code}`;
};

/**
 * Génère l'URL enseignant pour consulter une séance
 * @param {string} code - Code de la séance
 * @returns {string} URL complète pour l'enseignant
 */
export const genererURLConsultation = (code) => {
    const baseURL = window.location.origin;
    return `${baseURL}/enseignant?session=${code}`;
};

// ============================================================================
// STATISTIQUES
// ============================================================================

/**
 * Récupère les statistiques des séances
 * @returns {Object} Objet avec statistiques
 */
export const obtenirStatistiquesSeances = () => {
    const sessions = recupererSeances();

    const actives = sessions.filter((s) => seanceEstActive(s));
    const expirees = sessions.filter((s) => !seanceEstActive(s));

    const totalProductions = sessions.reduce(
        (acc, s) => acc + (s.nombreProductions || 0),
        0
    );

    return {
        total: sessions.length,
        actives: actives.length,
        expirees: expirees.length,
        totalProductions,
    };
};

// ============================================================================
// EXPORT PAR DÉFAUT
// ============================================================================

export default {
    // Génération codes
    genererCodeSeance,
    genererCodeSeanceUnique,

    // CRUD séances
    creerSeance,
    sauvegarderSeance,
    recupererSeances,
    recupererSeance,
    supprimerSeance,
    supprimerSeancesExpirees,

    // Validation
    seanceEstActive,
    validerFormatCodeSeance,
    tempsRestant,
    formatterTempsRestant,

    // URLs
    genererURLSeance,
    genererURLConsultation,

    // Statistiques
    obtenirStatistiquesSeances,
};
