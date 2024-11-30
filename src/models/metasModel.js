var database = require("../database/config")
//! Arrumar os crud para proxima sprint 
function listarMetas() {
    console.log("ACESSEI O AVISO  MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function listar()");
    var instrucaoSql = `
		SELECT 
              m.idMetas,
              m.gastoEmReais, 
              m.gastoEnergetico,
              m.mes,
              e.idEmpresa,
              e.nome
         FROM Metas m
              INNER JOIN Empresa e
                  ON m.fk_empresa = e.idEmpresa;
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function publicar(gastoEmReais, gastoEnergetico, mes, fk_idEmpresa) {
    var instrucaoSql = `
        INSERT INTO Metas (gastoEmReais, gastoEnergetico, mes, fk_empresa) VALUES (${gastoEmReais}, ${gastoEnergetico}, '${mes}', ${fk_idEmpresa});
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql, [gastoEmReais, gastoEnergetico, mes, fk_idEmpresa]);
}

function editar(gastoEmReais, gastoEnergetico, idMetas) {
    console.log("ACESSEI O AVISO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function editar(): ", idMetas, gastoEmReais, gastoEnergetico);
    var instrucaoSql = `
        UPDATE metas SET gastoEmReais = '${gastoEmReais}', gastoEnergetico = '${gastoEnergetico}' WHERE idMetas = ${idMetas};
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function deletarMetas(idMetas) {
    console.log("ACESSEI O AVISO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function deletar():", idMetas);
    var instrucaoSql = `
        DELETE FROM Metas WHERE idMetas = ${idMetas};
   `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

// Função para verificar se já existe uma meta para o mês e a empresa
function verificarMetaExistente(mes, fk_idEmpresa) {
    var instrucaoSql = `
        SELECT * FROM Metas 
        WHERE mes = '${mes}' AND fk_empresa = ${fk_idEmpresa};
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}


module.exports = {
    listarMetas,
    publicar, 
    editar,
    deletarMetas,
    verificarMetaExistente
};