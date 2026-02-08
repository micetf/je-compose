import { Routes, Route } from "react-router-dom";
import { AcrosticheProvider } from "@contexts";

// Import des pages (à créer dans la Phase 2)
// import Home from './pages/Home';
// import StudentWorkspace from './pages/StudentWorkspace';
// import TeacherDashboard from './pages/TeacherDashboard';
// import Examples from './pages/Examples';

// Composants temporaires pour tester le routage
const Home = () => (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary-50 to-secondary-50">
        <div className="text-center">
            <h1 className="text-5xl font-bold text-primary-700 mb-4">
                Je Compose
            </h1>
            <p className="text-xl text-gray-600">
                Acrostiches et poésie à l'école primaire
            </p>
            <p className="mt-8 text-gray-500">
                🚧 Application en cours de développement
            </p>
        </div>
    </div>
);

const NotFound = () => (
    <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-800 mb-2">404</h1>
            <p className="text-gray-600">Page non trouvée</p>
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

                    {/* Routes élève (à décommenter en Phase 2) */}
                    {/* <Route path="/eleve" element={<StudentWorkspace />} /> */}
                    {/* <Route path="/exemples" element={<Examples />} /> */}

                    {/* Routes enseignant (à décommenter en Phase 3) */}
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
