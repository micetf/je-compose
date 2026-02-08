import { useState } from "react";
import PropTypes from "prop-types";
import { Input, Button } from "@components/common";
import { validerMotAcrostiche } from "@utils/acrostiche";

/**
 * Composant de saisie du mot initial de l'acrostiche
 * @param {Object} props
 * @param {Function} props.onMotValide - Callback avec le mot validé
 * @param {string} props.motInitial - Mot pré-rempli (optionnel)
 * @param {boolean} props.disabled - Désactive la saisie
 */
const MotInput = ({ onMotValide, motInitial = "", disabled = false }) => {
    const [mot, setMot] = useState(motInitial);
    const [erreur, setErreur] = useState("");

    // Suggestions de mots prédéfinis
    const suggestions = [
        "CHAT",
        "ÉCOLE",
        "AUTOMNE",
        "LUNE",
        "AMITIÉ",
        "HIVER",
        "LIBERTÉ",
        "OCÉAN",
        "NATURE",
        "RÊVE",
        "SOLEIL",
        "VENT",
        "JARDIN",
        "MUSIQUE",
        "VOYAGE",
    ];

    const handleMotChange = (e) => {
        const value = e.target.value.toUpperCase();
        // Ne garder que les lettres (avec accents)
        const lettresOnly = value.replace(/[^A-ZÀ-ÿ]/gi, "");
        setMot(lettresOnly);
        setErreur("");
    };

    const handleValider = () => {
        const { valide, erreur: erreurValidation } = validerMotAcrostiche(mot);

        if (valide) {
            onMotValide(mot);
        } else {
            setErreur(erreurValidation);
        }
    };

    const handleSuggestionClick = (suggestion) => {
        setMot(suggestion);
        setErreur("");
    };

    const handleKeyPress = (e) => {
        if (e.key === "Enter") {
            handleValider();
        }
    };

    return (
        <div className="w-full">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Choisis ton mot
            </h2>

            {/* Champ de saisie */}
            <div className="mb-6">
                <Input
                    id="mot-acrostiche"
                    label="Tape ton mot ici (3 à 10 lettres)"
                    value={mot}
                    onChange={handleMotChange}
                    onKeyPress={handleKeyPress}
                    placeholder="Par exemple : CHAT"
                    maxLength={10}
                    error={erreur}
                    disabled={disabled}
                    helperText="Ton mot sera écrit verticalement, une lettre par ligne"
                    className="text-2xl font-bold text-center uppercase"
                />
            </div>

            {/* Bouton de validation */}
            <div className="mb-6">
                <Button
                    variant="primary"
                    size="large"
                    fullWidth
                    onClick={handleValider}
                    disabled={disabled || mot.length < 3}
                >
                    {mot.length >= 3
                        ? `Créer mon acrostiche avec "${mot}"`
                        : "Entre un mot d'au moins 3 lettres"}
                </Button>
            </div>

            {/* Suggestions */}
            <div>
                <p className="text-sm font-medium text-gray-700 mb-3">
                    💡 Ou choisis parmi ces suggestions :
                </p>
                <div className="flex flex-wrap gap-2">
                    {suggestions.map((suggestion) => (
                        <button
                            key={suggestion}
                            onClick={() => handleSuggestionClick(suggestion)}
                            disabled={disabled}
                            className="
                px-4 py-2 rounded-lg
                bg-gray-100 hover:bg-primary-100
                text-gray-700 hover:text-primary-700
                font-medium text-sm
                transition-colors duration-200
                disabled:opacity-50 disabled:cursor-not-allowed
              "
                        >
                            {suggestion}
                        </button>
                    ))}
                </div>
            </div>

            {/* Message d'aide */}
            <div className="mt-6 p-4 bg-green-50 border-l-4 border-green-400 rounded">
                <p className="text-green-800 text-sm">
                    <strong>Astuce :</strong> Choisis un mot qui te plaît ou qui
                    te fait penser à quelque chose que tu aimes !
                </p>
            </div>
        </div>
    );
};

MotInput.propTypes = {
    onMotValide: PropTypes.func.isRequired,
    motInitial: PropTypes.string,
    disabled: PropTypes.bool,
};

export default MotInput;
