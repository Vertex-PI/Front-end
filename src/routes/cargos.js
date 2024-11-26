var express = require("express");
var router = express.Router();

var cargosController = require("../controllers/cargosController");

router.post("/cadastrar", function (req, res) {
    cargosController.cadastrar(req, res);
})

router.get("/buscar/:idCargo", function (req, res) {
  cargosController.buscarPorId(req, res);
});

router.get("/listar", function (req, res) {
  cargosController.listar(req, res);
});

router.put("/editar/:idCargo", function (req, res) {
  cargosController.editar(req, res);
});

router.delete("/deletar/:idCargo", function (req, res) {
  cargosController.deletar(req, res);
});

module.exports = router;