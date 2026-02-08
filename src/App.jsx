import { Routes, Route } from "react-router-dom";
import { AcrosticheProvider } from "@contexts";

// Import des pages
import StudentWorkspace from "./pages/StudentWorkspace";
// import Examples from './pages/Examples';
// import Home from './pages/Home';
// import TeacherDashboard from './pages/TeacherDashboard';

// Composant temporaire pour la page d'accueil (à remplacer en P1.3)
const Home = () => (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary-50 to-secondary-50">
        <div className="text-center max-w-2xl px-6">
            <h1 className="text-6xl font-bold text-primary-700 mb-4">
                ✍️ Je Compose
            </h1>
            <p className="text-2xl text-gray-600 mb-8">
                Acrostiches et poésie à l'école primaire
            </p>

            {/* CTA temporaire */}
            <div className="space-y-4">
                <a
                    href="/eleve"
                    className="inline-block px-8 py-4 bg-primary-500 text-white text-lg font-semibold rounded-xl hover:bg-primary-600 transition-colors duration-200"
                >
                    🚀 Créer mon acrostiche
                </a>

                <p className="text-gray-500 text-sm">
                    🚧 Application en cours de développement - Phase 2
                </p>
            </div>
        </div>
    </div>
);

const NotFound = () => (
    <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-800 mb-2">404</h1>
            <p className="text-gray-600 mb-6">Page non trouvée</p>
            <a
                href="/"
                className="inline-block px-6 py-3 bg-primary-500 text-white rounded-xl hover:bg-primary-600 transition-colors"
            >
                Retour à l'accueil
            </a>
        </div>
    </div>
);

function App() {
    return (
        <AcrosticheProvider>
            <div className="min-h-screen bg-gray-50">
                <Routes>
                    {/* Page d'accueil */}
                    <Route path="/" element={<Home />} />

                    {/* Routes élève */}
                    <Route path="/eleve" element={<StudentWorkspace />} />
                    {/* <Route path="/exemples" element={<Examples />} /> */}

                    {/* Routes enseignant (Phase 3) */}
                    {/* <Route path="/enseignant" element={<TeacherDashboard />} /> */}
                    {/* <Route path="/seance/:code" element={<TeacherDashboard />} /> */}

                    {/* Route 404 */}
                    <Route path="*" element={<NotFound />} />
                </Routes>
            </div>
        </AcrosticheProvider>
    );
}

export default App;
