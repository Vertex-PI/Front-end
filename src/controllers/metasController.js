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
    var gastoEmReais = req.body.gastoEmReais; // Ajustado para 'gastoEmReais'
    var gastoEnergetico = req.body.gastoEnergetico;
    var mes = req.body.mes;
    var idEmpresa = req.body.idEmpresa;

    var fk_idEmpresa = sessionStorage.getItem("fk_idEmpresa");

    // Verifica se os campos estão indefinidos
    if (gastoEmReais === undefined) {
        return res.status(400).send("O gasto está indefinido!"); // 'gastoEmReais' no singular
    } else if (gastoEnergetico === undefined) {
        return res.status(400).send("A kWh está indefinida!");
    } else if (mes === undefined) {
        return res.status(400).send("O mês está indefinido!");
    }else if (!fk_idEmpresa) {
        return res.status(403).send("A empresa não está indefinido!");
    }

    // Chama a função do modelo para inserir os dados
    metasModel.publicar(gastoEmReais, gastoEnergetico, mes, fk_idEmpresa)
        .then(function (resultado) {
            res.json(resultado);
        })
        .catch(function (erro) {
            console.log(erro);
            console.log("Houve um erro ao realizar o post: ", erro.sqlMessage);
            res.status(500).json({ error: erro.sqlMessage }); // Retorna um JSON consistente
        });
}


function editar(req, res) {
  var novoGasto = req.body.gastoEmReais;
  var novoKwh = req.body.gastoEnergetico;
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