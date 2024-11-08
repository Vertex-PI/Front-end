function publicar() {
  var idUsuario = sessionStorage.ID_USUARIO;

  // Captura os valores dos inputs
  var valorGasto = document.querySelector("input[placeholder='R$00,00']").value;
  var kwhGasto = document.querySelector("input[placeholder='5000']").value;
  var mesReferencia = document.querySelector("select").value;

  // Verifica se todos os campos foram preenchidos
  if (!valorGasto || !kwhGasto || !mesReferencia) {
      window.alert("Por favor, preencha todos os campos!");
      return false;
  }

  var corpo = {
      gasto: parseFloat(valorGasto.replace('R$', '').replace(',', '.')), // Ajuste para o nome correto
      kwh: parseFloat(kwhGasto),
      mes: mesReferencia,
      fk_id_usuario: idUsuario 
  };

  console.log("Corpo da requisição: ", corpo); // Para depuração

  fetch(`/metas/publicar/${idUsuario}`, {
      method: "post",
      headers: {
          "Content-Type": "application/json"
      },
      body: JSON.stringify(corpo)
  }).then(async function (resposta) {
      const respostaCorpo = await resposta.text(); // Lê o corpo da resposta
      console.log("Corpo da resposta: ", respostaCorpo); // Mostra no console

      if (resposta.ok) {
          window.alert("Meta publicada com sucesso pelo usuário de ID: " + idUsuario + "!");
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

document.querySelector("button").addEventListener("click", publicar);