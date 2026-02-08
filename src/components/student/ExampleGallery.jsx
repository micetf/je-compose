import { useState } from "react";
import PropTypes from "prop-types";
import { Card, Button, Modal } from "@components/common";
import { getTousLesExemples, getExemplesParNiveau } from "@data/exemples";
import { getLibelleNiveau } from "@utils/acrostiche";

/**
 * Composant de galerie d'exemples d'acrostiches
 * @param {Object} props
 * @param {number} props.filtreNiveau - Filtrer par niveau (optionnel)
 */
const ExampleGallery = ({ filtreNiveau = null }) => {
    const [exempleSelectionne, setExempleSelectionne] = useState(null);
    const [modalOpen, setModalOpen] = useState(false);

    // Récupérer les exemples
    const exemples = filtreNiveau
        ? getExemplesParNiveau(filtreNiveau)
        : getTousLesExemples();

    const handleExempleClick = (exemple) => {
        setExempleSelectionne(exemple);
        setModalOpen(true);
    };

    const handleCloseModal = () => {
        setModalOpen(false);
        setTimeout(() => setExempleSelectionne(null), 300);
    };

    return (
        <div>
            {/* En-tête */}
            <div className="mb-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                    📚 Exemples d'acrostiches
                </h2>
                <p className="text-gray-600">
                    Regarde ces exemples pour t'inspirer ! Clique sur un
                    acrostiche pour le voir en grand.
                </p>
            </div>

            {/* Grille d'exemples */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {exemples.map((exemple) => {
                    const { badge, icone } = getLibelleNiveau(exemple.niveau);

                    return (
                        <Card
                            key={exemple.id}
                            hover
                            onClick={() => handleExempleClick(exemple)}
                            className="cursor-pointer transition-all duration-200 hover:scale-105"
                        >
                            {/* Header */}
                            <div className="flex items-center justify-between mb-3">
                                <h3 className="text-xl font-bold text-primary-700">
                                    {exemple.motInitial}
                                </h3>
                                <span className={badge}>
                                    {icone} Niveau {exemple.niveau}
                                </span>
                            </div>

                            {/* Thème */}
                            <div className="mb-3">
                                <span className="inline-block px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full">
                                    {exemple.theme}
                                </span>
                            </div>

                            {/* Aperçu (3 premières lignes) */}
                            <div className="space-y-1 mb-3">
                                {exemple.vers.slice(0, 3).map((vers, index) => (
                                    <div
                                        key={index}
                                        className="flex items-start gap-2"
                                    >
                                        <span className="font-bold text-primary-600 min-w-[20px]">
                                            {exemple.motInitial[index]}
                                        </span>
                                        <span className="text-gray-700 text-sm truncate">
                                            {vers}
                                        </span>
                                    </div>
                                ))}
                                {exemple.vers.length > 3 && (
                                    <p className="text-xs text-gray-500 italic pl-6">
                                        + {exemple.vers.length - 3} ligne
                                        {exemple.vers.length - 3 > 1 ? "s" : ""}
                                        ...
                                    </p>
                                )}
                            </div>

                            {/* CTA */}
                            <div className="text-center">
                                <span className="text-sm text-primary-600 font-medium">
                                    Cliquer pour voir en entier →
                                </span>
                            </div>
                        </Card>
                    );
                })}
            </div>

            {/* Message si aucun exemple */}
            {exemples.length === 0 && (
                <div className="text-center py-12">
                    <p className="text-gray-500 text-lg">
                        Aucun exemple pour ce niveau
                    </p>
                </div>
            )}

            {/* Modal de détail */}
            <Modal
                isOpen={modalOpen}
                onClose={handleCloseModal}
                title={exempleSelectionne?.motInitial || ""}
                size="large"
            >
                {exempleSelectionne && (
                    <div className="space-y-6">
                        {/* Métadonnées */}
                        <div className="flex items-center gap-3 flex-wrap">
                            <span
                                className={
                                    getLibelleNiveau(exempleSelectionne.niveau)
                                        .badge
                                }
                            >
                                {
                                    getLibelleNiveau(exempleSelectionne.niveau)
                                        .icone
                                }{" "}
                                Niveau {exempleSelectionne.niveau}
                            </span>
                            <span className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full">
                                📁 {exempleSelectionne.theme}
                            </span>
                            <span className="px-3 py-1 bg-blue-100 text-blue-700 text-sm rounded-full">
                                ✍️ {exempleSelectionne.auteur}
                            </span>
                        </div>

                        {/* Acrostiche complet */}
                        <div className="bg-gradient-to-br from-blue-50 to-purple-50 p-6 rounded-xl">
                            <div className="space-y-3">
                                {exempleSelectionne.vers.map((vers, index) => (
                                    <div
                                        key={index}
                                        className="flex items-start gap-3 p-2 bg-white bg-opacity-60 rounded-lg"
                                    >
                                        <span className="text-3xl font-bold text-primary-600 min-w-[40px]">
                                            {
                                                exempleSelectionne.motInitial[
                                                    index
                                                ]
                                            }
                                        </span>
                                        <span className="text-lg text-gray-800 leading-relaxed pt-1">
                                            {vers.substring(1)}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Explication */}
                        <div className="p-4 bg-yellow-50 border-l-4 border-yellow-400 rounded">
                            <h4 className="font-semibold text-yellow-900 mb-2">
                                💡 Pourquoi cet exemple ?
                            </h4>
                            <p className="text-yellow-800">
                                {exempleSelectionne.explication}
                            </p>
                        </div>

                        {/* Bouton de fermeture */}
                        <div className="text-center">
                            <Button
                                variant="primary"
                                onClick={handleCloseModal}
                            >
                                Fermer
                            </Button>
                        </div>
                    </div>
                )}
            </Modal>
        </div>
    );
};

ExampleGallery.propTypes = {
    filtreNiveau: PropTypes.number,
};

export default ExampleGallery;
