import { useNavigate } from "react-router-dom";
import { Button, Card } from "@components/common";

/**
 * Page d'accueil de l'application "Je Compose"
 * Point d'entrée principal pour les élèves et enseignants
 */
const Home = () => {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
            {/* Hero Section */}
            <section className="relative overflow-hidden">
                {/* Décoration de fond */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary-100/50 via-secondary-100/50 to-accent-100/50" />

                <div className="container-app relative py-20 md:py-32">
                    <div className="text-center max-w-4xl mx-auto">
                        {/* Logo / Titre principal */}
                        <div className="mb-8 animate-fade-in">
                            <div className="text-8xl mb-6">✍️</div>
                            <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-4">
                                Je Compose
                            </h1>
                            <p className="text-2xl md:text-3xl text-gray-700 font-medium">
                                Crée tes acrostiches en quelques clics !
                            </p>
                        </div>

                        {/* Description */}
                        <p className="text-lg md:text-xl text-gray-600 mb-12 max-w-2xl mx-auto">
                            Transforme des mots en poésie. Choisis ton niveau,
                            laisse-toi guider et partage tes créations avec ta
                            classe ! 🎨
                        </p>

                        {/* CTA principaux */}
                        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
                            <Button
                                variant="primary"
                                size="large"
                                onClick={() => navigate("/eleve")}
                                className="w-full sm:w-auto text-lg px-8 py-4"
                            >
                                🚀 Créer mon acrostiche
                            </Button>

                            <Button
                                variant="secondary"
                                size="large"
                                onClick={() => navigate("/exemples")}
                                className="w-full sm:w-auto text-lg px-8 py-4"
                            >
                                📚 Voir des exemples
                            </Button>
                        </div>

                        {/* CTA enseignant (Phase 3) */}
                        <div className="mt-8">
                            <button
                                onClick={() => {
                                    // Phase 3 : navigate('/enseignant')
                                    alert(
                                        "Interface enseignant disponible en Phase 3 ! 🚀"
                                    );
                                }}
                                className="text-primary-600 hover:text-primary-700 font-medium underline transition-colors"
                            >
                                👨‍🏫 Accès enseignant
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            {/* Section : C'est quoi un acrostiche ? */}
            <section className="py-16 bg-white">
                <div className="container-app">
                    <div className="max-w-3xl mx-auto">
                        <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-8">
                            🤔 C'est quoi un acrostiche ?
                        </h2>

                        <Card className="mb-8">
                            <div className="space-y-4">
                                <p className="text-lg text-gray-700">
                                    Un{" "}
                                    <strong className="text-primary-600">
                                        acrostiche
                                    </strong>
                                    , c'est un poème où la première lettre de
                                    chaque ligne forme un mot quand on les lit
                                    de haut en bas !
                                </p>

                                <div className="bg-gradient-to-r from-primary-50 to-secondary-50 p-6 rounded-xl">
                                    <p className="font-mono text-lg leading-relaxed text-gray-800">
                                        <span className="text-primary-600 font-bold">
                                            C
                                        </span>
                                        hat doux qui ronronne
                                        <br />
                                        <span className="text-primary-600 font-bold">
                                            H
                                        </span>
                                        eureux sur le canapé
                                        <br />
                                        <span className="text-primary-600 font-bold">
                                            A
                                        </span>
                                        ttend les câlins
                                        <br />
                                        <span className="text-primary-600 font-bold">
                                            T
                                        </span>
                                        out content de jouer
                                    </p>
                                    <p className="text-sm text-gray-600 mt-4 text-center">
                                        Les premières lettres forment le mot{" "}
                                        <strong className="text-primary-600">
                                            CHAT
                                        </strong>{" "}
                                        ! 🐱
                                    </p>
                                </div>

                                <p className="text-gray-700">
                                    Avec <strong>Je Compose</strong>, tu choisis
                                    ton mot, ton niveau de difficulté, et nous
                                    t'aidons à créer ton acrostiche facilement !
                                </p>
                            </div>
                        </Card>
                    </div>
                </div>
            </section>

            {/* Section : 3 niveaux de difficulté */}
            <section className="py-16 bg-gradient-to-br from-gray-50 to-gray-100">
                <div className="container-app">
                    <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-12">
                        🎯 Choisis ton niveau
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                        {/* Niveau 1 */}
                        <Card hover className="text-center">
                            <div className="space-y-4">
                                <div className="text-5xl mb-2">🟢</div>
                                <h3 className="text-2xl font-bold text-success">
                                    Niveau 1
                                </h3>
                                <p className="text-gray-600 font-medium">
                                    Débutant
                                </p>
                                <p className="text-sm text-gray-600">
                                    Un mot par ligne. Parfait pour découvrir les
                                    acrostiches !
                                </p>
                                <div className="pt-4 border-t border-gray-200">
                                    <p className="text-xs text-gray-500 italic">
                                        Exemple : "Chat doux"
                                    </p>
                                </div>
                            </div>
                        </Card>

                        {/* Niveau 2 */}
                        <Card hover className="text-center">
                            <div className="space-y-4">
                                <div className="text-5xl mb-2">🟠</div>
                                <h3 className="text-2xl font-bold text-warning">
                                    Niveau 2
                                </h3>
                                <p className="text-gray-600 font-medium">
                                    Intermédiaire
                                </p>
                                <p className="text-sm text-gray-600">
                                    Une phrase courte par ligne. Plus créatif !
                                </p>
                                <div className="pt-4 border-t border-gray-200">
                                    <p className="text-xs text-gray-500 italic">
                                        Exemple : "Lumière qui brille dans la
                                        nuit"
                                    </p>
                                </div>
                            </div>
                        </Card>

                        {/* Niveau 3 */}
                        <Card hover className="text-center">
                            <div className="space-y-4">
                                <div className="text-5xl mb-2">🔴</div>
                                <h3 className="text-2xl font-bold text-danger">
                                    Niveau 3
                                </h3>
                                <p className="text-gray-600 font-medium">
                                    Avancé
                                </p>
                                <p className="text-sm text-gray-600">
                                    Vers poétiques. Pour les artistes en herbe !
                                </p>
                                <div className="pt-4 border-t border-gray-200">
                                    <p className="text-xs text-gray-500 italic">
                                        Exemple : "Liberté s'envole, douce
                                        colombe"
                                    </p>
                                </div>
                            </div>
                        </Card>
                    </div>

                    <div className="text-center mt-12">
                        <Button
                            variant="primary"
                            size="large"
                            onClick={() => navigate("/eleve")}
                        >
                            Commencer maintenant ! 🚀
                        </Button>
                    </div>
                </div>
            </section>

            {/* Section : Comment ça marche ? */}
            <section className="py-16 bg-white">
                <div className="container-app">
                    <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-12">
                        ⚙️ Comment ça marche ?
                    </h2>

                    <div className="max-w-4xl mx-auto space-y-6">
                        {/* Étape 1 */}
                        <Card className="flex items-start gap-6">
                            <div className="flex-shrink-0 w-12 h-12 bg-primary-500 text-white rounded-full flex items-center justify-center text-2xl font-bold">
                                1
                            </div>
                            <div>
                                <h3 className="text-xl font-bold text-gray-900 mb-2">
                                    Choisis ton mot et ton niveau
                                </h3>
                                <p className="text-gray-600">
                                    Tape un mot (ton prénom, un animal, une
                                    émotion...) et sélectionne le niveau qui te
                                    correspond.
                                </p>
                            </div>
                        </Card>

                        {/* Étape 2 */}
                        <Card className="flex items-start gap-6">
                            <div className="flex-shrink-0 w-12 h-12 bg-secondary-500 text-white rounded-full flex items-center justify-center text-2xl font-bold">
                                2
                            </div>
                            <div>
                                <h3 className="text-xl font-bold text-gray-900 mb-2">
                                    Compose ligne par ligne
                                </h3>
                                <p className="text-gray-600">
                                    Utilise la banque de mots ou écris toi-même.
                                    Nous te guiderons pour respecter le format !
                                </p>
                            </div>
                        </Card>

                        {/* Étape 3 */}
                        <Card className="flex items-start gap-6">
                            <div className="flex-shrink-0 w-12 h-12 bg-accent-500 text-white rounded-full flex items-center justify-center text-2xl font-bold">
                                3
                            </div>
                            <div>
                                <h3 className="text-xl font-bold text-gray-900 mb-2">
                                    Prévisualise et exporte
                                </h3>
                                <p className="text-gray-600">
                                    Regarde le résultat final et télécharge ton
                                    acrostiche en image pour le partager ! 📸
                                </p>
                            </div>
                        </Card>
                    </div>

                    <div className="text-center mt-12">
                        <Button
                            variant="secondary"
                            size="large"
                            onClick={() => navigate("/exemples")}
                        >
                            📚 Voir des exemples pour s'inspirer
                        </Button>
                    </div>
                </div>
            </section>

            {/* Section CTA finale */}
            <section className="py-20 bg-gradient-to-br from-primary-500 via-secondary-500 to-accent-500">
                <div className="container-app text-center">
                    <div className="max-w-3xl mx-auto">
                        <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                            Prêt à devenir un poète ? ✨
                        </h2>
                        <p className="text-xl text-white/90 mb-10">
                            Lance-toi maintenant et crée ton premier acrostiche
                            en quelques minutes !
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <button
                                onClick={() => navigate("/eleve")}
                                className="px-10 py-5 bg-white text-primary-600 text-lg font-bold rounded-xl hover:bg-gray-50 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                            >
                                🚀 C'est parti !
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            {/* Footer simple */}
            <footer className="bg-gray-900 text-white py-8">
                <div className="container-app">
                    <div className="text-center space-y-4">
                        <p className="text-lg font-semibold">✍️ Je Compose</p>
                        <p className="text-sm text-gray-400">
                            Application d'acrostiches pour l'école primaire
                        </p>
                        <div className="flex justify-center gap-6 text-sm">
                            <button
                                onClick={() => navigate("/")}
                                className="text-gray-400 hover:text-white transition-colors"
                            >
                                Accueil
                            </button>
                            <button
                                onClick={() => navigate("/eleve")}
                                className="text-gray-400 hover:text-white transition-colors"
                            >
                                Créer
                            </button>
                            <button
                                onClick={() => navigate("/exemples")}
                                className="text-gray-400 hover:text-white transition-colors"
                            >
                                Exemples
                            </button>
                        </div>
                        <p className="text-xs text-gray-500 mt-6">
                            v0.3.0 - Phase 2 en cours - Février 2026
                        </p>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default Home;
