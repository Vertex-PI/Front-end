const coresUsuarios = [
  "rgba(54, 162, 235, 0.5)", 
  "rgba(255, 206, 86, 0.5)",  
  "rgba(75, 192, 192, 0.5)", 
  "rgba(153, 102, 255, 0.5)",
  "rgba(255, 159, 64, 0.5)",  

];


// Função para plotar os gráficos com dados de energia e metas de usuários
function plotarGraficos(resposta, metas) {
  console.log("Iniciando plotagem dos gráficos...");

  const labels = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"];
  const dadosKwh = {};
  const dadosGasto = {};
  const metasPorUsuario = {};

  resposta.forEach(registro => {
    const ano = registro.Ano;
    if (!dadosKwh[ano]) {
      dadosKwh[ano] = new Array(12).fill(0);
      dadosGasto[ano] = new Array(12).fill(0);
    }

    const mesIndex = labels.indexOf(registro.Mes.charAt(0).toUpperCase() + registro.Mes.slice(1));
    if (mesIndex !== -1) {
      dadosKwh[ano][mesIndex] += parseFloat(registro.totalKwh);
      dadosGasto[ano][mesIndex] += parseFloat(registro.totalGasto);
    }
  });

  metas.forEach((meta, index) => {
    const idUsuario = meta.fk_idUsuario;
    const mesIndex = labels.indexOf(meta.Mes.charAt(0).toUpperCase() + meta.Mes.slice(1));

    if (mesIndex !== -1) {
      if (!metasPorUsuario[idUsuario]) {
        metasPorUsuario[idUsuario] = {
          metasKwh: new Array(12).fill(0),
          metasGasto: new Array(12).fill(0),
          nome: meta.nome,
          cor: coresUsuarios[index % coresUsuarios.length],
        };
      }

      metasPorUsuario[idUsuario].metasKwh[mesIndex] = parseFloat(meta.Kwh);
      metasPorUsuario[idUsuario].metasGasto[mesIndex] = parseFloat(meta.Gastos);
    }
  });

  const datasetsKwh = Object.keys(dadosKwh).map(ano => ({
    label: ano,
    data: dadosKwh[ano],
    backgroundColor: "rgba(255, 140, 0, 0.5)",
    borderColor: "rgba(255, 140, 0)",
    borderWidth: 2.5,
    barPercentage: 0.4,
  }));

  const datasetsGasto = Object.keys(dadosGasto).map(ano => ({
    label: ano,
    data: dadosGasto[ano],
    backgroundColor: "rgba(255, 206, 86, 0.5)",
    borderColor: "rgba(255, 206, 86)",
    borderWidth: 2.5,
    barPercentage: 0.4,
  }));

  Object.keys(metasPorUsuario).forEach(idUsuario => {
    const metasUsuario = metasPorUsuario[idUsuario];

    datasetsKwh.push({
      label: `Meta Kwh ${metasUsuario.nome}`,
      data: metasUsuario.metasKwh,
      type: "line",
      borderColor: metasUsuario.cor,
      fill: false,
      tension: 0.1,
    });

    datasetsGasto.push({
      label: `Meta Gasto ${metasUsuario.nome}`,
      data: metasUsuario.metasGasto,
      type: "line",
      borderColor: metasUsuario.cor,
      fill: false,
      tension: 0.1,
    });
  });

  const configKwh = {
    type: "bar",
    data: {
      labels: labels,
      datasets: datasetsKwh,
    },
    options: {
      scales: {
        y: {
          beginAtZero: true,
          ticks: {
            callback: function(value) {
              return value.toLocaleString() + ' kWh';
            }
          },
        },
      },
    },
  };

  const configGasto = {
    type: "bar",
    data: {
      labels: labels,
      datasets: datasetsGasto,
    },
    options: {
      scales: {
        y: {
          beginAtZero: true,
          ticks: {
            callback: function(value) {
              return 'R$ ' + value.toLocaleString();
            }
          },
        },
      },
    },
  };

  const myChartKwh = new Chart(document.getElementById('myChart'), configKwh);
  const myChartGasto = new Chart(document.getElementById('myChart2'), configGasto);
}

// Função para obter dados de energia e metas
function obterDadosGrafico() {
  // Cria um objeto para armazenar os dados
  let resultados = {};

  fetch('/energia/energia') // Rota para dados de energia
    .then(response => {
      if (!response.ok) {
        throw new Error(`Erro ao carregar dados de energia: ${response.status}`);
      }
      return response.json();
    })
    .then(dados => {
      // Armazena os dados no objeto
      resultados.dados = dados;
      return fetch(`/energia/metas`); // Rota para todas as metas dos usuários
    })
    .then(response => {
      if (!response.ok) {
        throw new Error(`Erro ao carregar as metas: ${response.status}`);
      }
      return response.json();
    })
    .then(metas => {
      // Usa os dados armazenados e as metas
      plotarGraficos(resultados.dados, metas); // Passa os dados e as metas para a função
    })
    .catch(error => {
      console.error("Erro ao carregar os dados ou as metas: ", error);
    });
}

// Chamando a função
obterDadosGrafico();
