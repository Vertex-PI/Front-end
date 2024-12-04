var database = require("../database/config");

function buscarSetoresAltosGastosMesAnterior() {
    var instrucaoSql = `
 SELECT
    COUNT(DISTINCT local) AS totalLocaisComAltosGastos
FROM Energia
WHERE
    mes = MONTHNAME(DATE_SUB(CURDATE(), INTERVAL 2 MONTH))
    AND ano = YEAR(CURDATE())
    AND gastoEmReais > 10000;
    `;
  
    console.log("Executando a instrução SQL para buscar setores com altos gastos no mês anterior: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
  }
  

  function buscarComparacaoMesAtual() {
    var instrucaoSql = `
    SELECT
    COUNT(*) AS totalMetasAtingidas
FROM (
    SELECT
        m.mes,
        SUM(e.gastoEnergetico) AS totalEnergiaConsumida,
        m.gastoEnergetico AS totalMetaEnergia
    FROM
        Metas m
    JOIN
        Energia e ON e.fk_empresa = m.fk_empresa
                   AND e.mes = m.mes
    WHERE
        e.fk_empresa = 1
        AND e.ano = YEAR(CURDATE())
    GROUP BY
        m.mes, m.gastoEnergetico
    HAVING
        totalEnergiaConsumida <= totalMetaEnergia
) AS metasAtingidas;  
    `;
  
    console.log("Executando a instrução SQL para comparar o mês atual com outros meses: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
  }

  function buscarMetaAtingida() {
    var instrucaoSql = `
SELECT
    ROUND(SUM(CASE WHEN e.ano = YEAR(CURDATE()) THEN e.gastoEnergetico ELSE 0 END), 2) AS totalAnoAtual,
    ROUND(SUM(CASE WHEN e.ano = YEAR(CURDATE()) - 1 THEN e.gastoEnergetico ELSE 0 END), 2) AS totalAnoAnterior,
    ROUND(
        (
            (SUM(CASE WHEN e.ano = YEAR(CURDATE()) THEN e.gastoEnergetico ELSE 0 END) - 
             SUM(CASE WHEN e.ano = YEAR(CURDATE()) - 1 THEN e.gastoEnergetico ELSE 0 END))
            / NULLIF(SUM(CASE WHEN e.ano = YEAR(CURDATE()) - 1 THEN e.gastoEnergetico ELSE 0 END), 0)
        ) * 100, 2
    ) AS porcentagemAtingida
FROM
    Energia e
WHERE
    e.fk_empresa = 1
    AND e.ano IN (YEAR(CURDATE()), YEAR(CURDATE()) - 1);
    `;
  
    console.log("Executando a instrução SQL para buscar porcentagem da meta atingida: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
  }

module.exports = {
    buscarSetoresAltosGastosMesAnterior,
    buscarComparacaoMesAtual,
    buscarMetaAtingida
};
