describe("Profile coins E2E", () => {
  beforeEach(() => {
    cy.viewport(1920, 1080);
    cy.visit("coins/bitcoin");
  });

  it("The header should have the stated number of coins in the top", () => {
    cy.get("#top-coins")
      .find("div:first-child > span")
      .then(($span) => {
        cy.log("Span: ", $span.html());
        cy.get("#top-coins > div:last-child > div").should(
          "have.length",
          $span.html(),
        );
      });
    cy.get("#top-coins").screenshot("top-coins-block");
  });

  it("There should be an element with the portfolio value and the difference with the initial portfolio value", () => {
    cy.get("#profile-cart").should("exist").screenshot("profile");
    cy.get("#profile-cart > div > span").should("not.be.empty");
    cy.get("#profile-cart > div > div").should("exist").should("not.be.empty");
  });

  it("A modal window with a list of coins in the profile should work", () => {
    cy.get("#profile-cart").click();
    cy.get("#modal-list-coins ul").should("exist");
    cy.get("#modal-list-coins").screenshot("modal-coin-list-empty");
    cy.get("#modal-list-coins [type='button']").click();
    cy.get("#modal-list-coins").should("not.exist");
  });
});
