var energiaModel = require("../models/energiaModel");

function buscarEnergia(req, res) {
  const anos = [2023, 2024]; // Modifique conforme necessário
  console.log(`Recuperando dados de energia para os anos: ${anos.join(", ")}`);

  energiaModel.buscarEnergia(anos).then(function (resultado) {
    if (resultado.length > 0) {
      res.status(200).json(resultado);
    } else {
      res.status(204).send("Nenhum resultado encontrado!");
    }
  }).catch(function (erro) {
    console.log(erro);
    console.log("Houve um erro ao buscar os dados de energia.", erro.sqlMessage);
    res.status(500).json(erro.sqlMessage);
  });
}

// Função para buscar metas associadas a um usuário específico
function buscarMetasEmpresa(req, res) {
  const idEmpresa = req.params.idEmpresa;

  console.log(`Recuperando metas de energia para a empresa com ID: ${idEmpresa}`);

  energiaModel.buscarMetasEmpresa(idEmpresa).then(function (resultado) {
    if (resultado.length > 0) {
      res.status(200).json(resultado);
    } else {
      res.status(204).send("Nenhuma meta encontrada para essa empresa!");
    }
  }).catch(function (erro) {
    console.log(erro);
    console.log("Houve um erro ao buscar as metas da empresa.", erro.sqlMessage);
    res.status(500).json(erro.sqlMessage);
  });
}

function buscarTodasMetas(req, res) {
    // Implementação para buscar todas as metas no banco de dados
    energiaModel.buscarTodasMetas().then(function (resultado) {
        if (resultado.length > 0) {
            res.status(200).json(resultado);
        } else {
            res.status(204).send("Nenhuma meta encontrada!");
        }
    }).catch(function (erro) {
        console.log("Houve um erro ao buscar as metas:", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}

module.exports = {
  buscarEnergia,
  buscarMetasEmpresa,
  buscarTodasMetas
};
