var express = require("express");
var router = express.Router();

var energiaController = require("../controllers/energiaController");

// Rota para buscar os dados de energia por ano
router.get("/energia", function (req, res) {
    energiaController.buscarEnergia(req, res);
});

// Rota para buscar metas de um usuário específico
router.get("/metas/:idUsuario", function (req, res) {
    energiaController.buscarMetasUsuario(req, res);
});

// Rota para buscar metas de todos os usuários
router.get("/metas", function (req, res) {
    energiaController.buscarTodasMetas(req, res);
});

module.exports = router;
