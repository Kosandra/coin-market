describe("Main page functions E2E", () => {
  beforeEach(() => {
    cy.viewport(1920, 1080);
    cy.visit("/");
    cy.get("#table-coins > div").should("have.length.at.least", 20);
  });

  it("Once the coins are loaded, the page should go down and up at the click of a button", () => {
    cy.get("#btn-to-down").click();
    cy.window().its("scrollY").should("not.equal", 0);
    cy.get("#btn-to-top").click();
    cy.window().its("scrollY").should("equal", 0);
  });

  it("Should load more coins into the table", () => {
    cy.get("#btn-more-coins").click();
    cy.get("#table-coins > div").should("have.length.at.least", 40);
  });

  it("There should be coins in the table that contain the text from the search field", () => {
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

  it("The header should have the stated number of coins in the top", () => {
    cy.get("#top_coins > div:first-child > span").then(($span) => {
      cy.log("Span: ", $span.html());
      cy.get("#top_coins > div:last-child > div").should(
        "have.length",
        $span.html(),
      );
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
});
