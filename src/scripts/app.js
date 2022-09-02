window.addEventListener("DOMContentLoaded", () => {
  createNavListItems();
  addLinkBehaviorOnClick();
  addLinkTrackerByScroll();
  galerieButtonFunctionality();
  handleForm();
});

function createNavListItems() {
  const allSections = document.querySelectorAll(".main");
  const fragment = document.createDocumentFragment();

  // add heading to ul
  let liH2 = document.createElement("li");
  liH2.innerHTML = `<h2 class="heading"><a href="#header-card" >PinkPink<span id="pointer">.</span></a> <button>&#10006;</button></h2>`;
  fragment.appendChild(liH2);

  //create list items based on sections quantity
  allSections.forEach((section) => {
    if (section.id != "") {
      //Create Link Name from Link ID
      let idName = section.id[0].toUpperCase() + section.id.slice(1);
      const name = idName.replace(/-/g, " ");

      //create new HTML Element with Name
      let liElement = document.createElement("li");
      liElement.innerHTML = `<a href="#${section.id}">${name}</a><button>&#62;</button>`;
      fragment.appendChild(liElement);
    }
  });

  //Add element to ul
  let ul = document.querySelector("nav ul");
  ul.appendChild(fragment);
}

function addLinkBehaviorOnClick() {
  //Mobile Button behavior on click
  let navButton = document.querySelector("#burger-icon");
  navButton.addEventListener("click", () => navButton.classList.toggle("active"));
  //standart Link behavior on click
  let navLinks = document.querySelectorAll("header li");
  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      navButton.classList.toggle("active");
      navLinks.forEach((link) => link.classList.remove("active"));
      link.classList.toggle("active");
    });
  });
}

function addLinkTrackerByScroll() {
  const allSections = document.querySelectorAll(".main");
  let current = "";
  let change = false;

  window.addEventListener("scroll", (event) => {
    allSections.forEach((section) => {
      // only change DOM by enter a new section
      if (window.scrollY >= section.offsetTop - section.scrollHeight / 2) {
        if (current == section.id) {
          return (change = false);
        }
        change = true;
        current = section.id;
      }
      // standart header and no behavior on start heigh
      if (window.scrollY <= section.offsetTop / 4) {
        changeHeadOnMobile(false);
        return (change = false);
      }
    });

    // Only changes LINK styles if last change made, is not used anymore (if active content gets outside viewport)
    if (current && change) {
      document.querySelectorAll("header a").forEach((link) => link.classList.remove("activeLink"));
      let link = document.querySelector(`header a[href="#${current}"]`);
      link.classList.add("activeLink");

      // change heading in mobile version
      if (window.visualViewport.width < 1000) {
        changeHeadOnMobile(link);
      }
    }
  });
}

function changeHeadOnMobile(link) {
  let header = document.querySelector("header h1 a");
  // If viewport on Top, original header will show
  if (link == false) {
    header.textContent = "PinkPink";
    return;
  }
  //else section ID will show
  header.textContent = link.textContent;
}

function galerieButtonFunctionality() {
  let buttons = document.querySelectorAll("button");
  let translateValue = 0;

  //Tage all galerie buttons, add left or right swipe based on the HTML class Name
  buttons.forEach((button) => {
    button.addEventListener("click", (event) => {
      let galerie = document.querySelector(".examples");
      // if right arrow was clicked
      if (event.target.classList.value.includes("b-right")) {
        translateValue -= 33.33333;
        galerie.style.transform = `translateX(${translateValue}%)`;
        // is left Arrow was clicked
      } else {
        translateValue += 33.333333;
        galerie.style.transform = `translateX(${translateValue}%)`;
      }
    });
  });
}

function handleForm() {
  let form = document.querySelector("#form");
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    let formData = new FormData(event.target);
    let obj = {};
    formData.forEach((value, key) => {
      if (value.length <= 1) {
        value = "NO ENTRY!";
      }
      obj[key] = value;
    });
    let json = JSON.stringify(obj);
    alert("The entered data has been successfully processed and can now be sent to a backend. Data in JSON format:" + json);
    form.reset();
  });
}
