"use strict";

(function () {
  const locations = {
    "Main Gate": { description: "Main entrance of SVPM College.", gps: "4GP2+FC8" },
    "Ground": { description: "College ground for outdoor activities.", gps: "4FPX+PVV" },
    "Auditorium": { description: "College auditorium for events and programs.", gps: "4FPX+PGQ" },
    "Girls Hostel": { description: "Girls hostel building.", gps: "4FPX+M67" },
    "Pharmacy": { description: "Pharmacy college building.", gps: "4FPX+XPH" },
    "Diploma": { description: "Diploma college building.", gps: "4FQX+FM2" },
    "Canteen": { description: "College canteen for food and refreshments.", gps: "4FQX+C9P" },
    "Lawn": { description: "College lawn and open green space.", gps: "4FPX+WXG" },
    "Engineering Building A": { description: "Engineering college building, Block A.", gps: "4FQX+MG7" },
    "Engineering Building B": { description: "Engineering college building, Block B.", gps: "4HRX+43X" },
    "Boys Hostel": { description: "Boys hostel building.", gps: "4FQX+747" },
    "Play Ground": { description: "College playground for sports and outdoor activities.", gps: "4FQX+H7H" },
    "SVPM Commerce College": { description: "SVPM Commerce College building.", gps: "4FRW+8WJ" }
  };

  function init() {
    const locationSelect = document.getElementById("location");
    const detailsBox = document.getElementById("details");
    const messageBox = document.getElementById("message");
    const detailsButton = document.getElementById("detailsButton");
    const mapButton = document.getElementById("mapButton");
    const directionsButton = document.getElementById("directionsButton");
    const diplomaButton = document.getElementById("diplomaNavigationButton");

    if (!locationSelect || !detailsBox || !messageBox || !detailsButton || !mapButton || !directionsButton) {
      console.error("SVPM Navigation: required V1 elements are missing.");
      return;
    }

    function getSelectedLocation(showError) {
      const name = locationSelect.value;
      if (!name || !locations[name]) {
        if (showError !== false) messageBox.textContent = "Please select a destination first.";
        return null;
      }
      messageBox.textContent = "";
      return { name, description: locations[name].description, gps: locations[name].gps };
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
      detailsBox.replaceChildren(heading, locationLine, descriptionLine, gpsLine);
      detailsBox.dataset.location = place.name;
      detailsBox.hidden = false;
      detailsButton.textContent = "Hide Details";
    }

    function hideDetails() {
      detailsBox.hidden = true;
      detailsBox.replaceChildren();
      delete detailsBox.dataset.location;
      detailsButton.textContent = "Show Details";
    }

    function makeMapsQuery(place) {
      return place.gps + ", Malegaon Budruk, Maharashtra, India";
    }

    function openExternal(url) {
      // Use a real user-initiated anchor click: works more reliably with popup blockers.
      const link = document.createElement("a");
      link.href = url;
      link.target = "_blank";
      link.rel = "noopener noreferrer";
      link.setAttribute("aria-label", "Open Google Maps in a new tab");
      document.body.appendChild(link);
      link.click();
      link.remove();
    }

    function openMap(mode) {
      const place = getSelectedLocation();
      if (!place) return false;
      const query = encodeURIComponent(makeMapsQuery(place));
      const url = mode === "directions"
        ? "https://www.google.com/maps/dir/?api=1&destination=" + query
        : "https://www.google.com/maps/search/?api=1&query=" + query;
      openExternal(url);
      return true;
    }

    detailsButton.addEventListener("click", function () {
      if (!detailsBox.hidden) {
        hideDetails();
        return;
      }
      const place = getSelectedLocation();
      if (place) showLocationDetails(place);
    });

    mapButton.addEventListener("click", function () { openMap("map"); });
    directionsButton.addEventListener("click", function () { openMap("directions"); });
    if (diplomaButton) diplomaButton.addEventListener("click", function () {
      window.location.href = "./v2/SVPM_V2_Reference_As_Is/index.html";
    });

    locationSelect.addEventListener("change", function () {
      hideDetails();
      messageBox.textContent = "";
    });

    // Public, small API used by NAVI-X. Existing V1 buttons remain independently wired.
    window.SVPMNavigation = {
      locations,
      getSelectedLocation: function () { return getSelectedLocation(false); },
      selectLocation: function (name) {
        if (!locations[name]) return false;
        locationSelect.value = name;
        locationSelect.dispatchEvent(new Event("change", { bubbles: true }));
        return true;
      },
      showDetails: function () {
        const place = getSelectedLocation();
        if (!place) return false;
        showLocationDetails(place);
        return true;
      },
      openMaps: function () { return openMap("map"); },
      getDirections: function () { return openMap("directions"); },
      openDiplomaNavigation: function () {
        window.location.href = "./v2/SVPM_V2_Reference_As_Is/index.html";
      }
    };

    console.info("SVPM College Navigation loaded successfully.");
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init, { once: true });
  } else {
    init();
  }
})();
