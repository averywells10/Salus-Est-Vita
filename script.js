// Open and close the menu on phones

const menuButton = document.getElementById("menu-button");
// Finds the element with id="menu-button" (the ☰ button) and saves it in a variable
// called menuButton. "const" means this variable won't be reassigned.

const navLinks = document.getElementById("nav-links");
// Finds the tabs (id="nav-links") and saves them as navLinks.

menuButton.addEventListener("click", function () {
// "When the ☰ button is clicked, run the code inside these braces."

    navLinks.classList.toggle("open");
    // toggle = if the "open" class is missing, ADD it; if it's there, REMOVE it.
    // CSS shows the menu when "open" is there, so each tap opens or closes it.

});
// Ends the click instructions.


// Highlight the tab for the page you're on

const currentPage = window.location.pathname.split("/").pop() || "index.html";
// Gets the current page's file name.
// window.location.pathname = the address after the domain, like "/salus/workouts.html"
// .split("/") breaks it into pieces at each slash: ["", "salus", "workouts.html"]
// .pop() takes the LAST piece: "workouts.html"
// || "index.html" = if that's empty (like at the site's main address), use "index.html".

document.querySelectorAll(".nav-links a").forEach(function (link) {
// Finds EVERY tab link inside .nav-links, then runs the code below once for each one.
// "link" is the tab currently being checked.

    if (link.getAttribute("href") === currentPage) {
    // If this tab's href (like "workouts.html") matches the page we're on...

        link.classList.add("active");
        // ...add the "active" class, which CSS colors green.
    }
});