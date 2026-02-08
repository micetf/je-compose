import { useEffect, useRef } from "react";
import PropTypes from "prop-types";
import Button from "./Button";

/**
 * Composant Modal réutilisable
 * @param {Object} props
 * @param {boolean} props.isOpen - Modal ouvert/fermé
 * @param {Function} props.onClose - Fonction de fermeture
 * @param {string} props.title - Titre de la modal
 * @param {React.ReactNode} props.children - Contenu de la modal
 * @param {React.ReactNode} props.footer - Contenu du footer (optionnel)
 * @param {('small'|'medium'|'large')} props.size - Taille de la modal
 * @param {boolean} props.closeOnOverlay - Fermer au clic sur l'overlay
 */
const Modal = ({
    isOpen,
    onClose,
    title,
    children,
    footer,
    size = "medium",
    closeOnOverlay = true,
}) => {
    const modalRef = useRef(null);
    const previousFocusRef = useRef(null);

    // Gestion du focus et de l'accessibilité
    useEffect(() => {
        if (isOpen) {
            // Sauvegarder l'élément précédemment focus
            previousFocusRef.current = document.activeElement;

            // Focus sur la modal
            modalRef.current?.focus();

            // Bloquer le scroll du body
            document.body.style.overflow = "hidden";
        } else {
            // Restaurer le scroll
            document.body.style.overflow = "unset";

            // Restaurer le focus
            previousFocusRef.current?.focus();
        }

        return () => {
            document.body.style.overflow = "unset";
        };
    }, [isOpen]);

    // Gestion de la touche Escape
    useEffect(() => {
        const handleEscape = (e) => {
            if (e.key === "Escape" && isOpen) {
                onClose();
            }
        };

        document.addEventListener("keydown", handleEscape);
        return () => document.removeEventListener("keydown", handleEscape);
    }, [isOpen, onClose]);

    // Ne rien afficher si la modal est fermée
    if (!isOpen) return null;

    // Classes selon la taille
    const sizeClasses = {
        small: "max-w-md",
        medium: "max-w-2xl",
        large: "max-w-4xl",
    };

    // Gestion du clic sur l'overlay
    const handleOverlayClick = (e) => {
        if (closeOnOverlay && e.target === e.currentTarget) {
            onClose();
        }
    };

    return (
        <div
            className="fixed inset-0 z-50 overflow-y-auto"
            aria-labelledby="modal-title"
            role="dialog"
            aria-modal="true"
        >
            {/* Overlay */}
            <div
                className="fixed inset-0 bg-black bg-opacity-50 transition-opacity"
                onClick={handleOverlayClick}
            />

            {/* Container centré */}
            <div className="flex min-h-full items-center justify-center p-4">
                {/* Modal */}
                <div
                    ref={modalRef}
                    tabIndex={-1}
                    className={`
            relative bg-white rounded-2xl shadow-xl
            w-full ${sizeClasses[size]}
            animate-fade-in
          `}
                >
                    {/* Header */}
                    <div className="flex items-center justify-between p-6 border-b border-gray-200">
                        <h2
                            id="modal-title"
                            className="text-2xl font-semibold text-gray-900"
                        >
                            {title}
                        </h2>
                        <button
                            type="button"
                            onClick={onClose}
                            className="text-gray-400 hover:text-gray-600 transition-colors p-2 rounded-lg hover:bg-gray-100"
                            aria-label="Fermer la fenêtre"
                        >
                            <svg
                                className="w-6 h-6"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M6 18L18 6M6 6l12 12"
                                />
                            </svg>
                        </button>
                    </div>

                    {/* Body */}
                    <div className="p-6">{children}</div>

                    {/* Footer (optionnel) */}
                    {footer && (
                        <div className="flex items-center justify-end gap-3 p-6 border-t border-gray-200 bg-gray-50 rounded-b-2xl">
                            {footer}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

Modal.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    title: PropTypes.string.isRequired,
    children: PropTypes.node.isRequired,
    footer: PropTypes.node,
    size: PropTypes.oneOf(["small", "medium", "large"]),
    closeOnOverlay: PropTypes.bool,
};

export default Modal;
