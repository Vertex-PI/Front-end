var express = require("express");
var router = express.Router();

var metasController = require("../controllers/metasController");

router.get("/listarMetas", function (req, res) {
    metasController.listarMetas(req, res);
});

router.post("/publicar/:idEmpresa", function (req, res) {
    metasController.publicar(req, res);
});

router.put("/editar/:idMetas", function (req, res) {
    metasController.editar(req, res);
});

router.delete("/deletar/:idMetas", function (req, res) {
    metasController.deletarMetas(req, res);
});



module.exports = router;