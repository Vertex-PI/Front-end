const coresEmpresa = [
  "rgba(54, 162, 235, 0.5)", 
  "rgba(255, 206, 86, 0.5)",  
  "rgba(75, 192, 192, 0.5)", 
  "rgba(153, 102, 255, 0.5)",
  "rgba(255, 159, 64, 0.5)",  

];


//? Não entendi mas funcionou ->
//* Função para plotar os gráficos com dados de energia e metas de usuários
function plotarGraficos(resposta, metas) {
  console.log("Iniciando plotagem dos gráficos...");

  // Verificando se já existe um gráfico e destruindo-o
  const canvasKwh = document.getElementById('myChart');
  const canvasGasto = document.getElementById('myChart2');

  if (window.canvasKwh) {
    window.canvasKwh.destroy(); // Destroi o gráfico de KWh, se já existir
  }
  if (window.canvasGasto) {
    window.canvasGasto.destroy(); // Destroi o gráfico de Gasto, se já existir
  }

  const labels = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"];
  const dadosKwh = {};
  const dadosGasto = {};
  const metasPorEmpresa = {};
  if(resposta){
    resposta.forEach(registro => {
      const ano = registro.ano;
      if (!dadosKwh[ano]) {
        dadosKwh[ano] = new Array(12).fill(0);
        dadosGasto[ano] = new Array(12).fill(0);
      }
  
      const mesIndex = labels.indexOf(registro.mes.charAt(0).toUpperCase() + registro.mes.slice(1));
      if (mesIndex !== -1) {
        dadosKwh[ano][mesIndex] += parseFloat(registro.totalKwh);
        dadosGasto[ano][mesIndex] += parseFloat(registro.totalGasto);
      }
    });
  }else{
    console.log("Dados de energia não recebidos corretamente", resposta);
  }

  if(metas){

    metas.forEach((meta, index) => {
      const idEmpresa = meta.fk_idEmpresa;
      const mesIndex = labels.indexOf(meta.mes.charAt(0).toUpperCase() + meta.mes.slice(1));
  
      if (mesIndex !== -1) {
        if (!metasPorEmpresa[idEmpresa]) {
          metasPorEmpresa[idEmpresa] = {
            metasKwh: new Array(12).fill(0),
            metasGasto: new Array(12).fill(0),
            nome: meta.nome,
            cor: coresEmpresa[index % coresEmpresa.length],
          };
        }
  
        metasPorEmpresa[idEmpresa].metasKwh[mesIndex] = parseFloat(meta.Kwh);
        metasPorEmpresa[idEmpresa].metasGasto[mesIndex] = parseFloat(meta.Gastos);
      }
    });
  }else{
    console.log("Metas não recebidas corretamente", resposta);
  }

  const datasetsKwh = Object.keys(dadosKwh).map(ano => ({
    label: ano,
    data: dadosKwh[ano],
    backgroundColor: "rgba(255, 140, 0, 0.5)",
    borderColor: "rgba(255, 140, 0)",
    borderWidth: 2.5,
    barPercentage: 0.4,
    zIndex: 1
  }));

  const datasetsGasto = Object.keys(dadosGasto).map(ano => ({
    label: ano,
    data: dadosGasto[ano],
    backgroundColor: "rgba(255, 206, 86, 0.5)",
    borderColor: "rgba(255, 206, 86)",
    borderWidth: 2.5,
    barPercentage: 0.4,
    zIndex: 1
    
  }));

  Object.keys(metasPorEmpresa).forEach(idEmpresa => {
    const metasEmpresa = metasPorEmpresa[idEmpresa];

    datasetsKwh.push({
      label: `Meta Kwh ${metasEmpresa.nome}`,
      data: metasEmpresa.metasKwh,
      type: "line",
      borderColor: metasEmpresa.cor,
      fill: false,
      tension: 0.1,
      zIndex: 2
    });

    datasetsGasto.push({
      label: `Meta Gasto ${metasEmpresa.nome}`,
      data: metasEmpresa.metasGasto,
      type: "line",
      borderColor: metasEmpresa.cor,
      fill: false,
      tension: 0.1,
      zIndex: 2
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

  window.canvasKwh = new Chart(document.getElementById('myChart'), configKwh);
  window.canvasGasto = new Chart(document.getElementById('myChart2'), configGasto);
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
      console.log("Dados de enrgia recebidos:", dados); //Log de depuração
      
      if(Array.isArray(dados) && dados.length > 0){
        // Armazena os dados no objeto
        resultados.dados = dados;
        return fetch(`/energia/metas`); // Rota para todas as metas dos usuários
      }else{
        throw new Error("Dados de energia mal formatados ou vazios");
      }
    })
    .then(response => {
      if (!response.ok) {
        throw new Error(`Erro ao carregar as metas: ${response.status}`);
      }
      return response.json();
    })
    .then(metas => {
      console.log("Metas recebidas:", metas); // Adicionando log de depuração
      if (Array.isArray(metas) && metas.length > 0) {
        // Usa os dados armazenados e as metas
        plotarGraficos(resultados.dados, metas); // Passa os dados e as metas para a função
      } else {
        throw new Error("Metas mal formatadas ou vazias");
      }
    })
    .catch(error => {
      console.error("Erro ao carregar os dados ou as metas: ", error);
    });
}

// Chamando a função
obterDadosGrafico();
