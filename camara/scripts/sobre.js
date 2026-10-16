
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

    placesContainer.replaceChildren();

    // A atividade utiliza oito locais de interesse.
    const selectedPlaces = places.slice(0, 8);

    selectedPlaces.forEach((place, index) => {
        const card = document.createElement("article");
        card.classList.add("place-card", `card${index + 1}`);

        // Título
        const title = document.createElement("h2");
        title.textContent = place.nome || "Local de interesse";

        // Imagem
        const figure = document.createElement("figure");

        const image = document.createElement("img");

        image.src = `imagens/${place.imagem}`;
        image.alt = `Vista de ${place.nome || "São Paulo"}`;

        image.width = 300;
        image.height = 200;

        // Carregamento otimizado
        image.loading = "lazy";
        image.decoding = "async";

        figure.appendChild(image);

        // Endereço
        const address = document.createElement("address");
        address.textContent = place.endereco || "Endereço não informado";

        // Descrição
        const description = document.createElement("p");
        description.textContent =
            place.descricao || "Descrição não disponível.";

        // Botão
        const button = document.createElement("button");
        button.type = "button";
        button.textContent = "Saiba mais";

        button.setAttribute(
            "aria-label",
            `Saiba mais sobre ${place.nome || "este local"}`
        );

        button.addEventListener("click", () => {
            const message =
                `${title.textContent}\n\n` +
                `Endereço: ${address.textContent}\n\n` +
                `${description.textContent}`;

            window.alert(message);
        });

        // Montagem do cartão
        card.append(
            title,
            figure,
            address,
            description,
            button
        );

        placesContainer.appendChild(card);
    });
}

displayPlaces(locais);

/* =========================
   MENSAGEM DE VISITAS
========================= */

const visitMessage = document.querySelector("#visit-message");

if (visitMessage) {
    const millisecondsPerDay = 1000 * 60 * 60 * 24;
    const currentVisit = Date.now();

    try {
        const lastVisit = localStorage.getItem("lastVisit");

        if (lastVisit === null) {
            visitMessage.textContent =
                "Boas-vindas! Entre em contato conosco caso tenha alguma dúvida.";
        } else {
            const previousVisit = Number(lastVisit);
            const difference = currentVisit - previousVisit;

            if (!Number.isFinite(previousVisit) || difference < 0) {
                visitMessage.textContent =
                    "Boas-vindas! Entre em contato conosco caso tenha alguma dúvida.";
            } else if (difference < millisecondsPerDay) {
                visitMessage.textContent =
                    "Já voltou? Que legal!";
            } else {
                const days = Math.floor(
                    difference / millisecondsPerDay
                );

                if (days === 1) {
                    visitMessage.textContent =
                        "Seu último acesso foi há 1 dia.";
                } else {
                    visitMessage.textContent =
                        `Seu último acesso foi há ${days} dias.`;
                }
            }
        }

        localStorage.setItem(
            "lastVisit",
            String(currentVisit)
        );
    } catch (error) {
        visitMessage.textContent =
            "Boas-vindas! Explore os locais de interesse de São Paulo.";

        console.warn(
            "Não foi possível acessar o armazenamento local.",
            error
        );
    }
}
