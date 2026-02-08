import { Routes, Route } from "react-router-dom";
import { AcrosticheProvider } from "@contexts";
import { Header } from "@components/layout";
// Import des pages
import StudentWorkspace from "./pages/StudentWorkspace";
import Examples from "./pages/Examples";
import Home from "./pages/Home";
import TeacherDashboard from "./pages/TeacherDashboard";

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
                <Header />
                <Routes>
                    {/* Page d'accueil */}
                    <Route path="/" element={<Home />} />

                    {/* Routes élève */}
                    <Route path="/eleve" element={<StudentWorkspace />} />
                    <Route path="/exemples" element={<Examples />} />

                    {/* Routes enseignant (Phase 3) */}
                    <Route path="/enseignant" element={<TeacherDashboard />} />
                    {/* <Route path="/seance/:code" element={<TeacherDashboard />} /> */}

                    {/* Route 404 */}
                    <Route path="*" element={<NotFound />} />
                </Routes>
            </div>
        </AcrosticheProvider>
    );
}

export default App;
