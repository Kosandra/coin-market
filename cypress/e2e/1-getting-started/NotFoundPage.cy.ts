describe("Main page functions E2E", () => {
  beforeEach(() => {
    cy.viewport(1920, 1080);
  });

  it("Should return to the home page from the wrong path page", () => {
    cy.visit("/abc");
    cy.get("#btn-back")
      .click()
      .then(() => {
        cy.location().should((loc) => {
          expect(loc.href).to.equals(`${loc.origin}/`);
        });
      });
  });

  it("Should go back to the main page from the page with the wrong coin id", () => {
    cy.visit("/coins/abc");
    cy.get("#btn-back")
      .click()
      .then(() => {
        cy.location().should((loc) => {
          expect(loc.href).to.equals(`${loc.origin}/`);
        });
      });
  });
});
