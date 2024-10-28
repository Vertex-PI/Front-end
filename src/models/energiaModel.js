var database = require("../database/config");

function buscarEnergia(anos) {
  var instrucaoSql = `SELECT 
        Mes, 
        Ano, 
        SUM(Kwh) AS totalKwh, 
        SUM(Gasto) AS totalGasto
    FROM Energia
    WHERE Ano IN (${anos.join(", ")})
    GROUP BY Mes, Ano
    ORDER BY Ano, FIELD(Mes, 'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro')`;

  console.log("Executando a instrução SQL: \n" + instrucaoSql);
  return database.executar(instrucaoSql);
}

// Função para buscar metas associadas aos usuários
function buscarMetasUsuario(idUsuario) {
  var instrucaoSql = `SELECT 
        Mes, 
        Gastos AS metaGasto, 
        Kwh AS metaKwh 
    FROM metas
    WHERE fk_idUsuario = ${idUsuario}
    ORDER BY FIELD(Mes, 'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro')`;

  console.log("Executando a instrução SQL para buscar metas do usuário: \n" + instrucaoSql);
  return database.executar(instrucaoSql);
}

function buscarTodasMetas() {
  var instrucaoSql = `
    SELECT m.*, u.nome
    FROM metas m
    JOIN usuario u ON m.fk_idUsuario = u.idUsuario;
  `;

  console.log("Executando a instrução SQL para buscar metas do usuário: \n" + instrucaoSql);
  return database.executar(instrucaoSql);
}


module.exports = {
  buscarEnergia,
  buscarTodasMetas
};
