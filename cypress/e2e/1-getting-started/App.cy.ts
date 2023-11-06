describe("App E2E", () => {
  beforeEach(() => {
    cy.viewport(1920, 1080);
    cy.visit("/");
  });

  it("Once the coins are loaded, the page should go down and up at the click of a button", () => {
    cy.get("#table-coins > div")
      .should("have.length.at.least", 20)
      .then(() => {
        cy.get("#btn-to-down").click();
      });
    cy.window().its("scrollY").should("not.equal", 0);

    cy.get("#btn-to-top").click();
    cy.window().its("scrollY").should("equal", 0);
  });

  it("Should load more coins into the table", () => {
    cy.get("#table-coins > div")
      .should("have.length.at.least", 20)
      .then(() => {
        cy.get("#btn-more-coins").click();
        cy.get("#table-coins > div").should("have.length.at.least", 40);
      });
  });

  it("There should be coins in the table that contain the text from the search field", () => {
    const valueToInput = "bitc";
    cy.get("#table-coins > div")
      .should("have.length.at.least", 20)
      .then(() => {
        cy.get("input[type=text]")
          .type(valueToInput)
          .should("have.value", valueToInput);
        cy.get("#table-coins > div").each(($row) => {
          cy.log("Row info: ", $row.find("#row-icon-coin > div > span").html());
          expect(
            $row.find("#row-icon-coin > div > span").html().toLowerCase(),
          ).include(valueToInput);
        });
      });
  });

  it("There should be a link to the coin page", () => {
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
});
