function cadastrar() {

  const nome = document.getElementById("input_nome").value;
  const email = document.getElementById("input_email").value;
  const senha = document.getElementById("input_senha").value;
  const confirmSenha = document.getElementById("input_confirmar_senha").value;
  const selectCargo = document.getElementById("select_cargo").value;
  const selectSexo = document.getElementById("select_sexo").value;

  let regexMaiuscula = /[A-Z]/;
  let regexMinuscula = /[a-z]/;

  let senhaValidaRegex = false;
  let senhaValidaNumeros = false;
  let senhaValida = false;
  let confirmSenhaValida = false;
  let nomeValido = false;
  let emailValido = false;

  let mensagemErroNome = "O nome deve conter pelo menos três caracteres.";

  let mensagemEmailInvalido = "Insira um email válido. Ex: vertex@gmail.com";

  let mensagemCargoInvalido = "Insira um cargo Valido";

  let mensagemSexoInvalido = "Insira um sexo Valido";

  let mensagemSenhaCurta = "A senha deve conter pelo menos 6 caracteres e um numero";

  let mensagemSenhaInvalida = `A senha deve conter: <br> • Pelo menos 6 caracteres, <br> • Uma letra maiúscula <br> • Um numero`;

  let mensagemErroConfirmSenha = "As senhas devem ser iguais.";

  /* ------------------- VERIFICAÇÃO DE NOME ------------------ */

  if (nome.length > 2) {
    nomeValido = true;
  }

  if (!nomeValido) {
    document.getElementById("nomeErro").innerHTML = mensagemErroNome;
  } else if (nomeValido) {
    document.getElementById("nomeErro").innerHTML = "";
  }

    /* ------------------------------ CONFIRMAÇÃO DE EMAIL ------------------------------- */

    if (
      email.indexOf("@") > 0 &&
      (email.indexOf(".com") > email.indexOf("@") ||
        email.indexOf(".school") > email.indexOf("@"))
    ) {
      emailValido = true;
    }
  
    if (!emailValido) {
      document.getElementById("cadastroEmailErro").innerHTML =
        mensagemEmailInvalido;
    } else if (emailValido) {
      document.getElementById("cadastroEmailErro").innerHTML = "";
    }

  /* ------------------ VERIFICAÇÃO DE Cargo ----------------------- */

  if(selectCargo == 'nada'){
    document.getElementById("cadastroCargoErro").innerHTML =
      mensagemCargoInvalido;
  } else{
    document.getElementById("cadastroCargoErro").innerHTML = "";
  }

  /* ------------------ VERIFICAÇÃO DE Cargo ----------------------- */

  if(selectSexo == 'nada'){
    document.getElementById("cadastroSexoErro").innerHTML =
      mensagemSexoInvalido;
  } else{
    document.getElementById("cadastroSexoErro").innerHTML = "";
  }

  /* ------------------ VERIFICAÇÃO DE SENHA ----------------------- */

  if (
    regexMaiuscula.test(senha) &&
    regexMinuscula.test(senha) &&
    senha.length >= 6
  ) {
    senhaValidaRegex = true;
  }

  for (let contador = 0; contador <= 9; contador++) {
    if (senha.indexOf(`${contador}`) > -1) {
      senhaValidaNumeros = true;
    }
  }

  if (senhaValidaRegex && senhaValidaNumeros) senhaValida = true;
  

  

  if (senha.length < 6) {
    document.getElementById("cadastroSenhaErro").innerHTML =
      mensagemSenhaCurta;
  } else {
    document.getElementById("cadastroSenhaErro").innerHTML = "";
  }

  if (!senhaValida && senha.length <= 6) {
    document.getElementById("cadastroSenhaErro").innerHTML =
      mensagemSenhaInvalida;
  } else if (senhaValida && senha.length >= 6) {
    document.getElementById("cadastroSenhaErro").innerHTML = "";
  }

  /* ------------------ VERIFICAÇÃO CONFIRMAÇÃO DE SENHA ----------------------- */

  if (confirmSenha != senha) {
    document.getElementById("cadastroConfirmSenhaErro").innerHTML =
      mensagemErroConfirmSenha;
  } else {
    confirmSenhaValida = true;
    document.getElementById("cadastroConfirmSenhaErro").innerHTML = "";
  }



  /* ------------------------------ VERIFICANDO SE TODOS OS CAMPOS ESTÃO CORRETOS ----------------------------- */

  var nomeVar = input_nome.value;
  var emailVar = input_email.value;
  var senhaVar = input_senha.value;
  var confirmacaoSenhaVar = input_confirmar_senha.value;
  var sexoVar = select_sexo.value
  var cargosVar = select_cargo.value;

  if (nomeValido && emailValido && senhaValida && confirmSenhaValida) {

    fetch("/usuarios/cadastrar", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        nomeServer: nomeVar,
        emailServer: emailVar,
        senhaServer: senhaVar,
        sexoServer: sexoVar,
        cargoServer: cargosVar,
      }),
    })
      .then(function (resposta) {
        console.log("resposta: ", resposta);
  
        if (resposta.ok) {
          setTimeout(() => {
            window.location = "../../index.html";
          }, "2000");
        } else if (resposta.status == 409) {
          document.getElementById("cadastroEmailErro").innerHTML = "Email já cadastrado!";
        } else {
          throw "Houve um erro ao tentar realizar o cadastro!";
        }
      })
      .catch(function (resposta) {
        console.log(`#ERRO: ${resposta}`);
      });
  
    return false;
  }
}

function listar() {
  fetch("/cargos/listar", {
    method: "GET",
  })
    .then(function (resposta) {
      resposta.json().then((cargos) => {
        cargos.forEach((cargo) => {
          select_cargo.innerHTML += `<option value='${cargo.idCargos}'>${cargo.Nome}</option>`;
        });
      });
    })
    .catch(function (resposta) {
      console.log(`#ERRO: ${resposta}`);
    });
}

/* mostrar senha */

function show_password() {
  let ipt = document.getElementById("input_senha");
  let img = document.getElementById("open_eye_1");

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
  let img = document.getElementById("open_eye_2");

  if (ipt.type == "password") {
      ipt.type = "text";
      img.src = "../../img/open_eye.svg"
  } else {
      ipt.type = "password"
      img.src = "../../img/eye_closed.svg"
  }
}