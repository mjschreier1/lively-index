# User Stories and Acceptance Criteria

#### As a developer of LiveLy, I want to have LiveLy branding present on the application so that our brand is visible to users.
- Application has a footer component
- Footer component contains a p tag with the text "powered by" 
- Footer component contains an img of the LiveLy logo after the text "powered by"
- Footer component contains a p tag with the text "copyright 2018"

#### As a manager, I want to have our apartment name prevalent in the header so that our brand is visible to users.
- Application has a header component 
- Header component contains an h1 containing the text "Destination Ridge"

#### As a manger, I want to have a picture of our community as the background image for the application
- App component contains a div with a "background-image" property

#### As a resident, I want to be able to see a list of community events so that I know what is going on in the community.
- Application has a button component
- Number of instances of button components rendered on the page equals the length of the buttons array in the app component
- One button component (#communityCalendar) is rendered with an h2 containing "Community Calendar" and a calendar icon
- When clicked, #communityCalendar navigates to /calendar
- Event data set can be retrieved via a GET request to deployment-server/events and includes name, location, description, start time, and finish time
- /calendar contains a ul
- There is an li for each event in the list containing an h3 with the name of the event, a p with the time, a p with the date, a p with the location, and an optional p with description

#### As a manager, I want to be able to add an event to the community events list so that I don't have to call our developer to update the calendar.
- On load, the index route loads a modal with an input for last name, a number input for user PIN, and a submit button
- Submit button is disabled when the last name is less than 2 characters or when the user PIN is less than 5 numbers
- If no user is logged in, all routes display credentials component instead of view
- When an admin user clicks #communityCalendar to navigate to /calendar, an add form also appears
- Add form includes an input for start time, end time, location, and description, as well as a submit button
- Submit button is disabled if start time, end time, or location fields are empty

#### As a manager, I want to be able to delete events from the community events list so that I can remove old or inaccurate information.
- When an admin user clicks #communityCalendar to navigate to /calendar, each event's li has an "X" icon
- When an event's "X" icon is clicked, the event is no longer rendered
- When an event's "X" icon is clicked, the event is deleted from the events table of the database

#### As a user, I want to be able to view open service requests relating to my lease/unit
- One button component (#serviceRequests) is rendered with an h2 containing "Service Requests" and a tool icon
- When clicked, #serviceRequests navigates to /service
- /service contains a ul with an li for each request with an "open" status where the user is noted as the request owner
- Each li contains an h4 with the unit number, an h4 with the subject, a p with the provided description, and a p with any admin notes

#### As a user, I want to be able to submit a service request online so that I don't have to contact the office to submit a request.
- A form element is rendered at /service
- The rendered form contains inputs for unit, phone, subject line, and description, and has a submit button
- The submit button is disabled when any of these fields are empty
- After submitting a service request, a success message is displayed for four seconds
- After submitting a service request, it exists in the database 

#### As a manager, I want to be able to view all open service requests
- When an admin user clicks #serviceRequests to navigate to /service, an additional button renders with the text "Open Service Requests" (#openRequests)
- When #openRequests is clicked, a collapsed card for each open request is rendered
- The collapsed card contains an h3 with the unit number and subject
- When clicked, the card expands to also render p tags with resident owner, contact number, and description

#### As a manager, I want to be able to update the status of service requests so that the resident can follow our progress in resolving any maintenance issues.
- When an admin user is at /service and clicks #openRequests to view the list of open service requests, each card (when expanded) renders the admin notes in a form input field and the open status in a dropdown menu
- Each expanded card has an update button that is disabled until changes have been made
- When a change has been made to a service request and the update button has been clicked, the record is updated in the database and the new data is rendered on reload

#### As a resident, I want to have a home button that takes me back to the landing screen so that I can start over if I press the incorrect button.
- Header component contains a house icon
- When clicked, the house icon takes the user back to the main menu

#### As a resident, I want to be able to view when conference rooms are available so that I can plan events and meetings accordingly.
- One button component (#reserveRooms) is rendered with an h2 containing "Reserve Rooms" and a floor plan icon
- When clicked, #reserveRooms navigates to /reserve
- /reserve renders a dropdown menu with each conference room
- When a conference room is selected from the dropdown, a ul is rendered with an li for each upcoming reservation for that room

#### As a resident, I want to be able to reserve a conference room space online so that I don't have to contact the office to schedule an event.
- When a user navigates to /reserve, there is an #addReservation button
- When #addReservation is clicked, a form is rendered with an input for start date/time, an input for end date/time, and a select menu with an option for each conference room are rendered in addition to a submit button
- If the times overlap an existing reservation when the submit button is clicked, the error message "Room not available for the times selected" is rendered
- If the submit button is clicked when there are no conflicts, the success message "Room reserved successfully" is rendered
- After a successful reservation, if the user navigates back to /reserve, the reservation is visible when the room is selected from the dropdown menu

#### As a resident, I want to be able to pay my rent online so that I don't have to stop by the office and pay in person.
- One button component (#payment) is rendered with an h2 containing "Make Payment" and a money icon
- When clicked, #payment navigates to /payment
- /payment has an h2 with the text "Make a Payment" and a form
- The payment form has a number input with the label "amount"
- The payment form includes a Stripe/Plaid iframe that can securely collect ACH payment information
- /payment has a p with terms as required by law (see https://support.stripe.com/questions/accepting-ach-payments-with-stripe#ach-authorization), including clear and legible consent, transaction specific details, client/account information, further transaction info (if applicable), receipt of transaction, process for revocation
- When the user enters credentials and clicks submit, a confirmation prompt appears on-screen
- When the user confirms the prompt, a processing message in a p tag renders on-screen

    More info at https://stripe.com/docs/ach

#### As a resident, I want an email confirmation after submitting an online payment so that I have peace of mind in case of a clerical error in the office.
- After accepting the payment confirmation prompt, the user receives an email confirmation message to alert them that their payment is successfully processing

#### As a manager, I want to see a revenues report of online rent payments so that I can keep the books tidy.
- When an admin user is at /payment, a #userReport button, a #monthlyReport, and a #annualReport button renders
- When #userReport is clicked, a form with input for user last name is rendered along with a submit button
- The submit button is disabled until at least two characters have been typed into the last name field
- When a last name is input and the submit button is clicked, a ul with is rendered with an li for each matching user, which includes the user's primary key ID, first name, last name, and email address
- If no matches are returned, a p error message is rendered
- When a user li is clicked, a ul is rendered with an li for each of that user's transactions, which includes amount, status, processing date, and completed date
- When #monthlyReport is clicked, a form with input for month and year is rendered along with a submit button
- The submit button is disabled until at least one character is typed into the month input and at least four character are typed into the year input
- If no matching records are found when the user clicks submit, the error message "No transactions found!" renders
- If there are matching records found when the user clicks submit, a gross revenue is rendered as an h4 along with a ul with an li for each transaction processing or processed that month
- When #annualReport is clicked, a form with input year is rendered along with a submit button
- The submit button is disabled until at least four character are typed into the year input
- If no matching records are found when the user clicks submit, the error message "No transactions found!" renders
- If there are matching records found when the user clicks submit, a gross revenue is rendered as an h4 along with a ul with an li for each transaction processing or processed that year

#### As a user, I want an email confirmation after submitting a service request so that I have peace of mind that it has been received.
- When a request is submitted successfully at /service, an email arrives at the user's provided email address

#### As a user, I want an email confirmation upon completion of a service request so that I know when my maintenance issue has been resolved.
- When an admin updates the status of a service request to closed, an email arrives at the user's provided email address

#### As a user, I want an email confirmation after reserving a conference room so that I have peace of mind in case of some clerical or technical error.
- When the successful response is returned from a conference room reservation, an email arrives at the user's provided email address

#### As a manager, I want to be able to generate a reset email to a user when they have misplaced their PIN number.
- When a user with admin credentials is at /, a button with the text "Reset User PIN" is rendered below the other buttons
- When "Reset User PIN" is clicked, the user is navigated to /reset
- When an admin user is at /reset, a form with input for user last name is rendered along with a submit button
- The submit button is disabled until at least two characters have been typed into the last name field
- When a last name is input and the submit button is clicked, a ul with is rendered with an li for each matching user, which includes the user's primary key ID, first name, last name, and email address, as well as a "Reset PIN" button
- If no matches are returned, a p error message is rendered
- When the "Reset PIN" button is clicked, an random number is generated and emailed to the user and that random number replaces the PIN in the users table of the database

#### As a user of any status, I want to be able to update my email address
- A button with the text "Update Email Address" is rendered below the four primary buttons
- When "Update Email Address" is clicked, a modal pops up with a form with an email input and a submit button
- When a user inputs an email address and clicks submit, the email entry associated with the user's record in the users table is updated
- After a user updates email address, a confirmation email arrives at both the user's new address and old address

## Stretch Goals

#### As a user, I want to be able to render the community events list in a calendar view so that I can scan the data more easily.
#### As a manager, I want to see animations as the user moves between UI components so that the user experience is more elegant.
#### As a user, I want to be able to export a community calendar event to my Google calendar.
#### As a resident, I want to be able to view my monthly balance online so that I don't have to contact the office to know how much rent is due.