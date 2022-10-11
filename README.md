
# login-cypress-demo


# 1. O que é o Cypress?

É uma ferramenta para testes "end to end" voltada a aplicações web que ajuda a automatizar fluxos em aplicações que rodam em navegador.


# 2. Como começar a usar o Cypress?

É muito fácil! Você só precisa do Node.js instalado. Ele pode ser encontrado aqui: https://nodejs.org/en/download/  
E para facilitar a codificação, utilize uma IDE de desenvolvimento de sua preferência. Para esse tutorial será utilizado o VScode.


# 3. Inicializando o projeto

3.1. Na pasta do projeto é necessário inicializar o "Node Package Manager" através do terminal. Se quiser configurar as opções manualmente utilize o comando "npm init". Para iniciar com as configurações padrão basta usar "npm init --yes".
3.2. Para instalar o Cypress, vamos utilizar o comando "npm install cypress --save-dev". Após o processo de instalação é possível verificar no arquivo "package.json" a dependência e a versão.


# 4. Executando o Cypress

4.1. Vamos utilizar o comando "npx cypress open" para abrir o Cypress no nosso projeto.
4.2. Para esse tutorial utilizaremos testes E2E (end to end), então selecionaremos essa opção.
4.3. Na tela seguinte ele exibirá os arquivos que irá criar em nosso projeto, basta clicar em continue.
4.4. Selecione um navegador e clique em iniciar.
4.5. O Cypress vai então abrir uma janela do navegador a qual ele terá o controle necessário para executar os testes.


# 5. Criando um arquivo para escrever os testes

5.1. Selecione a opção "Create new empty spec"
5.2. Digite o nome desejado para o arquivo e confirme.
5.3. Pode fechar essa próxima tela.
5.4. Selecione o spec criado no painel esquerdo e já estaremos executando nosso arquivo com os testes que no momento tem um código de exemplo que abre a página "https://example.cypress.io/"
5.5. Vamos acessar esse arquivo na nossa IDE. Ele estará em "/cypress/e2e/".
5.6. Daqui em diante usaremos exemplos. Para funções específicas a outros contextos, a documentação fornece suporte amplo e amigável: https://docs.cypress.io/


# 6. Sobre o projeto utilizado para exemplificar

Para os fins desse tutorial, foi utilizado um projeto que desenvolvi durante um bootcamp de programação frontend. Trata-se de duas páginas, uma tela de login e um dashboard de vendas. O foco dos testes desenvolvidos foi referente à tela de login. A primeira suite de testes analisa desde a exibição da mensagem de boas vindas no carregamento da página até se aparece a mensagem de erro quando não é possível validar o formato do email no input equivalente ao "username". A segunda suite testa a entrada de dados válidos até a exibição da página dashboard após um login bem sucedido.


# 7. Escrevendo os testes

7.1. Para o setup foi criado o comando para abrir a página onde os testes serão executados. Ao utilizar o auxílio da extensão "live server" do vscode, a página executa em: http://localhost:5500/ . O código:

before(() => {
  cy.visit('http://localhost:5500/')
});

Observações:
O Cypress não precisa necessariamente estar instalado no local do projeto a ser testado, tampouco o projeto precisa rodar localmente. O importante é que a aplicação rode a partir de um navegador. Trocando a url localhost:5500 pelo link https://helio-leao.github.io/b8one-company-dashboard-page/login.html de uma versão em deployement no git rende os mesmos resultados.


7.2. Para o teardown foi configurada uma limpeza de localStorage e sessionStorage que, após um login bem sucedido, recebe uma variável a qual possibilita login sem nova entrada de email e senha. Isso criava um problema para executar os testes múltiplas vezes.

after(() => {
  cy.window().then((window) => {
    window.sessionStorage.clear();
    window.localStorage.clear();
  });
});


7.3. A primeira suite de testes tem as seguintes instruções:

describe('Error message test', () => {

  it('should greet with message', () => {
    cy.contains('Olá, tudo bem?')
      .should('be.visible')
  })

  it('clicks button "Entrar"', () => {
    cy.contains('Entrar').click()
  })

  it('should display error message', () => {
      cy.get('.email')
        .should('have.class', 'email--error')
  })

})

Observações:
Após o setup, ela verifica se a página contém a mensagem de saudações; clica no botão "Entrar" sem incluir um email no input; e verifica se a mensagem de erro é exibida. Nesse caso, está analisando se existe a classe 'email--error' de css na div email, pois é pela adição dessa classe à referida div que o span contendo a mensagem aparece na tela. Poderia ser feito, de maneira mais elegante, da mesma forma que a mensagem de saudações - .should('be.visible') - mas em carater de experimentação e demonstração de robustez da ferramenta, que possibilita diversas soluções para determinados problemas, utilizei essa forma.


7.4. A segunda suite de testes tem as seguintes instruções:

describe('Login successful', () => {
  
  it('should fill username', () => {
    cy.get('.email__input')
      .type('academy@b8one.com')
      .should('have.value', 'academy@b8one.com')
  })

  it('should fill password', () => {
    cy.get('.pass__input')
      .type('Academy2022')
      .should('have.value', 'Academy2022')
  })

  it('clicks button "Entrar"', () => {
    cy.contains('Entrar').click()
  })

  it('should open dashboard', () => {
    cy.url().should('include', '/dashboard.html')
  })
  
})

Observações:
Entra com dados de um usuário cadastrado na API; clica no botão "Entrar"; confirma se a tela exibida é o dashboard, o que indica que o login ocorreu com sucesso.
