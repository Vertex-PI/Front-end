var metasModel = require("../models/metasModel");

function listarMetas(req, res) {
  metasModel.listarMetas()
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
  var gastoEmReais = req.body.gastoEmReais; 
  var gastoEnergetico = req.body.gastoEnergetico;
  var mes = req.body.mes;
  var fk_idEmpresa = req.body.fk_idEmpresa;

  if (gastoEmReais === undefined) {
    return res.status(400).send("O gasto em reais está indefinido!");
  } else if (gastoEnergetico === undefined) {
    return res.status(400).send("O consumo energético (kWh) está indefinido!");
  } else if (mes === undefined) {
    return res.status(400).send("O mês está indefinido!");
  } else if (fk_idEmpresa === undefined) {
    return res.status(403).send("A empresa não está definida!");
  }

  metasModel.verificarMetaExistente(mes, fk_idEmpresa)
    .then(function (metaExistente) {
      if (metaExistente.length > 0) {
        return res.json({ 
          success: false, 
          message: "Já existe uma meta cadastrada para este mês para esta empresa. Não é possível cadastrar uma nova meta." 
        });
      } else {
        metasModel.publicar(gastoEmReais, gastoEnergetico, mes, fk_idEmpresa)
          .then(function (resultado) {
            res.json({ success: true, message: "Meta publicada com sucesso!" });
          })
          .catch(function (erro) {
            console.log(erro);
            res.status(500).json({ error: erro.sqlMessage });
          });
      }
    })
    .catch(function (erro) {
      console.log(erro);
      res.status(500).json({ error: "Erro ao verificar a existência da meta", errorDetail: erro.sqlMessage });
    });
}


function editar(req, res) {
  var novoGasto = req.body.gastoEmReais;
  var novoKwh = req.body.gastoEnergetico;
  var idMetas = req.params.idMetas;

  metasModel.editar(novoGasto, novoKwh, idMetas)
    .then(function (resultado) {
      res.json(resultado);
    })
    .catch(function (erro) {
      console.log(erro);
      console.log("Houve um erro ao editar a meta: ", erro.sqlMessage);
      res.status(500).json(erro.sqlMessage);
    });
}


function deletarMetas(req, res) {
  const idMetas = req.params.idMetas; 
  console.log("ID da Meta a ser deletada: ", idMetas); 

  metasModel.deletarMetas(idMetas)
      .then(function (resultado) {
          res.json(resultado);
      })
      .catch(function (erro) {
          console.log("Erro ao deletar meta:", erro);
          res.status(500).json(erro.sqlMessage);
      });
}

module.exports = {
  listarMetas,
  publicar,
  editar,
  deletarMetas,
};
