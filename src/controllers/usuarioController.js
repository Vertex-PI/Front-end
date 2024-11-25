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
            idCargo: resultadoAutenticar[0].idCargos,
            fk_idEmpresa: resultadoAutenticar[0].fk_idEmpresa,
            temPermissaoAdm: resultadoAutenticar[0].temPermissaoAdm
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
  var fk_idEmpresa = req.body.fk_idEmpresa; 

  if (nome == undefined) {
    res.status(400).send("Seu nome está undefined!");
  } else if (email == undefined) {
    res.status(400).send("Seu email está undefined!");
  } else if (senha == undefined) {
    res.status(400).send("Sua senha está undefined!"); 
  } else if (cargoId == undefined) {
    res.status(400).send("Seu cargo está undefined!");
  } else if (fk_idEmpresa == undefined) { 
    res.status(400).send("A empresa está undefined!");
  } else {
    usuarioModel.buscarPorEmail(email)
      .then(function (resultado) {
        if (resultado.length > 0) {
          res.status(409).send("Email já cadastrado!");
        } else {
          usuarioModel
            .cadastrar(nome, email, senha, cargoId, fk_idEmpresa)
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

function editar(req, res) {
  const idUsuario = req.params.idUsuario;
  const { nome, email, cargo } = req.body;

  if (!idUsuario || !nome || !email || !cargo) {
      res.status(400).send("Todos os campos devem ser preenchidos corretamente.");
      return;
  }

  usuarioModel.editar(nome, email, cargo, idUsuario)
      .then((resultado) => {
          res.json({ message: "Usuário atualizado com sucesso!" });
      })
      .catch((erro) => {
          console.log("Houve um erro ao editar usuário: ", erro.sqlMessage);
          res.status(500).json(erro.sqlMessage);
      });
}

function editarSenha(req, res) {
  const idUsuario = req.params.idUsuario;
  const { senha } = req.body;

  if (!idUsuario || !senha ) {
      res.status(400).send("Todos os campos devem ser preenchidos corretamente.");
      return;
  }

  usuarioModel.editarSenha(senha, idUsuario)
      .then((resultado) => {
          res.json({ message: "Senha atualizado com sucesso!" });
      })
      .catch((erro) => {
          console.log("Houve um erro ao editar usuário: ", erro.sqlMessage);
          res.status(500).json(erro.sqlMessage);
      });
}

module.exports = {
  autenticar,
  cadastrar,
  editar,
  editarSenha
};
