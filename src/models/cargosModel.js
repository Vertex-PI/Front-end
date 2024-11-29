const { deletarCargo } = require("../controllers/cargosController");
var database = require("../database/config");

function buscarPorId(id) {
  var instrucaoSql = `SELECT * FROM Cargos WHERE idCargos = '${id}'`;

  return database.executar(instrucaoSql);
}

function listar() {
  var instrucaoSql = `SELECT * FROM Cargos`;

  return database.executar(instrucaoSql);
}

function cadastrar(nome, temPermissaoAdm) {
  console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrar():", nome, temPermissaoAdm);
  
  var instrucaoSql = `
      INSERT INTO Cargos(nome, temPermissaoAdm) VALUES ('${nome}', '${temPermissaoAdm}');
  `;
  console.log("Executando a instrução SQL: \n" + instrucaoSql);
  return database.executar(instrucaoSql);
}

function editar(idCargo, nomeCargo, temPermissaoAdm) {
  console.log("ACESSEI O AVISO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function editar(): ", novaDescricao, idAviso);
  var instrucaoSql = `
      UPDATE Cargos SET nome = '${nomeCargo}', temPermissaoAdm = '${temPermissaoAdm}' WHERE idCargos = ${idCargo};
  `;
  console.log("Executando a instrução SQL: \n" + instrucaoSql);
  return database.executar(instrucaoSql);
}

function deletar(idCargo) {
  console.log("ACESSEI O AVISO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function deletar():", idAviso);
  var instrucaoSql = `
      DELETE FROM Cargos WHERE idCargos = ${idCargo};
  `;
  console.log("Executando a instrução SQL: \n" + instrucaoSql);
  return database.executar(instrucaoSql);
}

module.exports = { buscarPorId, listar, cadastrar, editar };
