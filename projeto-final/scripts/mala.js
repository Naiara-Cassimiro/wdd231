const itemsContainer = document.querySelector("#items-container");
const travelFilter = document.querySelector("#travel-filter");

const itemsURL = "dados/itens.json";

let travelItems = [];


/* =========================
   CARREGAR DADOS
========================= */

async function getTravelItems() {
    try {
        const response = await fetch(itemsURL);

        if (!response.ok) {
            throw new Error(
                `Erro ao carregar os dados: ${response.status}`
            );
        }

        travelItems = await response.json();

        displayItems(travelItems);
    } catch (error) {
        console.error("Erro ao carregar os itens:", error);

        itemsContainer.innerHTML = `
            <p class="error-message">
                Não foi possível carregar os itens da viagem.
                Tente novamente mais tarde.
            </p>
        `;
    }
}


/* =========================
   EXIBIR ITENS
========================= */

function displayItems(items) {
    itemsContainer.innerHTML = "";

    items.forEach((item) => {
        const card = document.createElement("article");
        card.classList.add("item-card");

        card.innerHTML = `
            <span class="item-category">
                ${item.categoria}
            </span>

            <h3>${item.nome}</h3>

            <p>
                <strong>Tipo de viagem:</strong>
                ${formatTravelType(item.viagem)}
            </p>

            <p>${item.descricao}</p>

            <div class="item-actions">
                <button
                    class="details-button"
                    type="button"
                    data-id="${item.id}">
                    Ver detalhes
                </button>

                <button
                    class="add-button"
                    type="button"
                    data-id="${item.id}">
                    Adicionar à mala
                </button>
            </div>
        `;

        itemsContainer.appendChild(card);
    });
}


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
   FILTRAR ITENS
========================= */

travelFilter.addEventListener("change", () => {
    const selectedTravel = travelFilter.value;

    if (selectedTravel === "todos") {
        displayItems(travelItems);
        return;
    }

    const filteredItems = travelItems.filter(
        (item) => item.viagem === selectedTravel
    );

    displayItems(filteredItems);
});


/* =========================
   INICIAR
========================= */

getTravelItems();