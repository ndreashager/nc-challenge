describe('empty spec', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  it('Does not do much!', () => {
    expect(true).to.equal(true)
  })
})
