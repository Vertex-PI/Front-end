function editarPerfil() {
    document.getElementById("div-adc-usuario").style.display = "none";
    document.getElementById("div-editar-conta").style.display = "flex";
    document.getElementById("div-mudar-cargo").style.display = "none";
    document.getElementById("div-edit-cargo").style.display = "none";
    document.getElementById("div-usuarios").style.display = "none";
    document.getElementById("div-criar-cargo").style.display = "none";
    document.getElementById("div-alterar-senha").style.display = "none";
    document.getElementById("div-modificar-metas").style.display = "none";
    document.getElementById("div-modificar-cargo").style.display = "none";
    
    document.getElementById("opt-cadastro").style.fontWeight = "400";
    document.getElementById("opt-editar-conta").style.fontWeight = "700";
    document.getElementById("opt-editar-cargo").style.fontWeight = "400";
    document.getElementById("opt-criar-cargo").style.fontWeight = "400";
    document.getElementById("opt-alterar-senha").style.fontWeight = "400";
    document.getElementById("opt-alt-del-metas").style.fontWeight = "400";
    document.getElementById("opt-alt-del-cargos").style.fontWeight = "400";
    
}

function alterarSenha() {
    document.getElementById("div-adc-usuario").style.display = "none";
    document.getElementById("div-editar-conta").style.display = "none";
    document.getElementById("div-mudar-cargo").style.display = "none";
    document.getElementById("div-edit-cargo").style.display = "none";
    document.getElementById("div-usuarios").style.display = "none";
    document.getElementById("div-criar-cargo").style.display = "none";
    document.getElementById("div-alterar-senha").style.display = "flex";
    document.getElementById("div-modificar-metas").style.display = "none";
    document.getElementById("div-modificar-cargo").style.display = "none";
    
    document.getElementById("opt-cadastro").style.fontWeight = "400";
    document.getElementById("opt-editar-conta").style.fontWeight = "400";
    document.getElementById("opt-editar-cargo").style.fontWeight = "400";
    document.getElementById("opt-criar-cargo").style.fontWeight = "400";
    document.getElementById("opt-alterar-senha").style.fontWeight = "700";
    document.getElementById("opt-alt-del-metas").style.fontWeight = "400";
    document.getElementById("opt-alt-del-cargos").style.fontWeight = "400";
}

/* mostrar senha */

function show_password() {
    let ipt = document.getElementById("input_senha");
    let img = document.getElementById("eye-closed");
    
    if (ipt.type == "password") {
        ipt.type = "text";
        img.src = "../../img/open_eye.svg"
    } else {
        ipt.type = "password"
        img.src = "../../img/eye_closed.svg"
    }
}

function show_password_2() {
    let ipt = document.getElementById("input_confirmar_senha");
    let img = document.getElementById("eye-closed-2");

    if (ipt.type == "password") {
        ipt.type = "text";
        img.src = "../../img/open_eye.svg"
    } else {
        ipt.type = "password"
        img.src = "../../img/eye_closed.svg"
    }
}

function show_password_3() {
    let ipt = document.getElementById("input-alt-senha");
    let img = document.getElementById("eye-closed-3");

    if (ipt.type == "password") {
        ipt.type = "text";
        img.src = "../../img/open_eye.svg"
    } else {
        ipt.type = "password"
        img.src = "../../img/eye_closed.svg"
    }
}

function show_password_4() {
    let ipt = document.getElementById("input-nova-senha");
    let img = document.getElementById("eye-closed-4");

    if (ipt.type == "password") {
        ipt.type = "text";
        img.src = "../../img/open_eye.svg"
    } else {
        ipt.type = "password"
        img.src = "../../img/eye_closed.svg"
    }
}

function show_password_5() {
    let ipt = document.getElementById("input-confirmar-nova-senha");
    let img = document.getElementById("eye-closed-5");

    if (ipt.type == "password") {
        ipt.type = "text";
        img.src = "../../img/open_eye.svg"
    } else {
        ipt.type = "password"
        img.src = "../../img/eye_closed.svg"
    }
}