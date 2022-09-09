//helper functions, "create()" creates HTML Elements and place it right to a given parent Element, "select()" just selects HTML, with a true boolean selects all Elements!
import { create, select } from "./helper.js";

window.addEventListener("load", () => {
  generateNav();
  sectionHighlighter();
  mobileNavButton();
  formHandler();
});

function generateNav() {
  const navBar = select("nav ul");
  let allSections = select(".main", true);

  //Create the List items and its anchors based on the amount of "<sections>" with the class "main" and uses the data attribute to set the anchor content
  allSections.forEach((section) => {
    const newListItem = create("li", "", { parent: navBar, position: "beforeEnd" });
    let anchor = create("a", "", { parent: newListItem, position: "beforeEnd" });
    anchor.href = `#${section.id}`;
    anchor.textContent = section.dataset.heading;

    //add scroll behavior to the anchor
    anchor.parentElement.addEventListener("click", (event) => {
      let scrolloptions = { behavior: "smooth" };
      event.preventDefault();
      section.scrollIntoView(scrolloptions);
    });
  });
}

function sectionHighlighter() {
  let allSections = select(".main", true);

  //add a scroll eventlistener to Highlight the "section" wich is in view
  window.addEventListener("scroll", () => {
    allSections.forEach((section) => {
      let elementTop = section.getBoundingClientRect().top;
      let elementBottom = section.getBoundingClientRect().bottom;
      let windowHeight = window.innerHeight * 0.5;

      // add the class "active-section" while the Element is covering half of the view, otherwise delete the class name.
      //"highlightNavbarAnchor()" will highlight the Navigation anchor/List item wich belongs to the active "section" in view
      if (elementTop < windowHeight && elementBottom > windowHeight) {
        section.classList.add("active-section");
        highlightNavbarAnchor(section);
      } else {
        section.classList.remove("active-section");
      }
    });
  });
}

function highlightNavbarAnchor(section) {
  let allAnchor = select("nav li", true);
  let anchor = select(`a[href="#${section.id}"]`).parentElement;

  // remove all "active-link" classes and apply only on the viewed one
  allAnchor.forEach((anchor) => anchor.classList.remove("active-link"));
  return anchor.classList.add("active-link");
}

function mobileNavButton() {
  let nav = select("nav");
  let burgerButton = select("#burger-icon");

  nav.addEventListener("click", () => {
    burgerButton.classList.toggle("active");
  });
}

function formHandler() {
  let form = document.querySelector("#form");

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    let formData = new FormData(event.target);
    let obj = {};

    // Turn the Formdata into a JSON
    formData.forEach((value, key) => {
      //if there was no input, replace it with "NO ENTRY!"
      if (value.length <= 1) {
        value = "NO ENTRY!";
      }
      obj[key] = value;
    });
    let json = JSON.stringify(obj);
    alert(
      `The entered data has been successfully processed! It can now be sent to a backend. 
    Data in JSON format:` + json
    );

    //clear the Form
    form.reset();
  });
}
