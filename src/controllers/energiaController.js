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
function buscarMetasUsuario(req, res) {
  const idUsuario = req.params.idUsuario;

  console.log(`Recuperando metas de energia para o usuário com ID: ${idUsuario}`);

  energiaModel.buscarMetasUsuario(idUsuario).then(function (resultado) {
    if (resultado.length > 0) {
      res.status(200).json(resultado);
    } else {
      res.status(204).send("Nenhuma meta encontrada para este usuário!");
    }
  }).catch(function (erro) {
    console.log(erro);
    console.log("Houve um erro ao buscar as metas do usuário.", erro.sqlMessage);
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
  buscarMetasUsuario,
  buscarTodasMetas
};
