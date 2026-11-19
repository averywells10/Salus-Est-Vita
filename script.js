// =====================================================
// SALUS EST VITA - PAGE CODE
// This one file loads on EVERY page. Each section checks
// whether its box exists first, so it only runs on the
// page that has that box.
//
// Every feature follows 3 steps:
//   1. FIND an element by its id
//   2. LISTEN for something (a click, a submit)
//   3. CHANGE the page (text, a class, or save to Supabase)
// =====================================================


// Checks that supabase.js loaded and created "db".
// typeof db !== "undefined" means "db exists."
// If it doesn't (wrong keys, no internet), the database code below
// is skipped instead of crashing the whole page.
const hasDatabase = typeof db !== "undefined";


// ===== EVERY PAGE: show "Log Out" when someone is logged in =====
if (hasDatabase) {
    // Asks Supabase whether someone is logged in.
    // .then(...) runs once Supabase answers.
    db.auth.getSession().then(function ({ data }) {

        // Finds the Log In link inside .nav-links
        const loginLink = document.querySelector('.nav-links a[href="login.html"]');

        // If someone IS logged in, and this page has the link...
        if (data.session && loginLink) {
            loginLink.textContent = "Log Out";   // change the text

            // When clicked: sign out, then go to the home page
            loginLink.addEventListener("click", async function (event) {
                event.preventDefault();          // stop it from going to login.html
                await db.auth.signOut();         // await = wait for Supabase to finish
                window.location.href = "index.html";
            });
        }
    });
}


// ===== LOGIN PAGE: log in / sign up =====

// Finds the form. Only login.html has it, so on other pages this is null.
const authForm = document.getElementById("auth-form");

// Only runs if the form exists AND the database is connected
if (authForm && hasDatabase) {

    // Remembers which mode the form is in. "let" because it changes.
    let isSignUp = false;

    // Find the parts of the form we'll change
    const title = document.getElementById("auth-title");
    const button = document.getElementById("auth-button");
    const message = document.getElementById("auth-message");
    const switchButton = document.getElementById("switch-mode");

    // When "Need an account? Sign up" is clicked, switch modes
    switchButton.addEventListener("click", function () {
        isSignUp = !isSignUp;   // ! flips true and false

        // condition ? A : B  is a short if/else: "if signing up, use A, otherwise B"
        title.textContent = isSignUp ? "Sign Up" : "Log In";
        button.textContent = isSignUp ? "Sign Up" : "Log In";
        switchButton.textContent = isSignUp ? "Have an account? Log in" : "Need an account? Sign up";
        message.textContent = "";   // clear any old message
    });

    // When the form is submitted (button click or Enter)
    // "async" lets us use "await" inside, to wait for Supabase
    authForm.addEventListener("submit", async function (event) {
        event.preventDefault();   // stop the browser from reloading the page

        // Read what the user typed. .trim() removes extra spaces.
        const email = document.getElementById("email").value.trim();
        const password = document.getElementById("password").value;
        message.textContent = "Please wait...";

        if (isSignUp) {
            // Create a new account. Supabase stores the password safely.
            const { error } = await db.auth.signUp({ email: email, password: password });
            // If there's an error, show it; otherwise show a success message
            message.textContent = error
                ? error.message
                : "Account created! Check your email to confirm, then log in.";
        } else {
            // Log in to an existing account
            const { error } = await db.auth.signInWithPassword({ email: email, password: password });
            if (error) {
                message.textContent = error.message;   // e.g. "Invalid login credentials"
            } else {
                window.location.href = "workouts.html";   // success: go to Mars
            }
        }
    });
}


// ===== MARS PAGE (workouts.html) =====

// Only workouts.html has this box, so this section only runs there
const currentExercise = document.getElementById("current-exercise");

if (currentExercise) {
    // Your Mars code goes here, one feature at a time:
    // FUNCTION LATER: -/+ buttons for weight and reps
    // FUNCTION LATER: "Log set" saves to workout_log
    // FUNCTION LATER: rest timer
    // FUNCTION LATER: this week's trained days
}


// ===== CERES PAGE (food.html) =====

// Only food.html has this box, so this section only runs there
const daySummary = document.getElementById("day-summary");

if (daySummary) {
    // Your Ceres code goes here, one feature at a time:
    // FUNCTION LATER: USDA food search
    // FUNCTION LATER: load today's foods into each meal box
    // FUNCTION LATER: add up calories and macros for the summary
}