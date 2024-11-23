var database = require("../database/config")

// Lista a empresa daquele usuário
function listar(idUsuario){
    console.log(`Listando empresa para o usuário ${idUsuario}`);
    const instrucaoSql = `
     SELECT 
            e.idEmpresa, 
            e.nome
        FROM 
            Empresa e
        INNER JOIN 
            Usuario u 
        ON 
            e.idEmpresa = u.fk_idEmpresa
        WHERE 
            u.idUsuario = ${idUsuario};
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}


module.exports = {
    listar,
};