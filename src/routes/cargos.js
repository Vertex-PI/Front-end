var express = require("express");
var router = express.Router();

var cargosController = require("../controllers/cargosController");

router.post("/cadastrar", function (req, res) {
    cargosController.cadastrar(req, res);
})

router.get("/buscar/:id", function (req, res) {
  cargosController.buscarPorId(req, res);
});

router.get("/listar", function (req, res) {
  cargosController.listar(req, res);
});

router.get("/editar/:idCargo", function (req, res) {
  cargosController.editar(req, res);
});

module.exports = router;