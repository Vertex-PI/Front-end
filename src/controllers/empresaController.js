var empresaModel = require("../models/empresaModel");

function listarEmpresa(req, res) {
    const idUsuario = req.query.idUsuario; 

    if(!idUsuario){
        return res.status(400).json({error:"O ID do usuário é obrigatório."});
    }

    empresaModel.listarEmpresa(idUsuario)
        .then(resultado => {
            if(resultado.length === 0){
                res.status(404).json({mensagem : "Nenhuma empresa encontrada para este usuário."});
            }else{
                res.status(200).json(resultado);
            }
        })
        .catch(erro => {
            console.error("Erro ao listar empresas:", erro);
            res.status(500).json({error: "Erro ao buscar empresas."});
        });
}

module.exports = {
    listarEmpresaPorUsuario
};