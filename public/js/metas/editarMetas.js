let idMetaGlobal = null;

function carregarMetas() {
    fetch('/metas/listarMetas')
        .then((res) => res.json())
        .then((metas) => {
            const container = document.getElementById('div_listarMetas');
            container.innerHTML = ''; 

            metas.forEach((meta) => {
                const divMeta = document.createElement('div');
                divMeta.className = 'meta';

                divMeta.innerHTML = `
                    <span>${meta.mes}</span>
                    <img src="../../img/img_dash/edit.svg" class="img_item" alt="Editar" onclick="editarMeta(${meta.idMetas}, ${meta.gastoEmReais}, ${meta.gastoEnergetico}, '${meta.mes}')">
                    <img src="../../img/img_dash/trash-bin.svg" class="img_trash" alt="Deletar" onclick="deletarMeta(${meta.idMetas})">
                `;

                container.appendChild(divMeta);
            });
        })
        .catch((err) => console.error('Erro ao carregar metas:', err));
}

// Função para abrir o formulário de edição de meta
function editarMeta(idMetas, gastoEmReais, gastoEnergetico) {
    console.log(`Abrindo edição para a meta ID - ${idMetas}`);
    idMetaGlobal = idMetas; 

    document.getElementById('div_info').style.display = 'none';

    document.getElementById('section_meta').style.display = 'block';

    document.getElementById('gastoEmReais').value = gastoEmReais;
    document.getElementById('gastoEnergetico').value = gastoEnergetico;
}

// Função para salvar a edição da meta
function salvarEdicaoMeta() {
    const gastoEmReais = document.getElementById('gastoEmReais').value;
    const gastoEnergetico = document.getElementById('gastoEnergetico').value;

    if (!gastoEmReais || !gastoEnergetico) {
        Swal.fire({
            icon: 'warning',
            title: 'Atenção',
            text: 'Todos os campos precisam ser preenchidos!',
            backdrop: false,
        });
        return;
    }

    fetch(`/metas/editar/${idMetaGlobal}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ gastoEmReais, gastoEnergetico}),
    })
        .then((res) => {
            if (res.ok) {
                Swal.fire({
                    icon: 'success',
                    title: 'Sucesso',
                    text: 'Meta editada com sucesso!',
                    backdrop: false,
                }).then(() => {
                    // Esconde o formulário de edição
                    document.getElementById('section_meta').style.display = 'none';

                    // Exibe novamente a tabela de metas
                    document.getElementById('div_info').style.display = 'flex';

                    carregarMetas(); // Atualiza a lista de metas
                });
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Erro',
                    text: 'Erro ao editar a meta!',
                    backdrop: false,
                });
            }
        })
        .catch((err) => {
            console.error('Erro ao editar meta:', err);
            Swal.fire({
                icon: 'error',
                title: 'Erro',
                text: 'Erro de conexão com o servidor. Tente novamente mais tarde.',
                backdrop: false,
            });
        });
}


function deletarMeta(idMetas) {
    console.log(`Deletando meta para ID - ${idMetas}`); 
    Swal.fire({
        title: 'Tem certeza?',
        text: 'Deseja deletar esta meta?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sim, deletar',
        cancelButtonText: 'Cancelar',
        backdrop: false,
    }).then((result) => {
        if (result.isConfirmed) {
            fetch(`/metas/deletar/${idMetas}`, {
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
                            text: 'Meta deletada com sucesso!',
                            backdrop: false,
                        }).then(() => {
                            carregarMetas(); 
                        });
                    } else {
                        Swal.fire({
                            icon: 'error',
                            title: 'Erro',
                            text: 'Erro ao deletar a meta!',
                            backdrop: false,
                        });
                    }
                })
                .catch((err) => {
                    console.error('Erro ao deletar meta:', err);
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


function cancelarEdicaoMeta() {
    
    document.getElementById('section_meta').style.display = 'none';

    document.getElementById('div_info').style.display = 'flex';
}

document.addEventListener('DOMContentLoaded', carregarMetas);