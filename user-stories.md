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
- /calendar contains a ul
- Each li in the list contains an h3 with the name of the event, a p with the location, a p with the time

#### As a manager, I want to be able to add an event to the community events list so that I don't have to call our developer to update the calendar.
- On load, the index route loads a modal with an input for last name, a number input for user PIN, and a submit button
- Submit button is disabled when the last name is less than 2 characters or when the user PIN is less than 5 numbers
- If no user is logged in, all routes redirect to the index route
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
- Each li contains an h4 with the unit number, a p with the provided description, and a p with any admin notes

#### As a user, I want to be able to submit a service request online so that I don't have to contact the office to submit a request.
- When at /service, a button with the text "+ New Request" (#newRequest) is rendered
- When #newRequest is clicked, a form element is rendered
- The rendered form contains inputs for unit, phone, subject line, and description, and has a submit button
- The submit button is disabled when any of these fields are empty
- The submit button is disabled when the phone number provided does not match a phone number regex pattern

#### As a manager, I want to be able to view all open service requests
- When an admin user clicks #serviceRequests to navigate to /service, an additional button renders with the text "Open Service Requests" (#openRequests)
- When #openRequests is clicked, a collapsed card for each open request is rendered
- The collapsed card contains an h3 with the unit number and subject
- When clicked, the card expands to also render p tags with resident owner, contact number, description, and any admin notes

#### As a manager, I want to be able to update the status of service requests so that the resident can follow our progress in resolving any maintenance issues.
- When an admin user is at /service and clicks #openRequests to view the list of open service requests, each card (when expanded) renders the admin notes in a form input field and the open status in a dropdown menu
- Each expanded card has an update button that is disabled until changes have been made
- When a change has been made to a service request and the update button has been clicked, the record is updated in the database and the new data is rendered on reload

#### As a resident, I want to have a home button that takes me back to the landing screen so that I can start over if I press the incorrect button.
- Header component contains a house icon
- When clicked, the house icon takes the user back to the main menu

#### As a resident, I want to be able to view my monthly balance online so that I don't have to contact the office to know how much rent is due.
#### As a resident, I want to be able to pay my rent online so that I don't have to stop by the office and pay in person.
#### As a resident, I want an email confirmation after submitting an online payment so that I have peace of mind in case of a clerical error in the office.
#### As a manager, I want to see a revenues report of online rent payments so that I can keep the books tidy.
#### As a user, I want to be able to view when conference rooms are available so that I can plan events and meetings accordingly.
#### As a user, I want to be able to reserve a conference room space online so that I don't have to contact the office to schedule an event.
#### As a manager, I want to be able to generate an email to a user when they have misplaced their PIN number.
#### As a user, I want to be able to render the community events list in a calendar view so that I can scan the data more easily.
#### As a user, I want an email confirmation after submitting a service request so that I have peace of mind that it has been received.
#### As a user, I want an email confirmation after reserving a conference room so that I have peace of mind in case of some clerical or technical error.
#### As a user, I want an email confirmation upon completion of a service request so that I know when my maintenance issue has been resolved.
#### As a manager, I want to see animations as the user moves between UI components so that the user experience is more elegant.
#### As a user, I want to be able to export a community calendar event to my Google calendar.