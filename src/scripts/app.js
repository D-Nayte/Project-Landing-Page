


function createNav() {
    const allSections = document.querySelectorAll("section")
    const fragment = document.createDocumentFragment()

    // add heading to ul
    let liH2 = document.createElement("li")
    liH2.innerHTML = `<h2 class="heading">PinkPink<span>.</span> <button>&#10006;</button></h2>`
    fragment.appendChild(liH2)

    //create list items based on sections numbers
    allSections.forEach(section => {
    
        if (section.id != "") {
            //Create Link Name from Link ID
            let idName = section.id[0].toUpperCase() + section.id.slice(1)
           const name = idName.replace(/-/g, " ")
           
           //create new HTML Element with Name
           let liElement = document.createElement("li")
           liElement.innerHTML = `<a>${name}</a><button>&#62;</button>`
           fragment.appendChild(liElement)
        }
    })
        
        
    //Add element to ul
    let ul = document.querySelector("nav ul")
    ul.appendChild(fragment)
}

createNav()

