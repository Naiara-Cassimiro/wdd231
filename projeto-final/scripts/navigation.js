/* jshint esversion: 8 */

/* =========================
   MENU DE NAVEGAÇÃO
========================= */

const menuButton = document.querySelector("#menu");
const navigation = document.querySelector("#navigation");

if (menuButton && navigation) {
    menuButton.addEventListener("click", () => {
        menuButton.classList.toggle("open");
        navigation.classList.toggle("open");

        const isOpen = navigation.classList.contains("open");
        const menuLabel = isOpen ? "Fechar menu de navegação" : "Abrir menu de navegação";

        menuButton.setAttribute("aria-label", menuLabel);
        menuButton.setAttribute("aria-expanded", isOpen);
    });
}