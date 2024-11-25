var metasModel = require("../models/metasModel");

function listar(req, res) {
  metasModel.listar()
    .then(function (resultado) {
      if (resultado.length > 0) {
        res.status(200).json(resultado);
      } else {
        res.status(204).send("Nenhum resultado encontrado!");
      }
    })
    .catch(function (erro) {
      console.log(erro);
      console.log("Houve um erro ao buscar os avisos: ", erro.sqlMessage);
      res.status(500).json(erro.sqlMessage);
    });
}

function publicar(req, res) {
  // Obtendo os dados do corpo da requisição
  var gastoEmReais = req.body.gastoEmReais; 
  var gastoEnergetico = req.body.gastoEnergetico;
  var mes = req.body.mes;
  var fk_idEmpresa = req.body.fk_idEmpresa; // Agora vem no body da requisição

  // Verifica se os campos estão indefinidos
  if (gastoEmReais === undefined) {
    return res.status(400).send("O gasto em reais está indefinido!");
  } else if (gastoEnergetico === undefined) {
    return res.status(400).send("O consumo energético (kWh) está indefinido!");
  } else if (mes === undefined) {
    return res.status(400).send("O mês está indefinido!");
  } else if (fk_idEmpresa === undefined) {
    return res.status(403).send("A empresa não está definida!");
  }

  // Chama a função do modelo para inserir os dados
  metasModel.publicar(gastoEmReais, gastoEnergetico, mes, fk_idEmpresa)
    .then(function (resultado) {
      res.json(resultado);
    })
    .catch(function (erro) {
      console.log(erro);
      console.log("Houve um erro ao realizar o post: ", erro.sqlMessage);
      res.status(500).json({ error: erro.sqlMessage });
    });
}

function editar(req, res) {
  var novoGasto = req.body.gastoEmReais;
  var novoKwh = req.body.gastoEnergetico;
  var novoMes = req.body.mes;
  var idMetas = req.params.idMetas;

  metasModel.editar(novoGasto, novoKwh, novoMes, idMetas)
    .then(function (resultado) {
      res.json(resultado);
    })
    .catch(function (erro) {
      console.log(erro);
      console.log("Houve um erro ao editar a meta: ", erro.sqlMessage);
      res.status(500).json(erro.sqlMessage);
    });
}

function deletar(req, res) {
  var idMetas = req.params.idMetas;

  metasModel.deletar(idMetas)
    .then(function (resultado) {
      res.json(resultado);
    })
    .catch(function (erro) {
      console.log(erro);
      console.log("Houve um erro ao deletar a meta: ", erro.sqlMessage);
      res.status(500).json(erro.sqlMessage);
    });
}

module.exports = {
  listar,
  publicar,
  editar,
  deletar,
};
