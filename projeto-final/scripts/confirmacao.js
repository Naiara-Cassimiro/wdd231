/* jshint esversion: 8 */

/* =========================
   ELEMENTOS DA PÁGINA
========================= */

const resultName = document.querySelector("#result-name");
const resultEmail = document.querySelector("#result-email");
const resultTravel = document.querySelector("#result-travel");
const resultMessage = document.querySelector("#result-message");


/* =========================
   PARÂMETROS DA URL
========================= */

const params = new URLSearchParams(window.location.search);

const name = params.get("name");
const email = params.get("email");
const travel = params.get("travel");
const message = params.get("message");


/* =========================
   FORMATAR TIPO DE VIAGEM
========================= */

function formatTravelType(travelType) {
    const travelNames = {
        praia: "Praia",
        campo: "Campo",
        trabalho: "Trabalho",
        ferias: "Férias"
    };

    return travelNames[travelType] || travelType;
}


/* =========================
   EXIBIR DADOS
========================= */

resultName.textContent = name || "Não informado";
resultEmail.textContent = email || "Não informado";

resultTravel.textContent = travel ? formatTravelType(travel) : "Não informado";

resultMessage.textContent = message || "Não informado";