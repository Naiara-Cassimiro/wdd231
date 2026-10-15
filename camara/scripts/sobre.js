
import { locais } from "../dados/locais.mjs";

/* =========================
   CARDS DOS LOCAIS
========================= */

const placesContainer = document.querySelector("#places-container");

function displayPlaces(places) {
    if (!placesContainer) {
        console.error("Contêiner dos locais não encontrado.");
        return;
    }

    placesContainer.innerHTML = "";

    places.forEach((place, index) => {
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
        image.decoding = "async";

        // Primeira imagem com prioridade alta.
        // As demais utilizam carregamento lento.
        if (index === 0) {
            image.fetchPriority = "high";
        } else {
            image.loading = "lazy";
        }

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

        // Exibe mais informações ao clicar no botão.
        button.addEventListener("click", () => {
            const message =
                `${place.nome}\n\n` +
                `Endereço: ${place.endereco}\n\n` +
                `${place.descricao}`;

            window.alert(message);
        });

        card.appendChild(title);
        card.appendChild(figure);
        card.appendChild(address);
        card.appendChild(description);
        card.appendChild(button);

        placesContainer.appendChild(card);
    });
}

displayPlaces(locais);

/* =========================
   MENSAGEM DE VISITA
========================= */

const visitMessage = document.querySelector("#visit-message");

if (visitMessage) {
    const lastVisit = localStorage.getItem("lastVisit");
    const currentVisit = Date.now();
    const millisecondsPerDay = 1000 * 60 * 60 * 24;

    if (lastVisit === null) {
        visitMessage.textContent =
            "Boas-vindas! Entre em contato conosco caso tenha alguma dúvida.";
    } else {
        const difference = currentVisit - Number(lastVisit);
        const days = Math.floor(difference / millisecondsPerDay);

        if (days < 1) {
            visitMessage.textContent = "Já voltou? Que legal!";
        } else if (days === 1) {
            visitMessage.textContent =
                "Seu último acesso foi há 1 dia.";
        } else {
            visitMessage.textContent =
                `Seu último acesso foi há ${days} dias.`;
        }
    }

    localStorage.setItem("lastVisit", String(currentVisit));
}
