var database = require("../database/config")
//! Alterar as querys do banco de dados para letra maiuscula, para ser padronizado ao banco
function autenticar(email, senha) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function entrar(): ", email, senha)
    var instrucaoSql = `
        SELECT u.idUsuario, u.Nome, u.Senha, u.Email, u.fk_idGenero, c.idCargos, c.Nome 
        FROM Usuario u
        JOIN Cargos c ON u.fk_cargos = c.idCargos
        WHERE u.email = '${email}' AND u.senha = '${senha}';
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

//! Trocar o js do front 
function cadastrar(nome,senha, email, sexo, cargoId, idGenero) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrar():", nome, email, senha);
    
    var instrucaoSql = `
        INSERT INTO Usuario(Nome, Senha, Email, fk_cargos, fk_idGenero) VALUES ('${nome}', '${email}', '${senha}', '${sexo}', '${cargoId}', '${idGenero}');
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function buscarPorEmail (email) {
    var instrucao = `SELECT * FROM Usuario WHERE Email = '${email}'`;
    return database.executar(instrucao);
  }

  function editar(idUsuario, nome,senha, email, idGenero , cargoId) {
    console.log("ACESSEI O AVISO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function editar(): ", novaDescricao, idAviso);
    var instrucaoSql = `
        UPDATE Usuario SET 
        Nome = '${nome}', 
        Senha = '${senha}', 
        Email = '${email}',
        fk_cargos = '${cargoId}',
        fk_idGenero = '${idGenero}',
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
    deletar
};
