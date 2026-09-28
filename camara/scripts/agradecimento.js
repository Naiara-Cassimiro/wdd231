// ==============================
// DADOS RECEBIDOS DO FORMULÁRIO
// ==============================

const parametros = new URLSearchParams(window.location.search);

const nome = parametros.get("nome");
const sobrenome = parametros.get("sobrenome");
const email = parametros.get("email");
const telefone = parametros.get("telefone");
const organizacao = parametros.get("organizacao");
const registroDataHora = parametros.get("timestamp");


// ==============================
// ELEMENTOS DA PÁGINA
// ==============================

const nomeEnviado = document.querySelector("#nome-enviado");
const sobrenomeEnviado = document.querySelector("#sobrenome-enviado");
const emailEnviado = document.querySelector("#email-enviado");
const telefoneEnviado = document.querySelector("#telefone-enviado");
const organizacaoEnviada = document.querySelector("#organizacao-enviada");
const dataHoraEnviada = document.querySelector("#data-hora-enviada");


// ==============================
// EXIBIR INFORMAÇÕES
// ==============================

nomeEnviado.textContent = nome ?? "";
sobrenomeEnviado.textContent = sobrenome ?? "";
emailEnviado.textContent = email ?? "";
telefoneEnviado.textContent = telefone ?? "";
organizacaoEnviada.textContent = organizacao ?? "";


// ==============================
// FORMATAR DATA E HORA
// ==============================

if (registroDataHora) {
    const data = new Date(registroDataHora);

    if (!Number.isNaN(data.getTime())) {
        dataHoraEnviada.textContent = new Intl.DateTimeFormat(
            "pt-BR",
            {
                dateStyle: "long",
                timeStyle: "short"
            }
        ).format(data);
    } else {
        dataHoraEnviada.textContent = registroDataHora;
    }
}