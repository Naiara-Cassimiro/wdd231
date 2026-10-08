/* jshint esversion: 8 */

const itemsContainer = document.querySelector("#items-container");
const travelFilter = document.querySelector("#travel-filter");

const itemDialog = document.querySelector("#item-dialog");
const dialogContent = document.querySelector("#dialog-content");
const closeDialogButton = document.querySelector("#close-dialog");

const savedCount = document.querySelector("#saved-count");

const itemsURL = "dados/itens.json";

let travelItems = [];

let savedItems =
    JSON.parse(localStorage.getItem("malaProntaItems")) || [];


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
        updateSavedCount();
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

        const isSaved = savedItems.includes(item.id);
        const buttonText = isSaved ? "Remover da mala" : "Adicionar à mala";

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
                    ${buttonText}
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
    displayCurrentFilter();
});


function displayCurrentFilter() {
    const selectedTravel = travelFilter.value;

    if (selectedTravel === "todos") {
        displayItems(travelItems);
        return;
    }

    const filteredItems = travelItems.filter(
        (item) => item.viagem === selectedTravel
    );

    displayItems(filteredItems);
}


/* =========================
   EVENTOS DOS CARDS
========================= */

itemsContainer.addEventListener("click", (event) => {
    const button = event.target.closest("button");

    if (!button) {
        return;
    }

    const itemId = Number(button.dataset.id);

    const selectedItem = travelItems.find(
        (item) => item.id === itemId
    );

    if (!selectedItem) {
        return;
    }

    if (button.classList.contains("details-button")) {
        openItemDialog(selectedItem);
    }

    if (button.classList.contains("add-button")) {
        toggleSavedItem(selectedItem.id);
    }
});


/* =========================
   MODAL
========================= */

function openItemDialog(item) {
    dialogContent.innerHTML = `
        <h2>${item.nome}</h2>

        <p>
            <strong>Categoria:</strong>
            ${item.categoria}
        </p>

        <p>
            <strong>Tipo de viagem:</strong>
            ${formatTravelType(item.viagem)}
        </p>

        <p>
            <strong>Descrição:</strong>
            ${item.descricao}
        </p>
    `;

    itemDialog.showModal();
}


closeDialogButton.addEventListener("click", () => {
    itemDialog.close();
});


itemDialog.addEventListener("click", (event) => {
    if (event.target === itemDialog) {
        itemDialog.close();
    }
});


/* =========================
   LOCAL STORAGE
========================= */

function toggleSavedItem(itemId) {
    const itemIsSaved = savedItems.includes(itemId);

    if (itemIsSaved) {
        savedItems = savedItems.filter(
            (id) => id !== itemId
        );
    } else {
        savedItems.push(itemId);
    }

    localStorage.setItem(
        "malaProntaItems",
        JSON.stringify(savedItems)
    );

    updateSavedCount();
    displayCurrentFilter();
}


function updateSavedCount() {
    savedCount.textContent = savedItems.length;
}


/* =========================
   INICIAR
========================= */

getTravelItems();