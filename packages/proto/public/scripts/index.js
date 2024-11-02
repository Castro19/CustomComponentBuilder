const lightModeLabel = document.getElementById("lightModeLabel");

lightModeLabel.onchange = function (event) {
  event.stopPropagation(); // Prevent the change event from bubbling up further
  const isChecked = event.target.checked;
  // Dispatch a custom event with the checkbox state in the detail
  const customEvent = new CustomEvent("lightmode:toggle", {
    bubbles: true, // Allow the event to bubble up to the body
    detail: { isChecked: isChecked },
  });
  this.dispatchEvent(customEvent);
};

document.body.addEventListener("lightmode:toggle", function (event) {
  if (event.detail.isChecked) {
    document.body.classList.add("light-mode");
    document.body.classList.remove("dark-mode");
  } else {
    document.body.classList.remove("light-mode");
    document.body.classList.add("dark-mode");
  }
});
