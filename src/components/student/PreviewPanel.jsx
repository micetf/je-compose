import { useRef } from "react";
import PropTypes from "prop-types";
import { Card, Button } from "@components/common";
import { calculerStatistiques } from "@utils/acrostiche";
import { exporterEnPNG } from "@utils/export";

/**
 * Composant d'aperçu en temps réel de l'acrostiche
 * @param {Object} props
 * @param {Object} props.acrostiche - Objet acrostiche à afficher
 * @param {boolean} props.showStats - Afficher les statistiques
 * @param {boolean} props.showExport - Afficher les boutons d'export
 */
const PreviewPanel = ({ acrostiche, showStats = true, showExport = false }) => {
    const previewRef = useRef(null);

    if (!acrostiche) {
        return null;
    }

    const stats = calculerStatistiques(acrostiche);

    const handleExportPNG = async () => {
        const element = previewRef.current;
        if (element) {
            const success = await exporterEnPNG(
                element,
                `acrostiche-${acrostiche.motInitial.toLowerCase()}`
            );

            if (success) {
                // Feedback visuel (pourrait être un toast)
                alert("✅ Ton acrostiche a été téléchargé !");
            } else {
                alert("❌ Erreur lors du téléchargement");
            }
        }
    };

    return (
        <Card className="sticky top-4">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">
                📝 Ton acrostiche
            </h3>

            {/* Zone d'aperçu */}
            <div
                ref={previewRef}
                className="bg-gradient-to-br from-blue-50 to-purple-50 p-6 rounded-xl mb-4"
            >
                {/* Titre */}
                <div className="text-center mb-4">
                    <h4 className="text-2xl font-bold text-primary-700">
                        {acrostiche.motInitial}
                    </h4>
                </div>

                {/* Acrostiche */}
                <div className="space-y-2">
                    {acrostiche.vers.map((vers, index) => {
                        const lettre = acrostiche.motInitial[index];
                        const hasContent = vers.trim().length > 0;

                        return (
                            <div
                                key={index}
                                className={`
                  flex items-start gap-2 p-2 rounded
                  ${hasContent ? "bg-white bg-opacity-60" : "bg-gray-100 bg-opacity-40"}
                `}
                            >
                                {/* Lettre initiale */}
                                <span className="text-3xl font-bold text-primary-600 min-w-[40px]">
                                    {lettre}
                                </span>

                                {/* Vers ou placeholder */}
                                <div className="flex-1 pt-2">
                                    {hasContent ? (
                                        <span className="text-lg text-gray-800 leading-relaxed">
                                            {vers.substring(1) || "..."}
                                        </span>
                                    ) : (
                                        <span className="text-gray-400 italic">
                                            À compléter...
                                        </span>
                                    )}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* Statistiques */}
            {showStats && (
                <div className="mb-4 p-4 bg-gray-50 rounded-lg">
                    <h4 className="text-sm font-semibold text-gray-700 mb-2">
                        📊 Progression
                    </h4>

                    {/* Barre de progression */}
                    <div className="mb-3">
                        <div className="flex items-center justify-between text-sm mb-1">
                            <span className="text-gray-600">
                                {stats.lignesRemplies} / {stats.lignesTotal}{" "}
                                lignes
                            </span>
                            <span className="font-semibold text-primary-600">
                                {stats.progression}%
                            </span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                            <div
                                className="bg-primary-500 h-2 rounded-full transition-all duration-300"
                                style={{ width: `${stats.progression}%` }}
                            />
                        </div>
                    </div>

                    {/* Détails */}
                    <div className="grid grid-cols-2 gap-2 text-sm">
                        <div>
                            <span className="text-gray-600">Mots :</span>
                            <span className="ml-1 font-medium">
                                {stats.nombreMots}
                            </span>
                        </div>
                        <div>
                            <span className="text-gray-600">Caractères :</span>
                            <span className="ml-1 font-medium">
                                {stats.nombreCaracteres}
                            </span>
                        </div>
                    </div>
                </div>
            )}

            {/* Boutons d'export */}
            {showExport && stats.progression === 100 && (
                <div className="space-y-2">
                    <Button
                        variant="success"
                        size="medium"
                        fullWidth
                        onClick={handleExportPNG}
                    >
                        📥 Télécharger en image
                    </Button>

                    <p className="text-xs text-gray-500 text-center">
                        Tu pourras aussi l'imprimer ou le partager !
                    </p>
                </div>
            )}

            {/* Message d'encouragement */}
            {stats.progression > 0 && stats.progression < 100 && (
                <div className="p-3 bg-blue-50 border-l-4 border-blue-400 rounded">
                    <p className="text-blue-800 text-sm">
                        {stats.progression < 30 &&
                            "🌱 Continue, tu as bien commencé !"}
                        {stats.progression >= 30 &&
                            stats.progression < 70 &&
                            "🚀 Tu avances bien, encore un effort !"}
                        {stats.progression >= 70 && "⭐ Presque fini, bravo !"}
                    </p>
                </div>
            )}

            {/* Message de félicitations */}
            {stats.progression === 100 && (
                <div className="p-4 bg-green-50 border-l-4 border-green-500 rounded">
                    <p className="text-green-800 font-semibold">
                        🎉 Bravo ! Ton acrostiche est terminé !
                    </p>
                    <p className="text-green-700 text-sm mt-1">
                        N'oublie pas de le télécharger pour le garder.
                    </p>
                </div>
            )}
        </Card>
    );
};

PreviewPanel.propTypes = {
    acrostiche: PropTypes.shape({
        motInitial: PropTypes.string.isRequired,
        vers: PropTypes.arrayOf(PropTypes.string).isRequired,
        niveau: PropTypes.number.isRequired,
    }),
    showStats: PropTypes.bool,
    showExport: PropTypes.bool,
};

export default PreviewPanel;
