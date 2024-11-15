var database = require("../database/config")
//! Arrumar os crud para proxima sprint 
function listar() {
    console.log("ACESSEI O AVISO  MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function listar()");
    var instrucaoSql = `
        SELECT 
            m.idMetas,
            m.gastoEmReais, 
            m.gastoEnergetico,
            m.mes,
            e.idEmpresa,
            e.nome, 
        FROM Metas ,
            INNER JOIN Empresa e
                ON m.fk_idEmpresa = e.id;
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function publicar(gastoEmReais, gastoEnergetico, mes, fk_idEmpresa) {
    var instrucaoSql = `
        INSERT INTO Metas (gastoEmReais, gastoEnergetico, mes, fk_idEmpresa) VALUES (${gastoEmReais}, ${gastoEnergetico}, '${mes}', ${fk_idEmpresa});
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function editar(idMetas, gastoEmReais, Kwh, mes) {
    console.log("ACESSEI O AVISO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function editar(): ", novaDescricao, idAviso);
    var instrucaoSql = `
        UPDATE metas SET gastoEmReais = '${gastoEmReais}', gastoEnergetico = '${gastoEnergetico}', mes='${mes}' WHERE idMetas = ${idMetas};
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function deletar(idMetas) {
    console.log("ACESSEI O AVISO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function deletar():", idAviso);
    var instrucaoSql = `
        DELETE FROM Metas WHERE idMetas = ${idMetas};
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

module.exports = {
    listar,
    publicar, 
    editar,
    deletar
};