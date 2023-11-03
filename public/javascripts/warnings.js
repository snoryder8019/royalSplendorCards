function warningLoader() {
  console.log("warningLoader() initiated");

  document.addEventListener("DOMContentLoaded", function() {
    console.log("DOM fully loaded and parsed");

    const deleteCardButtons = document.querySelectorAll(".deleteCardButton");
    const deleteCardWarnings = document.querySelectorAll(".deleteCardWarning");
    const cancelDeletes = document.querySelectorAll(".cancelDelete");

    deleteCardButtons.forEach((button, index) => {
      button.addEventListener("click", function(e) {
        e.preventDefault();
        console.log(`deleteCardButton ${index} clicked`);

        const cardId = button.getAttribute("data-card-id");
        console.log(`cardId: ${cardId}`);
        const warning = document.querySelector(`.deleteCardWarning[data-card-id="${cardId}"]`);

        if (warning) {
          console.log(`deleteCardWarning ${index} found`);
          warning.style.display = "block";
        } else {
          console.log(`deleteCardWarning ${index} not found`);
        }
      });
    });

    cancelDeletes.forEach((button, index) => {
      button.addEventListener("click", function() {
        console.log(`cancelDelete ${index} clicked`);

        const cardId = button.closest(".deleteCardWarning").getAttribute("data-card-id");
        console.log(`cardId: ${cardId}`);
        const warning = document.querySelector(`.deleteCardWarning[data-card-id="${cardId}"]`);

        if (warning) {
          console.log(`deleteCardWarning ${index} found`);
          warning.style.display = "none";
        } else {
          console.log(`deleteCardWarning ${index} not found`);
        }
      });
    });
  });
}

// Call the function to initialize
warningLoader();
