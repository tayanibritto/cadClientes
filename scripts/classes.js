//Classe Cliente
export class Cliente {
    #nome;
    #email;
    #id;

    constructor(nome, email, id) {
        this.#nome = nome;
        this.#email = email;
        this.#id = id;
    }

    // Função para criar o elemento da lista do cliente
    criarElementoLista(callbackExcluir) {
        const novoCliente = document.createElement('li');
        const info = document.createElement('span');
        info.textContent = `${this.#nome} - ${this.#email} `;

        const botaoExcluir = document.createElement('button');
        botaoExcluir.textContent = 'X';

        botaoExcluir.addEventListener('click', () => { 
            callbackExcluir(this.#id);
        });

        novoCliente.appendChild(info);
        novoCliente.appendChild(botaoExcluir);
        return novoCliente;
    }
}
