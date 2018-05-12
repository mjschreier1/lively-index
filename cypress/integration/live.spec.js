// Commented out original tests to account for user login

describe("LiveLy Application", () => {
  beforeEach(() => {
    cy.visit("/")

    cy.get("#credentials input").eq(0)
      .clear()
      .type("admin")

    cy.get("#credentials input").eq(1)
      .clear()
      .type("12345")

    cy.get("#credentials button")
      .click()
  })

  it("has LiveLy branding present in the footer", () => {
    // cy.visit("/")

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
      .and("have.length.at.least", 1)

    cy.get("#communityCalendar")
      .should("exist")
    
    cy.get("#communityCalendar h2")
      .should("contain", "Community Calendar")
    
    cy.get("#communityCalendar i")
      .should("exist")

    cy.get("#communityCalendar")
      .click()

    cy.location()
      .should(location => {
        expect(location.pathname).to.eq("/calendar")
      })

    cy.request(
      "POST", 
      "https://lively-app-server.herokuapp.com/events?startYear=2018&startMonth=5&startDate=20&startHour=9&startMinute=0&finishYear=2018&finishMonth=5&finishDate=20&finishHour=11&finishMinute=0", 
      {
        name: "Coffee and Pastries",
        location: "Clubhouse",
        description: "Stop by the clubhouse for complimentary pastries!"
      }
    )

    cy.request(
      "POST",
      "https://lively-app-server.herokuapp.com/events?startYear=2018&startMonth=6&startDate=20&startHour=9&startMinute=0&finishYear=2018&finishMonth=6&finishDate=20&finishHour=11&finishMinute=0",
      {
        name: "Summer Kickoff Party",
        location: "Pool",
        description: "Come enjoy lemonade and fun!"
      }
    )

    cy.request("https://lively-app-server.herokuapp.com/events")
      .then(res => {
        expect(res.status).to.eq(200)
        expect(res.body.length).to.be.greaterThan(1)
        expect(res.body[0]).to.have.property("name")
        expect(res.body[0]).to.have.property("location")
        expect(res.body[0]).to.have.property("description")
        expect(res.body[0]).to.have.property("start")
        expect(res.body[0]).to.have.property("finish")
        expect(res.body[1]).to.have.property("name");
        expect(res.body[1]).to.have.property("location");
        expect(res.body[1]).to.have.property("description");
        expect(res.body[1]).to.have.property("start");
        expect(res.body[1]).to.have.property("finish");
      })

    cy.reload()

    cy.get("#credentials input").eq(0)
      .clear()
      .type("admin")

    cy.get("#credentials input").eq(1)
      .clear()
      .type("12345")

    cy.get("#credentials button")
      .click()

    cy.get("ul")
      .should("exist")

    cy.get("li").eq(0)
      .find("h3")
      .should("exist")

    cy.get("li").eq(0)
      .find("p")
      .should("have.length.at.least", 3)
  })

  it("allows an admin to add an event to the community events list", () => {
    // cy.visit("/")

    // cy.get("#credentials")
    //   .should("exist")

    // cy.get("#credentials input")
    //   .should("have.length", 2)

    // cy.get("#credentials button")
    //   .should("exist")
    //   .and("contain", "Submit")
    //   .and("have.attr", "disabled")

    // cy.get("#credentials input").eq(0)
    //   .type("a")

    // cy.get("#credentials input").eq(1)
    //   .type("1234")

    // cy.get("#credentials button")
    //   .should("have.attr", "disabled")

    // cy.get("#credentials input").eq(1)
    //   .type("5")

    // cy.get("#credentials button")
    //   .should("have.attr", "disabled")

    // cy.get("#credentials input").eq(0)
    //   .type("b")

    // cy.get("#credentials button")
    //   .should("not.have.attr", "disabled")

    // cy.get("#credentials input").eq(1)
    //   .clear()
    //   .type("1234")

    // cy.get("#credentials button")
    //   .should("have.attr", "disabled")

    // cy.get("#credentials input").eq(0)
    //   .clear()
    //   .type("admin")

    // cy.get("#credentials input").eq(1)
    //   .clear()
    //   .type("12345")

    // cy.get("#credentials button")
    //   .should("not.have.attr", "disabled")

    // cy.get("#credentials button")
    //   .click()

    cy.get("#credentials")
      .should("not.exist")

    cy.get("#communityCalendar")
      .click()

    cy.location()
      .should(location => {
        expect(location.pathname).to.eq("/calendar")
      })

    cy.get("form")
      .should("exist")

    cy.get("form input")
      .should("have.length", 4)

    cy.get("form button")
      .should("exist")
  })

  it.only("should allow admin users to delete events from the community events list", () => {
    cy.get("#communityCalendar")
      .click()

      
      cy.request(
        "POST",
        "https://lively-app-server.herokuapp.com/events?startYear=2018&startMonth=5&startDate=26&startHour=19&startMinute=0&finishYear=2018&finishMonth=5&finishDate=26&finishHour=21&finishMinute=0",
        {
          name: "Disco Night",
          location: "Clubhouse",
          description: "Bring your dancing shoes!"
        }
      )
      
      cy.request(
        "POST",
        "https://lively-app-server.herokuapp.com/events?startYear=2018&startMonth=6&startDate=27&startHour=9&startMinute=0&finishYear=2018&finishMonth=6&finishDate=27&finishHour=11&finishMinute=0",
        {
          name: "Disco Night Cleanup",
          location: "Clubhouse",
          description: "Help us clean up your mess!"
        }
      )

    cy.get("li").eq(0)
      .find("i")
      .should("exist")
      .and("have.attr", "class", "fas fa-times")

    cy.get("li").eq(1)
      .find("i")
      .should("exist")
      .and("have.attr", "class", "fas fa-times")

    let liCount = null;
    cy.get("li")
      .then(lis => {
        expect(lis.length).to.be.greaterThan(1);
        liCount = lis.length;
      })

    cy.get("li").eq(0)
      .find("i")
      .click()

    cy.get("li")
      .then(lis => {
        expect(lis.length).to.eq(liCount - 1)
      })

    cy.get("li").eq(0)
      .find("i")
      .click()

    cy.get("li")
      .then(lis => {
        expect(lis.length).to.eq(liCount - 2)
      })

    cy.request("https://lively-app-server.herokuapp.com/events")
      .then(res => {
        expect(res.length).to.eq(liCount - 2)
      })
  })
})