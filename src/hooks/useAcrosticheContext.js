import { useContext } from "react";
import AcrosticheContext from "../contexts/AcrosticheContext";

/**
 * Hook pour utiliser le contexte Acrostiche
 * @returns {Object} { state, actions }
 * @throws {Error} Si utilisé en dehors d'un AcrosticheProvider
 */
const useAcrosticheContext = () => {
    const context = useContext(AcrosticheContext);

    if (!context) {
        throw new Error(
            "useAcrosticheContext doit être utilisé dans un AcrosticheProvider"
        );
    }

    return context;
};

export default useAcrosticheContext;
