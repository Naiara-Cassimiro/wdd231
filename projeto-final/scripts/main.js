const menuButton = document.querySelector("#menu");
const navigation = document.querySelector("#navigation");
const currentYear = document.querySelector("#currentyear");

menuButton.addEventListener("click", () => {
    menuButton.classList.toggle("open");
    navigation.classList.toggle("open");

    const isOpen = menuButton.classList.contains("open");

    menuButton.setAttribute(
        "aria-label",
        isOpen
            ? "Fechar menu de navegação"
            : "Abrir menu de navegação"
    );
});

currentYear.textContent = new Date().getFullYear();