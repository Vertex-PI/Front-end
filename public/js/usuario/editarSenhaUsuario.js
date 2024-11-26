document.addEventListener("DOMContentLoaded", () => {
    const inputSenhaUsuario = document.getElementById("input-alt-senha");
    const senhaUsuario = sessionStorage.getItem("SENHA"); 
    
    if (senhaUsuario) {
        inputSenhaUsuario.value = senhaUsuario;
    }
  });
  
  function editarSenha() {
      const senha = document.getElementById("input-nova-senha").value.trim();
      const confirmSenha = document.getElementById("input-confirmar-nova-senha").value.trim();
      const idUsuario = sessionStorage.getItem("ID_USUARIO");
    
      let regexMaiuscula = /[A-Z]/;
      let regexMinuscula = /[a-z]/;
      let senhaValidaRegex = false;
      let senhaValidaNumeros = false;
      let senhaValida = false;
      let confirmSenhaValida = false;
    
    
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
    
      /* ------------------ VERIFICANDO SE TODOS OS CAMPOS ESTÃO CORRETOS ----------------------- */
      if (senhaValida && confirmSenhaValida) {
        fetch(`/usuarios/editarSenha/${idUsuario}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            senha: senha,
          }),
        })
          .then(function (resposta) {
            if (resposta.ok) {
              // Atualiza os dados no sessionStorage
              sessionStorage.setItem("SENHA", senha);
    
              Swal.fire({
                icon: "success",
                title: "Sucesso",
                text: "Senha atualizado com sucesso!",
                backdrop: false,
              }).then(() => {
                window.location = "./configuracoes.html";
              });
            } else if (resposta.status === 404) {
              Swal.fire({
                icon: "error",
                title: "Erro",
                text: "Senha não encontrado (Erro 404).",
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
              text: "Ocorreu um erro ao atualizar a senha.",
              backdrop: false,
            });
          });
      }
    }