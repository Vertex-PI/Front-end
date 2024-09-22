var usuarioModel = require("../models/usuarioModel");
var quartosModel = require("../models/quartosModel");

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

          quartosModel
            .buscarQuartosPorHotel(resultadoAutenticar[0].hotelId)
            .then((resultadoquartos) => {
              if (resultadoquartos.length > 0) {
                res.json({
                  id: resultadoAutenticar[0].idFuncionario,
                  email: resultadoAutenticar[0].emailFuncionario,
                  nome: resultadoAutenticar[0].nomeFuncionario,
                  senha: resultadoAutenticar[0].senhaFuncionario,
                  quartos: resultadoquartos
                });
              } else {
                res.status(204).json({ quartos: [] });
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
  var hotelId = req.body.hotelServer;

  // Faça as validações dos valores
  if (nome == undefined) {
    res.status(400).send("Seu nome está undefined!");
  } else if (email == undefined) {
    res.status(400).send("Seu email está undefined!");
  } else if (senha == undefined) {
    res.status(400).send("Sua senha está undefined!");
  } else if (hotelId == undefined) {
    res.status(400).send("Seu hotel está undefined!");
  }

  // Passe os valores como parâmetro e vá para o arquivo usuarioModel.js
  else
    usuarioModel
      .cadastrar(nome, email, senha, hotelId)
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
