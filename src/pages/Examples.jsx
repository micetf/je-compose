import { useNavigate } from "react-router-dom";
import { ExampleGallery } from "@components/student";
import { Button, Card } from "@components/common";

/**
 * Page de galerie d'exemples d'acrostiches
 * Permet aux élèves de découvrir des modèles avant de créer le leur
 */
const Examples = () => {
    const navigate = useNavigate();

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
                                📚 Exemples d'acrostiches
                            </h1>
                        </div>

                        {/* CTA Header (desktop) */}
                        <div className="hidden md:block">
                            <Button
                                variant="primary"
                                onClick={() => navigate("/eleve")}
                            >
                                ✍️ Créer mon acrostiche
                            </Button>
                        </div>
                    </div>
                </div>
            </header>

            {/* Contenu principal */}
            <main className="container-app py-8">
                {/* Section d'introduction */}
                <div className="max-w-4xl mx-auto mb-12">
                    <Card className="text-center">
                        <div className="space-y-4">
                            <div className="text-6xl mb-4">💡</div>
                            <h2 className="text-3xl font-bold text-gray-900">
                                Inspire-toi de ces exemples !
                            </h2>
                            <p className="text-lg text-gray-600 leading-relaxed">
                                Découvre 10 acrostiches créés par d'autres
                                élèves. Regarde comment ils ont utilisé les
                                lettres, les mots et les phrases. Cela t'aidera
                                à créer le tien !
                            </p>

                            {/* Info niveaux */}
                            <div className="flex items-center justify-center gap-4 flex-wrap">
                                <div className="flex items-center gap-2">
                                    <span className="badge-niveau-1">
                                        🟢 Niveau 1
                                    </span>
                                    <span className="text-sm text-gray-600">
                                        4 exemples
                                    </span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <span className="badge-niveau-2">
                                        🟠 Niveau 2
                                    </span>
                                    <span className="text-sm text-gray-600">
                                        4 exemples
                                    </span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <span className="badge-niveau-3">
                                        🔴 Niveau 3
                                    </span>
                                    <span className="text-sm text-gray-600">
                                        2 exemples
                                    </span>
                                </div>
                            </div>

                            {/* CTA Mobile */}
                            <div className="md:hidden pt-4">
                                <Button
                                    variant="primary"
                                    fullWidth
                                    onClick={() => navigate("/eleve")}
                                >
                                    ✍️ Créer mon acrostiche
                                </Button>
                            </div>
                        </div>
                    </Card>
                </div>

                {/* Galerie d'exemples */}
                <div className="max-w-7xl mx-auto">
                    <ExampleGallery />
                </div>

                {/* Section CTA finale */}
                <div className="max-w-4xl mx-auto mt-12">
                    <Card className="bg-gradient-to-r from-primary-50 to-secondary-50 border-2 border-primary-200">
                        <div className="text-center space-y-6">
                            <div className="text-5xl">🚀</div>
                            <h3 className="text-2xl font-bold text-gray-900">
                                À ton tour maintenant !
                            </h3>
                            <p className="text-lg text-gray-700 leading-relaxed max-w-2xl mx-auto">
                                Tu as vu comment faire ? Maintenant, crée ton
                                propre acrostiche ! Choisis un mot qui te plaît,
                                sélectionne ton niveau, et lance-toi.
                            </p>

                            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                                <Button
                                    variant="primary"
                                    size="large"
                                    onClick={() => navigate("/eleve")}
                                    className="min-w-[250px]"
                                >
                                    ✍️ Créer mon acrostiche
                                </Button>
                                <Button
                                    variant="secondary"
                                    size="large"
                                    onClick={() => navigate("/")}
                                    className="min-w-[250px]"
                                >
                                    🏠 Retour à l'accueil
                                </Button>
                            </div>

                            {/* Conseil */}
                            <div className="mt-6 p-4 bg-yellow-50 border-l-4 border-yellow-400 rounded text-left">
                                <p className="text-yellow-800 text-sm">
                                    <strong>💡 Astuce :</strong> Si c'est ta
                                    première fois, commence par le niveau 1 (un
                                    mot par ligne). C'est le plus facile !
                                </p>
                            </div>
                        </div>
                    </Card>
                </div>

                {/* Message pédagogique */}
                <div className="max-w-4xl mx-auto mt-8">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <Card className="text-center">
                            <div className="text-4xl mb-3">👀</div>
                            <h4 className="font-semibold text-gray-900 mb-2">
                                Observe
                            </h4>
                            <p className="text-sm text-gray-600">
                                Regarde comment chaque ligne commence par une
                                lettre du mot
                            </p>
                        </Card>

                        <Card className="text-center">
                            <div className="text-4xl mb-3">💭</div>
                            <h4 className="font-semibold text-gray-900 mb-2">
                                Réfléchis
                            </h4>
                            <p className="text-sm text-gray-600">
                                Pense à ce que tu veux dire sur ton mot choisi
                            </p>
                        </Card>

                        <Card className="text-center">
                            <div className="text-4xl mb-3">✏️</div>
                            <h4 className="font-semibold text-gray-900 mb-2">
                                Crée
                            </h4>
                            <p className="text-sm text-gray-600">
                                Lance-toi et écris ton propre acrostiche !
                            </p>
                        </Card>
                    </div>
                </div>
            </main>

            {/* Footer */}
            <footer className="bg-white border-t border-gray-200 py-6 mt-12">
                <div className="container-app">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-gray-600">
                        <div className="flex items-center gap-2">
                            <span>✍️ Je Compose</span>
                            <span className="text-gray-400">|</span>
                            <span>Acrostiches à l'école primaire</span>
                        </div>
                        <div className="flex items-center gap-4">
                            <button
                                onClick={() => navigate("/")}
                                className="text-primary-600 hover:text-primary-700 transition-colors"
                            >
                                Accueil
                            </button>
                            <span className="text-gray-400">•</span>
                            <button
                                onClick={() => navigate("/eleve")}
                                className="text-primary-600 hover:text-primary-700 transition-colors"
                            >
                                Créer
                            </button>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default Examples;
