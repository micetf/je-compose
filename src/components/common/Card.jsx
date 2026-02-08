import PropTypes from "prop-types";

/**
 * Composant Card réutilisable
 * @param {Object} props
 * @param {React.ReactNode} props.children - Contenu de la card
 * @param {string} props.title - Titre optionnel
 * @param {React.ReactNode} props.header - Header personnalisé (remplace title)
 * @param {React.ReactNode} props.footer - Footer optionnel
 * @param {boolean} props.hover - Effet hover
 * @param {boolean} props.padding - Padding par défaut
 * @param {string} props.className - Classes CSS supplémentaires
 * @param {Function} props.onClick - Fonction au clic (rend la card cliquable)
 */
const Card = ({
    children,
    title,
    header,
    footer,
    hover = false,
    padding = true,
    className = "",
    onClick,
    ...props
}) => {
    // Classes de base
    const baseClasses = "bg-white rounded-2xl shadow-md border border-gray-100";

    // Classes selon les props
    const hoverClasses = hover
        ? "hover:shadow-lg transition-shadow duration-200"
        : "";
    const clickableClasses = onClick ? "cursor-pointer" : "";
    const paddingClasses = padding ? "p-6" : "";

    // Combinaison de toutes les classes
    const cardClasses =
        `${baseClasses} ${hoverClasses} ${clickableClasses} ${className}`.trim();

    return (
        <div
            className={cardClasses}
            onClick={onClick}
            role={onClick ? "button" : undefined}
            tabIndex={onClick ? 0 : undefined}
            onKeyDown={
                onClick
                    ? (e) => {
                          if (e.key === "Enter" || e.key === " ") {
                              e.preventDefault();
                              onClick(e);
                          }
                      }
                    : undefined
            }
            {...props}
        >
            {/* Header personnalisé ou titre simple */}
            {header ? (
                <div className="mb-4">{header}</div>
            ) : title ? (
                <div className={`mb-4 ${!padding ? "px-6 pt-6" : ""}`}>
                    <h3 className="text-xl font-semibold text-gray-900">
                        {title}
                    </h3>
                </div>
            ) : null}

            {/* Contenu */}
            <div className={paddingClasses}>{children}</div>

            {/* Footer */}
            {footer && (
                <div
                    className={`mt-4 pt-4 border-t border-gray-200 ${!padding ? "px-6 pb-6" : ""}`}
                >
                    {footer}
                </div>
            )}
        </div>
    );
};

Card.propTypes = {
    children: PropTypes.node.isRequired,
    title: PropTypes.string,
    header: PropTypes.node,
    footer: PropTypes.node,
    hover: PropTypes.bool,
    padding: PropTypes.bool,
    className: PropTypes.string,
    onClick: PropTypes.func,
};

export default Card;
