describe("how great the app will look after this", () => {
  it("will look awesome!", () => {
    cy.request("DELETE", "https://lively-app-server.herokuapp.com/service/all")
      .then(res => {
        expect(res.status).to.eq(200)
      })

    cy.request("DELETE", "https://lively-app-server.herokuapp.com/payment/all")
      .then(res => {
        expect(res.status).to.eq(200)
      })

    cy.request("DELETE", "https://lively-app-server.herokuapp.com/users/all")
      .then(res => {
        expect(res.status).to.eq(200)
      })

    cy.request("DELETE", "https://lively-app-server.herokuapp.com/events/all")
      .then(res => {
        expect(res.status).to.eq(200)
      })
    
    cy.request("POST", 
    "https://lively-app-server.herokuapp.com/users?admin=true", 
    {
      first: "Adam",
      last: "Admin",
      pin: "12345",
      email: "test@test.com"
    })
      .then(res => {
        expect(res.status).to.eq(201)
      })

    cy.request("POST", 
    "https://lively-app-server.herokuapp.com/users?admin=false", 
    {
      first: "Rebecca",
      last: "Resident",
      pin: "12345",
      email: "test@test.com"
    })
      .then(res => {
        console.log(res)
        expect(res.status).to.eq(201)
        cy.request("POST", "https://lively-app-server.herokuapp.com/service", {
          userId: res.body.id,
          unit: "123",
          contact: "7204600159",
          subject: "Bar Light Out",
          description: "One of the lights above the bar in the kitchen is out."
        })
          .then(res => {
            expect(res.status).to.eq(201)
          })
      })


    cy.request("POST", 
    "https://lively-app-server.herokuapp.com/users?admin=false", 
    {
      first: "Gary",
      last: "Bishop",
      pin: "12345",
      email: "test@test.com"
    })
      .then(res => {
        expect(res.status).to.eq(201)
        cy.request("POST", "https://lively-app-server.herokuapp.com/service", {
          userId: res.body.id,
          unit: "227",
          contact: "555-555-5555",
          subject: "Leaky Faucet",
          description: "The faucet in the master bath is leaking. Help!"
        })
          .then(res => {
            expect(res.status).to.eq(201)
          })
      })


    cy.request("POST", 
    "https://lively-app-server.herokuapp.com/users?admin=false", 
    {
      first: "Julie",
      last: "Johnson",
      pin: "12345",
      email: "test@test.com"
    })
      .then(res => {
        expect(res.status).to.eq(201)
        cy.request("POST", "https://lively-app-server.herokuapp.com/service", {
          userId: res.body.id,
          unit: "208",
          contact: "(555) 123-4567",
          subject: "Bird Infestation on the Patio",
          description:
            "Birds are all over my patio at all hours of the day. I don't know why I can't get them to go away. Please help me repel those pesky creatures!!!"
        })
          .then(res => {
            expect(res.status).to.eq(201)
          })
      })
    
    cy.request(
      "POST",
      "https://lively-app-server.herokuapp.com/events?startYear=2018&startMonth=5&startDate=19&startHour=13&startMinute=0&finishYear=2018&finishMonth=5&finishDate=19&finishHour=16&finishMinute=0",
      {
        name: "Pool Party",
        location: "Pool",
        description: "Come have fun in the sun!"
      }
    )
      .then(res => {
        expect(res.status).to.eq(201)
      })

    cy.request(
      "POST",
      "https://lively-app-server.herokuapp.com/events?startYear=2018&startMonth=5&startDate=26&startHour=19&startMinute=0&finishYear=2018&finishMonth=5&finishDate=26&finishHour=21&finishMinute=0",
      {
        name: "Disco Night",
        location: "Clubhouse",
        description: "Bring your dancing shoes!"
      }
    )
      .then(res => {
        expect(res.status).to.eq(201)
      })
  })
})