import { useState, useEffect } from "react";

/**
 * Hook personnalisé pour gérer localStorage avec état React
 * @param {string} key - Clé de stockage
 * @param {*} initialValue - Valeur initiale si rien n'est stocké
 * @returns {[value, setValue, removeValue]} Tuple avec valeur, setter et remover
 */
const useLocalStorage = (key, initialValue) => {
    // État pour stocker la valeur
    const [storedValue, setStoredValue] = useState(() => {
        try {
            // Récupérer depuis localStorage
            const item = window.localStorage.getItem(key);

            // Parser le JSON ou retourner la valeur initiale
            return item ? JSON.parse(item) : initialValue;
        } catch (error) {
            console.error(
                `Erreur lors de la lecture de localStorage (${key}):`,
                error
            );
            return initialValue;
        }
    });

    /**
     * Fonction pour mettre à jour la valeur
     * @param {*} value - Nouvelle valeur ou fonction qui reçoit la valeur précédente
     */
    const setValue = (value) => {
        try {
            // Permettre à value d'être une fonction comme useState
            const valueToStore =
                value instanceof Function ? value(storedValue) : value;

            // Sauvegarder dans l'état
            setStoredValue(valueToStore);

            // Sauvegarder dans localStorage
            window.localStorage.setItem(key, JSON.stringify(valueToStore));

            // Déclencher un événement personnalisé pour synchroniser entre onglets
            window.dispatchEvent(
                new CustomEvent("localStorage", {
                    detail: { key, newValue: valueToStore },
                })
            );
        } catch (error) {
            console.error(
                `Erreur lors de l'écriture dans localStorage (${key}):`,
                error
            );
        }
    };

    /**
     * Fonction pour supprimer la valeur
     */
    const removeValue = () => {
        try {
            // Supprimer de l'état
            setStoredValue(initialValue);

            // Supprimer de localStorage
            window.localStorage.removeItem(key);

            // Événement de synchronisation
            window.dispatchEvent(
                new CustomEvent("localStorage", {
                    detail: { key, newValue: null },
                })
            );
        } catch (error) {
            console.error(
                `Erreur lors de la suppression dans localStorage (${key}):`,
                error
            );
        }
    };

    // Synchronisation entre onglets
    useEffect(() => {
        const handleStorageChange = (e) => {
            // Événement storage natif (changements depuis d'autres onglets)
            if (e.key === key && e.newValue !== null) {
                try {
                    setStoredValue(JSON.parse(e.newValue));
                } catch (error) {
                    console.error(
                        "Erreur lors de la synchronisation localStorage:",
                        error
                    );
                }
            }
        };

        const handleCustomStorageChange = (e) => {
            // Événement personnalisé (changements depuis le même onglet)
            if (e.detail.key === key) {
                setStoredValue(e.detail.newValue);
            }
        };

        window.addEventListener("storage", handleStorageChange);
        window.addEventListener("localStorage", handleCustomStorageChange);

        return () => {
            window.removeEventListener("storage", handleStorageChange);
            window.removeEventListener(
                "localStorage",
                handleCustomStorageChange
            );
        };
    }, [key]);

    return [storedValue, setValue, removeValue];
};

/**
 * Fonctions utilitaires pour gérer l'espace localStorage
 */

/**
 * Vérifie l'espace disponible dans localStorage (approximatif)
 * @returns {Object} { used, available, total } en Mo
 */
export const getLocalStorageSpace = () => {
    let total = 0;

    for (const key in localStorage) {
        if (Object.prototype.hasOwnProperty.call(localStorage, key)) {
            total += localStorage[key].length + key.length;
        }
    }

    // Approximation : 1 caractère = 2 octets en UTF-16
    const usedBytes = total * 2;
    const usedMB = (usedBytes / (1024 * 1024)).toFixed(2);

    // La plupart des navigateurs offrent 5-10 Mo
    const estimatedTotalMB = 5;
    const availableMB = (estimatedTotalMB - usedMB).toFixed(2);

    return {
        used: parseFloat(usedMB),
        available: parseFloat(availableMB),
        total: estimatedTotalMB,
    };
};

/**
 * Nettoie les données expirées du localStorage
 * @param {string} prefix - Préfixe des clés à nettoyer
 * @param {number} maxAge - Âge maximum en millisecondes
 */
export const cleanExpiredData = (prefix, maxAge) => {
    const now = Date.now();

    Object.keys(localStorage).forEach((key) => {
        if (key.startsWith(prefix)) {
            try {
                const data = JSON.parse(localStorage.getItem(key));

                if (data.dateCreation) {
                    const age = now - new Date(data.dateCreation).getTime();

                    if (age > maxAge) {
                        localStorage.removeItem(key);
                        console.log(`Données expirées supprimées : ${key}`);
                    }
                }
            } catch (error) {
                console.error(`Erreur lors du nettoyage de ${key}:`, error);
            }
        }
    });
};

/**
 * Exporte toutes les données localStorage en JSON
 * @returns {string} JSON stringifié
 */
export const exportLocalStorage = () => {
    const data = {};

    Object.keys(localStorage).forEach((key) => {
        data[key] = localStorage.getItem(key);
    });

    return JSON.stringify(data, null, 2);
};

/**
 * Importe des données dans localStorage depuis JSON
 * @param {string} jsonData - Données JSON
 * @param {boolean} overwrite - Écraser les données existantes
 */
export const importLocalStorage = (jsonData, overwrite = false) => {
    try {
        const data = JSON.parse(jsonData);

        Object.keys(data).forEach((key) => {
            if (overwrite || !localStorage.getItem(key)) {
                localStorage.setItem(key, data[key]);
            }
        });

        return true;
    } catch (error) {
        console.error("Erreur lors de l'import des données:", error);
        return false;
    }
};

export default useLocalStorage;
