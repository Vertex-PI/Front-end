var express = require("express");
var router = express.Router();

var cargosController = require("../controllers/cargosController");

/* Caso tenha uma tela para cadastro de cargos*/
router.post("/cadastrar", function (req, res) {
    cargosController.cadastrar(req, res);
})

router.get("/buscar/:id", function (req, res) {
  cargosController.buscarPorId(req, res);
});

router.get("/listar", function (req, res) {
  cargosController.listar(req, res);
});

module.exports = router;