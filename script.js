"use strict";

const locations = {
  "Main Gate": {
    description: "Main entrance of SVPM College.",
    gps: "4GP2+FC8"
  },
  "Ground": {
    description: "College ground for outdoor activities.",
    gps: "4FPX+PVV"
  },
  "Auditorium": {
    description: "College auditorium for events and programs.",
    gps: "4FPX+PGQ"
  },
  "Girls Hostel": {
    description: "Girls hostel building.",
    gps: "4FPX+M67"
  },
  "Pharmacy": {
    description: "Pharmacy college building.",
    gps: "4FPX+XPH"
  },
  "Diploma": {
    description: "Diploma college building.",
    gps: "4FQX+FM2"
  },
  "Canteen": {
    description: "College canteen for food and refreshments.",
    gps: "4FQX+C9P"
  },
  "Lawn": {
    description: "College lawn and open green space.",
    gps: "4FPX+WXG"
  },
  "Engineering Building A": {
    description: "Engineering college building, Block A.",
    gps: "4FQX+MG7"
  },
  "Engineering Building B": {
    description: "Engineering college building, Block B.",
    gps: "4HRX+43X"
  },
  "Boys Hostel": {
    description: "Boys hostel building.",
    gps: "4FQX+747"
  },
  "Play Ground": {
    description: "College playground for sports and outdoor activities.",
    gps: "4FQX+H7H"
  },
  "SVPM Commerce College": {
    description: "SVPM Commerce College building.",
    gps: "4FRW+8WJ"
  }
};

document.addEventListener("DOMContentLoaded", function () {
  const locationSelect = document.getElementById("location");
  const detailsBox = document.getElementById("details");
  const messageBox = document.getElementById("message");
  const detailsButton = document.getElementById("detailsButton");
  const mapButton = document.getElementById("mapButton");
  const directionsButton = document.getElementById("directionsButton");

  function getSelectedLocation() {
    const name = locationSelect.value;

    if (!name || !locations[name]) {
      messageBox.textContent = "Please select a destination first.";
      return null;
    }

    messageBox.textContent = "";
    return {
      name: name,
      description: locations[name].description,
      gps: locations[name].gps
    };
  }

  function showLocationDetails(place) {
    const heading = document.createElement("h2");
    heading.textContent = place.name;

    const locationLine = document.createElement("p");
    locationLine.textContent = "Location: " + place.name;

    const descriptionLine = document.createElement("p");
    descriptionLine.textContent = "Description: " + place.description;

    const gpsLine = document.createElement("p");
    gpsLine.textContent = "Plus Code: " + place.gps;

    detailsBox.replaceChildren(
      heading,
      locationLine,
      descriptionLine,
      gpsLine
    );

    detailsBox.dataset.location = place.name;
    detailsBox.hidden = false;
    detailsBox.style.display = "block";
    detailsButton.textContent = "Hide Details";
  }

  function makeMapsQuery(place) {
    return place.gps + ", Malegaon Budruk, Maharashtra, India";
  }

  detailsButton.addEventListener("click", function () {
    if (!detailsBox.hidden) {
      detailsBox.hidden = true;
      detailsBox.replaceChildren();
      detailsBox.style.display = "none";
      delete detailsBox.dataset.location;
      detailsButton.textContent = "Show Details";
      return;
    }

    const place = getSelectedLocation();

    if (!place) return;

    showLocationDetails(place);
  });

  mapButton.addEventListener("click", function () {
    const place = getSelectedLocation();
    if (!place) return;

    const query = encodeURIComponent(makeMapsQuery(place));
    const url =
      "https://www.google.com/maps/search/?api=1&query=" + query;

    window.open(url, "_blank", "noopener,noreferrer");
  });

  directionsButton.addEventListener("click", function () {
    const place = getSelectedLocation();
    if (!place) return;

    const destination = encodeURIComponent(makeMapsQuery(place));
    const url =
      "https://www.google.com/maps/dir/?api=1&destination=" +
      destination;

    window.open(url, "_blank", "noopener,noreferrer");
  });

  locationSelect.addEventListener("change", function () {
    detailsBox.hidden = true;
    detailsBox.replaceChildren();
    detailsBox.style.display = "none";
    delete detailsBox.dataset.location;
    detailsButton.textContent = "Show Details";
    messageBox.textContent = "";
  });

  console.log("SVPM College Navigation loaded successfully.");
});