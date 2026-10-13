/* jshint esversion: 11 */

export function formatTravelType(travelType) {
    const travelNames = {
        praia: "Praia",
        campo: "Campo",
        trabalho: "Trabalho",
        ferias: "Férias"
    };

    return travelNames[travelType] || travelType;
}