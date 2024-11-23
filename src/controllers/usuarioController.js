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
    usuarioModel.autenticar(email, senha)
      .then(function (resultadoAutenticar) {
        console.log(`\nResultados encontrados: ${resultadoAutenticar.length}`);
        console.log(`Resultados: ${JSON.stringify(resultadoAutenticar)}`);

        if (resultadoAutenticar.length == 1) {
          res.json({
            id: resultadoAutenticar[0].idUsuario,
            email: resultadoAutenticar[0].email,
            nome: resultadoAutenticar[0].nome,
            senha: resultadoAutenticar[0].senha,
            sexo: resultadoAutenticar[0].sexo,
            cargo: resultadoAutenticar[0].Nome,
            idCargo: resultadoAutenticar[0].idCargos,
            fk_idEmpresa: resultadoAutenticar[0].fk_idEmpresa
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
  var sexo = req.body.sexoServer;
  var cargoId = req.body.cargoServer;

  if (nome == undefined) {
    res.status(400).send("Seu nome está undefined!");
  } else if (email == undefined) {
    res.status(400).send("Seu email está undefined!");
  } else if (senha == undefined) {
    res.status(400).send("Sua senha está undefined!");
  } else if (sexo == undefined) {
    res.status(400).send("Seu sexo está undefined!");
  } else if (cargoId == undefined) {
    res.status(400).send("Seu cargo está undefined!");
  } else {
    // Verificar se o email já existe no banco de dados
    usuarioModel.buscarPorEmail(email)
      .then(function (resultado) {
        if (resultado.length > 0) {
          res.status(409).send("Email já cadastrado!");
        } else {
          usuarioModel
            .cadastrar(nome, email, senha, sexo, cargoId)
            .then(function (resultadoCadastro) {
              res.json(resultadoCadastro);
            })
            .catch(function (erro) {
              console.log(erro);
              console.log("\nHouve um erro ao realizar o cadastro! Erro: ", erro.sqlMessage);
              res.status(500).json(erro.sqlMessage);
            });
        }
      })
      .catch(function (erro) {
        console.log("\nHouve um erro ao verificar o email! Erro: ", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
      });
  }
}

function listarUsuarios(req, res) {
  usuarioModel.listar()
    .then(function (resultado) {
      res.json(resultado);
    })
    .catch(function (erro) {
      console.log(erro);
      res.status(500).json(erro.sqlMessage);
    });
}


module.exports = {
  listarUsuarios,
  autenticar,
  cadastrar,
};
