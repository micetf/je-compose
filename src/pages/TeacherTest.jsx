import { SessionView } from "@components/teacher";

const TeacherTest = () => {
    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-12">
            <div className="container-app">
                <h1 className="text-3xl font-bold text-center mb-8">
                    Interface Enseignant
                </h1>
                <SessionView />
            </div>
        </div>
    );
};

export default TeacherTest;
