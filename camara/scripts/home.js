const membersURL = "data/membros.json";
const spotlightContainer = document.querySelector("#spotlight-container");

async function getSpotlightMembers() {
    try {
        const response = await fetch(membersURL);

        if (!response.ok) {
            throw new Error("Não foi possível carregar os membros.");
        }

        const data = await response.json();

        const qualifiedMembers = data.members.filter(
            member => member.membershipLevel === 2 || member.membershipLevel === 3
        );

        const shuffledMembers = qualifiedMembers.sort(() => Math.random() - 0.5);

        const selectedMembers = shuffledMembers.slice(0, 3);

        displaySpotlights(selectedMembers);
    } catch (error) {
        console.error("Erro ao carregar os membros:", error);
    }
}

function displaySpotlights(members) {
    spotlightContainer.innerHTML = "";

    members.forEach(member => {
        const card = document.createElement("section");
        card.classList.add("spotlight-card");

        card.innerHTML = `
            <img
                src="imagens/${member.image}"
                alt="Logotipo da empresa ${member.name}"
                width="160"
                height="110"
                loading="lazy">
            <h3>${member.name}</h3>
            <p>${member.phone}</p>
            <p>${member.address}</p>
            <p>
                <strong>
                    ${member.membershipLevel === 3 ? "Membro Ouro" : "Membro Prata"}
                </strong>
            </p>
            <a href="${member.website}" target="_blank" rel="noopener">
                Visitar site
            </a>
        `;

        spotlightContainer.appendChild(card);
    });
}

getSpotlightMembers();

// CLIMA DE SÃO PAULO

const apiKey = "a62c8096d4892f2f55c5c034690723c2";
const latitude = -23.5505;
const longitude = -46.6333;

const currentWeatherURL =
    `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&lang=pt_br&appid=${apiKey}`;

const forecastURL =
    `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&units=metric&lang=pt_br&appid=${apiKey}`;

async function getWeather() {
    try {
        const response = await fetch(currentWeatherURL);

        if (!response.ok) {
            throw new Error("Não foi possível carregar o clima.");
        }

        const data = await response.json();

        document.querySelector("#current-temp").textContent =
            Math.round(data.main.temp);

        document.querySelector("#weather-description").textContent =
            data.weather[0].description;

        const weatherIcon = document.querySelector("#weather-icon");

        weatherIcon.src =
            `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;

        weatherIcon.alt =
            `Condição climática: ${data.weather[0].description}`;

    } catch (error) {
        console.error("Erro ao carregar o clima:", error);
    }
}

async function getForecast() {
    try {
        const response = await fetch(forecastURL);

        if (!response.ok) {
            throw new Error("Não foi possível carregar a previsão.");
        }

        const data = await response.json();
        const forecastContainer =
            document.querySelector("#forecast-container");

        forecastContainer.innerHTML = "";

        const dailyForecasts = data.list.filter(item =>
            item.dt_txt.includes("12:00:00")
        ).slice(0, 3);

        dailyForecasts.forEach(day => {
            const date = new Date(day.dt * 1000);

            const paragraph = document.createElement("p");

            paragraph.innerHTML =
                `<strong>${date.toLocaleDateString("pt-BR", {
                    weekday: "long"
                })}:</strong> ${Math.round(day.main.temp)}°C`;

            forecastContainer.appendChild(paragraph);
        });

    } catch (error) {
        console.error("Erro ao carregar a previsão:", error);
    }
}

getWeather();
getForecast();