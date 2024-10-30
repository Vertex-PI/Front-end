var database = require("../database/config");

function buscarPorId(id) {
  var instrucaoSql = `SELECT * FROM Cargos WHERE idCargos = '${id}'`;

  return database.executar(instrucaoSql);
}

function listar() {
  var instrucaoSql = `SELECT * FROM Cargos`;

  return database.executar(instrucaoSql);
}

module.exports = { buscarPorId, listar };
