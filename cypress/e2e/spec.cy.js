before(() => {
  cy.visit('http://localhost:5500/')
});

after(() => {
  cy.window().then((window) => {
    window.sessionStorage.clear();
    window.localStorage.clear();
  });
});


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