let idFuncionarioGlobal = null;
// Função para abrir a interface de edição do cargo
function editarCargo(idFuncionario) {
    console.log("Abrindo edição para o funcionário ID - " + idFuncionario);
    idFuncionarioGlobal = idFuncionario; // Armazena o ID do funcionário
    document.getElementById("div-usuarios").style.display = "none";
    document.getElementById("div-mudar-cargo").style.display = "block";
    document.getElementById("div_cabecalho_func_pai").style.display = "none";
    document.getElementById("div_cabecalho_func_filho").style.display = "none";


    // Carregar os dados do funcionário via API
    fetch(`/usuarios/listarPorUsuario/${idFuncionario}`)
        .then(res => res.json())
        .then(funcionario => {
            document.getElementById("inp-editar-cargo-usuario").value = funcionario.cargo;

            // Armazenar o ID do funcionário em um atributo para uso posterior
            document.getElementById("inp-editar-cargo-usuario").dataset.idFuncionario = idFuncionario;
        })
        .catch(err => console.error("Erro ao buscar dados do funcionário:", err));
}


function deletarFuncionario(idFuncionario) {
    const idUsuario = sessionStorage.getItem("ID_USUARIO");

    if (!idFuncionario || isNaN(idFuncionario)) {
        console.error("ID inválido para exclusão:", idFuncionario);
        Swal.fire({
            icon: "error",
            title: "Erro",
            text: "ID inválido!",
            backdrop: false,
        });
        return;
    }

    Swal.fire({
        title: "Tem certeza?",
        text: `Deseja deletar o funcionário?`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Sim, deletar",
        cancelButtonText: "Cancelar",
        backdrop: false,
    }).then((result) => {
        if (result.isConfirmed) {
            console.log("Deletando funcionário ID - " + idFuncionario);

            fetch(`/usuarios/deletar/${idFuncionario}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                },
            })
                .then((res) => {
                    if (res.ok) {
                        Swal.fire({
                            icon: "success",
                            title: "Sucesso",
                            text: "Funcionário deletado com sucesso!",
                            backdrop: false,
                        }).then(() => {
                            if (idFuncionario == idUsuario) {
                                sessionStorage.clear(); 
                                window.location.href = "../../index.html"; 
                            } else {
                                atualizarListaFuncionarios(); 
                            }
                        });
                    } else {
                        Swal.fire({
                            icon: "error",
                            title: "Erro",
                            text: "Erro ao deletar o funcionário!",
                            backdrop: false,
                        });
                    }
                })
                .catch((err) => {
                    console.error("Erro ao deletar funcionário:", err);
                    Swal.fire({
                        icon: "error",
                        title: "Erro",
                        text: "Ocorreu um erro ao tentar deletar o funcionário!",
                        backdrop: false,
                    });
                });
        }
    });
}


// Função para carregar a lista de funcionários
function atualizarListaFuncionarios() {
    fetch("/usuarios/listar")
        .then((res) => res.json())
        .then((funcionarios) => {
            const container = document.getElementById("div-usuarios");
            container.innerHTML = ""; // Limpar lista

            funcionarios.forEach((funcionario) => {
                const divFuncionario = document.createElement("div");
                divFuncionario.className = "div_funcionario";

                divFuncionario.innerHTML = `
                    <div class="div_infos_funcionario">
                        <span style="font-size: 17px; font-weight: 500;">${funcionario.nome}</span>
                        <span style="font-size: 13px; font-weight: 400;">${funcionario.cargo}</span>
                    </div>
                    <img src="../../img/img_dash/edit.svg" class="img_item_editar_func" 
                         onclick="editarCargo(${funcionario.idUsuario})" alt="Editar">
                    <img src="../../img/img_dash/trash-bin.svg" class="img_trash" 
                         onclick="deletarFuncionario(${funcionario.idUsuario}, '${funcionario.nome}')" alt="Deletar">
                `;

                container.appendChild(divFuncionario);
            });

            document.getElementById("div-usuarios").style.display = "block";
        })
        .catch((err) => console.error("Erro ao carregar funcionários:", err));
}


function listarCargosUsuarios() {
    const selectCargo = document.getElementById("inp-editar-cargo-usuario"); // Referência ao select

    // Limpar opções existentes antes de carregar novas
    selectCargo.innerHTML = "<option value=''>Selecione um cargo</option>";

    fetch("/cargos/listarCargos", {
        method: "GET",
    })
        .then((resposta) =>
            resposta.json().then((cargos) => {
                cargos.forEach((cargo) => {
                    selectCargo.innerHTML += `<option value='${cargo.idCargos}'>${cargo.nome}</option>`;
                });
            })
        )
        .catch((resposta) => {
            console.log(`#ERRO: ${resposta}`);
        });
}

function exibirEdicaoCargo() {
    document.getElementById("div-usuarios").style.display = "none";
    document.getElementById("div-mudar-cargo").style.display = "block";

    listarCargos(); // Carregar a lista de cargos
}

function salvarEdicaoCargo(idFuncionario) {
    const selectCargo = document.getElementById("inp-editar-cargo-usuario");
    const novoCargoId = selectCargo.value;

    if (!novoCargoId) {
        Swal.fire({
            icon: "warning",
            title: "Atenção",
            text: "Por favor, selecione um cargo válido!",
            backdrop: false,
        });
        return;
    }

    fetch(`/usuarios/editarCargo/${idFuncionario}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ cargo: novoCargoId }),
    })
        .then((res) => {
            if (res.ok) {
                Swal.fire({
                    icon: "success",
                    title: "Sucesso",
                    text: "Cargo atualizado com sucesso!",
                    backdrop: false,
                }).then(() => {
                    document.getElementById("div-mudar-cargo").style.display = "none";
                    document.getElementById("div_cabecalho_func_pai").style.display = "flex";
                    document.getElementById("div_cabecalho_func_filho").style.display = "flex";
                    atualizarListaFuncionarios(); // Atualiza a lista de funcionários
                });
            } else {
                Swal.fire({
                    icon: "error",
                    title: "Erro",
                    text: "Houve um problema ao atualizar o cargo do funcionário.",
                    backdrop: false,
                });
            }
        })
        .catch((err) => {
            console.error("Erro ao atualizar cargo:", err);
            Swal.fire({
                icon: "error",
                title: "Erro",
                text: "Erro de conexão com o servidor. Tente novamente mais tarde.",
                backdrop: false,
            });
        });
}
