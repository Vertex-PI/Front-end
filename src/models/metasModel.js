var database = require("../database/config")
//! Arrumar os crud para proxima sprint 
function listar() {
    console.log("ACESSEI O AVISO  MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function listar()");
    var instrucaoSql = `
        SELECT 
            m.idMetas,
            m.Gastos,
            m.Kwh,
            m.Mes,
            u.idUsuario,
            u.Nome,
            u.Email
        FROM aviso a
            INNER JOIN usuario u
                ON m.fk_idUsuario = u.id;
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function publicar(Gastos, Kwh, mes, fk_idUsuario) {
    var instrucaoSql = `
        INSERT INTO metas (Gastos, Kwh, Mes, fk_idUsuario) VALUES (${Gastos}, ${Kwh}, '${mes}', ${fk_idUsuario});
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function editar(idMetas,Gastos, Kwh, mes) {
    console.log("ACESSEI O AVISO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function editar(): ", novaDescricao, idAviso);
    var instrucaoSql = `
        UPDATE Metas SET Gastos = '${Gastos}', kwh = '${Kwh}', mes='${mes}' WHERE id = ${idMetas};
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function deletar(idMetas) {
    console.log("ACESSEI O AVISO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function deletar():", idAviso);
    var instrucaoSql = `
        DELETE FROM Metas WHERE id = ${idMetas};
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