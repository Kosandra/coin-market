describe("Main page functions E2E", () => {
  beforeEach(() => {
    cy.viewport(1920, 1080);
    cy.visit("/");
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
  });

  it("There should be an element with the portfolio value and the difference with the initial portfolio value", () => {
    cy.get("#profile-cart").should("exist");
    cy.get("#profile-cart > div > span").should("not.be.empty");
    cy.get("#profile-cart > div > div").should("exist").should("not.be.empty");
  });

  it("The table must exist and its table rows must contain information about the coin", () => {
    const columnsCount = 6;

    cy.get("#table").should("exist");

    cy.get("#table-head")
      .find("label")
      .should("have.length", columnsCount)
      .wait(500);

    cy.get("#table-coins > div #text-wriper").should("not.exist");
    cy.get("#table-coins > div:first-child > div").should(
      "have.length",
      columnsCount,
    );
    cy.get(
      "#table-coins > div > div span[title='changePercent24Hr'] > div > span",
    )
      .should("exist")
      .each(($percent) => {
        if (Number($percent.text()) > 0)
          expect($percent).to.have.css("color", "rgb(17, 203, 17)");
        else expect($percent).to.have.css("color", "rgb(246, 23, 23)");
      });
  });

  it("Once the coins are loaded, the page should go down and up at the click of a button", () => {
    cy.get("#table-coins > div")
      .should("have.length.at.least", 20)
      .then(() => {
        cy.get("#btn-to-down").click();
        cy.window().its("scrollY").should("not.equal", 0);

        cy.get("#btn-to-top").click();
        cy.window().its("scrollY").should("equal", 0);
      });
  });

  it("Should load more coins into the table", () => {
    cy.get("#table-coins > div")
      .should("have.length.at.least", 20)
      .then(() => {
        cy.get("#btn-more-coins")
          .click()
          .then(() => {
            cy.get("#table-coins > div").should("have.length.at.least", 40);
          });
      });
  });

  it("There must be a limited set of characters to enter in the search field", () => {
    const invalidText = "@#$%^&**)(+=/>";
    const wrongLang = "неверныйκείμενο";
    cy.get("input[type=text]")
      .type(invalidText)
      .should("have.value", "")
      .clear()
      .type(wrongLang)
      .should("have.value", "");
  });

  it("There should be coins in the table that contain the text from the search field", () => {
    cy.get("#table-coins > div")
      .should("have.length.at.least", 20)
      .then(() => {
        const valueToInput = "bitc";

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

  it("The table should sort when you click on a column header", () => {
    cy.get("#table-head > label")
      .should("have.length", 6)
      .get('[type="checkbox"]')
      .each(($checkInput) => {
        cy.wrap($checkInput).click({ force: true }).click({ force: true });
      });
  });

  it("There should be a transition to the coin's page when you click on its row in the table", () => {
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
