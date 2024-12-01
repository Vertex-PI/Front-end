function entrar() {
  var emailVar = input_email.value;
  var senhaVar = input_senha.value;

  if (emailVar == "" || senhaVar == "") {
      Swal.fire({
          icon: 'warning',
          title: 'Atenção',
          text: 'Todos os campos precisam ser preenchidos!',
          backdrop: false,
      });
      return false;
  }
  console.log("FORM LOGIN: ", emailVar);
  console.log("FORM SENHA: ", senhaVar);

  fetch("/usuarios/autenticar", {
      method: "POST",
      headers: {
          "Content-Type": "application/json",
      },
      body: JSON.stringify({
          emailServer: emailVar,
          senhaServer: senhaVar,
      }),
  })
      .then(function (resposta) {
          console.log("ESTOU NO THEN DO entrar()!");

          if (resposta.ok) {
              console.log(resposta);

              resposta.json().then((json) => {
                  console.log("Jason:" + json);

                  console.log(JSON.stringify(json));
                  sessionStorage.ID_USUARIO = json.id;
                  sessionStorage.NOME_USUARIO = json.nome;
                  sessionStorage.EMAIL_USUARIO = json.email;
                  sessionStorage.SENHA = json.senha;
                  sessionStorage.ID_CARGO = json.idCargo;
                  sessionStorage.ID_EMPRESA = json.fk_idEmpresa;
                  sessionStorage.PERMISSAO = json.temPermissaoAdm;

                  Swal.fire({
                      icon: 'success',
                      title: 'Login realizado com sucesso!',
                      text: `Bem-vindo, ${json.nome}!`,
                      backdrop: false,
                  });

                  setTimeout(function () {
                      window.location = "../pages/dashboard/dashboard.html";
                  }, 1000);
              });
          } else {
              resposta.text().then((texto) => {
                  console.error(texto);
                  Swal.fire({
                      icon: 'error',
                      title: 'Erro',
                      text: 'Email ou senha inválidos. Tente novamente!',
                      backdrop: false,
                  });
              });
          }
      })
      .catch(function (erro) {
          console.error(erro);
          Swal.fire({
              icon: 'error',
              title: 'Erro',
              text: 'Ocorreu um erro ao tentar realizar o login. Tente novamente mais tarde.',
              backdrop: false,
          });
      });

  return false;
}

  /* mostrar senha */

  function show_password() {
    let ipt = document.getElementById("input_senha");
    let img = document.getElementById("eye_closed");

    if (ipt.type == "password") {
      ipt.type = "text";
      img.src = "../img/open_eye.svg"
    } else {
      ipt.type = "password"
      img.src = "../img/eye_closed.svg"
    }
  }
