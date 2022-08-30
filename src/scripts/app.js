

function createNav() {
    const allSections = document.querySelectorAll("section")

    allSections.forEach(section => {
    
        if (section.id != "") {
            //Create Link Name from Link ID
            let idName = section.id[0].toUpperCase() + section.id.slice(1)
           const name = idName.replace(/-/g, " ")
           
           //create new HTML Element with Name
            const innerHTML = `<li><a href="#">${name}</a></li>`
    
            //Add element to ul
            let ul = document.querySelector("nav ul")
            ul.insertAdjacentHTML("beforeend", innerHTML)
        }
    })
}

createNav()