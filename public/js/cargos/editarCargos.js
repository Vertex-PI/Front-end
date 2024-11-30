let idCargoGlobal = null;


function carregarCargos() {
    fetch('/cargos/listarCargos')
        .then((res) => res.json())
        .then((cargos) => {
            const container = document.getElementById('div_cargos');
            container.innerHTML = ''; 

            cargos.forEach((cargo) => {
                const divCargo = document.createElement('div');
                divCargo.className = 'cargo';

                divCargo.innerHTML = `
                    <span>${cargo.nome}</span>
                    <img src="../../img/img_dash/edit.svg" class="img_item" alt="Editar" onclick="modificarCargoPorNome(${cargo.idCargos}, '${cargo.nome}', '${cargo.permissao}')">
                    <img src="../../img/img_dash/trash-bin.svg" class="img_trash" alt="Deletar" onclick="deletarCargo(${cargo.idCargos})">
                `;

                container.appendChild(divCargo);
            });
        })
        .catch((err) => console.error('Erro ao carregar cargos:', err));
}

function modificarCargoPorNome(idCargo, nome, permissao) {

    document.getElementById('div-modificar-cargo').style.display = 'none';

    document.getElementById('div-editar-cargo').style.display = 'block';

    document.getElementById('inp_nome_cargo_editar').value = nome;
    document.getElementById('inp_permissao_cargo_editar').value = permissao;

    idCargoGlobal = idCargo;

}

function salvarEdicaoCargoPorNome() {
    const nomeCargoInput = document.getElementById('inp_nome_cargo_editar');
    const permissaoCargoInput = document.getElementById('inp_permissao_cargo_editar');

    let nomeCargo = nomeCargoInput.value;
    let permissaoCargo = permissaoCargoInput.value;

    if (!nomeCargo) {
        nomeCargo = nomeCargoInput.defaultValue;
    }

    if (!permissaoCargo) {
        permissaoCargo = permissaoCargoInput.defaultValue;
    }

    if (!nomeCargo || !permissaoCargo) {
        Swal.fire({
            icon: 'warning',
            title: 'Atenção',
            text: 'Todos os campos precisam ser preenchidos!',
            backdrop: false,
        });
        return;
    }

    fetch(`/cargos/editar/${idCargoGlobal}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
            nomeCargo: nomeCargo, 
            permissao: permissaoCargo 
        }),
    })
        .then((res) => {
            if (res.ok) {
                Swal.fire({
                    icon: 'success',
                    title: 'Sucesso',
                    text: 'Cargo editado com sucesso!',
                    backdrop: false,
                }).then(() => {
                    document.getElementById('div-editar-cargo').style.display = 'none';

                    document.getElementById('div-modificar-cargo').style.display = 'flex';

                    carregarCargos();
                });
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Erro',
                    text: 'Erro ao editar o cargo!',
                    backdrop: false,
                });
            }
        })
        .catch((err) => {
            console.error('Erro ao editar cargo:', err);
            Swal.fire({
                icon: 'error',
                title: 'Erro',
                text: 'Erro de conexão com o servidor. Tente novamente mais tarde.',
                backdrop: false,
            });
        });
}

function deletarCargo(idCargos) {
    console.log(`Deletando cargo para ID - ${idCargos}`);

    fetch(`/cargos/verificarAssociacao/${idCargos}`)
        .then((res) => res.json())
        .then((data) => {
            if (data.associado) {
                Swal.fire({
                    icon: 'warning',
                    title: 'Atenção',
                    text: 'Este cargo está associado a um usuário e não pode ser deletado!',
                    backdrop: false,
                });
            } else {
                Swal.fire({
                    title: 'Tem certeza?',
                    text: 'Deseja deletar este cargo?',
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'Sim, deletar',
                    cancelButtonText: 'Cancelar',
                    backdrop: false,
                }).then((result) => {
                    if (result.isConfirmed) {
                        fetch(`/cargos/deletar/${idCargos}`, {
                            method: 'DELETE',
                            headers: {
                                "Content-Type": "application/json"
                            },
                        })
                            .then((res) => {
                                if (res.ok) {
                                    Swal.fire({
                                        icon: 'success',
                                        title: 'Sucesso',
                                        text: 'Cargo deletado com sucesso!',
                                        backdrop: false,
                                    }).then(() => {
                                        carregarCargos(); 
                                    });
                                } else {
                                    Swal.fire({
                                        icon: 'error',
                                        title: 'Erro',
                                        text: 'Este cargo está associado a um usuário e não pode ser deletado!',
                                        backdrop: false,
                                    });
                                }
                            })
                            .catch((err) => {
                                console.error('Erro ao deletar cargo:', err);
                                Swal.fire({
                                    icon: 'error',
                                    title: 'Erro',
                                    text: 'Erro de conexão com o servidor. Tente novamente mais tarde.',
                                    backdrop: false,
                                });
                            });
                    }
                });
            }
        })
        .catch((err) => {
            console.error('Erro ao verificar associação do cargo:', err);
            Swal.fire({
                icon: 'error',
                title: 'Erro',
                text: 'Erro ao verificar se o cargo está associado.',
                backdrop: false,
            });
        });
}


function cancelarEdicaoCargo() {
    document.getElementById('div-editar-cargo').style.display = 'none';

    document.getElementById('div-modificar-cargo').style.display = 'flex';
}

document.addEventListener('DOMContentLoaded', carregarCargos);
