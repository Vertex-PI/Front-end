function cadastrarUsuario() {
    const nome = document.getElementById("input_nome").value;
    const email = document.getElementById("input_email").value;
    const senha = document.getElementById("input_senha").value;
    const confirmSenha = document.getElementById("input_confirmar_senha").value;
    const selectCargo = document.getElementById("select_cargo").value;
  
    let regexMaiuscula = /[A-Z]/;
    let regexMinuscula = /[a-z]/;
  
    let senhaValidaRegex = false;
    let senhaValidaNumeros = false;
    let senhaValida = false;
    let confirmSenhaValida = false;
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
  
    /* ------------------------------ CONFIRMAÇÃO DE EMAIL ------------------------------- */
    if (
      email.indexOf("@") > 0 &&
      (email.indexOf(".com") > email.indexOf("@") || email.indexOf(".school") > email.indexOf("@"))
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
  
    /* ------------------ VERIFICAÇÃO DE Cargo ----------------------- */
    if (selectCargo === "nada") {
      Swal.fire({
        icon: "error",
        title: "Erro no Cargo",
        text: "Selecione um cargo válido.",
        backdrop: false,
      });
      return;
    }
  
    /* ------------------ VERIFICAÇÃO DE SENHA ----------------------- */
    if (regexMaiuscula.test(senha) && regexMinuscula.test(senha) && senha.length >= 6) {
      senhaValidaRegex = true;
    }
  
    for (let contador = 0; contador <= 9; contador++) {
      if (senha.indexOf(`${contador}`) > -1) {
        senhaValidaNumeros = true;
      }
    }
  
    senhaValida = senhaValidaRegex && senhaValidaNumeros;
  
    if (!senhaValida) {
      Swal.fire({
        icon: "error",
        title: "Erro na Senha",
        html: "A senha deve conter:<br>• Pelo menos 6 caracteres<br>• Uma letra maiúscula<br>• Um número",
        backdrop: false,
      });
      return;
    }
  
    /* ------------------ VERIFICAÇÃO CONFIRMAÇÃO DE SENHA ----------------------- */
    if (confirmSenha !== senha) {
      Swal.fire({
        icon: "error",
        title: "Erro na Confirmação de Senha",
        text: "As senhas devem ser iguais.",
        backdrop: false,
      });
      return;
    } else {
      confirmSenhaValida = true;
    }
  
    /* ------------------------------ VERIFICANDO SE TODOS OS CAMPOS ESTÃO CORRETOS ----------------------------- */
    if (nomeValido && emailValido && senhaValida && confirmSenhaValida) {
      fetch("/usuarios/cadastrar", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nomeServer: nome,
          emailServer: email,
          senhaServer: senha,
          cargoServer: selectCargo,
          fk_idEmpresa: sessionStorage.ID_EMPRESA,
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
          } else if (resposta.status === 409) {
            Swal.fire({
              icon: "error",
              title: "Erro",
              text: "Email já cadastrado!",
              backdrop: false,
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
  }
  
  function listarCargos() {
    fetch("/cargos/listarCargos", {
      method: "GET",
    })
      .then(function (resposta) {
        resposta.json().then((cargos) => {
          cargos.forEach((cargo) => {
            select_cargo.innerHTML += `<option value='${cargo.idCargos}'>${cargo.nome}</option>`;
          });
        });
      })
      .catch(function (resposta) {
        console.log(`#ERRO: ${resposta}`);
      });
  }
  