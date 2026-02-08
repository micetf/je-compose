import PropTypes from "prop-types";

/**
 * Composant Input réutilisable
 * @param {Object} props
 * @param {string} props.id - ID unique de l'input
 * @param {string} props.label - Label de l'input
 * @param {string} props.type - Type d'input HTML
 * @param {string} props.value - Valeur contrôlée
 * @param {Function} props.onChange - Fonction de changement
 * @param {string} props.placeholder - Texte placeholder
 * @param {boolean} props.required - Champ requis
 * @param {boolean} props.disabled - Champ désactivé
 * @param {string} props.error - Message d'erreur
 * @param {string} props.helperText - Texte d'aide
 * @param {number} props.maxLength - Longueur maximale
 * @param {string} props.className - Classes CSS supplémentaires
 */
const Input = ({
    id,
    label,
    type = "text",
    value,
    onChange,
    placeholder = "",
    required = false,
    disabled = false,
    error = "",
    helperText = "",
    maxLength,
    className = "",
    ...props
}) => {
    // Classes de l'input selon l'état
    const inputClasses = `
    w-full px-4 py-3 text-lg
    border-2 rounded-xl
    transition-colors duration-200
    placeholder:text-gray-400
    disabled:bg-gray-100 disabled:cursor-not-allowed
    ${
        error
            ? "border-error focus:border-error focus:ring-error"
            : "border-gray-300 focus:border-primary-500 focus:ring-0"
    }
    focus:outline-none
    ${className}
  `
        .trim()
        .replace(/\s+/g, " ");

    return (
        <div className="w-full">
            {/* Label */}
            {label && (
                <label
                    htmlFor={id}
                    className="block text-sm font-medium text-gray-700 mb-2"
                >
                    {label}
                    {required && <span className="text-error ml-1">*</span>}
                </label>
            )}

            {/* Input */}
            <input
                id={id}
                type={type}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                required={required}
                disabled={disabled}
                maxLength={maxLength}
                className={inputClasses}
                aria-invalid={error ? "true" : "false"}
                aria-describedby={
                    error
                        ? `${id}-error`
                        : helperText
                          ? `${id}-helper`
                          : undefined
                }
                {...props}
            />

            {/* Compteur de caractères */}
            {maxLength && value && (
                <div className="mt-1 text-right text-sm text-gray-500">
                    {value.length}/{maxLength}
                </div>
            )}

            {/* Message d'erreur */}
            {error && (
                <p
                    id={`${id}-error`}
                    className="mt-2 text-sm text-error flex items-start gap-1"
                    role="alert"
                >
                    <span className="text-lg">⚠️</span>
                    <span>{error}</span>
                </p>
            )}

            {/* Texte d'aide */}
            {!error && helperText && (
                <p id={`${id}-helper`} className="mt-2 text-sm text-gray-600">
                    {helperText}
                </p>
            )}
        </div>
    );
};

Input.propTypes = {
    id: PropTypes.string.isRequired,
    label: PropTypes.string,
    type: PropTypes.string,
    value: PropTypes.string,
    onChange: PropTypes.func.isRequired,
    placeholder: PropTypes.string,
    required: PropTypes.bool,
    disabled: PropTypes.bool,
    error: PropTypes.string,
    helperText: PropTypes.string,
    maxLength: PropTypes.number,
    className: PropTypes.string,
};

export default Input;
