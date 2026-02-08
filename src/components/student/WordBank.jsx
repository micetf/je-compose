import { useState, useMemo } from "react";
import PropTypes from "prop-types";
import { Card, Button } from "@components/common";
import {
    getMotsParLettre,
    getMotsParThemeEtLettre,
    nomsThemes,
} from "@data/lexique";

/**
 * Composant de banque de mots pour aider les élèves
 * @param {Object} props
 * @param {string} props.lettre - Lettre pour laquelle afficher des mots
 * @param {Function} props.onMotSelect - Callback quand un mot est sélectionné
 * @param {boolean} props.isOpen - État d'ouverture/fermeture
 */
const WordBank = ({ lettre, onMotSelect, isOpen = false }) => {
    const [themeSelectionne, setThemeSelectionne] = useState(null);
    const [reloadKey, setReloadKey] = useState(0);

    // Calculer les mots à afficher directement (pas de setState dans useEffect)
    const motsAffiches = useMemo(() => {
        if (!isOpen || !lettre) return [];

        let mots = [];

        if (themeSelectionne) {
            // Mots d'un thème spécifique
            mots = getMotsParThemeEtLettre(themeSelectionne, lettre);
        } else {
            // Tous les mots de la lettre
            mots = getMotsParLettre(lettre, 15);
        }

        return mots;
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [lettre, themeSelectionne, isOpen, reloadKey]);

    const handleThemeClick = (themeId) => {
        if (themeSelectionne === themeId) {
            // Désélectionner le thème
            setThemeSelectionne(null);
        } else {
            // Sélectionner un nouveau thème
            setThemeSelectionne(themeId);
        }
    };

    const handleMotClick = (mot) => {
        if (onMotSelect) {
            onMotSelect(mot);
        }
    };

    const handleRecharger = () => {
        // Incrémenter la clé pour forcer un nouveau calcul avec useMemo
        setReloadKey((prev) => prev + 1);
    };

    if (!isOpen || !lettre) {
        return null;
    }

    return (
        <Card className="animate-fade-in">
            {/* En-tête */}
            <div className="mb-4">
                <div className="flex items-center justify-between mb-2">
                    <h3 className="text-lg font-semibold text-gray-900">
                        💡 Besoin d'aide pour la lettre{" "}
                        <span className="text-primary-600 text-2xl">
                            {lettre}
                        </span>{" "}
                        ?
                    </h3>
                    <Button
                        variant="secondary"
                        size="small"
                        onClick={handleRecharger}
                    >
                        🔄 Recharger
                    </Button>
                </div>
                <p className="text-sm text-gray-600">
                    Clique sur un mot pour l'utiliser, ou cherche dans ta tête !
                </p>
            </div>

            {/* Filtres par thème */}
            <div className="mb-4">
                <p className="text-sm font-medium text-gray-700 mb-2">
                    Filtrer par thème :
                </p>
                <div className="flex flex-wrap gap-2">
                    {nomsThemes.map((theme) => (
                        <button
                            key={theme.id}
                            onClick={() => handleThemeClick(theme.id)}
                            className={`
                px-3 py-1.5 rounded-lg text-sm font-medium
                transition-colors duration-200
                ${
                    themeSelectionne === theme.id
                        ? "bg-primary-500 text-white"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }
              `}
                        >
                            {theme.icone} {theme.nom}
                        </button>
                    ))}
                </div>
            </div>

            {/* Liste des mots */}
            <div>
                {motsAffiches.length > 0 ? (
                    <>
                        <p className="text-sm text-gray-600 mb-3">
                            {motsAffiches.length} mot
                            {motsAffiches.length > 1 ? "s" : ""} trouvé
                            {motsAffiches.length > 1 ? "s" : ""}
                            {themeSelectionne &&
                                ` dans le thème ${nomsThemes.find((t) => t.id === themeSelectionne)?.nom}`}
                        </p>
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
                            {motsAffiches.map((mot, index) => (
                                <button
                                    key={`${mot}-${index}`}
                                    onClick={() => handleMotClick(mot)}
                                    className="
                    px-3 py-2 rounded-lg
                    bg-white border-2 border-gray-200
                    hover:border-primary-400 hover:bg-primary-50
                    text-gray-800 hover:text-primary-700
                    font-medium text-sm
                    transition-all duration-200
                    text-left
                    capitalize
                  "
                                >
                                    {mot}
                                </button>
                            ))}
                        </div>
                    </>
                ) : (
                    <div className="text-center py-8">
                        <p className="text-gray-500 mb-2">
                            😕 Pas de mots trouvés pour la lettre {lettre}
                            {themeSelectionne && ` dans ce thème`}
                        </p>
                        <p className="text-sm text-gray-600">
                            Essaie un autre thème ou cherche un mot dans ta tête
                            !
                        </p>
                    </div>
                )}
            </div>

            {/* Message d'encouragement */}
            <div className="mt-4 p-3 bg-yellow-50 border-l-4 border-yellow-400 rounded">
                <p className="text-yellow-800 text-sm">
                    <strong>💪 Tu peux aussi :</strong> Chercher un mot tout
                    seul dans ta tête ! C'est encore mieux pour apprendre.
                </p>
            </div>
        </Card>
    );
};

WordBank.propTypes = {
    lettre: PropTypes.string,
    onMotSelect: PropTypes.func,
    isOpen: PropTypes.bool,
};

export default WordBank;
