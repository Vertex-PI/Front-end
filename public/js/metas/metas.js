function publicar() {
  // var idUsuario = sessionStorage.getItem("ID_USUARIO");
  var idEmpresa = sessionStorage.getItem("ID_EMPRESA");

    if( !idEmpresa){
        console.log("Valor de idEmpresa:", idEmpresa);
        window.alert("Erro: Usuário não autenticado.");
        return false;
    }

  // Captura os valores dos inputs
  var gastoEmReais = parseFloat(document.getElementById("gastoEmReais").value.trim());
  var gastoEnergetico = parseFloat(document.getElementById("gastoEnergetico").value.trim());
  var mesReferencia = document.getElementById("mesReferencia").value;

  // Verifica se todos os campos foram preenchidos
  if (isNaN(gastoEmReais) || isNaN(gastoEnergetico) || !mesReferencia) {
      window.alert("Por favor, preencha todos os campos!");
      return false;
  }

  var corpo = {
      gasto: gastoEmReais, // Ajuste para o nome correto
      kwh: gastoEnergetico,
      mes: mesReferencia,
      fk_idEmpresa: idEmpresa 
  };

  console.log("Corpo da requisição: ", corpo); // Para depuração

  fetch(`/metas/publicar/${idEmpresa}`, {
      method: "post",
      headers: {
          "Content-Type": "application/json"
      },
      body: JSON.stringify(corpo)
  }).then(async function (resposta) {
      const respostaCorpo = await resposta.text(); // Lê o corpo da resposta
      console.log("Corpo da resposta: ", respostaCorpo); // Mostra no console

      if (resposta.ok) {
          window.alert("Meta publicada com sucesso pela Empresa: " + idEmpresa + "!");
          window.location = "../pages/dashboard/metas.html";
      } else if (resposta.status == 404) {
          window.alert("Erro 404: Página não encontrada!");
      } else {
          throw new Error("Houve um erro ao tentar realizar a postagem! Código da resposta: " + resposta.status);
      }
  }).catch(function (erro) {
      console.log(`#ERRO: ${erro}`);
  });

  return false;
}

document.getElementById("btnSalvar").addEventListener("click", publicar);