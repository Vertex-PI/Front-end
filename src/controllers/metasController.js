var metasModel = require("../models/metasModel");

function listar(req, res) {
  metasModel.listar().then(function (resultado) {
      if (resultado.length > 0) {
          res.status(200).json(resultado);
      } else {
          res.status(204).send("Nenhum resultado encontrado!")
      }
  }).catch(function (erro) {
      console.log(erro);
      console.log("Houve um erro ao buscar os avisos: ", erro.sqlMessage);
      res.status(500).json(erro.sqlMessage);
  });
}

function publicar(req, res) {
  var gastos = req.body.gastos;
  var kwh = req.body.kwh;
  var mes = req.body.mes;
  var idUsuario = req.params.idUsuario;

  if (gastos == undefined) {
      res.status(400).send("O gasto está indefinido!");
  } else if (kwh == undefined) {
      res.status(400).send("A kwh está indefinido!");
  } else if (mes == undefined) {
      res.status(400).send("O mes está indefinido!");
  } else if (idUsuario == undefined) {
      res.status(403).send("O id do usuário está indefinido!");
  } else {
      metasModel.publicar(gastos, kwh, mes, idUsuario)
          .then(
              function (resultado) {
                  res.json(resultado);
              }
          )
          .catch(
              function (erro) {
                  console.log(erro);
                  console.log("Houve um erro ao realizar o post: ", erro.sqlMessage);
                  res.status(500).json(erro.sqlMessage);
              }
          );
  }
}

function editar(req, res) {
  var novoGasto = req.body.gastos;
  var novoKwh = req.body.kwh;
  var novoMes = req.body.mes;
  var idMetas = req.params.idMetas;

  metasModel.editar(novoGasto, novoKwh, novoMes, idMetas)
      .then(
          function (resultado) {
              res.json(resultado);
          }
      )
      .catch(
          function (erro) {
              console.log(erro);
              console.log("Houve um erro ao realizar o post: ", erro.sqlMessage);
              res.status(500).json(erro.sqlMessage);
          }
      );

}

function deletar(req, res) {
  var idMetas = req.params.idMetas;

  metasModel.deletar(idMetas)
      .then(
          function (resultado) {
              res.json(resultado);
          }
      )
      .catch(
          function (erro) {
              console.log(erro);
              console.log("Houve um erro ao deletar o post: ", erro.sqlMessage);
              res.status(500).json(erro.sqlMessage);
          }
      );
}

module.exports = {
  listar,
  publicar,
  editar,
  deletar
}