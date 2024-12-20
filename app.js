var ambiente_processo = 'producao';

var caminho_env = ambiente_processo === 'producao' ? '.env' : '.env.dev';

require("dotenv").config({ path: caminho_env });

var express = require("express");
var cors = require("cors");
var path = require("path");

var PORTA_APP = process.env.APP_PORT;
var HOST_APP = process.env.APP_HOST;

var app = express();

var indexRouter = require("./src/routes/index");
var usuariosRouter = require("./src/routes/usuarios"); 
var cargosRouter = require("./src/routes/cargos");
var metasRouter = require("./src/routes/metas");
var energiaRouter = require("./src/routes/energia");
var kpiRouter = require("./src/routes/kpi");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.use(cors());

app.use("/", indexRouter);
app.use("/usuarios", usuariosRouter); 
app.use("/cargos", cargosRouter);
app.use("/metas", metasRouter)
app.use("/energia", energiaRouter)
app.use("/kpi", kpiRouter)


app.listen(PORTA_APP, function () {
    console.log(`            
        _____ _____ _____ _____ _____ __ __ 
        |  |  |   __| __  |_   _|   __|  |  |
        |  |  |   __|    -| | | |   __|-   -|
         \___/ |_____|__|__| |_| |_____|__|__|
    \n\n                                                                                                 
    Servidor do seu site já está rodando! Acesse o caminho a seguir para visualizar .: http://${HOST_APP}:${PORTA_APP} :. \n\n
    Você está rodando sua aplicação em ambiente de .:${process.env.AMBIENTE_PROCESSO}:. \n\n`);
});
