import { useState } from "react";
import PropTypes from "prop-types";
import { Button, Input, Card } from "@components/common";
import {
    creerSeance,
    sauvegarderSeance,
    genererURLSeance,
    formatterTempsRestant,
} from "@utils/session";

/**
 * Composant de création de séance enseignant
 * Permet de générer un code séance et un lien à partager aux élèves
 * @param {Object} props
 * @param {Function} props.onSessionCreated - Callback appelé après création (optionnel)
 */
const SessionCreate = ({ onSessionCreated }) => {
    // États locaux
    const [nomSeance, setNomSeance] = useState("");
    const [dureeJours, setDureeJours] = useState(1);
    const [seanceCreee, setSeanceCreee] = useState(null);
    const [copie, setCopie] = useState(false);
    const [erreur, setErreur] = useState("");

    /**
     * Gère la création de la séance
     */
    const handleCreerSeance = () => {
        try {
            setErreur("");

            // Validation de la durée
            const duree = parseInt(dureeJours, 10);
            if (isNaN(duree) || duree < 1 || duree > 7) {
                setErreur("La durée doit être entre 1 et 7 jours");
                return;
            }

            // Créer la séance
            const nouvelleSeance = creerSeance(nomSeance, duree);

            // Sauvegarder dans localStorage
            const success = sauvegarderSeance(nouvelleSeance);

            if (!success) {
                setErreur(
                    "Erreur lors de la sauvegarde de la séance. Vérifiez votre espace de stockage."
                );
                return;
            }

            // Mettre à jour l'état
            setSeanceCreee(nouvelleSeance);

            // Réinitialiser le formulaire
            setNomSeance("");
            setDureeJours(1);

            // Callback optionnel
            if (onSessionCreated) {
                onSessionCreated(nouvelleSeance);
            }
        } catch (error) {
            console.error("Erreur lors de la création de la séance:", error);
            setErreur(
                error.message ||
                    "Une erreur est survenue lors de la création de la séance"
            );
        }
    };

    /**
     * Copie l'URL de la séance dans le presse-papier
     */
    const handleCopierURL = async () => {
        if (!seanceCreee) return;

        try {
            const url = genererURLSeance(seanceCreee.code);
            await navigator.clipboard.writeText(url);

            // Feedback visuel
            setCopie(true);
            setTimeout(() => setCopie(false), 2000);
        } catch (error) {
            console.error("Erreur lors de la copie:", error);
            setErreur("Impossible de copier le lien. Copiez-le manuellement.");
        }
    };

    /**
     * Réinitialise le formulaire
     */
    const handleNouvelle = () => {
        setSeanceCreee(null);
        setCopie(false);
        setErreur("");
    };

    return (
        <div className="max-w-2xl mx-auto">
            {!seanceCreee ? (
                // FORMULAIRE DE CRÉATION
                <Card title="📋 Créer une nouvelle séance">
                    <div className="space-y-6">
                        {/* Nom de la séance */}
                        <Input
                            id="nom-seance"
                            label="Nom de la séance (optionnel)"
                            type="text"
                            value={nomSeance}
                            onChange={(e) => setNomSeance(e.target.value)}
                            placeholder="Ex: Acrostiches CE2 - Printemps"
                            maxLength={50}
                            helperText="Ce nom vous aidera à identifier la séance"
                        />

                        {/* Durée de la séance */}
                        <div>
                            <label
                                htmlFor="duree-seance"
                                className="block text-sm font-medium text-gray-700 mb-2"
                            >
                                Durée de validité
                            </label>
                            <div className="flex items-center gap-4">
                                <input
                                    id="duree-seance"
                                    type="range"
                                    min="1"
                                    max="7"
                                    value={dureeJours}
                                    onChange={(e) =>
                                        setDureeJours(e.target.value)
                                    }
                                    className="flex-1 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-primary-500"
                                />
                                <span className="text-lg font-semibold text-primary-600 min-w-[80px] text-right">
                                    {dureeJours} jour{dureeJours > 1 ? "s" : ""}
                                </span>
                            </div>
                            <p className="mt-2 text-sm text-gray-600">
                                La séance expirera automatiquement après cette
                                durée
                            </p>
                        </div>

                        {/* Message d'erreur */}
                        {erreur && (
                            <div
                                className="p-4 bg-red-50 border border-red-200 rounded-lg"
                                role="alert"
                            >
                                <p className="text-sm text-red-800">
                                    ⚠️ {erreur}
                                </p>
                            </div>
                        )}

                        {/* Informations */}
                        <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                            <h4 className="font-medium text-blue-900 mb-2">
                                💡 À savoir
                            </h4>
                            <ul className="text-sm text-blue-800 space-y-1 list-disc list-inside">
                                <li>
                                    Un code unique à 6 caractères sera généré
                                </li>
                                <li>
                                    Vous pourrez partager un lien à vos élèves
                                </li>
                                <li>
                                    La séance sera automatiquement supprimée
                                    après expiration
                                </li>
                            </ul>
                        </div>

                        {/* Bouton de création */}
                        <Button
                            variant="primary"
                            size="large"
                            fullWidth
                            onClick={handleCreerSeance}
                        >
                            ✨ Créer la séance
                        </Button>
                    </div>
                </Card>
            ) : (
                // SÉANCE CRÉÉE - AFFICHAGE DU CODE ET DU LIEN
                <Card>
                    <div className="space-y-6">
                        {/* Message de succès */}
                        <div className="text-center p-6 bg-green-50 border border-green-200 rounded-xl">
                            <div className="text-5xl mb-3">✅</div>
                            <h3 className="text-2xl font-bold text-green-900 mb-2">
                                Séance créée avec succès !
                            </h3>
                            <p className="text-green-700">
                                Partagez le lien ci-dessous à vos élèves
                            </p>
                        </div>

                        {/* Informations de la séance */}
                        <div className="space-y-4">
                            {/* Nom */}
                            {seanceCreee.nom && (
                                <div>
                                    <label className="block text-sm font-medium text-gray-600 mb-1">
                                        Nom de la séance
                                    </label>
                                    <p className="text-lg font-semibold text-gray-900">
                                        {seanceCreee.nom}
                                    </p>
                                </div>
                            )}

                            {/* Code séance */}
                            <div>
                                <label className="block text-sm font-medium text-gray-600 mb-1">
                                    Code séance
                                </label>
                                <div className="flex items-center justify-center p-6 bg-gradient-to-r from-primary-50 to-secondary-50 rounded-xl border-2 border-primary-200">
                                    <span className="text-4xl font-bold text-primary-600 tracking-wider font-mono">
                                        {seanceCreee.code}
                                    </span>
                                </div>
                            </div>

                            {/* URL à partager */}
                            <div>
                                <label className="block text-sm font-medium text-gray-600 mb-2">
                                    Lien pour les élèves
                                </label>
                                <div className="flex gap-2">
                                    <input
                                        type="text"
                                        value={genererURLSeance(
                                            seanceCreee.code
                                        )}
                                        readOnly
                                        className="flex-1 px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg text-sm font-mono text-gray-700"
                                        onClick={(e) => e.target.select()}
                                    />
                                    <Button
                                        variant={
                                            copie ? "success" : "secondary"
                                        }
                                        onClick={handleCopierURL}
                                    >
                                        {copie ? "✓ Copié" : "📋 Copier"}
                                    </Button>
                                </div>
                            </div>

                            {/* Durée de validité */}
                            <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                                <p className="text-sm text-yellow-800">
                                    ⏰ <strong>Validité :</strong>{" "}
                                    {formatterTempsRestant(seanceCreee)}
                                </p>
                            </div>
                        </div>

                        {/* Instructions */}
                        <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                            <h4 className="font-medium text-blue-900 mb-2">
                                📝 Instructions pour vos élèves
                            </h4>
                            <ol className="text-sm text-blue-800 space-y-1 list-decimal list-inside">
                                <li>
                                    Cliquez sur le lien ou allez sur l'adresse
                                </li>
                                <li>Créez votre acrostiche</li>
                                <li>
                                    À la fin, partagez votre production avec le
                                    code séance
                                </li>
                            </ol>
                        </div>

                        {/* Actions */}
                        <div className="flex gap-3">
                            <Button
                                variant="primary"
                                size="large"
                                fullWidth
                                onClick={handleNouvelle}
                            >
                                ➕ Créer une nouvelle séance
                            </Button>
                        </div>
                    </div>
                </Card>
            )}
        </div>
    );
};

SessionCreate.propTypes = {
    onSessionCreated: PropTypes.func,
};

export default SessionCreate;
