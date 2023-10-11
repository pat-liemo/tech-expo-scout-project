document.addEventListener("DOMContentLoaded", pageHandler)

// Function to fetch and display the details of the first expo immediately after the page has loaded.
function pageHandler() {

    fetchEvent(1);

    // Fetch and display the names of the expos in a list.
    fetch("http://localhost:3000/events")
    .then(function(response) {
        return response.json();
    })
    .then(function(data) {
        const eventsList = document.getElementById("eventsList")

        for(let element of data) {
            eventsList.innerHTML += `
            <li id="eventItem-${element.id}" class="eventItemClass" onclick="listHandler(${element.id})">${element.name}</li></br></br>`
        }
    })
}

// Function handles the display of the details of the specific expo clicked.
function listHandler(id) {
    fetchEvent(id);
}

// Function that fetches and displays the content of each element based on the id passed to it.
function fetchEvent(id) {
    fetch(`http://localhost:3000/events/${id}`)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            contentDisplay(data);
            setupTicketHandler(data.id);
        });
}

// Function responsible for displaying content/ expo details on the DOM
function contentDisplay(data) {
    const eventName = document.getElementById("name")
    const eventImage = document.getElementById("image")
    const newImage = data.image;
    const eventOrganizer = document.getElementById("organizer")
    const eventDate = document.getElementById("date")
    const eventLocation = document.getElementById("location")
    const eventDescription = document.getElementById("description")
    const eventAttendees = document.getElementById("attendees")
    const buttons = document.getElementById("buttons")

    eventName.textContent = data.name;
    eventImage.src = newImage;
    eventOrganizer.textContent = data.organizer;
    eventDate.textContent = data.date;
    eventLocation.textContent = data.location;
    eventDescription.textContent = data.description;
    eventAttendees.textContent = data.attendees;

    buttons.innerHTML = `<button id="delete" onclick="deleteEvent(${data.id})">DELETE</button>`
}

// Function that increases the number of attendees when the GET TICKET button is clicked.
function setupTicketHandler(id) {
    const getTicket = document.getElementById("getTicket");

    getTicket.addEventListener("click", function (event) {
        event.preventDefault();
        let currentAttendees = parseInt(document.getElementById("attendees").textContent, 10);
        currentAttendees++;

        document.getElementById("attendees").textContent = currentAttendees;

        updateAttendeesCount(id, currentAttendees);
    });
}

// Function updates the number of 'attendees' using PATCH every time a ticket is purchased.
function updateAttendeesCount(id, attendees) {
    fetch(`http://localhost:3000/events/${id}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            attendees: attendees
        })
    });
}

// Function to delete an event when its delete button is clicked.
function deleteEvent(id) {
    const eventItemId = `eventItem-${id}`
    const eventItem = document.getElementById(eventItemId)

    fetch(`http://localhost:3000/events/${id}`, {
        method: "DELETE",
        headers: {
            "Content-type" : "application/json"
        }
    })
    .then(function(response) {
        return response.json();
    })
    .then(function(data) {
        alert("Event Successfully deleted!")
        eventItem.remove();
        displayNext(id);
    })
}

// Function that displays the details of the previous expo after the current event being displayed has been deleted successfully.
function displayNext(id) {
    fetchEvent(id - 1);
}

// Function creates a new expo using POST
function createExpo() {

    const form = document.getElementById("form");
    form.addEventListener("submit", function(e) {
        e.preventDefault();

        const newExpo = document.getElementById("inputName").value;
        const newOrganizer = document.getElementById("inputOrganizer").value;
        const newDate = document.getElementById("inputDate").value;
        const newLocation = document.getElementById("inputLocation").value;
        const newAttendees = parseInt(document.getElementById("inputAttendess").value, 10);
        const newDescription = document.getElementById("inputDescription").value;

        fetch("http://localhost:3000/events", {

            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify({
                name: newExpo,
                date: newDate,
                location: newLocation,
                description: newDescription,
                attendees: newAttendees,
                organizer:newOrganizer
            })
        })
        .then(function(response) {
            return response.json();
        })
        .then(function(data) {
            alert("Event logged successfully!")
        })
        })
}