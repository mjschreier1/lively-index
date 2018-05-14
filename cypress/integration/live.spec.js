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

  it("should allow admin users to delete events from the community events list", () => {
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

    cy.go("back")
    cy.go("forward")

    cy.get("li").eq(0)
      .find("i")
      .should("exist")
      .and("have.attr", "class", "fas fa-times")

    cy.get("li").eq(1)
      .find("i")
      .should("exist")
      .and("have.attr", "class", "fas fa-times")

    cy.get("li")
      .then(lis => {
        expect(lis.length).to.be.greaterThan(1);
        let liCount = lis.length;
        
        cy.get("li").eq(0)
          .find("i")
          .click()
    
        cy.get("li")
          .should("have.length", liCount - 1)
    
        cy.get("li").eq(0)
          .find("i")
          .click()
    
        cy.get("li")
          .should("have.length", liCount - 2)
          
        cy.request("https://lively-app-server.herokuapp.com/events")
          .then(res => {
            expect(res.body.length).to.eq(liCount - 2)
          })
      })
  })

  it("allows users to view open service requests relating to their lease/unit", () => {
    cy.reload()

    cy.get("#credentials input").eq(0)
      .clear()
      .type("resident")

    cy.get("#credentials input").eq(1)
      .clear()
      .type("12345")

    cy.get("#credentials button")
      .click()

    cy.get("#serviceRequests")
      .should("exist")

    cy.get("#serviceRequests")
      .find("h2")
      .should("contain", "Service Requests")
    
    cy.get("#serviceRequests")
      .find("i")
      .should("exist")

    cy.get("#serviceRequests")
      .click()

    cy.location()
      .should(location => {
        expect(location.pathname).to.eq("/service")
      })

    cy.request("DELETE", "https://lively-app-server.herokuapp.com/service/all")
      .then(res => {
        expect(res.status).to.eq(200)
      })

    cy.request(
      "POST",
      "https://lively-app-server.herokuapp.com/service",
      {
        id: "2",
        unit: "123",
        contact: "7204600159",
        subject: "Leaky Faucet",
        description: "Faucet in the master bath is leaking."
      }
    )
      .then(res => {
        expect(res.status).to.eq(201)
      })

    cy.request(
      "POST",
      "https://lively-app-server.herokuapp.com/service",
      {
        id: "2",
        unit: "123",
        contact: "7204600159",
        subject: "Bar Light Out",
        description: "One of the lights above the bar in the kitchen is out."
      }
    )
      .then(res => {
        expect(res.status).to.eq(201)
      })

    cy.get("ul")
      .should("exist")

    cy.get("li")
      .should("have.length", 2)

    cy.get("li").eq(0)
      .find("h4").eq(0)
      .should("exist")
      .and("contain", "123")

    cy.get("li").eq(0)
      .find("h4").eq(1)
      .should("exist")
      .and("contain", "Leaky Faucet")

    cy.get("li").eq(0)
      .find("p").eq(0)
      .should("exist")
      .and("contain", "Faucet in the master bath is leaking.")

    cy.get("li").eq(0)
      .find("p").eq(1)
      .should("exist")
      .and("contain", "Management Notes:")

    cy.get("li").eq(1)
      .find("h4").eq(0)
      .should("exist")
      .and("contain", "123")

    cy.get("li").eq(1)
      .find("h4").eq(1)
      .should("exist")
      .and("contain", "Bar Light Out")

    cy.get("li").eq(1)
      .find("p").eq(0)
      .should("exist")
      .and("contain", "One of the lights above the bar in the kitchen is out.")

    cy.get("li").eq(1)
      .find("p").eq(1)
      .should("exist")
      .and("contain", "Management Notes:")

    cy.request("DELETE", "https://lively-app-server.herokuapp.com/service/all")
  })

  it.only("allows a user to submit a service request", () => {
    cy.reload()

    cy.get("#credentials input").eq(0)
      .clear()
      .type("resident")

    cy.get("#credentials input").eq(1)
      .clear()
      .type("12345")

    cy.get("#credentials button")
      .click()

    cy.get("#serviceRequests", { timeout: 20000 })
      .click()

    cy.get("form")
      .should("exist")

    cy.get("form input")
      .should("have.length", 4)

    cy.get("label").eq(0)
      .should("contain", "Unit")

    cy.get("label").eq(1)
      .should("contain", "Contact")

    cy.get("label").eq(2)
      .should("contain", "Subject")

    cy.get("label").eq(3)
      .should("contain", "Description")

    cy.get("button")
      .should("have.attr", "disabled")

    cy.get("input").eq(0)
      .type("a")

    cy.get("input").eq(1)
      .type("a")

    cy.get("input").eq(2)
      .type("a")

    cy.get("button")
      .should("have.attr", "disabled")

    cy.get("input").eq(2)
      .clear()

    cy.get("input").eq(3)
      .type("a")

    cy.get("button")
      .should("have.attr", "disabled")

    cy.get("input").eq(1)
      .clear()

    cy.get("input").eq(2)
      .type("a")

    cy.get("button")
      .should("have.attr", "disabled")

    cy.get("input").eq(0)
      .clear()

    cy.get("input").eq(1)
      .type("a")

    cy.get("button")
      .should("have.attr", "disabled")

    cy.get("input").eq(0)
      .type("a")

    cy.get("button")
      .should("not.have.attr", "disabled")

    cy.get("#statusMessage")
      .should("not.exist")

    cy.request("DELETE", "https://lively-app-server.herokuapp.com/service/all")
      .then(res => {
        expect(res.status).to.eq(200)
      })

    cy.get("button")
      .click()

    cy.get("#statusMessage", { timeout: 10000 })
      .should("exist")
      .and("contain", "Service request submitted successfully")

    cy.wait(3000)

    cy.get("#statusMessage")
      .should("exist")

    cy.wait(1000)
    
    cy.get("#statusMessage")
      .should("not.exist")

    cy.request("https://lively-app-server.herokuapp.com/service/2")
      .then(res => {
        expect(res.status).to.eq(200)
        expect(res.body.length).to.eq(1)
        expect(res.body[0].unit).to.eq("a")
        expect(res.body[0].contact).to.eq("a")
        expect(res.body[0].subject).to.eq("a")
        expect(res.body[0].description).to.eq("a")
      })
  })
})