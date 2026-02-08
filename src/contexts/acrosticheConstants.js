/**
 * Actions disponibles pour le reducer d'acrostiche
 */
export const ACTIONS = {
    CREER_ACROSTICHE: "CREER_ACROSTICHE",
    MODIFIER_LIGNE: "MODIFIER_LIGNE",
    FINALISER: "FINALISER",
    CHARGER_ACROSTICHE: "CHARGER_ACROSTICHE",
    REINITIALISER: "REINITIALISER",
    SAUVEGARDER_BROUILLON: "SAUVEGARDER_BROUILLON",
};

/**
 * État initial du context
 */
export const initialState = {
    acrosticheActuel: null,
    brouillons: [],
    historique: [],
};
