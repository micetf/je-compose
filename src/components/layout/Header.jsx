import { useNavigate, useLocation } from "react-router-dom";
import PropTypes from "prop-types";

/**
 * Header de navigation global réutilisable
 * Affiche le logo, le titre et un menu de navigation
 *
 * @param {boolean} [showNavigation=true] - Afficher le menu de navigation
 * @param {string} [className] - Classes CSS supplémentaires
 */
const Header = ({ showNavigation = true, className = "" }) => {
    const navigate = useNavigate();
    const location = useLocation();

    // Déterminer quelle page est active
    const isActive = (path) => location.pathname === path;

    return (
        <header className={`bg-white shadow-md ${className}`}>
            <div className="container-app py-4">
                <div className="flex items-center justify-between">
                    {/* Logo + Titre */}
                    <button
                        onClick={() => navigate("/")}
                        className="flex items-center gap-3 group"
                        aria-label="Retour à l'accueil"
                    >
                        <span className="text-4xl group-hover:scale-110 transition-transform">
                            ✍️
                        </span>
                        <div className="hidden sm:block">
                            <h1 className="text-2xl font-bold text-gray-900 group-hover:text-primary-600 transition-colors">
                                Je Compose
                            </h1>
                            <p className="text-xs text-gray-500">
                                Acrostiches pour l'école
                            </p>
                        </div>
                    </button>

                    {/* Navigation */}
                    {showNavigation && (
                        <nav className="flex items-center gap-2 md:gap-4">
                            <button
                                onClick={() => navigate("/")}
                                className={`
                  px-4 py-2 rounded-lg font-medium transition-all duration-200
                  ${
                      isActive("/")
                          ? "bg-primary-500 text-white shadow-md"
                          : "text-gray-700 hover:bg-gray-100"
                  }
                `}
                                aria-current={
                                    isActive("/") ? "page" : undefined
                                }
                            >
                                🏠{" "}
                                <span className="hidden sm:inline">
                                    Accueil
                                </span>
                            </button>

                            <button
                                onClick={() => navigate("/eleve")}
                                className={`
                  px-4 py-2 rounded-lg font-medium transition-all duration-200
                  ${
                      isActive("/eleve")
                          ? "bg-primary-500 text-white shadow-md"
                          : "text-gray-700 hover:bg-gray-100"
                  }
                `}
                                aria-current={
                                    isActive("/eleve") ? "page" : undefined
                                }
                            >
                                ✍️{" "}
                                <span className="hidden sm:inline">Créer</span>
                            </button>

                            <button
                                onClick={() => navigate("/exemples")}
                                className={`
                  px-4 py-2 rounded-lg font-medium transition-all duration-200
                  ${
                      isActive("/exemples")
                          ? "bg-primary-500 text-white shadow-md"
                          : "text-gray-700 hover:bg-gray-100"
                  }
                `}
                                aria-current={
                                    isActive("/exemples") ? "page" : undefined
                                }
                            >
                                📚{" "}
                                <span className="hidden sm:inline">
                                    Exemples
                                </span>
                            </button>
                        </nav>
                    )}
                </div>
            </div>
        </header>
    );
};

Header.propTypes = {
    showNavigation: PropTypes.bool,
    className: PropTypes.string,
};

export default Header;
