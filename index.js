document.addEventListener("DOMContentLoaded", pageHandler)

// Function to fetch and display the details of the first event immediately after the page has loaded.
function pageHandler() {

    fetchEvent(1);

    // fetch("http://localhost:3000/events/1")
    // .then(function(response) {
    //     return response.json();
    // })
    // .then(contentDisplay(data))
    //     const getTicket = document.getElementById("getTicket");

    //     getTicket.addEventListener("click", function(event) {
    //         event.preventDefault();
    //         let currentAttendees = parseInt(eventAttendees.textContent, 10)
    //         currentAttendees++
        
    //         eventAttendees.textContent = currentAttendees;
        

    //     fetch(`http://localhost:3000/events/${data.id}`, {
    //         method: "PATCH",
    //         headers: {
    //             "Content-Type": "application/json"
    //         },
    //         body: JSON.stringify({
    //             attendees: currentAttendees
    //         })
    //     })
    //  })

    // Fetch and display the names of the events in a list.
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

// Function to handle the display of each event on the list, one at a time, once its button is clicked
// function listHandler(id) {
    // fetch(`http://localhost:3000/events/${id}`)
    // .then(function(response) {
    //     return response.json();
    // })
    // .then(contentDisplay(data))

    //     const getTicket = document.getElementById("getTicket");


    //     getTicket.addEventListener("click", function(event) {
    //         event.preventDefault();
    //         let currentAttendees = parseInt(eventAttendees.textContent, 10)
    //         currentAttendees++
        
    //         eventAttendees.textContent = currentAttendees;
        

    //     fetch(`http://localhost:3000/events/${data.id}`, {
    //         method: "PATCH",
    //         headers: {
    //             "Content-Type": "application/json"
    //         },
    //         body: JSON.stringify({
    //             attendees: currentAttendees
    //         })
    //     })
    // })
// }

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

// Function that displays the details of the previous event after the current event being displayed has been deleted successfully.
// function displayNext(id) {
//     fetch(`http://localhost:3000/events/${id - 1}`)
//     .then(function(response) {
//         return response.json();
//     })
//     .then(contentDisplay(data))
// }

function displayNext(id) {
    fetchEvent(id - 1);
}

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

function listHandler(id) {
    fetchEvent(id);
}