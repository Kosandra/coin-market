describe("Profile coins E2E", () => {
  beforeEach(() => {
    cy.viewport(1920, 1080);
    cy.visit("/");
  });

  it("Two coins must be purchased", () => {
    const countCoinsBuy = "5";

    cy.get("#table-coins > div")
      .should("have.length.at.least", 20)
      .then(() => {
        cy.get("#table-coins > div:first-child input[type='button']").click();
      });

    cy.get("#modal-add-coin")
      .should("be.visible")
      .get("form [type='number']")
      .type(countCoinsBuy)
      .should("have.value", countCoinsBuy);
    cy.get("#modal-add-coin [type='submit']").click();
    cy.get("#modal-add-coin").should("not.exist");

    cy.get("#table-coins > div:nth-child(2) input[type='button']").click();
    cy.get("#modal-add-coin")
      .screenshot("modal-coin-list-coins")
      .should("be.visible")
      .get("form [type='number']")
      .type(countCoinsBuy)
      .should("have.value", countCoinsBuy);
    cy.get("#modal-add-coin [type='submit']").click();
    cy.get("#modal-add-coin").should("not.exist");

    cy.get("#profile-cart").click();
    cy.get("#modal-list-coins")
      .should("be.visible")
      .get("li")
      .should("have.length.at.least", 2);
  });

  it("Changing the number of coins when buying and removing them", () => {
    const countCoinsBuy = "5";

    cy.get("#table-coins > div")
      .should("have.length.at.least", 20)
      .then(() => {
        cy.get("#table-coins > div:first-child input[type='button']").click();
      });

    cy.get("#modal-add-coin")
      .should("be.visible")
      .get("form [type='number']")
      .type(countCoinsBuy)
      .should("have.value", countCoinsBuy);
    cy.get("#modal-add-coin [type='submit']").click();
    cy.get("#modal-add-coin").should("not.exist");

    cy.get("#profile-cart").click();
    cy.get("#modal-list-coins")
      .should("be.visible")
      .get("li")
      .should("have.length.at.least", 1);
    cy.get("#modal-list-coins [type='button']").click();

    cy.get("#table-coins > div:first-child input[type='button']").click();
    cy.get("#modal-add-coin")
      .should("be.visible")
      .get("form [type='number']")
      .type(countCoinsBuy)
      .should("have.value", countCoinsBuy);
    cy.get("#modal-add-coin [type='submit']").click();
    cy.get("#modal-add-coin").should("not.exist");

    cy.get("#profile-cart").wait(1000).screenshot("profile-money").click();
    cy.get("#modal-list-coins")
      .should("be.visible")
      .get("li")
      .should("have.length.at.least", 1)
      .get("form div:first-child > span")
      .invoke("text")
      .should("equal", "(10)");
    cy.get("#modal-list-coins form [type='number']")
      .type("5")
      .should("have.value", "5");
    cy.get("#modal-list-coins form [type='submit']").click();

    cy.get("#profile-cart").click();
    cy.get("#modal-list-coins")
      .should("be.visible")
      .get("li")
      .should("have.length.at.least", 1)
      .get("form div:first-child > span")
      .invoke("text")
      .should("equal", "(5)");
  });

  it("Removing coins from the profile", () => {
    const countCoinsBuy = "5";

    cy.get("#table-coins > div:first-child input[type='button']").click();
    cy.get("#modal-add-coin")
      .should("be.visible")
      .get("form [type='number']")
      .type(countCoinsBuy)
      .should("have.value", countCoinsBuy);
    cy.get("#modal-add-coin [type='submit']").click();
    cy.get("#modal-add-coin").should("not.exist");

    cy.get("#profile-cart").click();
    cy.get("#modal-list-coins form [type='number']")
      .type(countCoinsBuy)
      .should("have.value", countCoinsBuy);
    cy.get("#modal-list-coins form [type='submit']").click();

    cy.get("#profile-cart").click();
    cy.get("#modal-list-coins")
      .should("be.visible")
      .get("li")
      .should("have.length.at.least", 0);
    cy.get("#modal-list-coins [type='button']").click();
  });
});
