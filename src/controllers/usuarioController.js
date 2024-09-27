var usuarioModel = require("../models/usuarioModel");
var cargosModel = require("../models/cargosModel");

function autenticar(req, res) {
  var email = req.body.emailServer;
  var senha = req.body.senhaServer;

  if (email == undefined) {
    res.status(400).send("Seu email está undefined!");
  } else if (senha == undefined) {
    res.status(400).send("Sua senha está indefinida!");
  } else {
    usuarioModel
      .autenticar(email, senha)
      .then(function (resultadoAutenticar) {
        console.log(`\nResultados encontrados: ${resultadoAutenticar.length}`);
        console.log(`Resultados: ${JSON.stringify(resultadoAutenticar)}`); 

        if (resultadoAutenticar.length == 1) {
          console.log(resultadoAutenticar);
          cargosModel
            .buscarCargosPorFuncionario(resultadoAutenticar[0].idFuncionario)
            .then((resultadoCargos) => {
              if (resultadoCargos.length > 0) {
                res.json({
                  id: resultadoAutenticar[0].idFuncionario,
                  email: resultadoAutenticar[0].emailFuncionario,
                  nome: resultadoAutenticar[0].nomeFuncionario,
                  senha: resultadoAutenticar[0].senhaFuncionario,
                  cargos: resultadoCargos
                });
              } else {
                res.status(204).json({ cargos: [] });
              }
            });
        } else if (resultadoAutenticar.length == 0) {
          res.status(403).send("Email e/ou senha inválido(s)");
        } else {
          res.status(403).send("Mais de um usuário com o mesmo login e senha!");
        }
      })
      .catch(function (erro) {
        console.log(erro);
        console.log(
          "\nHouve um erro ao realizar o login! Erro: ",
          erro.sqlMessage,
        );
        res.status(500).json(erro.sqlMessage);
      });
  }
}

function cadastrar(req, res) {

  var nome = req.body.nomeServer;
  var email = req.body.emailServer;
  var senha = req.body.senhaServer;
  var cargoId = req.body.cargoServer;

  if (nome == undefined) {
    res.status(400).send("Seu nome está undefined!");
  } else if (email == undefined) {
    res.status(400).send("Seu email está undefined!");
  } else if (senha == undefined) {
    res.status(400).send("Sua senha está undefined!");
  } else if (cargoId == undefined) {
    res.status(400).send("Seu cargo está undefined!");
  }
  else
    usuarioModel
      .cadastrar(nome, email, senha, cargoId)
      .then(function (resultado) {
        res.json(resultado);
      })
      .catch(function (erro) {
        console.log(erro);
        console.log(
          "\nHouve um erro ao realizar o cadastro! Erro: ",
          erro.sqlMessage,
        );
        res.status(500).json(erro.sqlMessage);
      });
}

module.exports = {
  autenticar,
  cadastrar,
};
