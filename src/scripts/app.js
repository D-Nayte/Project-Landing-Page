
window.addEventListener("DOMContentLoaded", () => {
    createNavListItems()
    addLinkBehaviorOnClick()
    addLinkTrackerByScroll()
})

function createNavListItems() {
    const allSections = document.querySelectorAll(".main")
    const fragment = document.createDocumentFragment()

    // add heading to ul
    let liH2 = document.createElement("li")
    liH2.innerHTML = `<h2 class="heading"><a href="#header-card" >PinkPink<span id="pointer">.</span></a> <button>&#10006;</button></h2>`
    fragment.appendChild(liH2)

    //create list items based on sections quantity
    allSections.forEach(section => {
    
        if (section.id != "") {
            //Create Link Name from Link ID
            let idName = section.id[0].toUpperCase() + section.id.slice(1)
           const name = idName.replace(/-/g, " ")
           
           //create new HTML Element with Name
           let liElement = document.createElement("li")
           liElement.innerHTML = `<a href="#${section.id}">${name}</a><button>&#62;</button>`
           fragment.appendChild(liElement)
        }
    })   

    //Add element to ul
    let ul = document.querySelector("nav ul")
    ul.appendChild(fragment)
}

function addLinkBehaviorOnClick() {
    //Mobile Button behavior on click
    let navButton = document.querySelector("#burger-icon")
    navButton.addEventListener("click", () => navButton.classList.toggle("active") )
    //standart Link behavior on click
    let navLinks = document.querySelectorAll("header li")
    navLinks.forEach(link => {
        link.addEventListener("click", ( ()=> {
            navButton.classList.toggle("active");
            navLinks.forEach(link => link.classList.remove("active"))
            link.classList.toggle("active")
    }))
    })
}

function addLinkTrackerByScroll() {
    const allSections = document.querySelectorAll(".main")
    let current = "";
    let change = false

    window.addEventListener("scroll", event => {
        allSections.forEach(section => {
            // only change DOM by enter a new section
            if (window.scrollY >= section.offsetTop - (section.scrollHeight / 2 )) {
                if (current == section.id) {
                    return change = false  
                }
                change = true
                current = section.id   
            }
            // standart header and no behavior on start heigh
            if (window.scrollY <= (section.offsetTop / 4)) {
                changeHeadOnMobile(false)
                return change = false
            }
        })
       
        if (current && change) {
            document.querySelectorAll("header a").forEach(link => link.classList.remove("activeLink"))
            let link = document.querySelector(`header a[href="#${current}"]`)
            link.classList.add("activeLink")
            
            // change heading in mobile version
            if (window.visualViewport.width < 1030) {
                changeHeadOnMobile(link)
            }
        }
     
    })
}

function changeHeadOnMobile(link) {
    let header = document.querySelector("header h1 a");
    // If on Top, original header will show
    if (link == false)  {
        header.textContent = "PinkPink"
        return
    }
    //else section ID will show
    header.textContent = link.textContent     
}


let buttonLeft = document.querySelector(".b-left")
let buttonRight = document.querySelector(".b-right")
let buttons = document.querySelectorAll("button")

let translateValue = -60
buttons.forEach(button => {
    button.addEventListener("click",(event) => {
        let galerie = document.querySelector(".examples")
        // if right arrow was clicked
        if (event.target.classList.value.includes("b-right")) {
            translateValue -= 200
            galerie.style.transform = `translateX(${translateValue}vw)`;
        } else {
            translateValue +=200;
            galerie.style.transform = `translateX(${translateValue}vw)`;

        }

        
        
        console.log(galerie);
    })
})

