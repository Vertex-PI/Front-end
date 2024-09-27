var ambiente_processo = 'desenvolvimento';

var caminho_env = ambiente_processo === 'producao' ? '.env' : '.env.dev';

require("dotenv").config({ path: caminho_env });

var express = require("express");
var cors = require("cors");
var path = require("path");

var PORTA_APP = process.env.APP_PORT;
var HOST_APP = process.env.APP_HOST;

var app = express();

var indexRouter = require("./src/routes/index");
var usuarioRouter = require("./src/routes/usuarios"); 
var hotelRouter = require("./src/routes/cargos");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.use(cors());

app.use("/", indexRouter);
app.use("/usuarios", usuarioRouter); 
app.use("/cargos", cargosRouter);


app.listen(PORTA_APP, function () {
    console.log(`
 __      ________ _____ _______ ________   __   
 \ \    / /  ____|  __ \__   __|  ____\ \ / /
  \ \  / /| |__  | |__) | | |  | |__   \ V / 
   \ \/ / |  __| |  _  /  | |  |  __|   > <  
    \  /  | |____| | \ \  | |  | |____ / . \ 
     \/   |______|_|  \_\ |_|  |______/_/ \_\  

    \n\n\n                                                                                                 
    Servidor do seu site já está rodando! Acesse o caminho a seguir para visualizar .: http://${HOST_APP}:${PORTA_APP} :. \n\n
    Você está rodando sua aplicação em ambiente de .:${process.env.AMBIENTE_PROCESSO}:. \n\n`);
});
