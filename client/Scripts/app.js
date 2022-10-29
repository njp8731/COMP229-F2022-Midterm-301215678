// IIFE -- Immediately Invoked Function Expression

// app.js - Ishan Gangji - 300784236 - Midterm Test

(function () {
  function Start() {
    console.log("App Started...");
    let dangerButtons = document.getElementsByClassName("btn-danger");
    // Adds conformation for deleting buttons
    for (const button of dangerButtons) {
      button.addEventListener("click", (event) => {
        if (!confirm("Are you sure?")) {
          event.preventDefault();
          location.href = "/books";
        }
      });
    }
  }
  window.addEventListener("load", Start);
})();
