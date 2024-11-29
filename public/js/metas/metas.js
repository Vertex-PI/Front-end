function publicar() {
    var idEmpresa = sessionStorage.ID_EMPRESA;
  
    // Valida o ID da empresa
    if (!idEmpresa) {
      console.log("Valor de idEmpresa:", idEmpresa);
      Swal.fire({
        icon: "error",
        title: "Erro",
        text: "Usuário não autenticado.",
        backdrop: false,
      });
      return false;
    }
  
    // Obtém os valores do formulário
    var gastoEmReais = parseFloat(document.getElementById("gastoEmReais").value.trim());
    var gastoEnergetico = parseFloat(document.getElementById("gastoEnergetico").value.trim());
    var mesReferencia = document.getElementById("mesReferencia").value;
  
    // Valida os campos do formulário
    if (isNaN(gastoEmReais) || isNaN(gastoEnergetico) || !mesReferencia) {
      Swal.fire({
        icon: "warning",
        title: "Atenção",
        text: "Por favor, preencha todos os campos!",
        backdrop: false,
      });
      return false;
    }
  
    // Cria o corpo da requisição
    var corpo = {
      gastoEmReais: gastoEmReais,
      gastoEnergetico: gastoEnergetico,
      mes: mesReferencia,
      fk_idEmpresa: idEmpresa,
    };
  
    console.log("Corpo da requisição: ", corpo);
  
    // Envia a requisição ao backend
    fetch(`/metas/publicar/${idEmpresa}`, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(corpo),
    })
      .then(async function (resposta) {
        const respostaCorpo = await resposta.text();
        console.log("Corpo da resposta: ", respostaCorpo);
  
        if (resposta.ok) {
          // Exibe um alerta de sucesso usando SweetAlert2
          Swal.fire({
            icon: "success",
            title: "Sucesso",
            text: `Meta publicada com sucesso pela Empresa: ${idEmpresa}!`,
            backdrop: false,
          }).then(() => {
            // Redireciona para outra página após o alerta
            window.location = "./metas.html";
          });
        } else if (resposta.status == 404) {
          Swal.fire({
            icon: "error",
            title: "Erro 404",
            text: "Página não encontrada!",
            backdrop: false,
          });
        } else {
          throw new Error(`Houve um erro ao tentar realizar a postagem! Código da resposta: ${resposta.status}`);
        }
      })
      .catch(function (erro) {
        console.error(`#ERRO: ${erro}`);
        Swal.fire({
          icon: "error",
          title: "Erro",
          text: `Ocorreu um erro inesperado: ${erro.message}`,
          backdrop: false,
        });
      });
  
    return false;
  }
  
  function modificarMeta() {
    document.getElementById("div-adc-usuario").style.display = "none";
    document.getElementById("div-editar-conta").style.display = "none";
    document.getElementById("div-edit-cargo").style.display = "none";
    document.getElementById("div-mudar-cargo").style.display = "none";
    document.getElementById("div-usuarios").style.display = "none";
    document.getElementById("div-criar-cargo").style.display = "none";
    document.getElementById("div-alterar-senha").style.display = "none";
    document.getElementById("div-modificar-metas").style.display = "flex";
    document.getElementById("div-modificar-cargo").style.display = "none";
    
    document.getElementById("opt-cadastro").style.fontWeight = "400";
    document.getElementById("opt-editar-conta").style.fontWeight = "400";
    document.getElementById("opt-editar-cargo").style.fontWeight = "400";
    document.getElementById("opt-criar-cargo").style.fontWeight = "400";
    document.getElementById("opt-alterar-senha").style.fontWeight = "400";
    document.getElementById("opt-alt-del-metas").style.fontWeight = "700";
    document.getElementById("opt-alt-del-cargos").style.fontWeight = "400";
}