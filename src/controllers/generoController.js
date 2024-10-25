var generoModel = require("../models/generoModel");

function listar(req, res) {
  generoModel.listar().then(function (resultado) {
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
  var NomeGenero = req.body.NomeGenero;

  if (NomeGenero == undefined) {
      res.status(400).send("O Nome está indefinido!");
  } else {
      generoModel.publicar(NomeGenero)
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
  var NomeGenero = req.body.NomeGenero;

  generoModel.editar(NomeGenero)
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
  var idGenero = req.params.idGenero;

  generoModel.deletar(idGenero)
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