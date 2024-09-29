function entrar() {
    var emailVar = input_email.value;
    var senhaVar = input_senha.value;

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
              window.location = "../../index.html";
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

  /* mostrar senha */

  function show_password() {
    let ipt = document.getElementById("input_senha");
    let img = document.getElementById("eye_closed");

    if (ipt.type == "password") {
      ipt.type = "text";
      img.src = "img/open_eye.svg"
    } else {
      ipt.type = "password"
      img.src = "img/eye_closed.svg"
    }
  }