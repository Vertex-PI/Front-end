var kpiModel = require("../models/kpiModel");

function buscarSetoresAltosGastosMesAnterior(req, res) {
  console.log("Recuperando setores com altos gastos no mês anterior.");

  kpiModel.buscarSetoresAltosGastosMesAnterior().then(function (resultado) {
    if (resultado.length > 0) {
      res.status(200).json(resultado);
    } else {
      res.status(204).send("Nenhum setor com alto gasto encontrado para o mês anterior.");
    }
  }).catch(function (erro) {
    console.log("Houve um erro ao buscar os setores com altos gastos no mês anterior:", erro.sqlMessage);
    res.status(500).json(erro.sqlMessage);
  });
}

function buscarComparacaoMesAtual(req, res) {
  console.log("Comparando o mês atual com outros meses do ano.");

  kpiModel.buscarComparacaoMesAtual().then(function (resultado) {
    if (resultado.length > 0) {
      res.status(200).json(resultado);
    } else {
      res.status(204).send("Nenhum dado encontrado para o mês atual.");
    }
  }).catch(function (erro) {
    console.log("Houve um erro ao buscar os dados de comparação do mês atual:", erro.sqlMessage);
    res.status(500).json(erro.sqlMessage);
  });
}

function buscarMetaAtingida(req, res) {
  console.log("Recuperando porcentagem da meta atingida no mês atual.");

  kpiModel.buscarMetaAtingida().then(function (resultado) {
    if (resultado.length > 0) {
      res.status(200).json(resultado);
    } else {
      res.status(204).send("Nenhuma meta encontrada para o mês atual.");
    }
  }).catch(function (erro) {
    console.log("Houve um erro ao buscar a porcentagem da meta atingida:", erro.sqlMessage);
    res.status(500).json(erro.sqlMessage);
  });
}

module.exports = {
  buscarSetoresAltosGastosMesAnterior,
  buscarComparacaoMesAtual,
  buscarMetaAtingida
};
