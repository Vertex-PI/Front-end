function atualizarListaCargos() {
    const container = document.querySelector(".div_cargos"); // Container para os cargos
    container.innerHTML = `
        <div class="cabecalho_cargos">
            <span>ID</span>
            <span>NOME</span>
            <span>CARGO</span>
        </div>
    `;
    fetch("/cargos/listar")
        .then((res) => res.json())
        .then((cargos) => {
            cargos.forEach((cargo) => {
                const divCargo = document.createElement("div");
                divCargo.className = "cargo";
                divCargo.innerHTML = `
                    <span>${cargo.idCargos}</span>
                    <span>${cargo.nome}</span>
                    <span>${cargo.temPermissaoAdm}</span>
                    <img src="../../img/img_dash/edit.svg" class="img_item" alt="Editar" onclick="editarCargo(${cargo.idCargos})">
                    <img src="../../img/img_dash/trash-bin.svg" class="img_trash" alt="Excluir" onclick="deletarCargo(${cargo.idCargos})">
                `;
                container.appendChild(divCargo);
            });
        })
        .catch((err) => console.error("Erro ao carregar cargos:", err));
}
function editarCargo(idCargo, nomeCargo) {
    document.getElementById("div-modificar-cargo").style.display = "none";
    document.getElementById("div-mudar-cargo").style.display = "block";
    const inputCargo = document.getElementById("inp-editar-cargo-usuario");
    inputCargo.value = nomeCargo; 
    inputCargo.dataset.idCargo = idCargo;
}
function salvarEdicaoCargo() {
    const inputCargo = document.getElementById("inp-editar-cargo-usuario");
    const idCargo = inputCargo.dataset.idCargo;
    const novoNomeCargo = inputCargo.value;
    if (!novoNomeCargo) {
        Swal.fire({
            icon: "warning",
            title: "Atenção",
            text: "Por favor, insira um nome válido para o cargo.",
        });
        return;
    }
    fetch(`/cargos/editar/${idCargo}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ nome: novoNomeCargo }),
    })
        .then((res) => {
            if (res.ok) {
                Swal.fire({
                    icon: "success",
                    title: "Sucesso",
                    text: "Cargo atualizado com sucesso!",
                }).then(() => {
                    document.getElementById("div-mudar-cargo").style.display = "none";
                    listarCargos(); // Atualiza a lista de cargos
                });
            } else {
                Swal.fire({
                    icon: "error",
                    title: "Erro",
                    text: "Houve um problema ao atualizar o cargo.",
                });
            }
        })
        .catch((err) => {
            console.error("Erro ao atualizar cargo:", err);
            Swal.fire({
                icon: "error",
                title: "Erro",
                text: "Erro de conexão com o servidor. Tente novamente mais tarde.",
            });
        });
}
function deletarCargo(idCargo) {
    if (!idCargo) {
        Swal.fire({
            icon: "error",
            title: "Erro",
            text: "ID do cargo inválido!",
        });
        return;
    }
    Swal.fire({
        title: "Tem certeza?",
        text: `Deseja deletar este cargo?`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Sim, deletar",
        cancelButtonText: "Cancelar",
    }).then((result) => {
        if (result.isConfirmed) {
            fetch(`/cargos/deletar/${idCargo}`, {
                method: "DELETE",
            })
                .then((res) => {
                    if (res.ok) {
                        Swal.fire({
                            icon: "success",
                            title: "Sucesso",
                            text: "Cargo deletado com sucesso!",
                        });
                        listarCargos(); // Atualiza a lista de cargos
                    } else {
                        Swal.fire({
                            icon: "error",
                            title: "Erro",
                            text: "Erro ao deletar o cargo.",
                        });
                    }
                })
                .catch((err) => {
                    console.error("Erro ao deletar cargo:", err);
                    Swal.fire({
                        icon: "error",
                        title: "Erro",
                        text: "Erro de conexão com o servidor. Tente novamente mais tarde.",
                    });
                });
        }
    });
}
document.addEventListener("DOMContentLoaded", () => {
    listarCargos();
});
document.querySelector(".btn_adc_cadastro").addEventListener("click", salvarEdicaoCargo);