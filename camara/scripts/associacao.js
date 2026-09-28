// ==============================
// REGISTRO DE DATA E HORA
// ==============================

const campoDataHora = document.querySelector("#registro-data-hora");

if (campoDataHora) {
    campoDataHora.value = new Date().toISOString();
}


// ==============================
// MODAIS DOS NÍVEIS DE ASSOCIAÇÃO
// ==============================

const botoesModal = document.querySelectorAll("[data-modal]");

botoesModal.forEach((botao) => {
    botao.addEventListener("click", () => {
        const idModal = botao.dataset.modal;
        const modal = document.getElementById(idModal);

        if (modal) {
            modal.showModal();
        }
    });
});


// ==============================
// FECHAR MODAIS
// ==============================

const botoesFechar = document.querySelectorAll(".fechar-modal");

botoesFechar.forEach((botao) => {
    botao.addEventListener("click", () => {
        const modal = botao.closest("dialog");

        if (modal) {
            modal.close();
        }
    });
});


// ==============================
// FECHAR AO CLICAR FORA DO MODAL
// ==============================

const modais = document.querySelectorAll("dialog");

modais.forEach((modal) => {
    modal.addEventListener("click", (evento) => {
        if (evento.target === modal) {
            modal.close();
        }
    });
});