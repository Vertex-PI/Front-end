function cadastrarCargo() {
    const nome = document.getElementById("inp_nome_cargos_cadastrar").value;
    const permissao = document.getElementById("inp_permissao_cargos_cadastrar").value;
  
    if (!nome) {
      Swal.fire({
          icon: "error",
          title: "Erro no Nome",
          text: "O nome do cargo não pode ser vazio.",
          backdrop: false,
      });
      return;
  }


      fetch("/cargos/cadastrar", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nomeServer: nome,
          permissaoServer: permissao,
        }),
      })
        .then(function (resposta) {
          if (resposta.ok) {

            Swal.fire({
              icon: "success",
              title: "Sucesso",
              text: "Usuário cadastrado com sucesso!",
              backdrop: false,
            }).then(() => {
              window.location = "./configuracoes.html";
            });
          } else {
            throw new Error("Houve um erro ao tentar realizar o cadastro!");
          }
        })
        .catch(function (erro) {
          console.error(`#ERRO: ${erro}`);
          Swal.fire({
            icon: "error",
            title: "Erro Inesperado",
            text: "Ocorreu um erro ao realizar o cadastro.",
            backdrop: false,
          });
        });
    }
  