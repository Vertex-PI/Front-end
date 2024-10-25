var cargosModel = require("../models/cargosModel");

function listar(req, res) {
  cargosModel.listar().then((resultado) => {
    res.status(200).json(resultado);
  });
}

function buscarPorId(req, res) {
  var id = req.params.id;

  cargosModel.buscarPorId(id).then((resultado) => {
    res.status(200).json(resultado);
  });
}

module.exports = {
  buscarPorId,
  listar,
};
