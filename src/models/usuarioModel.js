var database = require("../database/config")

function autenticar(email, senha) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function entrar(): ", email, senha)
    var instrucaoSql = `
        SELECT u.idUsuario, u.nome, u.senha, u.email, u.sexo, c.idCargos, c.Nome 
        FROM Usuario u
        JOIN Cargos c ON u.fk_cargos = c.idCargos
        WHERE u.email = '${email}' AND u.senha = '${senha}';
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function cadastrar(nome,senha, email, sexo, cargoId) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrar():", nome, email, senha);
    
    var instrucaoSql = `
        INSERT INTO Usuario(Nome, Senha, Email, Sexo, fk_cargos) VALUES ('${nome}', '${email}', '${senha}', '${sexo}', '${cargoId}');
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function buscarPorEmail (email) {
    var instrucao = `SELECT * FROM Usuario WHERE email = '${email}'`;
    return database.executar(instrucao);
  }

module.exports = {
    autenticar,
    cadastrar, 
    buscarPorEmail
};
