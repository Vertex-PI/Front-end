document.addEventListener("DOMContentLoaded", () => {
  const iptNomeUsuario = document.getElementById("inp_nome_editar");
  const nomeUsuario = sessionStorage.getItem("NOME_USUARIO");

  const inputEmailUsuario = document.getElementById("inp_email_editar");
  const emailUsuario = sessionStorage.getItem("EMAIL_USUARIO");


  const cargoUsuario = sessionStorage.getItem("ID_CARGO");

  const permissao = sessionStorage.getItem("PERMISSAO");
  const selectCargo = document.getElementById("select_cargo_editar");

  if (nomeUsuario) iptNomeUsuario.value = nomeUsuario;
  
  if (emailUsuario) inputEmailUsuario.value = emailUsuario;


  if(permissao != 'SIM') selectCargo.disabled = true;

  listarCargosEditar(cargoUsuario);
});

function editar() {
    const nome = document.getElementById("inp_nome_editar").value.trim();
    const email = document.getElementById("inp_email_editar").value.trim();
    const cargo = document.getElementById("select_cargo_editar").value.trim();
    const idUsuario = sessionStorage.getItem("ID_USUARIO");
  
    let regexMaiuscula = /[A-Z]/;
    let regexMinuscula = /[a-z]/;
    let nomeValido = false;
    let emailValido = false;
  
    /* ------------------- VERIFICAÇÃO DE NOME ------------------ */
    if (nome.length > 2) {
      nomeValido = true;
    } else {
      Swal.fire({
        icon: "error",
        title: "Erro no Nome",
        text: "O nome deve conter pelo menos três caracteres.",
        backdrop: false,
      });
      return;
    }
  
    /* ------------------- VERIFICAÇÃO DE EMAIL ------------------ */
    if (
      email.indexOf("@") > 0 &&
      (email.indexOf(".com") > email.indexOf("@") ||
        email.indexOf(".school") > email.indexOf("@"))
    ) {
      emailValido = true;
    } else {
      Swal.fire({
        icon: "error",
        title: "Erro no Email",
        text: "Insira um email válido. Ex: vertex@gmail.com",
        backdrop: false,
      });
      return;
    }
  
    /* ------------------ VERIFICAÇÃO DE CARGO ----------------------- */
    if (cargo === "nada" || cargo === "") {
      Swal.fire({
        icon: "error",
        title: "Erro no Cargo",
        text: "Selecione um cargo válido.",
        backdrop: false,
      });
      return;
    }

  
    /* ------------------ VERIFICANDO SE TODOS OS CAMPOS ESTÃO CORRETOS ----------------------- */
    if (nomeValido && emailValido) {
      fetch(`/usuarios/editar/${idUsuario}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nome: nome,
          email: email,
          cargo: cargo,
        }),
      })
        .then(function (resposta) {
          if (resposta.ok) {
            // Atualiza os dados no sessionStorage
            sessionStorage.setItem("NOME_USUARIO", nome);
            sessionStorage.setItem("EMAIL_USUARIO", email);
            sessionStorage.setItem("ID_CARGO", cargo);
  
            Swal.fire({
              icon: "success",
              title: "Sucesso",
              text: "Usuário atualizado com sucesso!",
              backdrop: false,
            }).then(() => {
              window.location = "./configuracoes.html";
            });
          } else if (resposta.status === 404) {
            Swal.fire({
              icon: "error",
              title: "Erro",
              text: "Usuário não encontrado (Erro 404).",
              backdrop: false,
            });
          } else {
            throw new Error("Houve um erro ao tentar realizar a atualização!");
          }
        })
        .catch(function (erro) {
          console.error(`#ERRO: ${erro}`);
          Swal.fire({
            icon: "error",
            title: "Erro Inesperado",
            text: "Ocorreu um erro ao atualizar o usuário.",
            backdrop: false,
          });
        });
    }
  }

function listarCargosEditar(cargoSelecionado) {
  fetch("/cargos/listarCargos", {
    method: "GET",
  })
    .then((resposta) => {
      return resposta.json();
    })
    .then((cargos) => {
      const selectCargoEditar = document.getElementById("select_cargo_editar");

      cargos.forEach((cargo) => {
        const option = document.createElement("option");
        option.value = cargo.idCargos;
        option.textContent = cargo.nome;

        if (cargo.idCargos == cargoSelecionado) {
          option.selected = true;
        }

        selectCargoEditar.appendChild(option);
      });
    })
    .catch((erro) => {
      console.log(`#ERRO: ${erro}`);
    });
}
