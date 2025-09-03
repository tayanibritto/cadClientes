// Pega a lista ordenada de clientes salva e exibe na página
const clientes = document.getElementById('clientes');

// Função GET: pesquisa e mostra os clientes cadastrados
fetch('https://crudcrud.com/api/cbdb3d6784f84636bf086e05300f6eb3/cadClientes')
    .then(resposta => resposta.json())
    .then(listaClientes => {
        listaClientes.forEach(cadClientes => {
            const clienteCadastrado = adicionarCliente(cadClientes.nome, cadClientes.email, cadClientes._id);
            clientes.appendChild(clienteCadastrado);
        });
    })
    .catch(error => console.error('Erro no GET:', error));

// Função de adicionar um novo cliente
function adicionarCliente(nome, email, id) {
    const novoCliente = document.createElement('li');
    novoCliente.textContent = `${nome} - ${email} `; 
    const botaoExcluir = document.createElement('button');
    botaoExcluir.textContent = 'X';
    botaoExcluir.addEventListener('click', () => { 
        excluirCliente(id, novoCliente)
    });
    novoCliente.appendChild(botaoExcluir);
    return novoCliente;
}

// Função POST: envia os dados do formulário e salva o novo cliente
document.getElementById('formCliente').addEventListener('submit', function(evento) {
    evento.preventDefault();
    const nome = document.getElementById('nome').value;
    const email = document.getElementById('email').value;
    fetch('https://crudcrud.com/api/cbdb3d6784f84636bf086e05300f6eb3/cadClientes', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ nome, email })
    })
    .then(resposta => resposta.json())
    .then(cadClientes => {
        const clienteCadastrado = adicionarCliente(cadClientes.nome, cadClientes.email, cadClientes._id);
        clientes.appendChild(clienteCadastrado);
        document.getElementById('formCliente').reset(); // Limpa os dados formulário após salvar; evita que o usuário tenha que apagar manualmente
    })
    .catch(error => console.error('Erro no POST:', error));
});

// Função DELETE: exclui o cliente do servidor e da lista
function excluirCliente(id, elemento) {
    fetch(`https://crudcrud.com/api/cbdb3d6784f84636bf086e05300f6eb3/cadClientes/${id}`, {
        method: 'DELETE'
    })
    .then(resposta => {
        if (resposta.ok) {
            clientes.removeChild(elemento);
        } else {
            console.error('Erro ao excluir cliente');
        }
    })
    .catch(error => console.error('Erro no DELETE:', error));
}
