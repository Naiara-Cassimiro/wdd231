/* =========================
   CARDS DOS LOCAIS
========================= */

const placesContainer = document.querySelector("#places-container");
const placesURL = "dados/locais.json";

async function getPlaces() {
    try {
        const response = await fetch(placesURL);

        if (!response.ok) {
            throw new Error("Não foi possível carregar os locais.");
        }

        const places = await response.json();

        displayPlaces(places);
    } catch (error) {
        console.error("Erro ao carregar os locais:", error);
    }
}

function displayPlaces(places) {
    placesContainer.innerHTML = "";

    places.forEach((place) => {
        const card = document.createElement("article");
        card.classList.add("place-card");

        const title = document.createElement("h2");
        title.textContent = place.nome;

        const figure = document.createElement("figure");

        const image = document.createElement("img");
        image.src = `imagens/${place.imagem}`;
        image.alt = `Vista de ${place.nome}`;
        image.width = 300;
        image.height = 200;
        image.loading = "lazy";

        figure.appendChild(image);

        const address = document.createElement("address");
        address.textContent = place.endereco;

        const description = document.createElement("p");
        description.textContent = place.descricao;

        const button = document.createElement("button");
        button.type = "button";
        button.textContent = "Saiba mais";
        button.setAttribute(
            "aria-label",
            `Saiba mais sobre ${place.nome}`
        );

        card.appendChild(title);
        card.appendChild(figure);
        card.appendChild(address);
        card.appendChild(description);
        card.appendChild(button);

        placesContainer.appendChild(card);
    });
}

getPlaces();


/* =========================
   MENSAGEM DE VISITA
========================= */

const visitMessage = document.querySelector("#visit-message");

const lastVisit = localStorage.getItem("lastVisit");
const currentVisit = Date.now();

const millisecondsPerDay = 1000 * 60 * 60 * 24;

if (!lastVisit) {
    visitMessage.textContent =
        "Bem-vindo! Informe-nos se tiver alguma dúvida.";
} else {
    const difference = currentVisit - Number(lastVisit);
    const days = Math.floor(difference / millisecondsPerDay);

    if (days < 1) {
        visitMessage.textContent =
            "De volta tão cedo! Incrível!";
    } else if (days === 1) {
        visitMessage.textContent =
            "Você visitou esta página há 1 dia.";
    } else {
        visitMessage.textContent =
            `Você visitou esta página há ${days} dias.`;
    }
}

localStorage.setItem("lastVisit", currentVisit);