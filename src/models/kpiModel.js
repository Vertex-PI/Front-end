var database = require("../database/config");

function buscarSetoresAltosGastosMesAnterior() {
    var instrucaoSql = `
    SELECT
        COUNT(DISTINCT local) AS totalLocaisComAltosGastos
    FROM Energia
    WHERE
        mes = MONTHNAME(DATE_SUB(CURDATE(), INTERVAL 1 MONTH))
        AND ano = YEAR(CURDATE())
        AND gastoEmReais > 100000;
    `;
  
    console.log("Executando a instrução SQL para buscar setores com altos gastos no mês anterior: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
  }
  

  function buscarComparacaoMesAtual() {
    var instrucaoSql = `
                  SELECT
        COUNT(*) AS totalMetasAtingidas
    FROM Metas m
    JOIN Energia e ON e.fk_empresa = m.fk_empresa AND e.mes = m.mes
    WHERE e.fk_empresa = 1
    AND e.ano = YEAR(CURDATE())
    AND e.gastoEnergetico >= m.gastoEnergetico;  
    `;
  
    console.log("Executando a instrução SQL para comparar o mês atual com outros meses: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
  }

  function buscarMetaAtingida() {
    var instrucaoSql = `
  SELECT
        ROUND((SUM(e.gastoEnergetico) / SUM(m.gastoEnergetico)) * 100, 2) AS porcentagemAtingida
    FROM Energia e
    JOIN Metas m ON e.fk_empresa = m.fk_empresa AND e.mes = m.mes
    WHERE e.fk_empresa = 1
    AND e.ano = YEAR(CURDATE())
    `;
  
    console.log("Executando a instrução SQL para buscar porcentagem da meta atingida: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
  }

module.exports = {
    buscarSetoresAltosGastosMesAnterior,
    buscarComparacaoMesAtual,
    buscarMetaAtingida
};
