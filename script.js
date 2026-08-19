// =========================================
// SVPM COLLEGE LOCATIONS
// =========================================

const locations = {

    "Main Gate": {

        gps: "4GP2+FC8",

        type: "Entrance",

        nearby: "None",

        place: "Main Gate"

    },


    "Ground": {

        gps: "4FPX+PVV",

        type: "Play Ground",

        nearby: "Main Gate",

        place: "Play Ground"

    },


    "Auditorium": {

        gps: "4FPX+GCH",

        type: "Hall",

        nearby: "Ground",

        place: "Sharad Sabhagruh"

    },


    "Girls Hostel": {

        gps: "4FPX+M67",

        type: "Building",

        nearby: "Before Auditorium",

        place: "Rajmata Jijau Girls Hostel"

    },


    "Pharmacy": {

        gps: "4GQ2+42Q",

        type: "Building",

        nearby: "In front of Lawn and before Diploma",

        place: "SVPM's Institute of Pharmacy and College of Pharmacy"

    },


    "Diploma": {

        gps: "4FQX+FM2 malegaon bk maharashtra",

        type: "Building",

        nearby: "After the Pharmacy",

        place: "Diploma"

    },


    "Canteen": {

        gps: "4FQX+C9F malegaon bk maharashtra",

        type: "Canteen",

        nearby: "Near Diploma",

        place: "Canteen"

    },


    "Lawn": {

        gps: "4FPX+WXG malegaon bk maharashtra",

        type: "Lawn",

        nearby: "Near Auditorium",

        place: "Lawn"

    }

};


// =========================================
// SHOW / HIDE DETAILS
// =========================================

function toggleDetails() {

    let selected =
        document.getElementById("location").value;

    let details =
        document.getElementById("details");

    let button =
        document.getElementById("detailsButton");


    // If no location selected

    if (selected === "Select Location") {

        alert("Please select a location.");

        return;
    }


    // If details are currently hidden

    if (details.style.display === "none" ||
        details.style.display === "") {


        let loc = locations[selected];


        details.innerHTML =

            "<h2>" + selected + "</h2>" +

            "<p><b>Place:</b> "
            + loc.place
            + "</p>" +

            "<p><b>GPS:</b> "
            + loc.gps
            + "</p>" +

            "<p><b>Type:</b> "
            + loc.type
            + "</p>" +

            "<p><b>Nearby:</b> "
            + loc.nearby
            + "</p>";


        details.style.display = "block";


        button.innerHTML =
            "Hide Details";

    }


    // If details are currently visible

    else {

        details.style.display = "none";


        button.innerHTML =
            "Show Details";

    }

}


// =========================================
// OPEN GOOGLE MAPS
// =========================================

function openMap() {

    let selected =
        document.getElementById("location").value;


    if (selected === "Select Location") {

        alert("Please select a location.");

        return;
    }


    let loc = locations[selected];


    let url =
        "https://www.google.com/maps/search/?api=1&query="
        + encodeURIComponent(
            loc.gps + ", Malegaon Budruk, Maharashtra"
        );


    window.open(url, "_blank");

}


// =========================================
// GET DIRECTIONS
// =========================================

function getDirections() {

    let selected =
        document.getElementById("location").value;


    if (selected === "Select Location") {

        alert("Please select a location.");

        return;
    }


    let loc = locations[selected];


    let url =
        "https://www.google.com/maps/dir/?api=1&destination="
        + encodeURIComponent(
            loc.gps + ", Malegaon Budruk, Maharashtra"
        );


    window.open(url, "_blank");

}
