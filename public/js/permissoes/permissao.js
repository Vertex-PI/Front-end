var permissao = sessionStorage.getItem("PERMISSAO");

if (permissao != "SIM") {
 document.getElementById("opt-cadastro").style.display = "none";
 document.getElementById("opt-editar-cargo").style.display = "none";
 document.getElementById("opt-criar-cargo").style.display = "none";
 document.getElementById("opt-alt-del-metas").style.display = "none";
 document.getElementById("opt-alt-del-cargos").style.display = "none";
}
