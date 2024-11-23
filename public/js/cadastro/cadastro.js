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

function listarUsuarios() {
  fetch("/usuarios/listar", {
    method: "GET",
  })
  .then(function (resposta) {
    resposta.json().then((usuarios) => {
      usuarios.forEach((usuario) => {
        console.log(usuario);
      });
    });
  })
  .catch(function (resposta) {
    console.log(`#ERRO: ${resposta}`);
  });
}

function carregarFuncionarios() {
  // Funcionários devem se exibidos aqui
  const funcionarios = [

  ];

  // Local onde os funcionários serão exibidos
  const listaFuncionarios = document.getElementById('funcionarios-lista');
  listaFuncionarios.innerHTML = '';  // Limpa a lista existente

  // Itera sobre cada funcionário e cria os elementos HTML
  funcionarios.forEach(funcionario => {
      const funcionarioDiv = document.createElement('div');
      funcionarioDiv.classList.add('div_funcionario');
      funcionarioDiv.id = `funcionario-${funcionario.idUsuario}`;

      funcionarioDiv.innerHTML = `
          <div class="div_infos_funcionario">
              <span id="nome-funcionario-${funcionario.idUsuario}" style="font-size: 17px; font-weight: 500;">${funcionario.nome}</span>
              <span id="cargo-funcionario-${funcionario.idCargo}" style="font-size: 13px; font-weight: 400;">${funcionario.cargo}</span>
          </div>
          <img src="../../img/img_dash/edit.svg" class="img_item_editar_func" onclick="editarCargo(${funcionario.idCargo})" alt="Editar">
          <img src="../../img/img_dash/trash-bin.svg" class="img_trash" onclick="excluirFuncionario(${funcionario.idUsuario})" alt="Excluir">
      `;

      listaFuncionarios.appendChild(funcionarioDiv);
  });
}


function editarCargo(idCargo) {
  // Recupera o cargo atual do funcionário e exibe no select de edição
  const cargoAtual = document.getElementById(`cargo-funcionario-${idCargo}`).innerText;
  
  // Exibe o formulário de edição
  document.getElementById('div-mudar-cargo').style.display = 'block';

  // Preencher o select com cargos disponíveis
  const select = document.getElementById('inp-editar-cargo-usuario');
  select.innerHTML = `
      <option value="cargo1" ${cargoAtual === 'Cargo 1' ? 'selected' : ''}>Cargo 1</option>
      <option value="cargo2" ${cargoAtual === 'Cargo 2' ? 'selected' : ''}>Cargo 2</option>
      <option value="cargo3" ${cargoAtual === 'Cargo 3' ? 'selected' : ''}>Cargo 3</option>
  `;

  // Salvar alterações
  function salvarCargo() {
      const novoCargo = select.value;

      // Enviar os dados para o servidor para atualizar o cargo do funcionário
      fetch(`/editar-cargo/${idCargo}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ cargo: novoCargo })
      }).then(response => {
          if (response.ok) {
              // Atualiza a interface
              document.getElementById(`cargo-funcionario-${idCargo}`).innerText = novoCargo;
              document.getElementById('div-mudar-cargo').style.display = 'none';
          }
      });
  }
}

// Função para excluir um funcionário
function excluirFuncionario(funcionarioId) {
  // Confirmar antes de excluir
  if (confirm('Tem certeza que deseja excluir este funcionário?')) {
      // Enviar solicitação para excluir o funcionário
      fetch(`/excluir-funcionario/${funcionarioId}`, {
          method: 'DELETE'
      }).then(response => {
          if (response.ok) {
              // Remove o funcionário da interface
              const funcionarioDiv = document.getElementById(`funcionario-${funcionarioId}`);
              funcionarioDiv.remove();
          }
      });
  }
}

// Chama a função para carregar os funcionários na inicialização
carregarFuncionarios();

