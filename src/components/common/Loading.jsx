import PropTypes from "prop-types";

/**
 * Composant Loading réutilisable
 * @param {Object} props
 * @param {('small'|'medium'|'large')} props.size - Taille du spinner
 * @param {string} props.message - Message de chargement
 * @param {boolean} props.fullScreen - Affichage plein écran
 */
const Loading = ({
    size = "medium",
    message = "Chargement...",
    fullScreen = false,
}) => {
    // Classes selon la taille
    const sizeClasses = {
        small: "w-6 h-6 border-2",
        medium: "w-12 h-12 border-3",
        large: "w-16 h-16 border-4",
    };

    const spinner = (
        <div className="flex flex-col items-center justify-center gap-4">
            {/* Spinner animé */}
            <div
                className={`
          ${sizeClasses[size]}
          border-primary-200 border-t-primary-600 
          rounded-full animate-spin
        `}
                role="status"
                aria-label="Chargement en cours"
            />

            {/* Message */}
            {message && (
                <p className="text-gray-600 text-lg font-medium">{message}</p>
            )}
        </div>
    );

    // Mode plein écran
    if (fullScreen) {
        return (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-white bg-opacity-90">
                {spinner}
            </div>
        );
    }

    // Mode inline
    return (
        <div className="flex items-center justify-center py-8">{spinner}</div>
    );
};

Loading.propTypes = {
    size: PropTypes.oneOf(["small", "medium", "large"]),
    message: PropTypes.string,
    fullScreen: PropTypes.bool,
};

export default Loading;
