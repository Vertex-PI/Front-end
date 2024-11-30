var cargosModel = require("../models/cargosModel");
const { deletar } = require("./metasController");

function listarCargos(req, res) {
  cargosModel.listarCargos().then((resultado) => {
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

  cargosModel.editar(idCargos ,novoNome, novoPermissao)
    .then(function (resultado) {
      res.json(resultado);
    })
    .catch(function (erro) {
      console.log(erro);
      console.log("Houve um erro ao editar a meta: ", erro.sqlMessage);
      res.status(500).json(erro.sqlMessage);
    });
}

function verificarAssociacao(req, res) {
  const idCargos = req.params.idCargos;

  cargosModel.verificarAssociacao(idCargos)
    .then(function (resultado) {
      if (resultado.length > 0) {
        res.json({ associado: true });
      } else {
        res.json({ associado: false });
      }
    })
    .catch(function (erro) {
      console.log("Erro ao verificar a associação do cargo:", erro);
      res.status(500).json({ error: "Erro ao verificar a associação do cargo." });
    });
}

function deletarCargo(req, res) {
  const idCargos = req.params.idCargos;

  cargosModel.verificarAssociacao(idCargos)
    .then((resultado) => {
      if (resultado.length > 0) {
        res.status(400).json({ mensagem: 'Este cargo está associado a um usuário e não pode ser deletado!' });
      } else {
        cargosModel.deletarCargo(idCargos)
          .then((resultado) => {
            res.json(resultado);
          })
          .catch((erro) => {
            console.log('Erro ao deletar o cargo:', erro);
            res.status(500).json(erro);
          });
      }
    })
    .catch((erro) => {
      console.error('Erro ao verificar a associação do cargo:', erro);
      res.status(500).json(erro);
    });
}
module.exports = {
  buscarPorId,
  listarCargos,
  cadastrar,
  editar,
  deletarCargo,
  verificarAssociacao
};
