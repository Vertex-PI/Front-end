var database = require("../database/config");

function buscarEnergia(anos) {
  var instrucaoSql = `SELECT 
        mes, 
        ano, 
        SUM(gastoEnergetico) AS totalKwh, 
        SUM(gastoEmReais) AS totalGasto
    FROM Energia
    WHERE Ano IN (${anos.join(", ")})
    GROUP BY mes, ano
    ORDER BY ano, FIELD(mes, 'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro')`;

  console.log("Executando a instrução SQL: \n" + instrucaoSql);
  return database.executar(instrucaoSql);
}

//* Função para buscar metas associadas aos usuários
function buscarMetasUsuario(idUsuario) {
  var instrucaoSql = `SELECT 
        mes, 
        gastoEmReais AS metaGasto, 
        gastoEnergetico AS metaKwh 
    FROM metas
    WHERE fk_idUsuario = ${idUsuario}
    ORDER BY FIELD(Mes, 'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro')`;

  console.log("Executando a instrução SQL para buscar metas da empresa: \n" + instrucaoSql);
  return database.executar(instrucaoSql);
}

function buscarTodasMetas() {
  var instrucaoSql = `
    SELECT m.*, u.nome
    FROM Metas m
    JOIN Empresa e ON m.fk_idEmpresa = e.idEmpresa;
  `;

  console.log("Executando a instrução SQL para buscar metas da empresa: \n" + instrucaoSql);
  return database.executar(instrucaoSql);
}

module.exports = {
  buscarEnergia,
  buscarTodasMetas
};
