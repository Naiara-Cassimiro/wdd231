const url = "data/members.json";
const membersContainer = document.querySelector("#members");

async function getMembers() {
    const response = await fetch(url);
    const data = await response.json();

    displayMembers(data.members);
}

function displayMembers(members) {
    members.forEach((member) => {
        const card = document.createElement("section");

        const image = document.createElement("img");
        image.src = `images/${member.image}`;
        image.alt = `Logotipo da empresa ${member.name}`;
        image.loading = "lazy";

        const name = document.createElement("h2");
        name.textContent = member.name;

        const address = document.createElement("p");
        address.textContent = member.address;

        const phone = document.createElement("p");
        phone.textContent = member.phone;

        const website = document.createElement("a");
        website.href = member.website;
        website.textContent = "Visitar site";
        website.target = "_blank";
        website.rel = "noopener";

        card.appendChild(image);
        card.appendChild(name);
        card.appendChild(address);
        card.appendChild(phone);
        card.appendChild(website);

        membersContainer.appendChild(card);
    });
}

getMembers();