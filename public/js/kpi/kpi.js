function carregarKPIs() {
    const hoje = new Date();
    hoje.setMonth(hoje.getMonth() - 2);

    const meses = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"];
    const mesAnterior = meses[hoje.getMonth()];

    console.log(mesAnterior);
    fetch("/kpi/setoresAltosGastos")
        .then((res) => res.json())
        .then((data) => {
            if (data.length > 0 && data[0].totalLocaisComAltosGastos !== undefined) {
                const indicadorSetores = document.getElementById('indicador_setores');
                const descricaoSetores = document.getElementById('descricao_setores');
                descricaoSetores.innerHTML = `No mês de <b>${mesAnterior}</b>`; // Mês do dado
            } else {
                console.log("Nenhum setor com altos gastos encontrado.");
            }
        })
        .catch((err) => console.error('Erro ao carregar setores com altos gastos:', err));


    // Buscar a porcentagem da meta atingida
    fetch("/kpi/metaAtingida")
        .then((res) => res.json())
        .then((data) => {
            if (data.length > 0 && data[0].porcentagemAtingida !== null) {
                const indicadorMeta = document.getElementById('indicador_meta');
                indicadorMeta.textContent = `${data[0].totalMetasAtingidas}`; // Porcentagem da meta
                const descricaoMeta = document.getElementById('descricao_meta');
            } else {
                console.log("Nenhum dado de meta atingida encontrado.");
            }
        })
        .catch((err) => console.error('Erro ao carregar meta atingida:', err));

    // Buscar dados de redução de gastos
    fetch("/kpi/reducaoGastos")
        .then((res) => res.json())
        .then((data) => {
            if (data.length > 0) {
                const indicadorReducao = document.getElementById('indicador_reducao');
                indicadorReducao.textContent = `${data[0].porcentagemAtingida}%`; // Porcentagem de redução de gastos
                const descricaoReducao = document.getElementById('descricao_reducao');
                descricaoReducao.textContent = "Comparado ao mês anterior";
            } else {
                console.log("Nenhum dado de redução de gastos encontrado.");
            }
        })
        .catch((err) => console.error('Erro ao carregar redução de gastos:', err));
}

// Chama a função assim que a página for carregada
document.addEventListener("DOMContentLoaded", function () {
    carregarKPIs();
});
