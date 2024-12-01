function adicionarUsuario() {
    document.getElementById("div-adc-usuario").style.display = "flex";
    document.getElementById("div-editar-conta").style.display = "none";
    document.getElementById("div-mudar-cargo").style.display = "none";
    document.getElementById("div-edit-cargo").style.display = "none";
    document.getElementById("div-usuarios").style.display = "none";
    document.getElementById("div-criar-cargo").style.display = "none";
    document.getElementById("div-alterar-senha").style.display = "none";
    document.getElementById("div-modificar-metas").style.display = "none";
    document.getElementById("div-modificar-cargo").style.display = "none";
    document.getElementById("div-editar-cargo").style.display = "none";
    
    document.getElementById("opt-cadastro").style.fontWeight = "700";
    document.getElementById("opt-editar-conta").style.fontWeight = "400";
    document.getElementById("opt-editar-cargo").style.fontWeight = "400";
    document.getElementById("opt-criar-cargo").style.fontWeight = "400";
    document.getElementById("opt-alterar-senha").style.fontWeight = "400";
    document.getElementById("opt-alt-del-metas").style.fontWeight = "400";
    document.getElementById("opt-alt-del-cargos").style.fontWeight = "400";
    
}

function editarUsuario() {
    document.getElementById("div-adc-usuario").style.display = "none";
    document.getElementById("div-editar-conta").style.display = "none";
    document.getElementById("div-edit-cargo").style.display = "flex";
    document.getElementById("div-mudar-cargo").style.display = "none";
    document.getElementById("div-usuarios").style.display = "flex";
    document.getElementById("div-criar-cargo").style.display = "none";
    document.getElementById("div-alterar-senha").style.display = "none";
    document.getElementById("div-modificar-metas").style.display = "none";
    document.getElementById("div-modificar-cargo").style.display = "none";
    document.getElementById("div-editar-cargo").style.display = "none";
    
    document.getElementById("opt-cadastro").style.fontWeight = "400";
    document.getElementById("opt-editar-conta").style.fontWeight = "400";
    document.getElementById("opt-editar-cargo").style.fontWeight = "700";
    document.getElementById("opt-criar-cargo").style.fontWeight = "400";
    document.getElementById("opt-alterar-senha").style.fontWeight = "400";
    document.getElementById("opt-alt-del-metas").style.fontWeight = "400";
    document.getElementById("opt-alt-del-cargos").style.fontWeight = "400";
    
    
}

function edit_user_img() {
    document.getElementById("div-adc-usuario").style.display = "none";
    document.getElementById("div-editar-conta").style.display = "none";
    document.getElementById("div-mudar-cargo").style.display = "flex";
    document.getElementById("div-edit-cargo").style.display = "flex";
    document.getElementById("div-usuarios").style.display = "flex";
    document.getElementById("div-criar-cargo").style.display = "none";
    document.getElementById("div-alterar-senha").style.display = "none";
    document.getElementById("div-modificar-metas").style.display = "none";
    document.getElementById("div-modificar-cargo").style.display = "none";
    document.getElementById("div_cabecalho_func_filho").style.display = "none";
    
    document.getElementById("opt-cadastro").style.fontWeight = "400";
    document.getElementById("opt-editar-conta").style.fontWeight = "400";
    document.getElementById("opt-editar-cargo").style.fontWeight = "700";
    document.getElementById("opt-criar-cargo").style.fontWeight = "400";
    document.getElementById("opt-alterar-senha").style.fontWeight = "400";
    document.getElementById("opt-alt-del-metas").style.fontWeight = "400";
    document.getElementById("opt-alt-del-cargos").style.fontWeight = "700";
}