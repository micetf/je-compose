import { useState, useEffect, useCallback } from "react";
import PropTypes from "prop-types";
import { Button, Card, Input, Modal } from "@components/common";
import {
    extraireParametresURL,
    recupererProductionsSeance,
    sauvegarderProduction,
    supprimerProduction,
    supprimerProductionsSeance,
    obtenirStatistiquesSeance,
    validerProduction,
} from "@utils/partage";
import { recupererSeance } from "@utils/session";
import { getLibelleNiveau } from "@utils/acrostiche";
import { exporterPlusieursPDF } from "@utils/export";

/**
 * Composant de consultation des productions d'une séance
 * Permet à l'enseignant de voir tous les acrostiches reçus
 * @param {Object} props
 * @param {string} props.codeSeance - Code de la séance (optionnel si dans l'URL)
 */
const SessionView = ({ codeSeance: codeSeanceProp }) => {
    // États locaux
    const [codeSeance, setCodeSeance] = useState(codeSeanceProp || "");
    const [codeInput, setCodeInput] = useState("");
    const [productions, setProductions] = useState([]);
    const [seanceInfo, setSeanceInfo] = useState(null);
    const [filtreNiveau, setFiltreNiveau] = useState(null);
    const [triActif, setTriActif] = useState("date"); // date, nom, mot
    const [ordreDesc, setOrdreDesc] = useState(true);
    const [productionSelectionnee, setProductionSelectionnee] = useState(null);
    const [modalOuverte, setModalOuverte] = useState(false);
    const [selectionsExport, setSelectionsExport] = useState([]);
    const [message, setMessage] = useState(null);
    const [exportEnCours, setExportEnCours] = useState(false);

    // Détecter automatiquement les paramètres URL au chargement
    useEffect(() => {
        const params = extraireParametresURL();

        if (params) {
            // Si une production est présente, la sauvegarder automatiquement
            if (params.production && params.codeSeance) {
                const isValid = validerProduction(params.production);

                if (isValid) {
                    const success = sauvegarderProduction(
                        params.codeSeance,
                        params.production
                    );

                    if (success) {
                        setMessage({
                            type: "success",
                            texte: `✅ Production de ${params.production.nomEleve} ajoutée avec succès !`,
                        });

                        // Nettoyer l'URL après sauvegarde
                        window.history.replaceState(
                            {},
                            "",
                            `/enseignant?session=${params.codeSeance}`
                        );
                    }
                } else {
                    setMessage({
                        type: "error",
                        texte: "❌ Production invalide ou corrompue.",
                    });
                }
            }

            // Charger la séance
            if (params.codeSeance) {
                setCodeSeance(params.codeSeance);
                chargerSeance(params.codeSeance);
            }
        }
    }, []);

    // Charger les productions quand le code change
    useEffect(() => {
        if (codeSeance) {
            chargerProductions();
        }
    }, [codeSeance, chargerProductions]);

    /**
     * Charge les informations de la séance
     */
    const chargerSeance = (code) => {
        const seance = recupererSeance(code);
        setSeanceInfo(seance);

        if (!seance) {
            setMessage({
                type: "warning",
                texte: "⚠️ Code de séance introuvable. Les productions seront quand même affichées si disponibles.",
            });
        }
    };

    /**
     * Charge les productions de la séance
     */
    const chargerProductions = useCallback(() => {
        const prods = recupererProductionsSeance(codeSeance);
        setProductions(prods);
    }, [codeSeance]);

    /**
     * Gère la soumission du formulaire de code
     */
    const handleSoumettreCode = (e) => {
        e.preventDefault();

        if (!codeInput.trim()) {
            setMessage({
                type: "error",
                texte: "Veuillez entrer un code de séance.",
            });
            return;
        }

        setCodeSeance(codeInput.trim().toUpperCase());
        chargerSeance(codeInput.trim().toUpperCase());
        setMessage(null);
    };

    /**
     * Ouvre la modal de détail d'une production
     */
    const handleVoirDetail = (production) => {
        setProductionSelectionnee(production);
        setModalOuverte(true);
    };

    /**
     * Supprime une production
     */
    const handleSupprimerProduction = (productionId) => {
        if (
            !window.confirm(
                "Êtes-vous sûr de vouloir supprimer cette production ?"
            )
        ) {
            return;
        }

        const success = supprimerProduction(codeSeance, productionId);

        if (success) {
            setMessage({
                type: "success",
                texte: "Production supprimée.",
            });
            chargerProductions();

            if (productionSelectionnee?.id === productionId) {
                setModalOuverte(false);
                setProductionSelectionnee(null);
            }
        }
    };

    /**
     * Supprime toutes les productions
     */
    const handleSupprimerTout = () => {
        if (
            !window.confirm(
                "⚠️ ATTENTION : Supprimer toutes les productions de cette séance ?\n\nCette action est irréversible."
            )
        ) {
            return;
        }

        const success = supprimerProductionsSeance(codeSeance);

        if (success) {
            setMessage({
                type: "success",
                texte: "Toutes les productions ont été supprimées.",
            });
            chargerProductions();
        }
    };

    /**
     * Toggle sélection pour export
     */
    const handleToggleSelection = (productionId) => {
        setSelectionsExport((prev) =>
            prev.includes(productionId)
                ? prev.filter((id) => id !== productionId)
                : [...prev, productionId]
        );
    };

    /**
     * Sélectionner toutes les productions filtrées
     */
    const handleSelectionnerTout = () => {
        const ids = productionsFiltrees.map((p) => p.id);
        setSelectionsExport(ids);
    };

    /**
     * Désélectionner tout
     */
    const handleDeselectionnerTout = () => {
        setSelectionsExport([]);
    };

    /**
     * Exporte les productions sélectionnées en PDF
     */
    const handleExporterPDF = async () => {
        if (selectionsExport.length === 0) {
            setMessage({
                type: "warning",
                texte: "⚠️ Veuillez sélectionner au moins une production.",
            });
            return;
        }

        setExportEnCours(true);

        try {
            // Récupérer les productions sélectionnées
            const productionsAExporter = productions.filter((p) =>
                selectionsExport.includes(p.id)
            );

            // Transformer au format attendu par exporterPlusieursPDF
            const acrostichesFormates = productionsAExporter.map((prod) => ({
                motInitial: prod.motInitial,
                niveau: prod.niveau,
                vers: prod.vers,
                nomEleve: prod.nomEleve,
                dateCreation: prod.dateCreation,
            }));

            // Générer le nom du fichier
            const nomFichier = `acrostiches_${codeSeance}_${new Date().toISOString().split("T")[0]}`;

            // Exporter
            const success = await exporterPlusieursPDF(
                acrostichesFormates,
                nomFichier
            );

            if (success) {
                setMessage({
                    type: "success",
                    texte: `✅ ${selectionsExport.length} production${selectionsExport.length > 1 ? "s" : ""} exportée${selectionsExport.length > 1 ? "s" : ""} en PDF !`,
                });
                setSelectionsExport([]); // Réinitialiser la sélection
            } else {
                setMessage({
                    type: "error",
                    texte: "❌ Erreur lors de l'export PDF.",
                });
            }
        } catch (error) {
            console.error("Erreur export PDF:", error);
            setMessage({
                type: "error",
                texte: "❌ Une erreur est survenue lors de l'export.",
            });
        } finally {
            setExportEnCours(false);
        }
    };

    // Filtrage et tri des productions
    const productionsFiltrees = productions
        .filter((p) => (filtreNiveau ? p.niveau === filtreNiveau : true))
        .sort((a, b) => {
            let comparaison = 0;

            if (triActif === "date") {
                comparaison =
                    new Date(a.dateReception) - new Date(b.dateReception);
            } else if (triActif === "nom") {
                comparaison = a.nomEleve.localeCompare(b.nomEleve);
            } else if (triActif === "mot") {
                comparaison = a.motInitial.localeCompare(b.motInitial);
            }

            return ordreDesc ? -comparaison : comparaison;
        });

    // Statistiques
    const stats = codeSeance ? obtenirStatistiquesSeance(codeSeance) : null;

    return (
        <div className="max-w-6xl mx-auto space-y-6">
            {/* Formulaire code séance */}
            {!codeSeance && (
                <Card title="🔍 Consulter une séance">
                    <form onSubmit={handleSoumettreCode} className="space-y-4">
                        <Input
                            id="code-seance"
                            label="Code de la séance"
                            type="text"
                            value={codeInput}
                            onChange={(e) =>
                                setCodeInput(e.target.value.toUpperCase())
                            }
                            placeholder="Ex: ABC123"
                            maxLength={6}
                            required
                        />

                        <Button
                            type="submit"
                            variant="primary"
                            size="large"
                            fullWidth
                        >
                            Consulter les productions
                        </Button>
                    </form>
                </Card>
            )}

            {/* Message de feedback */}
            {message && (
                <div
                    className={`p-4 rounded-lg border ${
                        message.type === "success"
                            ? "bg-green-50 border-green-200 text-green-800"
                            : message.type === "error"
                              ? "bg-red-50 border-red-200 text-red-800"
                              : "bg-yellow-50 border-yellow-200 text-yellow-800"
                    }`}
                >
                    <p>{message.texte}</p>
                    <button
                        onClick={() => setMessage(null)}
                        className="mt-2 text-sm underline"
                    >
                        Fermer
                    </button>
                </div>
            )}

            {/* Vue séance */}
            {codeSeance && (
                <>
                    {/* En-tête séance */}
                    <Card>
                        <div className="flex items-start justify-between">
                            <div>
                                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                                    📋 Séance : {codeSeance}
                                </h2>
                                {seanceInfo && (
                                    <p className="text-gray-600">
                                        {seanceInfo.nom}
                                    </p>
                                )}
                            </div>
                            <Button
                                variant="secondary"
                                size="small"
                                onClick={() => {
                                    setCodeSeance("");
                                    setProductions([]);
                                    setSeanceInfo(null);
                                    setMessage(null);
                                }}
                            >
                                ← Changer de séance
                            </Button>
                        </div>

                        {/* Statistiques */}
                        {stats && (
                            <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
                                <div className="text-center p-3 bg-blue-50 rounded-lg">
                                    <p className="text-2xl font-bold text-blue-600">
                                        {stats.total}
                                    </p>
                                    <p className="text-sm text-blue-800">
                                        Production{stats.total > 1 ? "s" : ""}
                                    </p>
                                </div>
                                <div className="text-center p-3 bg-green-50 rounded-lg">
                                    <p className="text-2xl font-bold text-green-600">
                                        {stats.parNiveau[1]}
                                    </p>
                                    <p className="text-sm text-green-800">
                                        Niveau 1
                                    </p>
                                </div>
                                <div className="text-center p-3 bg-orange-50 rounded-lg">
                                    <p className="text-2xl font-bold text-orange-600">
                                        {stats.parNiveau[2]}
                                    </p>
                                    <p className="text-sm text-orange-800">
                                        Niveau 2
                                    </p>
                                </div>
                                <div className="text-center p-3 bg-red-50 rounded-lg">
                                    <p className="text-2xl font-bold text-red-600">
                                        {stats.parNiveau[3]}
                                    </p>
                                    <p className="text-sm text-red-800">
                                        Niveau 3
                                    </p>
                                </div>
                            </div>
                        )}
                    </Card>

                    {/* Filtres et actions */}
                    {productions.length > 0 && (
                        <Card>
                            <div className="space-y-4">
                                {/* Filtres */}
                                <div className="flex flex-wrap gap-2">
                                    <button
                                        onClick={() => setFiltreNiveau(null)}
                                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                                            filtreNiveau === null
                                                ? "bg-primary-500 text-white"
                                                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                                        }`}
                                    >
                                        Tous ({productions.length})
                                    </button>
                                    {[1, 2, 3].map((niveau) => (
                                        <button
                                            key={niveau}
                                            onClick={() =>
                                                setFiltreNiveau(niveau)
                                            }
                                            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                                                filtreNiveau === niveau
                                                    ? "bg-primary-500 text-white"
                                                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                                            }`}
                                        >
                                            Niveau {niveau} (
                                            {
                                                productions.filter(
                                                    (p) => p.niveau === niveau
                                                ).length
                                            }
                                            )
                                        </button>
                                    ))}
                                </div>

                                {/* Tri */}
                                <div className="flex items-center gap-2 flex-wrap">
                                    <span className="text-sm font-medium text-gray-700">
                                        Trier par :
                                    </span>
                                    {[
                                        { key: "date", label: "Date" },
                                        { key: "nom", label: "Nom" },
                                        { key: "mot", label: "Mot" },
                                    ].map((option) => (
                                        <button
                                            key={option.key}
                                            onClick={() =>
                                                setTriActif(option.key)
                                            }
                                            className={`px-3 py-1 rounded text-sm ${
                                                triActif === option.key
                                                    ? "bg-primary-100 text-primary-700 font-medium"
                                                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                                            }`}
                                        >
                                            {option.label}
                                        </button>
                                    ))}
                                    <button
                                        onClick={() => setOrdreDesc(!ordreDesc)}
                                        className="px-3 py-1 rounded text-sm bg-gray-100 hover:bg-gray-200"
                                    >
                                        {ordreDesc ? "↓ Desc" : "↑ Asc"}
                                    </button>
                                </div>

                                {/* Actions de sélection */}
                                {/* Actions de sélection */}
                                <div className="flex items-center gap-2 flex-wrap pt-2 border-t">
                                    <Button
                                        variant="secondary"
                                        size="small"
                                        onClick={handleSelectionnerTout}
                                    >
                                        ✓ Tout sélectionner
                                    </Button>
                                    <Button
                                        variant="secondary"
                                        size="small"
                                        onClick={handleDeselectionnerTout}
                                    >
                                        ✗ Tout désélectionner
                                    </Button>

                                    {/* ⬇️ AJOUTER CE BOUTON ⬇️ */}
                                    {selectionsExport.length > 0 && (
                                        <>
                                            <Button
                                                variant="primary"
                                                size="small"
                                                onClick={handleExporterPDF}
                                                disabled={exportEnCours}
                                            >
                                                {exportEnCours ? (
                                                    "⏳ Export en cours..."
                                                ) : (
                                                    <>
                                                        📥 Exporter en PDF (
                                                        {
                                                            selectionsExport.length
                                                        }
                                                        )
                                                    </>
                                                )}
                                            </Button>
                                            <span className="text-sm text-gray-600">
                                                {selectionsExport.length}{" "}
                                                sélectionné
                                                {selectionsExport.length > 1
                                                    ? "s"
                                                    : ""}
                                            </span>
                                        </>
                                    )}
                                    {/* ⬆️ FIN DU BOUTON ⬆️ */}
                                </div>

                                {/* Actions dangereuses */}
                                <div className="pt-2 border-t">
                                    <Button
                                        variant="danger"
                                        size="small"
                                        onClick={handleSupprimerTout}
                                    >
                                        🗑️ Supprimer toutes les productions
                                    </Button>
                                </div>
                            </div>
                        </Card>
                    )}

                    {/* Liste des productions */}
                    {productionsFiltrees.length === 0 ? (
                        <Card>
                            <div className="text-center py-12">
                                <p className="text-6xl mb-4">📭</p>
                                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                                    Aucune production
                                </h3>
                                <p className="text-gray-600">
                                    {productions.length === 0
                                        ? "Les productions des élèves s'afficheront ici."
                                        : "Aucune production ne correspond aux filtres sélectionnés."}
                                </p>
                            </div>
                        </Card>
                    ) : (
                        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                            {productionsFiltrees.map((production) => (
                                <Card
                                    key={production.id}
                                    hover
                                    className="cursor-pointer"
                                >
                                    <div
                                        onClick={() =>
                                            handleVoirDetail(production)
                                        }
                                    >
                                        {/* En-tête */}
                                        <div className="flex items-start justify-between mb-3">
                                            <div>
                                                <h3 className="font-bold text-lg text-gray-900">
                                                    {production.motInitial}
                                                </h3>
                                                <p className="text-sm text-gray-600">
                                                    {production.nomEleve}
                                                </p>
                                            </div>
                                            <span
                                                className={`px-2 py-1 rounded text-xs font-medium ${
                                                    production.niveau === 1
                                                        ? "bg-green-100 text-green-700"
                                                        : production.niveau ===
                                                            2
                                                          ? "bg-orange-100 text-orange-700"
                                                          : "bg-red-100 text-red-700"
                                                }`}
                                            >
                                                Niveau {production.niveau}
                                            </span>
                                        </div>

                                        {/* Aperçu acrostiche */}
                                        <div className="bg-gray-50 rounded-lg p-3 mb-3">
                                            {production.vers
                                                .slice(0, 3)
                                                .map((vers, idx) => (
                                                    <p
                                                        key={idx}
                                                        className="text-sm text-gray-700 font-mono"
                                                    >
                                                        {vers}
                                                    </p>
                                                ))}
                                            {production.vers.length > 3 && (
                                                <p className="text-xs text-gray-500 mt-1">
                                                    +{" "}
                                                    {production.vers.length - 3}{" "}
                                                    ligne
                                                    {production.vers.length -
                                                        3 >
                                                    1
                                                        ? "s"
                                                        : ""}
                                                </p>
                                            )}
                                        </div>

                                        {/* Date */}
                                        <p className="text-xs text-gray-500">
                                            Reçu le{" "}
                                            {new Date(
                                                production.dateReception
                                            ).toLocaleDateString("fr-FR", {
                                                day: "numeric",
                                                month: "long",
                                                year: "numeric",
                                                hour: "2-digit",
                                                minute: "2-digit",
                                            })}
                                        </p>
                                    </div>

                                    {/* Checkbox sélection */}
                                    <div
                                        className="mt-3 pt-3 border-t flex items-center gap-2"
                                        onClick={(e) => e.stopPropagation()}
                                    >
                                        <input
                                            type="checkbox"
                                            checked={selectionsExport.includes(
                                                production.id
                                            )}
                                            onChange={() =>
                                                handleToggleSelection(
                                                    production.id
                                                )
                                            }
                                            className="w-4 h-4 text-primary-600 rounded focus:ring-primary-500"
                                        />
                                        <label className="text-sm text-gray-600">
                                            Sélectionner pour export
                                        </label>
                                    </div>
                                </Card>
                            ))}
                        </div>
                    )}
                </>
            )}

            {/* Modal détail production */}
            {modalOuverte && productionSelectionnee && (
                <Modal
                    isOpen={modalOuverte}
                    onClose={() => {
                        setModalOuverte(false);
                        setProductionSelectionnee(null);
                    }}
                    title={`Acrostiche : ${productionSelectionnee.motInitial}`}
                >
                    <div className="space-y-4">
                        {/* Informations */}
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="font-semibold text-gray-900">
                                    {productionSelectionnee.nomEleve}
                                </p>
                                <p className="text-sm text-gray-600">
                                    {
                                        getLibelleNiveau(
                                            productionSelectionnee.niveau
                                        ).titre
                                    }
                                </p>
                            </div>
                            <span
                                className={`px-3 py-1 rounded font-medium ${
                                    productionSelectionnee.niveau === 1
                                        ? "bg-green-100 text-green-700"
                                        : productionSelectionnee.niveau === 2
                                          ? "bg-orange-100 text-orange-700"
                                          : "bg-red-100 text-red-700"
                                }`}
                            >
                                Niveau {productionSelectionnee.niveau}
                            </span>
                        </div>

                        {/* Acrostiche complet */}
                        <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl p-6 border border-blue-200">
                            {productionSelectionnee.vers.map((vers, idx) => {
                                const lettre =
                                    productionSelectionnee.motInitial[idx];
                                return (
                                    <p
                                        key={idx}
                                        className="text-lg font-mono text-gray-800 mb-1"
                                    >
                                        <span className="font-bold text-primary-600 text-xl mr-2">
                                            {lettre}
                                        </span>
                                        {vers.substring(1)}
                                    </p>
                                );
                            })}
                        </div>

                        {/* Actions */}
                        <div className="flex gap-2 justify-end pt-4 border-t">
                            <Button
                                variant="danger"
                                size="small"
                                onClick={() =>
                                    handleSupprimerProduction(
                                        productionSelectionnee.id
                                    )
                                }
                            >
                                🗑️ Supprimer
                            </Button>
                            <Button
                                variant="secondary"
                                onClick={() => setModalOuverte(false)}
                            >
                                Fermer
                            </Button>
                        </div>
                    </div>
                </Modal>
            )}
        </div>
    );
};

SessionView.propTypes = {
    codeSeance: PropTypes.string,
};

export default SessionView;
