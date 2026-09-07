const url = "data/members.json";

async function getMembers() {
    const response = await fetch(url);
    const data = await response.json();

    console.log(data.members);
}

getMembers();