var express = require("express");
var router = express.Router();

var metasController = require("../controllers/metasController");

router.get("/listar", function (req, res) {
    metasController.listar(req, res);
});

router.post("/publicar/:idUsuario", function (req, res) {
    metasController.publicar(req, res);
});

router.put("/editar/:idAviso", function (req, res) {
    metasController.editar(req, res);
});

router.delete("/deletar/:idAviso", function (req, res) {
    metasController.deletar(req, res);
});

module.exports = router;