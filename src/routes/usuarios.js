var express = require("express");
var router = express.Router();

var usuarioController = require("../controllers/usuarioController");

router.get("/listar", function (req, res) {
    usuarioController.listar(req, res);
});

router.get("/listarPorUsuario/:idUsuario", function (req, res) {
    usuarioController.listarPorUsuario(req, res);
});

router.post("/cadastrar", function (req, res) {
    usuarioController.cadastrar(req, res);
})

router.post("/autenticar", function (req, res) {
    usuarioController.autenticar(req, res);
});

router.put("/editar/:idUsuario", function (req, res) {
    usuarioController.editar(req, res);
});

router.put("/editarSenha/:idUsuario", function (req, res) {
    usuarioController.editarSenha(req, res);
});

router.put("/editarCargo/:idUsuario", function (req, res) {
    usuarioController.editarCargo(req, res);
});

router.delete("/deletar/:idUsuario", function (req, res) {
    usuarioController.deletar(req, res);
});


module.exports = router;