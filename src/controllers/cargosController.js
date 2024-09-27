var hotelModel = require("../models/cargosModel");

function listar(req, res) {
  hotelModel.listar().then((resultado) => {
    res.status(200).json(resultado);
  });
}

function buscarPorId(req, res) {
  var id = req.params.id;

  hotelModel.buscarPorId(id).then((resultado) => {
    res.status(200).json(resultado);
  });
}

module.exports = {
  buscarPorId,
  listar,
};
