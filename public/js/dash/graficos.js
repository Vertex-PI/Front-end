var myChart = new Chart(document.getElementById('myChart'), {
  type: 'bar',
  data: {
    labels: ["Janeiro", "Fevereiro", "Março", "Abril", 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro',],
    datasets: [{
      label: "2023",
      data: [207132, 219230, 197480, 236068, 245263, 233135, 35, 25],
      backgroundColor: "#0d6efd",
      borderColor: 'transparent',
      borderWidth: 2.5,
      barPercentage: 0.4,
    }, {
      label: "2024",
      startAngle: 2,
      data: [216807, 222427, 196450, 243697, 242179, 233605, 25, 10],
      backgroundColor: "#dc3545",
      borderColor: 'transparent',
      borderWidth: 2.5,
      barPercentage: 0.4,
    }]
  },
  options: {
    scales: {
      yAxes: [{
        gridLines: {},
        ticks: {
          stepSize: 15,
        },
      }],
      xAxes: [{
        gridLines: {
          display: false,
        }
      }]
    }
  }
})

var myChart = new Chart(document.getElementById('myChart2'), {
    type: 'bar',
    data: {
      labels: ["Janeiro", "Fevereiro", "Março", "Abril", 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro',],
      datasets: [{
        label: "2023",
        data: [819690, 872247, 849509, 964.902, 824814, 233135, 35, 25],
        backgroundColor: "#0d6efd",
        borderColor: 'transparent',
        borderWidth: 2.5,
        barPercentage: 0.4,
      }, {
        label: "2024",
        startAngle: 2,
        data: [216807, 222427, 196450, 243697, 242179, 233605, 25, 10],
        backgroundColor: "#dc3545",
        borderColor: 'transparent',
        borderWidth: 2.5,
        barPercentage: 0.4,
      }]
    },
    options: {
      scales: {
        yAxes: [{
          gridLines: {},
          ticks: {
            stepSize: 15,
          },
        }],
        xAxes: [{
          gridLines: {
            display: false,
          }
        }]
      }
    }
  })
