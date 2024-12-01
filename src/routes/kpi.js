var express = require("express");
var router = express.Router();

var kpiController = require("../controllers/kpiController");

router.get("/setoresAltosGastos", function (req, res) {
    kpiController.buscarSetoresAltosGastosMesAnterior(req, res);
});

router.get("/metaAtingida", function (req, res) {
    kpiController.buscarComparacaoMesAtual(req, res);
});

router.get("/reducaoGastos", function (req, res) {
    kpiController.buscarMetaAtingida(req, res);
});

module.exports = router;
