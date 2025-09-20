// Importações de utils
import { mostrarClientes, excluirCliente, renderizarLista, buscaPorNome, ordenarLista } from './utils.js';

// Elementos DOM e variáveis
const clientes = document.getElementById('clientes');
const botaoMostrarTodos = document.getElementById('mostrarTodos');
let listaClientes = []; // Lista para armazenar todos os clientes
let nomePesquisa = '';

// Callback para excluir cliente
const callbackExcluir = (id) => {
    excluirCliente(id, ordenarLista, (listaOrdenada) => {
        listaClientes = listaOrdenada; // Atualiza a lista de clientes após exclusão
        if (nomePesquisa) {
            const clientesEncontrados = buscaPorNome(nomePesquisa, listaClientes);
            if (clientesEncontrados.length > 0) {
                renderizarLista(clientesEncontrados, clientes, callbackExcluir);
                botaoMostrarTodos.disabled = false; // Habilita o botão "Mostrar Todos" após uma busca
            } else {
                clientes.innerHTML = '<li>Cliente não encontrado</li>';
                botaoMostrarTodos.disabled = false; // Habilita o botão "Mostrar Todos" após uma busca
            }
        } else {
            renderizarLista(listaClientes, clientes, callbackExcluir);
            botaoMostrarTodos.disabled = true; // Desabilita o botão "Mostrar Todos" quando não há busca
        }
    });
};

// Função criada para evitar repetição de código
function atualizarEExibirClientes() {
    mostrarClientes(ordenarLista, (listaOrdenada) => {
        listaClientes = listaOrdenada; // Armazena a lista de clientes por ordem alfabética
        renderizarLista(listaClientes, clientes, callbackExcluir);
    });
}

// Função POST: envia os dados do formulário e salva o novo cliente
document.getElementById('formCliente').addEventListener('submit', function(evento) {
    evento.preventDefault();
    const nome = document.getElementById('nome').value;
    const email = document.getElementById('email').value;

    fetch('https://crudcrud.com/api/2bb509be805f472a9834b336acf5904c/cadClientes', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ nome, email })
    })
    .then(resposta => resposta.json())
    .then(() => {
        document.getElementById('formCliente').reset(); // Limpa os dados formulário após salvar; evita que o usuário tenha que apagar manualmente
        document.getElementById('buscar').value = ''; // Limpa o campo de busca
        botaoMostrarTodos.disabled = true;
        atualizarEExibirClientes(); // Atualiza a lista de clientes após adicionar um novo cliente
    })
    .catch(error => console.error('Erro no POST:', error));
});


// Buscar clientes ao digitar no campo de busca
document.getElementById('pesquisar').addEventListener('click', () => {
    nomePesquisa = document.getElementById('buscar').value.trim();
    const clientesEncontrados = buscaPorNome(nomePesquisa, listaClientes);

    if (clientesEncontrados.length > 0) {
        renderizarLista(clientesEncontrados, clientes, callbackExcluir);
    } else {
        clientes.innerHTML = '<li>Cliente não encontrado</li>';
    }
    botaoMostrarTodos.disabled = false; // Habilita o botão "Mostrar Todos" após uma busca
});

// Mostrar todos os clientes ao clicar no botão
botaoMostrarTodos.addEventListener('click', () => {
    nomePesquisa = '';
    atualizarEExibirClientes();
    document.getElementById('buscar').value = '';
    botaoMostrarTodos.disabled = true;
});

// Mostrar todos os clientes ao carregar a página 
atualizarEExibirClientes();




