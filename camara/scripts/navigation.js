
const menuButton = document.querySelector("#menu");
const navigation = document.querySelector("#navigation");

menuButton.setAttribute("aria-expanded", "false");
menuButton.setAttribute("aria-controls", "navigation");

menuButton.addEventListener("click", () => {
    const isOpen = navigation.classList.toggle("open");

    menuButton.classList.toggle("open", isOpen);
    menuButton.setAttribute("aria-expanded", String(isOpen));

    menuButton.setAttribute(
        "aria-label",
        isOpen ? "Fechar menu de navegação" : "Abrir menu de navegação"
    );
});
