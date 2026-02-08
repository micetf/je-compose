import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";

/**
 * Exporte un élément HTML en image PNG
 * @param {HTMLElement} element - Élément DOM à exporter
 * @param {string} filename - Nom du fichier (sans extension)
 * @param {Object} options - Options d'export
 * @returns {Promise<boolean>} True si succès
 */
export const exporterEnPNG = async (
    element,
    filename = "acrostiche",
    options = {}
) => {
    try {
        // Options par défaut
        const defaultOptions = {
            scale: 2, // Qualité haute résolution
            backgroundColor: "#ffffff",
            logging: false,
            ...options,
        };

        // Générer le canvas
        const canvas = await html2canvas(element, defaultOptions);

        // Convertir en blob
        const blob = await new Promise((resolve) => {
            canvas.toBlob(resolve, "image/png");
        });

        // Télécharger
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = `${filename}.png`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);

        return true;
    } catch (error) {
        console.error("Erreur lors de l'export PNG:", error);
        return false;
    }
};

/**
 * Exporte un acrostiche en PDF
 * @param {Object} acrostiche - Objet acrostiche
 * @param {string} filename - Nom du fichier (sans extension)
 * @returns {Promise<boolean>} True si succès
 */
export const exporterEnPDF = async (acrostiche, filename = "acrostiche") => {
    try {
        // Créer un nouveau document PDF (format A4)
        const doc = new jsPDF({
            orientation: "portrait",
            unit: "mm",
            format: "a4",
        });

        // Marges et dimensions
        const margeGauche = 20;
        const margeHaut = 20;
        const largeurPage = doc.internal.pageSize.getWidth();

        // Titre
        doc.setFontSize(20);
        doc.setFont("helvetica", "bold");
        doc.text("Mon Acrostiche", margeGauche, margeHaut);

        // Mot initial
        doc.setFontSize(16);
        doc.setFont("helvetica", "bold");
        doc.text(`Mot : ${acrostiche.motInitial}`, margeGauche, margeHaut + 15);

        // Niveau
        const niveaux = {
            1: "Niveau 1 - Un mot par ligne",
            2: "Niveau 2 - Une phrase par ligne",
            3: "Niveau 3 - Des vers poétiques",
        };
        doc.setFontSize(12);
        doc.setFont("helvetica", "normal");
        doc.text(niveaux[acrostiche.niveau], margeGauche, margeHaut + 22);

        // Date de création
        const date = new Date(acrostiche.dateCreation);
        doc.setFontSize(10);
        doc.text(
            `Créé le ${date.toLocaleDateString("fr-FR")}`,
            margeGauche,
            margeHaut + 28
        );

        // Ligne de séparation
        doc.setLineWidth(0.5);
        doc.line(
            margeGauche,
            margeHaut + 32,
            largeurPage - margeGauche,
            margeHaut + 32
        );

        // Contenu de l'acrostiche
        doc.setFontSize(14);
        doc.setFont("helvetica", "normal");

        let yPosition = margeHaut + 45;
        const interLigne = 10;

        acrostiche.vers.forEach((vers, index) => {
            const lettre = acrostiche.motInitial[index];

            // Lettre initiale en gras et plus grande
            doc.setFont("helvetica", "bold");
            doc.setFontSize(16);
            doc.text(lettre, margeGauche, yPosition);

            // Reste du vers
            doc.setFont("helvetica", "normal");
            doc.setFontSize(14);
            doc.text(vers.substring(1), margeGauche + 8, yPosition);

            yPosition += interLigne;

            // Nouvelle page si nécessaire
            if (yPosition > doc.internal.pageSize.getHeight() - 20) {
                doc.addPage();
                yPosition = margeHaut;
            }
        });

        // Sauvegarder le PDF
        doc.save(`${filename}.pdf`);

        return true;
    } catch (error) {
        console.error("Erreur lors de l'export PDF:", error);
        return false;
    }
};

/**
 * Exporte plusieurs acrostiches en un seul PDF (pour l'enseignant)
 * @param {Array} acrostiches - Tableau d'acrostiches
 * @param {string} filename - Nom du fichier
 * @returns {Promise<boolean>} True si succès
 */
export const exporterPlusieursPDF = async (
    acrostiches,
    filename = "acrostiches"
) => {
    try {
        const doc = new jsPDF({
            orientation: "portrait",
            unit: "mm",
            format: "a4",
        });

        const margeGauche = 20;
        const margeHaut = 20;
        const largeurPage = doc.internal.pageSize.getWidth();

        acrostiches.forEach((acrostiche, indexAcrostiche) => {
            // Nouvelle page pour chaque acrostiche (sauf le premier)
            if (indexAcrostiche > 0) {
                doc.addPage();
            }

            // En-tête
            doc.setFontSize(18);
            doc.setFont("helvetica", "bold");
            doc.text(
                `Acrostiche ${indexAcrostiche + 1}`,
                margeGauche,
                margeHaut
            );

            // Mot initial
            doc.setFontSize(14);
            doc.text(
                `Mot : ${acrostiche.motInitial}`,
                margeGauche,
                margeHaut + 10
            );

            // Niveau
            const niveaux = { 1: "Niveau 1", 2: "Niveau 2", 3: "Niveau 3" };
            doc.setFontSize(11);
            doc.setFont("helvetica", "normal");
            doc.text(niveaux[acrostiche.niveau], margeGauche, margeHaut + 16);

            // Ligne de séparation
            doc.setLineWidth(0.3);
            doc.line(
                margeGauche,
                margeHaut + 20,
                largeurPage - margeGauche,
                margeHaut + 20
            );

            // Contenu
            doc.setFontSize(12);
            let yPosition = margeHaut + 28;

            acrostiche.vers.forEach((vers, index) => {
                const lettre = acrostiche.motInitial[index];

                doc.setFont("helvetica", "bold");
                doc.text(lettre, margeGauche, yPosition);

                doc.setFont("helvetica", "normal");
                doc.text(vers.substring(1), margeGauche + 6, yPosition);

                yPosition += 8;
            });
        });

        // Sauvegarder
        doc.save(`${filename}.pdf`);

        return true;
    } catch (error) {
        console.error("Erreur lors de l'export PDF groupé:", error);
        return false;
    }
};

/**
 * Copie le texte de l'acrostiche dans le presse-papier
 * @param {Object} acrostiche - Objet acrostiche
 * @returns {Promise<boolean>} True si succès
 */
export const copierDansPressePapier = async (acrostiche) => {
    try {
        const texte = acrostiche.vers.join("\n");
        await navigator.clipboard.writeText(texte);
        return true;
    } catch (error) {
        console.error("Erreur lors de la copie:", error);
        return false;
    }
};

/**
 * Génère une URL encodée contenant l'acrostiche
 * @param {Object} acrostiche - Objet acrostiche
 * @returns {string} URL avec données encodées
 */
export const genererURLPartage = (acrostiche) => {
    try {
        const data = {
            m: acrostiche.motInitial,
            n: acrostiche.niveau,
            v: acrostiche.vers,
        };

        const encoded = btoa(JSON.stringify(data));
        const baseURL = window.location.origin;

        return `${baseURL}/partage#${encoded}`;
    } catch (error) {
        console.error("Erreur lors de la génération de l'URL:", error);
        return null;
    }
};

/**
 * Décode une URL de partage
 * @param {string} hash - Hash de l'URL
 * @returns {Object|null} Acrostiche décodé ou null
 */
export const decoderURLPartage = (hash) => {
    try {
        const encoded = hash.replace("#", "");
        const decoded = JSON.parse(atob(encoded));

        return {
            motInitial: decoded.m,
            niveau: decoded.n,
            vers: decoded.v,
        };
    } catch (error) {
        console.error("Erreur lors du décodage de l'URL:", error);
        return null;
    }
};
