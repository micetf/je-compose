import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Button, Input, Card } from "@components/common";
import WordBank from "./WordBank";
import { validerLigneAcrostiche, getLibelleNiveau } from "@utils/acrostiche";
import useAcrosticheContext from "@hooks/useAcrosticheContext";

/**
 * Composant principal d'édition d'acrostiche
 * @param {Object} props
 * @param {Object} props.acrostiche - Acrostiche à éditer
 * @param {Function} props.onComplete - Callback quand l'acrostiche est terminé
 */
const AcrosticheEditor = ({ acrostiche, onComplete }) => {
    const { actions } = useAcrosticheContext();

    const [ligneActive, setLigneActive] = useState(0);
    const [erreur, setErreur] = useState("");
    const [showWordBank, setShowWordBank] = useState(false);
    const [contenuEdite, setContenuEdite] = useState("");

    // Synchroniser le contenu édité avec la ligne active de l'acrostiche
    useEffect(() => {
        if (acrostiche?.vers) {
            setContenuEdite(acrostiche.vers[ligneActive] || "");
            setErreur("");
        }
    }, [ligneActive, acrostiche?.vers]);

    // Auto-focus sur l'input quand la ligne change
    useEffect(() => {
        const input = document.getElementById("ligne-input");
        if (input) {
            input.focus();
        }
    }, [ligneActive]);

    if (!acrostiche) {
        return null;
    }

    const lettreActive = acrostiche.motInitial[ligneActive];
    const { titre: niveauTitre } = getLibelleNiveau(acrostiche.niveau);

    const handleLigneChange = (e) => {
        const value = e.target.value;

        // S'assurer que la ligne commence par la bonne lettre
        if (value.length === 0 || value[0].toUpperCase() === lettreActive) {
            setContenuEdite(value);
            setErreur("");
        } else {
            setErreur(`La ligne doit commencer par la lettre ${lettreActive}`);
        }
    };

    const handleValiderLigne = () => {
        // Validation
        const { valide, erreur: erreurValidation } = validerLigneAcrostiche(
            contenuEdite,
            acrostiche.niveau
        );

        if (!valide) {
            setErreur(erreurValidation);
            return;
        }

        // Mettre à jour l'acrostiche
        actions.modifierLigne(ligneActive, contenuEdite);

        // Passer à la ligne suivante ou terminer
        if (ligneActive < acrostiche.vers.length - 1) {
            setLigneActive(ligneActive + 1);
            setContenuEdite("");
            setErreur("");
            setShowWordBank(false);
        } else {
            // Dernière ligne validée
            if (onComplete) {
                onComplete();
            }
        }
    };

    const handlePrecedent = () => {
        if (ligneActive > 0) {
            // Sauvegarder la ligne actuelle avant de changer
            actions.modifierLigne(ligneActive, contenuEdite);
            setLigneActive(ligneActive - 1);
            setErreur("");
            setShowWordBank(false);
        }
    };

    const handleToggleWordBank = () => {
        setShowWordBank(!showWordBank);
    };

    const handleMotSelect = (mot) => {
        // Capitaliser la première lettre
        const motFormate =
            mot.charAt(0).toUpperCase() + mot.slice(1).toLowerCase();
        setContenuEdite(motFormate);
        setShowWordBank(false);
    };

    const handleKeyPress = (e) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            handleValiderLigne();
        }
    };

    return (
        <div className="space-y-6">
            {/* En-tête avec progression */}
            <Card>
                <div className="flex items-center justify-between mb-4">
                    <div>
                        <h2 className="text-2xl font-bold text-gray-900">
                            {acrostiche.motInitial}
                        </h2>
                        <p className="text-sm text-gray-600">{niveauTitre}</p>
                    </div>
                    <div className="text-right">
                        <div className="text-sm text-gray-600">
                            Ligne {ligneActive + 1} / {acrostiche.vers.length}
                        </div>
                        <div className="text-xs text-gray-500">
                            {Math.round(
                                (ligneActive / acrostiche.vers.length) * 100
                            )}
                            % complété
                        </div>
                    </div>
                </div>

                {/* Indicateur de progression visuel */}
                <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
                    <div
                        className="bg-primary-500 h-2 rounded-full transition-all duration-300"
                        style={{
                            width: `${(ligneActive / acrostiche.vers.length) * 100}%`,
                        }}
                    />
                </div>

                {/* Zone d'édition de la ligne */}
                <div className="space-y-4">
                    {/* Lettre initiale */}
                    <div className="flex items-center gap-4">
                        <div className="flex-shrink-0 w-16 h-16 bg-primary-500 text-white rounded-xl flex items-center justify-center">
                            <span className="text-4xl font-bold">
                                {lettreActive}
                            </span>
                        </div>
                        <div className="flex-1">
                            <p className="text-sm font-medium text-gray-700 mb-1">
                                Ligne {ligneActive + 1} - Commence par la lettre{" "}
                                <strong>{lettreActive}</strong>
                            </p>
                            <p className="text-xs text-gray-500">
                                {acrostiche.niveau === 1 && "Écris un seul mot"}
                                {acrostiche.niveau === 2 &&
                                    "Écris une courte phrase (2 à 8 mots)"}
                                {acrostiche.niveau === 3 &&
                                    "Écris un vers poétique"}
                            </p>
                        </div>
                    </div>

                    {/* Input */}
                    <Input
                        id="ligne-input"
                        value={contenuEdite}
                        onChange={handleLigneChange}
                        onKeyPress={handleKeyPress}
                        placeholder={`${lettreActive}...`}
                        error={erreur}
                        maxLength={acrostiche.niveau === 1 ? 30 : 100}
                        className="text-xl"
                    />

                    {/* Boutons d'action */}
                    <div className="flex gap-3">
                        <Button
                            variant="secondary"
                            onClick={handleToggleWordBank}
                            className="flex-1"
                        >
                            {showWordBank
                                ? "❌ Fermer l'aide"
                                : "💡 Besoin d'aide ?"}
                        </Button>

                        {ligneActive > 0 && (
                            <Button
                                variant="secondary"
                                onClick={handlePrecedent}
                            >
                                ← Ligne précédente
                            </Button>
                        )}

                        <Button
                            variant="primary"
                            onClick={handleValiderLigne}
                            disabled={contenuEdite.trim().length === 0}
                            className="flex-1"
                        >
                            {ligneActive < acrostiche.vers.length - 1
                                ? "Valider et continuer →"
                                : "✅ Terminer"}
                        </Button>
                    </div>
                </div>
            </Card>

            {/* Banque de mots */}
            {showWordBank && (
                <WordBank
                    lettre={lettreActive}
                    onMotSelect={handleMotSelect}
                    isOpen={showWordBank}
                />
            )}

            {/* Récapitulatif des lignes précédentes */}
            {ligneActive > 0 && (
                <Card>
                    <h3 className="text-sm font-semibold text-gray-700 mb-3">
                        📜 Lignes déjà écrites :
                    </h3>
                    <div className="space-y-2">
                        {acrostiche.vers
                            .slice(0, ligneActive)
                            .map((vers, index) => (
                                <div
                                    key={index}
                                    className="flex items-start gap-2 p-2 bg-gray-50 rounded-lg"
                                >
                                    <span className="font-bold text-primary-600 min-w-[24px]">
                                        {acrostiche.motInitial[index]}
                                    </span>
                                    <span className="text-gray-700">
                                        {vers || (
                                            <span className="italic text-gray-400">
                                                (vide)
                                            </span>
                                        )}
                                    </span>
                                </div>
                            ))}
                    </div>
                </Card>
            )}
        </div>
    );
};

AcrosticheEditor.propTypes = {
    acrostiche: PropTypes.shape({
        motInitial: PropTypes.string.isRequired,
        niveau: PropTypes.number.isRequired,
        vers: PropTypes.arrayOf(PropTypes.string).isRequired,
    }).isRequired,
    onComplete: PropTypes.func,
};

export default AcrosticheEditor;
