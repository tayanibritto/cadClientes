
Título: Cadastro de Clientes

Descrição: Aplicação que permite cadastrar, listar e excluir clientes utilizando a API do crudcrud.com. A aplicação utiliza Fetch API, e manipula as requisições HTTP: GET, POST e DELETE.

Tecnologias utilizadas: HTML5, CSS3, JavaScript (Fetch API, JSON e requisições GET, POST e DELETE)

Pré-requisitos: Navegador atualizado (projeto foi testado e funciona no Google Chrome Versão 142.0.7444.163 64 bits - Caso utilize este navegador, recomenda-se tal versão ou superior). Necessita-se de acesso à Internet, pois a página utiliza uma API externa (CRUDCRUD).

Instalação:

Passos para clonar e rodar: git clone https://github.com/tayanibritto/cadClientes.git cd cadClientes abrir index.html no navegador
Como usar: Será necessário gerar um link de simulador de back-end no https://crudcrud.com. Copie o link gerado no campo em destaque no site e cole no lugar do link expirado disponível no projeto inicial, que é este: https://crudcrud.com/api/2bb509be805f472a9834b336acf5904c. Você pode buscar por este link nos arquivos app.js e utils.js através do atalho CTRL+F e substituir pelo link que o CRUDCRUD gerou para você. A página funcionará perfeitamente após isso. Só digitar os campos e clicar em "Cadastrar". Para pesquisar um nome específico cadastrado, poderá clicar em "Pesquisar" e, caso queira ver a lista completa de clientes novamente, só clicar em "Mostrar Todos".
Estrutura do Projeto: 
  - scripts/
    - app.js
    - classes.js
    - utils.js
  - index.html
  - styles.css

Observações: Você precisará necessariamente substituir o link da API por um novo, pois o link do projeto já está expirado (verificar como fazer isso em "Como usar"). Por utilizar uma API externa, a página NÃO funcionará corretamente sem acesso à Internet.
