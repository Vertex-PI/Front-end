var cargosModel = require("../models/cargosModel");
const { deletar } = require("./metasController");

function listar(req, res) {
  cargosModel.listar().then((resultado) => {
    res.status(200).json(resultado);
  });
}

function buscarPorId(req, res) {
  var id = req.params.id;

  cargosModel.buscarPorId(id).then((resultado) => {
    res.status(200).json(resultado);
  });
}

function cadastrar(req, res) {
  var nome = req.body.nomeServer;
  var permissao = req.body.permissaoServer;

  if (nome == undefined) {
    res.status(400).send("Seu nome está undefined!");
  } else if (permissao == undefined) {
    res.status(400).send("A permissão está undefined!");
  } else {
    cargosModel
      .cadastrar(nome, permissao)
      .then(function (resultadoCadastro) {
        res.json(resultadoCadastro);
      })
      .catch(function (erro) {
        console.log(erro);
        console.log(
          "\nHouve um erro ao realizar o cadastro! Erro: ",
          erro.sqlMessage
        );
        res.status(500).json(erro.sqlMessage);
      })
      .catch(function (erro) {
        console.log(
          "\nHouve um erro ao verificar o email! Erro: ",
          erro.sqlMessage
        );
        res.status(500).json(erro.sqlMessage);
      });
  }
}

function editar(req, res) {
  var novoNome = req.body.nomeCargo;
  var novoPermissao = req.body.permissao;
  var idCargos= req.params.idCargos;

  metasModel.editar(idCargos ,novoNome, novoPermissao)
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
  var idCargos = req.params.idCargos;

  metasModel.deletar(idCargos)
    .then(function (resultado) {
      res.json(resultado);
    })
    .catch(function (erro) {
      console.log(erro);
      console.log("Houve um erro ao deletar o Cargo: ", erro.sqlMessage);
      res.status(500).json(erro.sqlMessage);
    });
}

module.exports = {
  buscarPorId,
  listar,
  cadastrar,
  editar,
  deletar
};
