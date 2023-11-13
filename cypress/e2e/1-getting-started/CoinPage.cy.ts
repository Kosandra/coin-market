describe("Profile coins E2E", () => {
  beforeEach(() => {
    cy.viewport(1920, 1080);
    cy.visit("coins/bitcoin");
  });

  it("There should be a coin icon, a button to add and a description of the coin", () => {
    cy.get("#coin-header > div")
      .should("not.be.empty")
      .get("#coin-header > div > img")
      .screenshot("coin-page-icon")
      .should("have.attr", "src");
    cy.get("#coin-header > [type='button']").should("exist");
    cy.get("#coin-header").parent().wait(1000).screenshot("coin-page-data");
    cy.screenshot("coin-page");
  });

  it("There should be a return to the home page from the coin page", () => {
    cy.get("#btn-back").click();

    cy.location().should((loc) => {
      expect(loc.href).to.equals(`${loc.origin}/`);
    });
  });

  it("The coin must be added to the list in the profile", () => {
    const countCoinsBuy = "5";

    cy.get("#coin-header > [type='button']").click();
    cy.get("#modal-add-coin")
      .should("be.visible")
      .get("form [type='number']")
      .type(countCoinsBuy)
      .should("have.value", countCoinsBuy);
    cy.get("#modal-add-coin").screenshot("modal-add-coin");
    cy.get("#modal-add-coin [type='submit']").click();
    cy.get("#modal-add-coin").should("not.exist");

    cy.get("#profile-cart").click();
    cy.get("#modal-list-coins")
      .should("be.visible")
      .get("li")
      .should("have.length.at.least", 1)
      .get("form div:first-child > span")
      .invoke("text")
      .should("equal", `(${countCoinsBuy})`);
  });

  it("The period of the chart should be changed ", () => {
    let oldVal = "";
    cy.get("#coin-body")
      .should("exist")
      .wait(1000)
      .get("#my-chart")
      .should("exist")
      .then(($chart) => {
        oldVal = $chart.attr("title");
      });
    cy.get("#coin-body [type='radio']").eq(1).click();

    cy.get("#my-chart")
      .screenshot("coin-page-chart")
      .should("exist")
      .then(($chart) => {
        expect($chart).attr("title").not.to.equals(oldVal);
      });
  });

  it("The input field in the Add Coin window must be valid", () => {
    const invalidValue = "error&*";
    const bigNumber = "1000";
    const negativeNumber = "-210";
    cy.get("#coin-header > [type='button']").click();
    cy.get("#modal-add-coin")
      .should("be.visible")
      .get("form [type='number']")
      .type(invalidValue)
      .should("have.value", "")
      .type(negativeNumber)
      .should("have.value", negativeNumber);
    cy.get("#modal-add-coin [type='submit']").click();
    cy.get("#modal-add-coin")
      .wait(1000)
      .screenshot("modal-add-coin-invalid")
      .should("exist");

    cy.get("#modal-add-coin form [type='number']")
      .clear()
      .type(bigNumber)
      .should("have.value", bigNumber);
    cy.get("#modal-add-coin [type='submit']").click();
    cy.get("#modal-add-coin").should("exist");
  });

  it("In the coin profile window, the input field for deleting coins must be valid", () => {
    const countCoinsBuy = "5";
    const validNumberMoreThenCoins = "10";

    cy.get("#coin-header > [type='button']").click();
    cy.get("#modal-add-coin")
      .should("be.visible")
      .get("form [type='number']")
      .type(countCoinsBuy)
      .should("have.value", countCoinsBuy);
    cy.get("#modal-add-coin [type='submit']").click();
    cy.get("#modal-add-coin").should("not.exist");

    const invalidValue = "error&*";
    const bigNumber = "1000";
    const negativeNumber = "-210";
    cy.get("#profile-cart").click();
    cy.get("#modal-list-coins")
      .should("be.visible")
      .get("li:first-child form [type='number']")
      .type(invalidValue)
      .should("have.value", "")
      .type(negativeNumber)
      .should("have.value", negativeNumber);
    cy.get("#modal-list-coins [type='submit']").click();
    cy.get("#modal-list-coins").should("exist");

    cy.get("#modal-list-coins li:first-child form [type='number']")
      .clear()
      .type(bigNumber)
      .should("have.value", bigNumber);
    cy.get("#modal-list-coins [type='submit']").click();
    cy.get("#modal-list-coins").should("exist");

    cy.get("#modal-list-coins li:first-child form [type='number']")
      .clear()
      .type(validNumberMoreThenCoins)
      .should("have.value", validNumberMoreThenCoins);
    cy.get("#modal-list-coins [type='submit']").click();
    cy.get("#modal-list-coins")
      .wait(1000)
      .screenshot("modal-coin-list-invalid")
      .should("exist");
  });
});
