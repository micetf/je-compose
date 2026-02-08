import PropTypes from "prop-types";
import { Card } from "@components/common";
import { getLibelleNiveau } from "@utils/acrostiche";

/**
 * Composant de sélection du niveau d'acrostiche
 * @param {Object} props
 * @param {number} props.niveauSelectionne - Niveau actuellement sélectionné (1, 2 ou 3)
 * @param {Function} props.onNiveauChange - Callback lors du changement de niveau
 * @param {boolean} props.disabled - Désactive la sélection
 */
const NiveauSelector = ({
    niveauSelectionne = null,
    onNiveauChange,
    disabled = false,
}) => {
    const niveaux = [1, 2, 3];

    const handleNiveauClick = (niveau) => {
        if (!disabled) {
            onNiveauChange(niveau);
        }
    };

    return (
        <div className="w-full">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Choisis ton niveau
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {niveaux.map((niveau) => {
                    const { titre, description, icone, badge } =
                        getLibelleNiveau(niveau);
                    const isSelected = niveauSelectionne === niveau;

                    return (
                        <Card
                            key={niveau}
                            hover={!disabled}
                            onClick={() => handleNiveauClick(niveau)}
                            className={`
                cursor-pointer transition-all duration-200
                ${
                    isSelected
                        ? "ring-4 ring-primary-500 bg-primary-50"
                        : "hover:shadow-lg"
                }
                ${disabled ? "opacity-50 cursor-not-allowed" : ""}
              `}
                        >
                            <div className="text-center">
                                {/* Icône et badge */}
                                <div className="flex items-center justify-center gap-3 mb-3">
                                    <span className="text-4xl">{icone}</span>
                                    <span className={`${badge} text-lg`}>
                                        Niveau {niveau}
                                    </span>
                                </div>

                                {/* Titre */}
                                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                                    {titre}
                                </h3>

                                {/* Description */}
                                <p className="text-gray-600 text-sm leading-relaxed">
                                    {description}
                                </p>

                                {/* Indicateur de sélection */}
                                {isSelected && (
                                    <div className="mt-4 flex items-center justify-center gap-2 text-primary-600">
                                        <svg
                                            className="w-5 h-5"
                                            fill="currentColor"
                                            viewBox="0 0 20 20"
                                        >
                                            <path
                                                fillRule="evenodd"
                                                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                                clipRule="evenodd"
                                            />
                                        </svg>
                                        <span className="font-medium">
                                            Sélectionné
                                        </span>
                                    </div>
                                )}
                            </div>
                        </Card>
                    );
                })}
            </div>

            {/* Message d'aide */}
            {!niveauSelectionne && (
                <div className="mt-4 p-4 bg-blue-50 border-l-4 border-blue-400 rounded">
                    <p className="text-blue-800">
                        💡 <strong>Conseil :</strong> Si c'est ta première fois,
                        commence par le niveau 1 !
                    </p>
                </div>
            )}
        </div>
    );
};

NiveauSelector.propTypes = {
    niveauSelectionne: PropTypes.number,
    onNiveauChange: PropTypes.func.isRequired,
    disabled: PropTypes.bool,
};

export default NiveauSelector;
