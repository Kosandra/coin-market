describe("Profile coins E2E", () => {
  beforeEach(() => {
    cy.viewport(1920, 1080);
    cy.visit("/");
    cy.get("#table-coins > div")
      .should("have.length.at.least", 20)
      .then(() => {
        cy.get("#table-coins > div:first-child")
          .click()
          .then(($el) => {
            cy.location().should((loc) => {
              expect(loc.href).to.equals(
                `${loc.origin}/coins/${$el.attr("id")}`,
              );
            });
          });
      });
  });

  // it("There should be a return to the home page from the coin page", () => {
  //   cy.get("#btn_back").click();
  //
  //   cy.location().should((loc) => {
  //     expect(loc.href).to.equals(`${loc.origin}/`);
  //   });
  // });
  //
  // it("The coin must be added to the list in the profile", () => {
  //   const countCoinsBuy = "5";
  //
  //   cy.get("#coin-header > [type='button']").click();
  //   cy.get("#modal-add-coin")
  //     .should("be.visible")
  //     .get("form [type='number']")
  //     .type(countCoinsBuy)
  //     .should("have.value", countCoinsBuy);
  //   cy.get("#modal-add-coin [type='submit']").click();
  //   cy.get("#modal-add-coin").should("not.exist");
  //
  //   cy.get("#profile-cart").click();
  //   cy.get("#modal-list-coins")
  //     .should("be.visible")
  //     .get("li")
  //     .should("have.length.at.least", 1)
  //     .get("form div:first-child > span")
  //     .invoke("text")
  //     .should("equal", `(${countCoinsBuy})`);
  // });

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
      .should("exist")
      .then(($chart) => {
        expect($chart).attr("title").not.to.equals(oldVal);
      });
  });
});
