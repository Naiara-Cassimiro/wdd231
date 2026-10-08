/* jshint esversion: 8 */

const menuButton = document.querySelector("#menu");
const navigation = document.querySelector("#navigation");
const currentYear = document.querySelector("#currentyear");

menuButton.addEventListener("click", () => {
    menuButton.classList.toggle("open");
    navigation.classList.toggle("open");

    const isOpen = menuButton.classList.contains("open");

    const menuLabel = isOpen ? "Fechar menu de navegação" : "Abrir menu de navegação";

    menuButton.setAttribute("aria-label", menuLabel);
});

currentYear.textContent = new Date().getFullYear();