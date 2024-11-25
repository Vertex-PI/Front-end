const perguntas = document.querySelectorAll(".div_faq");
const respostas = document.querySelectorAll(".span_resposta");

perguntas.forEach((pergunta) => {
    pergunta.addEventListener("click", () => {
        pergunta.classList.toggle("expanded");
        perguntas.forEach((p) => {
            if (p != pergunta) {
                p.classList.remove("expanded");
                const arrow = p.querySelector(".arrow_expandir_pergunta");
                arrow.style.transform = "rotate(0deg)";
            }
        });
        const arrow = pergunta.querySelector(".arrow_expandir_pergunta");
        if (pergunta.classList.contains("expanded")) {
            arrow.style.transform = "rotate(180deg)";
        } else {
            arrow.style.transform = "rotate(0deg)";
        }
    });
});

function switchStateSpan(id) {
    let span = document.getElementById(id);
    if (span.style.display == "none") {
        span.style.display = "block";
    } else {
        span.style.display = "none";
    }
    respostas.forEach((resposta) => {
        if (resposta.id != id) {
            resposta.style.display = "none";
        }
    });
}
