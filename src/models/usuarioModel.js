var database = require("../database/config")
//! Alterar as querys do banco de dados para letra maiuscula, para ser padronizado ao banco
function autenticar(email, senha) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function entrar(): ", email, senha)
    var instrucaoSql = `
        SELECT u.idUsuario, u.nome, u.senha, u.email, u.fk_idEmpresa, c.idCargos, c.temPermissaoAdm
        FROM Usuario u
        JOIN Cargos c ON u.fk_cargos = c.idCargos
        WHERE u.email = '${email}' AND u.senha = '${senha}';
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

//! Trocar o js do front 
function cadastrar(nome,senha, email,cargoId,fk_idEmpresa) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrar():", nome, email, senha);
    
    var instrucaoSql = `
        INSERT INTO Usuario(nome, senha, email, fk_cargos, fk_idEmpresa) VALUES ('${nome}', '${email}', '${senha}', '${cargoId}', '${fk_idEmpresa}');
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function buscarPorEmail (email) {
    var instrucao = `SELECT * FROM Usuario WHERE email = '${email}'`;
    return database.executar(instrucao);
  }

function editar(nomeNovo, emailNovo, cargoIdNovo, idUsuario) {
    console.log("ACESSEI O AVISO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function editar(): ", idUsuario, nomeNovo , emailNovo, cargoIdNovo);
    var instrucaoSql = `
        UPDATE Usuario SET 
        nome = '${nomeNovo}',  
        email = '${emailNovo}',
        fk_cargos = ${cargoIdNovo}
        WHERE idUsuario = ${idUsuario};
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function editarSenha(senhaNovo, idUsuario) {
    console.log("ACESSEI O AVISO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function editar(): ", senhaNovo);
    var instrucaoSql = `
        UPDATE Usuario SET 
        senha = '${senhaNovo}'
        WHERE idUsuario = ${idUsuario};
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function deletar(idUsuario) {
    console.log("ACESSEI O AVISO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function deletar():", idAviso);
    var instrucaoSql = `
        DELETE FROM Usuario WHERE idUsuario= ${idUsuario};
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

module.exports = {
    autenticar,
    cadastrar, 
    buscarPorEmail,
    editar,
    editarSenha,
    deletar
};
