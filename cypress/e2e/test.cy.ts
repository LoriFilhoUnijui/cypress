describe('Cadastro na Tab 1', () => {
  it('envia o formulário com sucesso', () => {
    cy.visit('/tab1')

    cy.prompt([
      'Insira os dados para cadastro.',
      'Sugestões: Nome: Ana Tester, Email: ana@test.com, Senha: senha123'
    ]).then((response) => {
      const [name = 'Ana Tester', email = 'ana@test.com', password = 'senha123'] =
        typeof response === 'string' && response.includes(',')
          ? response.split(',').map((part) => part.trim())
          : ['Ana Tester', 'ana@test.com', 'senha123'];

      cy.get('[data-cy=signup-name]').type(name)
      cy.get('[data-cy=signup-email]').type(email)
      cy.get('[data-cy=signup-password]').type(password)
      cy.get('[data-cy=signup-submit]').click()

      cy.get('[data-cy=signup-success]').should('contain', name).and('contain', email)
    })
  })

  it('mostra erro quando faltam campos', () => {
    cy.visit('/tab1')
    cy.get('[data-cy=signup-submit]').click()
    cy.get('[data-cy=signup-error]').should('contain', 'Preencha todos os campos')
  })
})

describe('Apostas na Tab 2', () => {
  it('registra palpite e revela resultado', () => {
    cy.visit('/tab2')

    cy.prompt([
      'Escolha o time (azul ou vermelho) e o valor da aposta.',
      'Formato sugerido: azul,50'
    ]).then((answer) => {
      const fallback = ['vermelho', '75'] as [string, string];
      const [teamInput, amountInput] =
        typeof answer === 'string' && answer.includes(',')
          ? (answer.split(',').map((x) => x.trim()) as [string, string])
          : fallback;

      const team = teamInput.toLowerCase().includes('azul') ? 'azul' : 'vermelho';
      const amount = amountInput || '75';

      if (team === 'azul') {
        cy.get('[data-cy=team-azul]').click()
      } else {
        cy.get('[data-cy=team-vermelho]').click()
      }

      cy.get('[data-cy=bet-amount]').clear().type(amount)
      cy.get('[data-cy=bet-submit]').click()

      const expectedTeamText = team === 'azul' ? 'Time Azul' : 'Time Vermelho'

      cy.get('[data-cy=bet-summary]').should('contain', expectedTeamText).and('contain', amount)

      cy.get('[data-cy=bet-reveal]').click()
      cy.get('[data-cy=bet-result]').should('contain', 'venceu').and('contain', 'Seu palpite')
    })
  })
})
