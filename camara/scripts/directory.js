const url = "data/membros.json";
const membersContainer = document.querySelector("#members");

const gridButton = document.querySelector("#grid");
const listButton = document.querySelector("#list");

async function getMembers() {
    const response = await fetch(url);
    const data = await response.json();

    displayMembers(data.members);
}

function displayMembers(members) {
    members.forEach((member) => {
        const card = document.createElement("section");

        image.src = `imagens/${member.image}`;
        image.alt = `Logotipo da empresa ${member.name}`;
        image.width = 300;
        image.height = 200;

        if (member === members[0]) {
            image.loading = "eager";
            image.fetchPriority = "high";
        } else {
            image.loading = "lazy";
        }
        const name = document.createElement("h2");
        name.textContent = member.name;

        const address = document.createElement("p");
        address.textContent = member.address;

        const phone = document.createElement("p");
        phone.textContent = member.phone;

        const membership = document.createElement("p");

        if (member.membershipLevel === 3) {
            membership.textContent = "Membro Ouro";
        } else if (member.membershipLevel === 2) {
            membership.textContent = "Membro Prata";
        } else {
            membership.textContent = "Membro";
        }

        const website = document.createElement("a");
        website.href = member.website;
        website.textContent = "Visitar site";
        website.target = "_blank";
        website.rel = "noopener";

        card.appendChild(image);
        card.appendChild(name);
        card.appendChild(address);
        card.appendChild(phone);
        card.appendChild(membership);
        card.appendChild(website);

        membersContainer.appendChild(card);
    });
}

getMembers();

gridButton.addEventListener("click", () => {
    membersContainer.classList.add("grid");
    membersContainer.classList.remove("list");
});

listButton.addEventListener("click", () => {
    membersContainer.classList.add("list");
    membersContainer.classList.remove("grid");
});