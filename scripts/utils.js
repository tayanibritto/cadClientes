// Importação de classe
import { Cliente } from './classes.js';

// Função para atualizar a lista de clientes em ordem alfabética
export function ordenarLista(novaLista) {
    return novaLista.reduce((listaOrdenada, novoCliente) => {
        const incluir = listaOrdenada.findIndex(clienteCadastrado =>
            novoCliente.nome.localeCompare(clienteCadastrado.nome) < 0
        );

        if (incluir === -1) {
            listaOrdenada.push(novoCliente); // Se não encontrar a posição correta, adiciona ao final
        } else {
            listaOrdenada.splice(incluir, 0, novoCliente); // Adiciona na posição correta
        }

        return listaOrdenada;
    }, []);
}

// Função para buscar clientes por nome
export function buscaPorNome(nomeBuscado, listaClientes) {
    const nome = nomeBuscado.trim().toLowerCase();

    // Utiliza o filter para mostrar o nome exato ou os nomes parecidos, caso não tenha o nome exato
    return listaClientes.filter(cadClientes => cadClientes.nome.toLowerCase().includes(nome));

}

// Função GET: pesquisa e mostra os clientes cadastrados
export function mostrarClientes(ordenarLista, callbackPosCarregar) {
    fetch('https://crudcrud.com/api/2bb509be805f472a9834b336acf5904c/cadClientes')
    .then(resposta => resposta.json())
    .then(lista => {
        const listaOrdenada = ordenarLista(lista); // Atualiza a lista com o nome de todos os clientes
        if (typeof callbackPosCarregar === 'function') {
            callbackPosCarregar(listaOrdenada);
        }
    })
    .catch(error => console.error('Erro no GET:', error));
}

// Função DELETE: exclui o cliente do servidor e atualiza a lista
export function excluirCliente(id, ordenarLista, callbackPosExcluir) {
    fetch(`https://crudcrud.com/api/2bb509be805f472a9834b336acf5904c/cadClientes/${id}`, {
        method: 'DELETE'
    })
    .then(resposta => {
        if (resposta.ok) {
            fetch('https://crudcrud.com/api/2bb509be805f472a9834b336acf5904c/cadClientes')
            .then(resposta => resposta.json())
            .then(lista => {
                const listaOrdenada = ordenarLista(lista); // Atualiza a lista com o nome de todos os clientes
                if (typeof callbackPosExcluir === 'function') {
                    callbackPosExcluir(listaOrdenada); 
                }
            });
        } else {
                console.error('Erro ao excluir cliente');
    }
    })
        .catch(error => console.error('Erro no DELETE:', error));
}


// Função para renderizar lista de clientes conforme busca
export function renderizarLista(listaClientes, linha, callbackExcluir) {
    linha.innerHTML = ''; // Limpa os resultados anteriores
    listaClientes.map(cadClientes => {
        const cliente = new Cliente(cadClientes.nome, cadClientes.email, cadClientes._id);
        return cliente.criarElementoLista(callbackExcluir);
    })
    .forEach(elemento => linha.appendChild(elemento));
}