import { createContext, useReducer, useEffect } from "react";
import PropTypes from "prop-types";
import useLocalStorage from "@hooks/useLocalStorage";
import {
    creerAcrostiche,
    mettreAJourLigne,
    finaliserAcrostiche,
} from "@utils/acrostiche";
import { ACTIONS, initialState } from "./acrosticheConstants";

// Création du contexte
const AcrosticheContext = createContext(null);

// Reducer pour gérer l'état
const acrosticheReducer = (state, action) => {
    switch (action.type) {
        case ACTIONS.CREER_ACROSTICHE: {
            const nouvelAcrostiche = creerAcrostiche(
                action.payload.mot,
                action.payload.niveau
            );
            return {
                ...state,
                acrosticheActuel: nouvelAcrostiche,
            };
        }

        case ACTIONS.MODIFIER_LIGNE: {
            if (!state.acrosticheActuel) return state;

            const acrosticheModifie = mettreAJourLigne(
                state.acrosticheActuel,
                action.payload.index,
                action.payload.contenu
            );

            return {
                ...state,
                acrosticheActuel: acrosticheModifie,
            };
        }

        case ACTIONS.FINALISER: {
            if (!state.acrosticheActuel) return state;

            const acrosticheFinalise = finaliserAcrostiche(
                state.acrosticheActuel
            );

            return {
                ...state,
                acrosticheActuel: acrosticheFinalise,
                historique: [...state.historique, acrosticheFinalise],
            };
        }

        case ACTIONS.CHARGER_ACROSTICHE: {
            return {
                ...state,
                acrosticheActuel: action.payload,
            };
        }

        case ACTIONS.REINITIALISER: {
            return {
                ...state,
                acrosticheActuel: null,
            };
        }

        case ACTIONS.SAUVEGARDER_BROUILLON: {
            if (!state.acrosticheActuel) return state;

            // Limiter à 5 brouillons maximum
            const nouveauxBrouillons = [
                state.acrosticheActuel,
                ...state.brouillons.filter(
                    (b) => b.id !== state.acrosticheActuel.id
                ),
            ].slice(0, 5);

            return {
                ...state,
                brouillons: nouveauxBrouillons,
            };
        }

        default:
            return state;
    }
};

/**
 * Provider du contexte Acrostiche
 */
export const AcrosticheProvider = ({ children }) => {
    // Utilisation du hook localStorage pour la persistance
    const [persistedState, setPersistedState] = useLocalStorage(
        "jecompose_state",
        initialState
    );

    // Reducer pour la gestion de l'état
    const [state, dispatch] = useReducer(acrosticheReducer, persistedState);

    // Synchroniser l'état avec localStorage à chaque changement
    useEffect(() => {
        setPersistedState(state);
    }, [state, setPersistedState]);

    // Sauvegarde automatique toutes les 60 secondes
    useEffect(() => {
        const interval = setInterval(() => {
            if (
                state.acrosticheActuel &&
                state.acrosticheActuel.statut === "brouillon"
            ) {
                dispatch({ type: ACTIONS.SAUVEGARDER_BROUILLON });
            }
        }, 60000); // 60 secondes

        return () => clearInterval(interval);
    }, [state.acrosticheActuel]);

    // Actions exposées
    const actions = {
        creerAcrostiche: (mot, niveau) => {
            dispatch({
                type: ACTIONS.CREER_ACROSTICHE,
                payload: { mot, niveau },
            });
        },

        modifierLigne: (index, contenu) => {
            dispatch({
                type: ACTIONS.MODIFIER_LIGNE,
                payload: { index, contenu },
            });
        },

        finaliserAcrostiche: () => {
            dispatch({ type: ACTIONS.FINALISER });
        },

        chargerAcrostiche: (acrostiche) => {
            dispatch({
                type: ACTIONS.CHARGER_ACROSTICHE,
                payload: acrostiche,
            });
        },

        reinitialiser: () => {
            dispatch({ type: ACTIONS.REINITIALISER });
        },

        sauvegarderBrouillon: () => {
            dispatch({ type: ACTIONS.SAUVEGARDER_BROUILLON });
        },
    };

    const value = {
        state,
        actions,
    };

    return (
        <AcrosticheContext.Provider value={value}>
            {children}
        </AcrosticheContext.Provider>
    );
};

AcrosticheProvider.propTypes = {
    children: PropTypes.node.isRequired,
};

export default AcrosticheContext;
