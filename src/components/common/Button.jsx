import PropTypes from "prop-types";

/**
 * Composant Button réutilisable
 * @param {Object} props
 * @param {React.ReactNode} props.children - Contenu du bouton
 * @param {('primary'|'secondary'|'success'|'danger')} props.variant - Style du bouton
 * @param {('small'|'medium'|'large')} props.size - Taille du bouton
 * @param {boolean} props.disabled - Bouton désactivé
 * @param {boolean} props.fullWidth - Largeur 100%
 * @param {Function} props.onClick - Fonction au clic
 * @param {string} props.type - Type HTML du bouton
 * @param {string} props.className - Classes CSS supplémentaires
 */
const Button = ({
    children,
    variant = "primary",
    size = "medium",
    disabled = false,
    fullWidth = false,
    onClick,
    type = "button",
    className = "",
    ...props
}) => {
    // Classes de base
    const baseClasses =
        "font-medium rounded-xl transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed inline-flex items-center justify-center gap-2";

    // Classes selon la variante
    const variantClasses = {
        primary:
            "bg-primary-500 text-white hover:bg-primary-600 active:bg-primary-700 focus:ring-primary-500",
        secondary:
            "bg-gray-200 text-gray-900 hover:bg-gray-300 active:bg-gray-400 focus:ring-gray-400",
        success:
            "bg-success text-white hover:bg-green-600 active:bg-green-700 focus:ring-success",
        danger: "bg-error text-white hover:bg-red-600 active:bg-red-700 focus:ring-error",
    };

    // Classes selon la taille
    const sizeClasses = {
        small: "px-4 py-2 text-sm",
        medium: "px-6 py-3 text-base",
        large: "px-8 py-4 text-lg",
    };

    // Classes de largeur
    const widthClass = fullWidth ? "w-full" : "";

    // Combinaison de toutes les classes
    const buttonClasses =
        `${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${widthClass} ${className}`.trim();

    return (
        <button
            type={type}
            className={buttonClasses}
            disabled={disabled}
            onClick={onClick}
            {...props}
        >
            {children}
        </button>
    );
};

Button.propTypes = {
    children: PropTypes.node.isRequired,
    variant: PropTypes.oneOf(["primary", "secondary", "success", "danger"]),
    size: PropTypes.oneOf(["small", "medium", "large"]),
    disabled: PropTypes.bool,
    fullWidth: PropTypes.bool,
    onClick: PropTypes.func,
    type: PropTypes.oneOf(["button", "submit", "reset"]),
    className: PropTypes.string,
};

export default Button;
