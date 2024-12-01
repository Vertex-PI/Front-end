const coresEmpresa = [
  "rgba(54, 162, 235, 1)",
  "rgba(255, 206, 86, 0.5)",
  "rgba(75, 192, 192, 0.5)",
  "rgba(153, 102, 255, 0.5)",
  "rgba(255, 159, 64, 0.5)",
];

// Função para plotar os gráficos com dados de energia e metas
function plotarGraficos(dadosEnergia, metas) {
  console.log("Iniciando plotagem dos gráficos...");
  console.log("Dados de Energia:", dadosEnergia);
  console.log("Metas:", metas);

  if (!Array.isArray(dadosEnergia) || !Array.isArray(metas)) {
    console.error("Os dados ou metas não são arrays válidos.");
    return;
  }

  // Labels dos meses
  const labels = [
    "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho",
    "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro",
  ];

  const dadosKwh = {};
  const dadosGasto = {};
  const metasPorEmpresa = {};

  // Processando dados de energia
  dadosEnergia.forEach((registro, index) => {
    console.log(`Processando registro de energia [${index}]:`, registro);
    const ano = registro.ano;
    if (!dadosKwh[ano]) {
      dadosKwh[ano] = new Array(12).fill(0);
      dadosGasto[ano] = new Array(12).fill(0);
    }

    const mesIndex = labels.indexOf(
      registro.mes?.charAt(0).toUpperCase() + registro.mes?.slice(1)
    );
    if (mesIndex !== -1) {
      dadosKwh[ano][mesIndex] += parseFloat(registro.totalKwh) || 0;
      dadosGasto[ano][mesIndex] += parseFloat(registro.totalGasto) || 0;
    }
  });

  // Processando metas
  metas.forEach((meta, index) => {
    const mesIndex = labels.indexOf(
      meta.mes?.charAt(0).toUpperCase() + meta.mes?.slice(1)
    );
    if (mesIndex === -1) {
      console.warn(`Mês inválido na meta: ${meta.mes}`);
      return;
    }

    const idEmpresa = meta.fk_empresa; // Usando 'fk_empresa' para a chave da empresa
    if (!metasPorEmpresa[idEmpresa]) {
      metasPorEmpresa[idEmpresa] = {
        metasKwh: new Array(12).fill(0),
        metasGasto: new Array(12).fill(0),
        nome: meta.nome,
        cor: coresEmpresa[index % coresEmpresa.length],
      };
    }

    metasPorEmpresa[idEmpresa].metasKwh[mesIndex] = parseFloat(meta.gastoEnergetico) || 0;
    metasPorEmpresa[idEmpresa].metasGasto[mesIndex] = parseFloat(meta.gastoEmReais) || 0;
  });

  const coresKwh = [
    "rgba(54, 162, 235, 0.5)",
    "rgba(75, 192, 192, 0.5)", 
    "rgba(153, 102, 255, 0.5)", 
    "rgba(201, 203, 207, 0.5)", 
  ];
  
  const coresGasto = [
    "rgba(255, 205, 86, 0.5)", 
    "rgba(75, 192, 192, 0.5)", 
    "rgba(153, 102, 255, 0.5)",
    "rgba(201, 203, 207, 0.5)", 
  ];
  
  // Configuração dos datasets para Kwh
  const datasetsKwh = Object.keys(dadosKwh).map((ano, index) => ({
    label: `Consumo de Energia (${ano})`,
    data: dadosKwh[ano],
    backgroundColor: coresKwh[index % coresKwh.length],
    borderColor: coresKwh[index % coresKwh.length].replace("0.5", "1"),
    borderWidth: 2,
    barPercentage: 0.4,
  }));
  
  // Configuração dos datasets para Gasto
  const datasetsGasto = Object.keys(dadosGasto).map((ano, index) => ({
    label: `Gasto Total (${ano})`,
    data: dadosGasto[ano],
    backgroundColor: coresGasto[index % coresGasto.length],
    borderColor: coresGasto[index % coresGasto.length].replace("0.5", "1"),
    borderWidth: 2,
    barPercentage: 0.4,
  }));
  // Adicionando as metas ao gráfico
  Object.keys(metasPorEmpresa).forEach((idEmpresa) => {
    const metasEmpresa = metasPorEmpresa[idEmpresa];

    datasetsKwh.push({
      label: `Meta Kwh (${metasEmpresa.nome})`,
      data: metasEmpresa.metasKwh,
      type: "line",
      borderColor: metasEmpresa.cor,
      fill: false,
      tension: 0.1, 
      zIndex: 10,
      order: 2,
    });

    datasetsGasto.push({
      label: `Meta Gasto (${metasEmpresa.nome})`,
      data: metasEmpresa.metasGasto,
      type: "line",
      borderColor: metasEmpresa.cor,
      fill: false,
      tension: 0.1,
      zIndex: 10,
      order: 2,
    });
  });

  // Configuração do gráfico de Kwh
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
            callback: function (value) {
              return value.toLocaleString() + " kWh";
            },
          },
        },
      },
    },
  };

  // Configuração do gráfico de Gasto
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
            callback: function (value) {
              return "R$ " + value.toLocaleString();
            },
          },
        },
      },
    },
  };

  const canvasKwh = document.getElementById("myChart");
  const canvasGasto = document.getElementById("myChart2");

  if (window.canvasKwh) window.canvasKwh.destroy();
  if (window.canvasGasto) window.canvasGasto.destroy();

  window.canvasKwh = new Chart(canvasKwh, configKwh);
  window.canvasGasto = new Chart(canvasGasto, configGasto);
}

// Função para obter dados do backend e chamar a plotagem
function obterDadosGrafico() {
  fetch("/energia/energia")
    .then((response) => {
      if (!response.ok) {
        throw new Error(`Erro ao carregar dados de energia: ${response.status}`);
      }
      return response.json();
    })
    .then((dadosEnergia) => {
      return fetch("/energia/metas")
        .then((response) => {
          if (!response.ok) {
            throw new Error(`Erro ao carregar as metas: ${response.status}`);
          }
          return response.json().then((metas) => {
            plotarGraficos(dadosEnergia, metas);
          });
        });
    })
    .catch((error) => {
      console.error("Erro ao carregar os dados ou as metas:", error);
    });
}

// Chamando a função para obter os dados e exibir os gráficos
obterDadosGrafico();