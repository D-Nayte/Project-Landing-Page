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

//HELPER FUNCTIONS

/* USE! for the Object parameter: { parent: HTMLElement, position: "afterend", "beforeend", "afterstart" etc..}*/
function create(element, id = "", { position, parent } = {}) {
  // create Element based on the given parameter;
  let elem = document.createElement(element);

  //class name, Id name validation from parameters
  if (id.length > 1) {
    if (typeof id !== "string") {
      return console.error("2. paramter of create() needs to be a string!");
    } else {
      if (id.charAt(0) != "#" && id.charAt(0) != ".") {
        return console.error(`2. parameter has to start with "." for a class or "#" for a Id! `);
      }
    }

    //creating class'es OR Id's for HTML element
    switch (id.charAt(0)) {
      case ".":
        // If class names, create more or just 1 class name
        let classes = splitNames(id);
        elem.classList.add(...classes);
        break;
      case "#":
        //If Id name, add JUST one Id
        if (id.includes(" ") || id.includes(" ")) {
          return console.error("you can only use 1 ID in create()!");
        }
        elem.id = id.slice(1);
        break;

      default:
        return console.error("Error in creating a class Name!");
    }
  }

  //If initial position wanted, place it on the giving Object settings
  if (parent && position) {
    parent.insertAdjacentElement(position, elem);
  }

  function splitNames(id) {
    //remove unnecessary symbols like . or # for class name
    let classNames = id.slice(1);
    // if there is more then 1 class name, generates a class list out of the given class names string
    if (classNames.includes(" ")) {
      classNames = classNames.split(" ");
      return classNames;
    }
    return classNames;
  }

  return elem;
}

function select(selector, all) {
  if (!all) {
    return document.querySelector(selector);
  }
  return document.querySelectorAll(selector);
}
