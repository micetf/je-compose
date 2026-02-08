import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
    MotInput,
    NiveauSelector,
    AcrosticheEditor,
    PreviewPanel,
} from "@components/student";
import { Button, Card, Loading } from "@components/common";
import useAcrosticheContext from "@hooks/useAcrosticheContext";
import { estAcrosticheComplet } from "@utils/acrostiche";
import {
    extraireParametresURL,
    genererURLPartage,
    copierURLPartage,
} from "@utils/partage";
/**
 * Page principale de l'espace élève
 * Gère le workflow complet de création d'un acrostiche en 4 étapes
 */
const StudentWorkspace = () => {
    const navigate = useNavigate();
    const { state, actions } = useAcrosticheContext();

    // État des étapes du workflow
    const [etapeActuelle, setEtapeActuelle] = useState(1);
    const [motChoisi, setMotChoisi] = useState("");
    const [niveauChoisi, setNiveauChoisi] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    // États pour le système de séance
    const [codeSeance, setCodeSeance] = useState(null);
    const [modeSeance, setModeSeance] = useState(false);
    const [urlPartage, setURLPartage] = useState(null);
    const [urlCopiee, setURLCopiee] = useState(false);
    const [nomEleve, setNomEleve] = useState("");

    // Charger un brouillon existant si disponible
    useEffect(() => {
        if (
            state.acrosticheActuel &&
            state.acrosticheActuel.statut === "brouillon"
        ) {
            // Reprendre depuis un brouillon
            setMotChoisi(state.acrosticheActuel.motInitial);
            setNiveauChoisi(state.acrosticheActuel.niveau);
            setEtapeActuelle(3); // Aller directement à l'édition
        }
    }, [state.acrosticheActuel]);

    // Détecter si l'élève arrive via un lien de séance
    useEffect(() => {
        const params = extraireParametresURL();
        if (params && params.codeSeance) {
            setCodeSeance(params.codeSeance);
            setModeSeance(true);
        }
    }, []);

    // Génération de l'URL de partage après finalisation
    useEffect(() => {
        if (
            modeSeance &&
            codeSeance &&
            state.acrosticheActuel?.statut === "termine"
        ) {
            const url = genererURLPartage(
                state.acrosticheActuel,
                codeSeance,
                nomEleve
            );
            setURLPartage(url);
        }
    }, [state.acrosticheActuel, modeSeance, codeSeance, nomEleve]);

    // Étape 1 : Validation du mot
    const handleMotValide = (mot) => {
        setMotChoisi(mot);
        setEtapeActuelle(2);
    };

    // Étape 2 : Validation du niveau
    const handleNiveauValide = (niveau) => {
        setNiveauChoisi(niveau);
        setIsLoading(true);

        // Créer l'acrostiche
        setTimeout(() => {
            actions.creerAcrostiche(motChoisi, niveau);
            setIsLoading(false);
            setEtapeActuelle(3);
        }, 300);
    };

    // Étape 3 : Acrostiche terminé
    const handleAcrosticheComplete = () => {
        actions.finaliserAcrostiche();
        setEtapeActuelle(4);
    };

    // Retour en arrière
    const handleRetourEtape = () => {
        if (etapeActuelle === 2) {
            setEtapeActuelle(1);
            setNiveauChoisi(null);
        } else if (etapeActuelle === 3) {
            setEtapeActuelle(2);
            actions.reinitialiser();
        } else if (etapeActuelle === 4) {
            setEtapeActuelle(3);
        }
    };

    // Recommencer depuis le début
    const handleRecommencer = () => {
        actions.reinitialiser();
        setMotChoisi("");
        setNiveauChoisi(null);
        setEtapeActuelle(1);
    };

    // Copier l'URL de partage dans le presse-papier
    const handleCopierURLPartage = async () => {
        if (!urlPartage) return;

        const success = await copierURLPartage(urlPartage);
        if (success) {
            setURLCopiee(true);
            setTimeout(() => setURLCopiee(false), 2000);
        }
    };

    // Vérifier si l'acrostiche est complet (pour navigation étape 3 → 4)
    const acrosticheEstComplet =
        state.acrosticheActuel && estAcrosticheComplet(state.acrosticheActuel);

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
            {/* Header */}
            <header className="bg-white shadow-md sticky top-0 z-10">
                <div className="container-app py-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <button
                                onClick={() => navigate("/")}
                                className="text-primary-600 hover:text-primary-700 transition-colors"
                                aria-label="Retour à l'accueil"
                            >
                                <svg
                                    className="w-6 h-6"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M10 19l-7-7m0 0l7-7m-7 7h18"
                                    />
                                </svg>
                            </button>
                            <h1 className="text-2xl font-bold text-gray-900">
                                ✍️ Je compose mon acrostiche
                            </h1>
                        </div>

                        {/* Indicateur de séance */}
                        {modeSeance && codeSeance && (
                            <div className="mt-2 flex items-center justify-center gap-2">
                                <span className="px-3 py-1 bg-green-100 text-green-800 text-sm font-medium rounded-full">
                                    📋 Séance : {codeSeance}
                                </span>
                            </div>
                        )}

                        {/* Indicateur d'étapes */}
                        <div className="hidden md:flex items-center gap-2">
                            {[1, 2, 3, 4].map((etape) => (
                                <div
                                    key={etape}
                                    className={`
                    flex items-center justify-center
                    w-10 h-10 rounded-full font-semibold text-sm
                    transition-all duration-300
                    ${
                        etape === etapeActuelle
                            ? "bg-primary-500 text-white scale-110"
                            : etape < etapeActuelle
                              ? "bg-success text-white"
                              : "bg-gray-200 text-gray-500"
                    }
                  `}
                                >
                                    {etape < etapeActuelle ? "✓" : etape}
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Barre de progression mobile */}
                    <div className="md:hidden mt-4">
                        <div className="flex items-center justify-between text-sm text-gray-600 mb-2">
                            <span>Étape {etapeActuelle} / 4</span>
                            <span>
                                {Math.round((etapeActuelle / 4) * 100)}%
                            </span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                            <div
                                className="bg-primary-500 h-2 rounded-full transition-all duration-300"
                                style={{
                                    width: `${(etapeActuelle / 4) * 100}%`,
                                }}
                            />
                        </div>
                    </div>
                </div>
            </header>

            {/* Contenu principal */}
            <main className="container-app py-8">
                {isLoading ? (
                    <Loading
                        size="large"
                        message="Préparation de ton acrostiche..."
                    />
                ) : (
                    <div className="max-w-4xl mx-auto">
                        {/* ÉTAPE 1 : Choix du mot */}
                        {etapeActuelle === 1 && (
                            <div className="animate-fade-in">
                                <Card>
                                    <div className="mb-6">
                                        <div className="flex items-center gap-3 mb-2">
                                            <span className="flex items-center justify-center w-10 h-10 bg-primary-500 text-white rounded-full font-bold">
                                                1
                                            </span>
                                            <h2 className="text-2xl font-bold text-gray-900">
                                                Première étape
                                            </h2>
                                        </div>
                                        <p className="text-gray-600 ml-13">
                                            Choisis le mot qui sera la base de
                                            ton acrostiche
                                        </p>
                                    </div>

                                    <MotInput
                                        onMotValide={handleMotValide}
                                        motInitial={motChoisi}
                                    />
                                </Card>

                                {/* Lien vers exemples */}
                                <div className="mt-6 text-center">
                                    <Button
                                        variant="secondary"
                                        onClick={() => navigate("/exemples")}
                                    >
                                        📚 Voir des exemples pour m'inspirer
                                    </Button>
                                </div>
                            </div>
                        )}

                        {/* ÉTAPE 2 : Choix du niveau */}
                        {etapeActuelle === 2 && (
                            <div className="animate-fade-in">
                                <Card>
                                    <div className="mb-6">
                                        <div className="flex items-center gap-3 mb-2">
                                            <span className="flex items-center justify-center w-10 h-10 bg-primary-500 text-white rounded-full font-bold">
                                                2
                                            </span>
                                            <h2 className="text-2xl font-bold text-gray-900">
                                                Deuxième étape
                                            </h2>
                                        </div>
                                        <p className="text-gray-600 ml-13">
                                            Choisis la difficulté pour ton
                                            acrostiche avec le mot{" "}
                                            <span className="font-bold text-primary-600">
                                                {motChoisi}
                                            </span>
                                        </p>
                                    </div>

                                    <NiveauSelector
                                        niveauSelectionne={niveauChoisi}
                                        onNiveauChange={setNiveauChoisi}
                                    />

                                    <div className="mt-6 flex gap-3">
                                        <Button
                                            variant="secondary"
                                            onClick={handleRetourEtape}
                                        >
                                            ← Changer de mot
                                        </Button>
                                        <Button
                                            variant="primary"
                                            onClick={() =>
                                                handleNiveauValide(niveauChoisi)
                                            }
                                            disabled={!niveauChoisi}
                                            fullWidth
                                        >
                                            {niveauChoisi
                                                ? "C'est parti ! →"
                                                : "Choisis un niveau"}
                                        </Button>
                                    </div>
                                </Card>
                            </div>
                        )}

                        {/* ÉTAPE 3 : Création ligne par ligne */}
                        {etapeActuelle === 3 && state.acrosticheActuel && (
                            <div className="animate-fade-in">
                                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                                    {/* Zone d'édition (2/3) */}
                                    <div className="lg:col-span-2">
                                        <Card>
                                            <div className="mb-6">
                                                <div className="flex items-center gap-3 mb-2">
                                                    <span className="flex items-center justify-center w-10 h-10 bg-primary-500 text-white rounded-full font-bold">
                                                        3
                                                    </span>
                                                    <h2 className="text-2xl font-bold text-gray-900">
                                                        À toi de jouer !
                                                    </h2>
                                                </div>
                                                <p className="text-gray-600 ml-13">
                                                    Écris ton acrostiche ligne
                                                    par ligne
                                                </p>
                                            </div>

                                            <AcrosticheEditor
                                                acrostiche={
                                                    state.acrosticheActuel
                                                }
                                                onComplete={
                                                    handleAcrosticheComplete
                                                }
                                            />

                                            <div className="mt-6 flex gap-3">
                                                <Button
                                                    variant="secondary"
                                                    onClick={handleRetourEtape}
                                                >
                                                    ← Changer de niveau
                                                </Button>
                                                {acrosticheEstComplet && (
                                                    <Button
                                                        variant="success"
                                                        onClick={
                                                            handleAcrosticheComplete
                                                        }
                                                        fullWidth
                                                    >
                                                        ✅ Mon acrostiche est
                                                        terminé !
                                                    </Button>
                                                )}
                                            </div>
                                        </Card>
                                    </div>

                                    {/* Aperçu (1/3) */}
                                    <div className="lg:col-span-1">
                                        <PreviewPanel
                                            acrostiche={state.acrosticheActuel}
                                            showStats={true}
                                            showExport={false}
                                        />
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* ÉTAPE 4 : Finalisation et export */}
                        {etapeActuelle === 4 && state.acrosticheActuel && (
                            <div className="animate-fade-in">
                                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                                    {/* Aperçu avec export */}
                                    <div>
                                        <PreviewPanel
                                            acrostiche={state.acrosticheActuel}
                                            showStats={true}
                                            showExport={true}
                                        />
                                    </div>

                                    {/* Actions finales */}
                                    <div className="space-y-4">
                                        <Card>
                                            <h2 className="text-2xl font-bold text-gray-900 mb-4">
                                                🎉 Bravo !
                                            </h2>
                                            <p className="text-gray-700 mb-6 leading-relaxed">
                                                Ton acrostiche est terminé ! Tu
                                                peux maintenant :
                                            </p>

                                            <div className="space-y-3">
                                                <div className="p-4 bg-green-50 rounded-lg border-l-4 border-green-400">
                                                    <p className="text-green-800 font-medium mb-2">
                                                        📥 Télécharger ton
                                                        travail
                                                    </p>
                                                    <p className="text-green-700 text-sm">
                                                        Clique sur "Télécharger
                                                        en image" dans l'aperçu
                                                        pour sauvegarder ton
                                                        acrostiche.
                                                    </p>
                                                </div>

                                                <div className="p-4 bg-blue-50 rounded-lg border-l-4 border-blue-400">
                                                    <p className="text-blue-800 font-medium mb-2">
                                                        ✏️ Modifier quelque
                                                        chose
                                                    </p>
                                                    <Button
                                                        variant="secondary"
                                                        size="small"
                                                        onClick={
                                                            handleRetourEtape
                                                        }
                                                        fullWidth
                                                    >
                                                        Retour à l'édition
                                                    </Button>
                                                </div>

                                                {/* Section partage enseignant - VERSION SÉCURISÉE */}
                                                {modeSeance &&
                                                    codeSeance &&
                                                    etapeActuelle === 4 && (
                                                        <div className="p-4 bg-indigo-50 rounded-lg border-l-4 border-indigo-400 space-y-3">
                                                            <p className="text-indigo-800 font-medium">
                                                                📤 Partager avec
                                                                l'enseignant
                                                            </p>

                                                            {/* Input nom élève */}
                                                            <div>
                                                                <label
                                                                    htmlFor="nom-eleve"
                                                                    className="block text-sm font-medium text-gray-700 mb-2"
                                                                >
                                                                    Ton prénom
                                                                    (optionnel)
                                                                </label>
                                                                <input
                                                                    id="nom-eleve"
                                                                    type="text"
                                                                    value={
                                                                        nomEleve
                                                                    }
                                                                    onChange={(
                                                                        e
                                                                    ) =>
                                                                        setNomEleve(
                                                                            e
                                                                                .target
                                                                                .value
                                                                        )
                                                                    }
                                                                    placeholder="Ex: Marie"
                                                                    maxLength={
                                                                        30
                                                                    }
                                                                    className="w-full px-4 py-3 text-lg border-2 rounded-xl border-gray-300 focus:border-primary-500 focus:outline-none transition-colors duration-200"
                                                                />
                                                            </div>

                                                            {/* URL de partage */}
                                                            <div className="space-y-2">
                                                                <p className="text-indigo-700 text-sm">
                                                                    Copie ce
                                                                    lien et
                                                                    envoie-le à
                                                                    ton
                                                                    enseignant(e)
                                                                    :
                                                                </p>
                                                                {urlPartage ? (
                                                                    <div className="flex gap-2">
                                                                        <input
                                                                            type="text"
                                                                            value={
                                                                                urlPartage
                                                                            }
                                                                            readOnly
                                                                            className="flex-1 px-3 py-2 bg-white border border-indigo-300 rounded-lg text-xs font-mono text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                                                            onClick={(
                                                                                e
                                                                            ) =>
                                                                                e.target.select()
                                                                            }
                                                                        />
                                                                        <Button
                                                                            variant={
                                                                                urlCopiee
                                                                                    ? "success"
                                                                                    : "secondary"
                                                                            }
                                                                            size="small"
                                                                            onClick={
                                                                                handleCopierURLPartage
                                                                            }
                                                                        >
                                                                            {urlCopiee
                                                                                ? "✓ Copié"
                                                                                : "📋"}
                                                                        </Button>
                                                                    </div>
                                                                ) : (
                                                                    <div className="px-4 py-3 bg-white border border-indigo-200 rounded-lg">
                                                                        <p className="text-sm text-gray-600">
                                                                            ⏳
                                                                            Génération
                                                                            du
                                                                            lien
                                                                            en
                                                                            cours...
                                                                        </p>
                                                                    </div>
                                                                )}
                                                            </div>
                                                        </div>
                                                    )}

                                                <div className="p-4 bg-purple-50 rounded-lg border-l-4 border-purple-400">
                                                    <p className="text-purple-800 font-medium mb-2">
                                                        🔄 En créer un nouveau
                                                    </p>
                                                    <Button
                                                        variant="primary"
                                                        size="small"
                                                        onClick={
                                                            handleRecommencer
                                                        }
                                                        fullWidth
                                                    >
                                                        Recommencer
                                                    </Button>
                                                </div>

                                                <div className="p-4 bg-yellow-50 rounded-lg border-l-4 border-yellow-400">
                                                    <p className="text-yellow-800 font-medium mb-2">
                                                        📚 Voir d'autres
                                                        exemples
                                                    </p>
                                                    <Button
                                                        variant="secondary"
                                                        size="small"
                                                        onClick={() =>
                                                            navigate(
                                                                "/exemples"
                                                            )
                                                        }
                                                        fullWidth
                                                    >
                                                        Galerie d'exemples
                                                    </Button>
                                                </div>
                                            </div>
                                        </Card>

                                        {/* Message d'encouragement personnalisé */}
                                        <Card>
                                            <div className="text-center">
                                                <div className="text-6xl mb-4">
                                                    {state.acrosticheActuel
                                                        .niveau === 1
                                                        ? "🌟"
                                                        : state.acrosticheActuel
                                                                .niveau === 2
                                                          ? "⭐"
                                                          : "🏆"}
                                                </div>
                                                <h3 className="text-xl font-bold text-gray-900 mb-2">
                                                    {state.acrosticheActuel
                                                        .niveau === 1 &&
                                                        "Super travail !"}
                                                    {state.acrosticheActuel
                                                        .niveau === 2 &&
                                                        "Excellent acrostiche !"}
                                                    {state.acrosticheActuel
                                                        .niveau === 3 &&
                                                        "Magnifique création poétique !"}
                                                </h3>
                                                <p className="text-gray-600 text-sm">
                                                    {state.acrosticheActuel
                                                        .niveau === 1 &&
                                                        "Tu as créé un bel acrostiche niveau 1. La prochaine fois, essaie le niveau 2 !"}
                                                    {state.acrosticheActuel
                                                        .niveau === 2 &&
                                                        "Tes phrases sont bien construites. Tu es prêt(e) pour le niveau 3 !"}
                                                    {state.acrosticheActuel
                                                        .niveau === 3 &&
                                                        "Tes vers poétiques sont vraiment réussis. Continue comme ça !"}
                                                </p>
                                            </div>
                                        </Card>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                )}
            </main>

            {/* Footer avec sauvegarde automatique */}
            <footer className="bg-white border-t border-gray-200 py-4 mt-12">
                <div className="container-app">
                    <div className="flex items-center justify-between text-sm text-gray-600">
                        <div className="flex items-center gap-2">
                            {state.acrosticheActuel?.statut === "brouillon" && (
                                <>
                                    <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                                    <span>
                                        Brouillon sauvegardé automatiquement
                                    </span>
                                </>
                            )}
                        </div>
                        <button
                            onClick={() => navigate("/")}
                            className="text-primary-600 hover:text-primary-700 transition-colors"
                        >
                            Retour à l'accueil
                        </button>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default StudentWorkspace;
