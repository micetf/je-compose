/**
 * Utilitaires pour le partage des acrostiches entre élèves et enseignants
 * Système basé sur URL encodée (pas de serveur backend)
 * @module utils/partage
 */

// ============================================================================
// CONSTANTES
// ============================================================================

const PRODUCTIONS_STORAGE_KEY = "je-compose-productions";
const MAX_PRODUCTIONS_PAR_SESSION = 50; // Limite par code séance

// ============================================================================
// ENCODAGE / DÉCODAGE
// ============================================================================

/**
 * Encode un acrostiche en base64 pour URL
 * @param {Object} acrostiche - Objet acrostiche à encoder
 * @param {string} nomEleve - Nom de l'élève (optionnel)
 * @returns {string} Chaîne encodée
 */
export const encoderAcrostiche = (acrostiche, nomEleve = "") => {
    try {
        // Structure minimale pour réduire la taille
        const data = {
            m: acrostiche.motInitial,
            n: acrostiche.niveau,
            v: acrostiche.vers,
            e: nomEleve.trim() || "Élève",
            d: new Date().toISOString(),
        };

        const json = JSON.stringify(data);
        const encoded = btoa(encodeURIComponent(json));

        return encoded;
    } catch (error) {
        console.error("Erreur lors de l'encodage:", error);
        return null;
    }
};

/**
 * Décode une chaîne base64 en acrostiche
 * @param {string} encoded - Chaîne encodée
 * @returns {Object|null} Objet acrostiche décodé ou null
 */
export const decoderAcrostiche = (encoded) => {
    try {
        const json = decodeURIComponent(atob(encoded));
        const data = JSON.parse(json);

        return {
            motInitial: data.m,
            niveau: data.n,
            vers: data.v,
            nomEleve: data.e || "Élève",
            dateCreation: data.d,
        };
    } catch (error) {
        console.error("Erreur lors du décodage:", error);
        return null;
    }
};

// ============================================================================
// GÉNÉRATION D'URLs
// ============================================================================

/**
 * Génère l'URL complète pour partager un acrostiche avec un enseignant
 * @param {Object} acrostiche - Objet acrostiche
 * @param {string} codeSeance - Code de la séance
 * @param {string} nomEleve - Nom de l'élève (optionnel)
 * @returns {string} URL complète de partage
 */
export const genererURLPartage = (acrostiche, codeSeance, nomEleve = "") => {
    try {
        const encoded = encoderAcrostiche(acrostiche, nomEleve);
        if (!encoded) return null;

        const baseURL = window.location.origin;

        // Format: /enseignant?session=ABC123&production=<encoded>
        return `${baseURL}/enseignant?session=${codeSeance}&production=${encoded}`;
    } catch (error) {
        console.error("Erreur lors de la génération de l'URL:", error);
        return null;
    }
};

/**
 * Extrait le code séance et la production depuis les paramètres URL
 * @returns {Object} { codeSeance, production } ou null
 */
export const extraireParametresURL = () => {
    try {
        const params = new URLSearchParams(window.location.search);
        const codeSeance = params.get("session");
        const productionEncoded = params.get("production");

        if (!codeSeance) return null;

        let production = null;
        if (productionEncoded) {
            production = decoderAcrostiche(productionEncoded);
        }

        return { codeSeance, production };
    } catch (error) {
        console.error("Erreur lors de l'extraction des paramètres:", error);
        return null;
    }
};

/**
 * Vérifie si l'URL contient un code de séance
 * @returns {boolean} True si un code séance est présent
 */
export const urlContientSession = () => {
    const params = new URLSearchParams(window.location.search);
    return params.has("session");
};

// ============================================================================
// STOCKAGE DES PRODUCTIONS (ENSEIGNANT)
// ============================================================================

/**
 * Sauvegarde une production dans le localStorage de l'enseignant
 * @param {string} codeSeance - Code de la séance
 * @param {Object} production - Production à sauvegarder
 * @returns {boolean} True si succès
 */
export const sauvegarderProduction = (codeSeance, production) => {
    try {
        // Récupérer toutes les productions
        const toutesProductions = recupererToutesProductions();

        // Initialiser le tableau pour cette séance si nécessaire
        if (!toutesProductions[codeSeance]) {
            toutesProductions[codeSeance] = [];
        }

        // Ajouter un ID unique à la production
        const productionAvecId = {
            ...production,
            id: `prod_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
            dateReception: new Date().toISOString(),
        };

        // Ajouter la production
        toutesProductions[codeSeance].push(productionAvecId);

        // Limiter le nombre de productions par séance
        if (
            toutesProductions[codeSeance].length > MAX_PRODUCTIONS_PAR_SESSION
        ) {
            toutesProductions[codeSeance] = toutesProductions[codeSeance].slice(
                -MAX_PRODUCTIONS_PAR_SESSION
            );
        }

        // Sauvegarder
        localStorage.setItem(
            PRODUCTIONS_STORAGE_KEY,
            JSON.stringify(toutesProductions)
        );

        return true;
    } catch (error) {
        console.error("Erreur lors de la sauvegarde de la production:", error);
        return false;
    }
};

/**
 * Récupère toutes les productions stockées
 * @returns {Object} Objet avec code séance comme clé
 */
export const recupererToutesProductions = () => {
    try {
        const data = localStorage.getItem(PRODUCTIONS_STORAGE_KEY);
        if (!data) return {};

        return JSON.parse(data);
    } catch (error) {
        console.error("Erreur lors de la récupération des productions:", error);
        return {};
    }
};

/**
 * Récupère les productions d'une séance spécifique
 * @param {string} codeSeance - Code de la séance
 * @returns {Array} Tableau des productions
 */
export const recupererProductionsSeance = (codeSeance) => {
    const toutesProductions = recupererToutesProductions();
    return toutesProductions[codeSeance] || [];
};

/**
 * Supprime une production spécifique
 * @param {string} codeSeance - Code de la séance
 * @param {string} productionId - ID de la production
 * @returns {boolean} True si succès
 */
export const supprimerProduction = (codeSeance, productionId) => {
    try {
        const toutesProductions = recupererToutesProductions();

        if (!toutesProductions[codeSeance]) return false;

        // Filtrer la production à supprimer
        toutesProductions[codeSeance] = toutesProductions[codeSeance].filter(
            (p) => p.id !== productionId
        );

        // Supprimer la clé si plus de productions
        if (toutesProductions[codeSeance].length === 0) {
            delete toutesProductions[codeSeance];
        }

        localStorage.setItem(
            PRODUCTIONS_STORAGE_KEY,
            JSON.stringify(toutesProductions)
        );

        return true;
    } catch (error) {
        console.error("Erreur lors de la suppression de la production:", error);
        return false;
    }
};

/**
 * Supprime toutes les productions d'une séance
 * @param {string} codeSeance - Code de la séance
 * @returns {boolean} True si succès
 */
export const supprimerProductionsSeance = (codeSeance) => {
    try {
        const toutesProductions = recupererToutesProductions();

        delete toutesProductions[codeSeance];

        localStorage.setItem(
            PRODUCTIONS_STORAGE_KEY,
            JSON.stringify(toutesProductions)
        );

        return true;
    } catch (error) {
        console.error("Erreur lors de la suppression des productions:", error);
        return false;
    }
};

// ============================================================================
// STATISTIQUES
// ============================================================================

/**
 * Récupère les statistiques d'une séance
 * @param {string} codeSeance - Code de la séance
 * @returns {Object} Statistiques
 */
export const obtenirStatistiquesSeance = (codeSeance) => {
    const productions = recupererProductionsSeance(codeSeance);

    const parNiveau = {
        1: productions.filter((p) => p.niveau === 1).length,
        2: productions.filter((p) => p.niveau === 2).length,
        3: productions.filter((p) => p.niveau === 3).length,
    };

    const motsUtilises = {};
    productions.forEach((p) => {
        const mot = p.motInitial.toUpperCase();
        motsUtilises[mot] = (motsUtilises[mot] || 0) + 1;
    });

    return {
        total: productions.length,
        parNiveau,
        motsUtilises,
        derniereProduction: productions.length
            ? productions[productions.length - 1].dateReception
            : null,
    };
};

// ============================================================================
// VALIDATION
// ============================================================================

/**
 * Valide qu'une production a bien la structure attendue
 * @param {Object} production - Production à valider
 * @returns {boolean} True si valide
 */
export const validerProduction = (production) => {
    if (!production) return false;

    const champsRequis = ["motInitial", "niveau", "vers", "nomEleve"];

    const tousPresents = champsRequis.every(
        (champ) => production[champ] !== undefined && production[champ] !== null
    );

    if (!tousPresents) return false;

    // Vérifications supplémentaires
    if (typeof production.motInitial !== "string") return false;
    if (![1, 2, 3].includes(production.niveau)) return false;
    if (!Array.isArray(production.vers)) return false;
    if (production.vers.length !== production.motInitial.length) return false;

    return true;
};

// ============================================================================
// COPIE PRESSE-PAPIER
// ============================================================================

/**
 * Copie l'URL de partage dans le presse-papier
 * @param {string} url - URL à copier
 * @returns {Promise<boolean>} True si succès
 */
export const copierURLPartage = async (url) => {
    try {
        await navigator.clipboard.writeText(url);
        return true;
    } catch (error) {
        console.error("Erreur lors de la copie de l'URL:", error);
        return false;
    }
};

// ============================================================================
// EXPORT PAR DÉFAUT
// ============================================================================

export default {
    // Encodage/Décodage
    encoderAcrostiche,
    decoderAcrostiche,

    // URLs
    genererURLPartage,
    extraireParametresURL,
    urlContientSession,

    // Stockage productions
    sauvegarderProduction,
    recupererToutesProductions,
    recupererProductionsSeance,
    supprimerProduction,
    supprimerProductionsSeance,

    // Statistiques
    obtenirStatistiquesSeance,

    // Validation
    validerProduction,

    // Presse-papier
    copierURLPartage,
};
