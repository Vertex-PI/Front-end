var express = require("express");
var router = express.Router();

var generoController = require("../controllers/generoController");

router.get("/listar", function (req, res) {
    generoController.listar(req, res);
});

router.post("/publicar/:idUsuario", function (req, res) {
    generoController.publicar(req, res);
});

router.put("/editar/:idAviso", function (req, res) {
    generoController.editar(req, res);
});

router.delete("/deletar/:idAviso", function (req, res) {
    generoController.deletar(req, res);
});

module.exports = router;