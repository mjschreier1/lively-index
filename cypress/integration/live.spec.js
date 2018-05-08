describe("LiveLy Application", () => {
  it("has LiveLy branding present in the footer", () => {
    cy.visit("/")

    cy.get("footer")
      .should("exist")

    cy.get("footer p").eq(0)
      .should("contain", "Powered by")

    cy.get("footer img")
      .should("exist")

    cy.get("footer p").eq(1)
      .should("contain", "Copyright 2018")
  })

  it("has the apartment name prevalent in the header", () => {
    cy.get("header")
      .should("exist")

    cy.get("header h1")
      .should("contain", "Destination Ridge")
  })

  it("has a picture of the community as the background of the application", () => {
    cy.get("main")
      .should("have.css", "background-image")
  })

  it("has a community events list at /calendar", () => {
    cy.get(".buttonComponent")
      .should("exist")
      .and("have.length", 1)

    cy.get("#communityCalendar")
      .should("exist")
    
    cy.get("#communityCalendar h2")
      .should("contain", "Community Calendar")
    
    cy.get("#communityCalendar p")
      .should("exist")

    cy.get("#communityCalendar")
      .click()

    cy.location()
      .should("contain", "/calendar")

    cy.get("ul")
      .should("exist")

    cy.get("li").eq(0)
      .find("h3")
      .should("exist")
      .find("p")
      .should("have.length", 2)
  })

  it("allows an admin to add an event to the community events list", () => {
    cy.visit("/")

    cy.get("#credentials")
      .should("exist")

    cy.get("#credentials input")
      .should("have.length", 2)

    cy.get("#credentials button")
      .should("exist")
      .and("contain", "Submit")
      .and("have.attr", "disabled")

    cy.get("#credentials input").eq(0)
      .type("a")

    cy.get("#credentials input").eq(1)
      .type("1234")

    cy.get("#credentials button")
      .should("have.attr", "disabled")

    cy.get("#credentials input").eq(1)
      .type("5")

    cy.get("#credentials button")
      .should("have.attr", "disabled")

    cy.get("#credentials input").eq(0)
      .type("b")

    cy.get("#credentials button")
      .should("not.have.attr", "disabled")

    cy.get("#credentials input").eq(1)
      .clear()
      .type("1234")

    cy.get("#credentials button")
      .should("have.attr", "disabled")

    cy.visit("/calendar")

    cy.location()
      .should(location => {
        expect(location.pathname).to.eq("/")
      })

    cy.get("#credentials input").eq(0)
      .type("admin")

    cy.get("#credentials input").eq(1)
      .type("12345")

    cy.get("#credentials button")
      .should("not.have.attr", "disabled")
      .click()

    cy.get("#credentials")
      .should("not.exist")

    cy.get("#communityCalendar")
      .click()

    cy.location()
      .should("contain", "/calendar")

    cy.get("form")
      .should("exist")

    cy.get("form input")
      .should("have.length", 4)

    cy.get("form button")
      .should("exist")
  })
})