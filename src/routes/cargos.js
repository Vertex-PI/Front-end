var express = require("express");
var router = express.Router();

var cargosController = require("../controllers/cargosController");

router.post("/cadastrar", function (req, res) {
    cargosController.cadastrar(req, res);
})

router.get("/buscar/:idCargo", function (req, res) {
  cargosController.verificarAssociacao(req, res);
});

router.get("/verificarAssociacao/:idCargos", function (req, res) {
  cargosController.buscarPorId(req, res);
});

router.get("/listarCargos", function (req, res) {
  cargosController.listarCargos(req, res);
});

router.put("/editar/:idCargos", function (req, res) {
  cargosController.editar(req, res);
});

router.delete("/deletar/:idCargos", function (req, res) {
  cargosController.deletarCargo(req, res);
});

module.exports = router;