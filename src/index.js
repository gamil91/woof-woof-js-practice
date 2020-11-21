document.addEventListener('DOMContentLoaded', onDomLoad)


    
function onDomLoad(){
    getPups()
    const goodDogsBtn = document.getElementById("good-dog-filter")
    goodDogsBtn.addEventListener("click", (e) => filterPups(e))
}

function filterPups(e){
     if(e != "" && e.target.textContent == "Filter good dogs: OFF")
    {
        e.target.textContent = "Filter good dogs: ON"
        getPups(e)
    }
    else{
        e.target.textContent = "Filter good dogs: OFF"
        getPups()
    }
}


function getPups(filterOn = ""){
    let dogBar = document.getElementById("dog-bar")
    dogBar.textContent = ""

    return fetch("http://localhost:3000/pups")
    .then(resp => resp.json())
    .then(function(pups){
        pups.forEach(pup => {
            
            if (filterOn != ""){
                if (pup.isGoodDog == true){
                const span = document.createElement('span')
                span.textContent = pup.name
                span.addEventListener('click', () => getDoggo(pup))
                dogBar.appendChild(span)
                }
            }
            else {
                const span = document.createElement('span')
                span.textContent = pup.name
                span.addEventListener('click', () => getDoggo(pup))

                dogBar.appendChild(span)
             }
        });
    })
}

function getDoggo(dog){
    
    const image = document.createElement("img")
    image.src = dog.image


    const h2 = document.createElement("h2")
    h2.textContent = dog.name

    const btn = document.createElement("button")
    if(dog.isGoodDog == true){
        btn.textContent = "Bad Dog!"
    }
    else {
        btn.textContent = "Good Dog!"
    }
    btn.addEventListener("click", (e) => isAGoodDog(e, dog))

    const dogInfo = document.getElementById("dog-info")
    dogInfo.textContent = ""
    dogInfo.append(image, h2, btn)


}

function isAGoodDog(e, dog){
 
    if (e.target.textContent === "Good Dog!"){
        configObj = {
            method: "PATCH",
            headers: {"Content-Type" : "application/json" },
            body: JSON.stringify({isGoodDog : true})
                   }
     }
     else {
        configObj = {
            method: "PATCH",
            headers: {"Content-Type" : "application/json" },
            body: JSON.stringify({isGoodDog : false})
                   }
     }

    fetch(`http://localhost:3000/pups/${dog.id}`, configObj)
    .then(resp => resp.json())
    .then(json =>  getDoggo(json))
    
}





