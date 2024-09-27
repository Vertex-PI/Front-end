function entrar() {
    var emailVar = login_input_email.value;
    var senhaVar = login_input_senha.value;

    if (emailVar == "" || senhaVar == "") {
      mensagem_erro_login.innerHTML = "Por favor, preencha todos os campos";
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
            sessionStorage.EMAIL_USUARIO = json.email;
            sessionStorage.NOME_USUARIO = json.nome;
            sessionStorage.ID_USUARIO = json.id;
            sessionStorage.CARGOS = json.cargos;

            setTimeout(function () {
              window.location = "../../dash.html";
            }, 1000); 
          });
        } else {
          mensagem_erro_login.innerHTML = 'Email ou senha inválidos';
          resposta.text().then((texto) => {
            console.error(texto);
          });
        }
      })
      .catch(function (erro) {
        console.log(erro);
      });

    return false;
  }