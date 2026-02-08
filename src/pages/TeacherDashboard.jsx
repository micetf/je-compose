import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { SessionCreate, SessionView } from "@components/teacher";
import { Button, Card } from "@components/common";
import {
    recupererSeances,
    supprimerSeance,
    formatterTempsRestant,
    genererURLSeance,
} from "@utils/session";
import { recupererProductionsSeance } from "@utils/partage";

/**
 * Page principale de l'interface enseignant
 * Système d'onglets : Créer séance | Consulter productions | Mes séances
 */
const TeacherDashboard = () => {
    const navigate = useNavigate();
    const [ongletActif, setOngletActif] = useState("creer"); // creer | consulter | seances
    const [seanceSelectionnee, setSeanceSelectionnee] = useState(null);

    /**
     * Gère la création d'une nouvelle séance
     */
    const handleSeanceCreee = (seance) => {
        // Optionnel : basculer automatiquement sur l'onglet "Mes séances"
        console.log("Nouvelle séance créée :", seance);
    };

    /**
     * Consulter une séance depuis la liste
     */
    const handleConsulterSeance = (code) => {
        setSeanceSelectionnee(code);
        setOngletActif("consulter");
    };

    /**
     * Copier l'URL élève dans le presse-papier
     */
    const handleCopierURL = async (code) => {
        const url = genererURLSeance(code);
        try {
            await navigator.clipboard.writeText(url);
            alert("✓ Lien copié dans le presse-papier !");
        } catch (error) {
            console.error("Erreur copie :", error);
            alert("Impossible de copier. Utilisez Ctrl+C manuellement.");
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
            {/* Header */}
            <header className="bg-white shadow-md border-b border-gray-200">
                <div className="container-app py-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-3xl font-bold text-gray-900">
                                👨‍🏫 Interface Enseignant
                            </h1>
                            <p className="text-gray-600 mt-1">
                                Gérez vos séances et consultez les productions
                            </p>
                        </div>
                        <Button
                            variant="secondary"
                            onClick={() => navigate("/")}
                        >
                            ← Accueil
                        </Button>
                    </div>
                </div>
            </header>

            {/* Navigation par onglets */}
            <div className="bg-white border-b border-gray-200 sticky top-0 z-10 shadow-sm">
                <div className="container-app">
                    <nav className="flex gap-1 -mb-px">
                        <button
                            onClick={() => setOngletActif("creer")}
                            className={`px-6 py-4 text-sm font-medium border-b-2 transition-colors ${
                                ongletActif === "creer"
                                    ? "border-primary-500 text-primary-600 bg-primary-50"
                                    : "border-transparent text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                            }`}
                        >
                            ✨ Créer une séance
                        </button>
                        <button
                            onClick={() => {
                                setOngletActif("consulter");
                                setSeanceSelectionnee(null);
                            }}
                            className={`px-6 py-4 text-sm font-medium border-b-2 transition-colors ${
                                ongletActif === "consulter"
                                    ? "border-primary-500 text-primary-600 bg-primary-50"
                                    : "border-transparent text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                            }`}
                        >
                            📂 Consulter productions
                        </button>
                        <button
                            onClick={() => setOngletActif("seances")}
                            className={`px-6 py-4 text-sm font-medium border-b-2 transition-colors ${
                                ongletActif === "seances"
                                    ? "border-primary-500 text-primary-600 bg-primary-50"
                                    : "border-transparent text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                            }`}
                        >
                            📋 Mes séances
                        </button>
                    </nav>
                </div>
            </div>

            {/* Contenu principal */}
            <main className="container-app py-8">
                {/* Onglet : Créer une séance */}
                {ongletActif === "creer" && (
                    <div className="animate-fade-in">
                        <SessionCreate onSessionCreated={handleSeanceCreee} />
                    </div>
                )}

                {/* Onglet : Consulter productions */}
                {ongletActif === "consulter" && (
                    <div className="animate-fade-in">
                        <SessionView codeSeance={seanceSelectionnee} />
                    </div>
                )}

                {/* Onglet : Mes séances */}
                {ongletActif === "seances" && (
                    <div className="animate-fade-in">
                        <MesSeances
                            onConsulter={handleConsulterSeance}
                            onCopierURL={handleCopierURL}
                        />
                    </div>
                )}
            </main>

            {/* Footer */}
            <footer className="bg-white border-t border-gray-200 mt-12 py-6">
                <div className="container-app text-center text-sm text-gray-600">
                    <p>Je Compose - Interface Enseignant</p>
                    <p className="mt-1">
                        Pour toute question, consultez la documentation
                    </p>
                </div>
            </footer>
        </div>
    );
};

/**
 * Composant : Liste des séances actives
 */
const MesSeances = ({ onConsulter, onCopierURL }) => {
    const [seances, setSeances] = useState(recupererSeances());
    const [stats, setStats] = useState({});

    // Charger les stats au montage
    useState(() => {
        const statsTemp = {};
        seances.forEach((seance) => {
            const productions = recupererProductionsSeance(seance.code);
            statsTemp[seance.code] = productions.length;
        });
        setStats(statsTemp);
    }, [seances]);

    /**
     * Rafraîchir la liste
     */
    const handleRafraichir = () => {
        setSeances(recupererSeances());
    };

    /**
     * Supprimer une séance
     */
    const handleSupprimer = (code) => {
        if (
            !window.confirm(
                `Supprimer la séance ${code} ?\n\nAttention : Les productions seront conservées mais la séance ne sera plus listée ici.`
            )
        ) {
            return;
        }

        const success = supprimerSeance(code);
        if (success) {
            alert("✓ Séance supprimée");
            handleRafraichir();
        } else {
            alert("❌ Erreur lors de la suppression");
        }
    };

    if (seances.length === 0) {
        return (
            <Card>
                <div className="text-center py-12">
                    <p className="text-6xl mb-4">📋</p>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                        Aucune séance créée
                    </h3>
                    <p className="text-gray-600 mb-6">
                        Créez votre première séance dans l'onglet "Créer une
                        séance"
                    </p>
                </div>
            </Card>
        );
    }

    return (
        <div className="space-y-6">
            {/* En-tête */}
            <Card>
                <div className="flex items-center justify-between">
                    <div>
                        <h2 className="text-xl font-bold text-gray-900">
                            Mes séances actives
                        </h2>
                        <p className="text-gray-600 mt-1">
                            {seances.length} séance
                            {seances.length > 1 ? "s" : ""} en cours
                        </p>
                    </div>
                    <Button variant="secondary" onClick={handleRafraichir}>
                        🔄 Rafraîchir
                    </Button>
                </div>
            </Card>

            {/* Liste des séances */}
            <div className="grid gap-4 md:grid-cols-2">
                {seances.map((seance) => (
                    <Card key={seance.code} hover>
                        <div className="space-y-4">
                            {/* En-tête */}
                            <div className="flex items-start justify-between">
                                <div>
                                    <h3 className="text-xl font-bold text-gray-900">
                                        📋 {seance.code}
                                    </h3>
                                    {seance.nom && (
                                        <p className="text-gray-600 mt-1">
                                            {seance.nom}
                                        </p>
                                    )}
                                </div>
                                <span className="px-3 py-1 bg-green-100 text-green-700 text-sm font-medium rounded-full">
                                    Active
                                </span>
                            </div>

                            {/* Informations */}
                            <div className="grid grid-cols-2 gap-4 py-3 border-t border-b">
                                <div>
                                    <p className="text-sm text-gray-600">
                                        Productions
                                    </p>
                                    <p className="text-2xl font-bold text-primary-600">
                                        {stats[seance.code] || 0}
                                    </p>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-600">
                                        Expire dans
                                    </p>
                                    <p className="text-lg font-semibold text-gray-900">
                                        {formatterTempsRestant(seance)}
                                    </p>
                                </div>
                            </div>

                            {/* URL élève */}
                            <div>
                                <p className="text-xs font-medium text-gray-600 mb-1">
                                    Lien pour les élèves :
                                </p>
                                <div className="flex gap-2">
                                    <input
                                        type="text"
                                        value={genererURLSeance(seance.code)}
                                        readOnly
                                        className="flex-1 px-3 py-2 bg-gray-50 border border-gray-300 rounded-lg text-xs font-mono text-gray-700"
                                        onClick={(e) => e.target.select()}
                                    />
                                    <Button
                                        variant="secondary"
                                        size="small"
                                        onClick={() => onCopierURL(seance.code)}
                                    >
                                        📋
                                    </Button>
                                </div>
                            </div>

                            {/* Actions */}
                            <div className="flex gap-2">
                                <Button
                                    variant="primary"
                                    size="small"
                                    fullWidth
                                    onClick={() => onConsulter(seance.code)}
                                >
                                    👁️ Consulter productions
                                </Button>
                                <Button
                                    variant="danger"
                                    size="small"
                                    onClick={() => handleSupprimer(seance.code)}
                                >
                                    🗑️
                                </Button>
                            </div>
                        </div>
                    </Card>
                ))}
            </div>
        </div>
    );
};

export default TeacherDashboard;
