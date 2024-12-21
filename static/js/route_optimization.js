document.getElementById("calculate-route").addEventListener("click", function () {
    const start = document.getElementById("start").value;
    const destination = document.getElementById("destination").value;
    const waypoints = Array.from(document.getElementById("waypoints").selectedOptions)
        .map(option => option.value)
        .filter(waypoint => waypoint !== start && waypoint !== destination) // Avoid duplicates
        .join("|");

    // Make a POST request to the Flask backend
    fetch("/route", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ start, destination, waypoints })
    })
    .then(response => response.json())
    .then(data => {
        if (data.error) {
            alert("Failed to calculate route: " + data.error);
        } else {
            displayRouteOnMap(data);
        }
    })
    .catch(error => console.error("Error:", error));
});

function displayRouteOnMap(data) {
    const map = new google.maps.Map(document.getElementById("map"), {
        zoom: 5,
        center: { lat: 48.0196, lng: 66.9237 }, // Kazakhstan's approximate center
    });

    const directionsRenderer = new google.maps.DirectionsRenderer();
    directionsRenderer.setMap(map);

    directionsRenderer.setDirections(data);

    // Extract and display the route summary
    const route = data.routes[0];
    const summary = route.legs.map(
        leg => `${leg.start_address} to ${leg.end_address}: ${leg.distance.text}, ${leg.duration.text}`
    ).join("<br>");
    document.getElementById("summary").innerHTML = summary;
}
