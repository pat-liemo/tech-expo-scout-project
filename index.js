document.addEventListener("DOMContentLoaded", pageHandler)

function pageHandler() {

    fetch("http://localhost:3000/events/1")
    .then(function(response) {
        return response.json();
    })
    .then(function(data) {
        const eventName = document.getElementById("name")
        const eventImage = document.getElementById("image")
        const newImage = data.image;
        const eventOrganizer = document.getElementById("organizer")
        const eventDate = document.getElementById("date")
        const eventLocation = document.getElementById("location")
        const eventDescription = document.getElementById("description")
        const eventAttendees = document.getElementById("attendees")
        const buttons = document.getElementById("buttons")
        const getTicket = document.getElementById("getTicket");

        eventName.textContent = data.name;
        eventImage.src = newImage;
        eventOrganizer.textContent = data.organizer;
        eventDate.textContent = data.date;
        eventLocation.textContent = data.location;
        eventDescription.textContent = data.description;
        eventAttendees.textContent = data.attendees;
        buttons.innerHTML = `<button id="delete" onclick="deleteEvent(${data.id})">DELETE</button>`

        getTicket.addEventListener("click", function(event) {
            event.preventDefault();
            let currentAttendees = parseInt(eventAttendees.textContent, 10)
            currentAttendees++
        
            eventAttendees.textContent = currentAttendees;
        

        fetch(`http://localhost:3000/events/${data.id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                attendees: currentAttendees
            })
        })
     })

    })

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

function listHandler(id) {
    fetch(`http://localhost:3000/events/${id}`)
    .then(function(response) {
        return response.json();
    })
    .then(function(data) {
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

        getTicket.addEventListener("click", function(event) {
            event.preventDefault();
            let currentAttendees = parseInt(eventAttendees.textContent, 10)
            currentAttendees++
        
            eventAttendees.textContent = currentAttendees;
        

        fetch(`http://localhost:3000/events/${data.id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                attendees: currentAttendees
            })
        })
    })
    })
}

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

function displayNext(id) {
    fetch(`http://localhost:3000/events/${id - 1}`)
    .then(function(response) {
        return response.json();
    })
    .then(function(data) {
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
    })
}