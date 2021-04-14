let addToy = false;


document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  const toyCollectionDiv = document.querySelector("#toy-collection")
  const toyForm = document.querySelector("form.add-toy-form")

  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });

  function turnToyObjToHTML(toyPOJO){
    let newDiv = document.createElement("div")
    newDiv.className = "card"
    
    let newH2 = document.createElement("h2")
    newH2.innerText = toyPOJO.name

    let newImg = document.createElement("img")
    newImg.className = "toy-avatar"
    newImg.src = toyPOJO.image

    let newP = document.createElement("p")
    newP.innerText = toyPOJO.likes

    let newBtn = document.createElement("button")
    newBtn.className = "like-btn"
    newBtn.id = toyPOJO.id
    newBtn.innerText = "Like <3"

    newDiv.append(newH2, newImg, newP, newBtn)

    toyCollectionDiv.append(newDiv)

    newBtn.addEventListener('click', function(evt){
      fetch(`http://localhost:3000/toys/${toyPOJO.id}`, {
        method: 'PATCH',
        headers: {
          "Content-type": "application/json",
          Accept: "application/json"
        },
        body: JSON.stringify({
          likes: toyPOJO.likes + 1
        })
      })
      .then(resp => resp.json())
      .then(updatedToyObj => {
        newP.innerText = updatedToyObj.likes
        toyPOJO.likes = updatedToyObj.likes
      })
    })
  }

  fetch("http://localhost:3000/toys")
  .then(resp => resp.json())
  .then(json => {
    console.log(json)
    json.forEach(toyObj => {
      turnToyObjToHTML(toyObj)
    })
  })

  toyForm.addEventListener('submit', function(evt){
    evt.preventDefault()

    let toyName = evt.target.name.value
    let toyImage = evt.target.image.value

    console.log(toyName, toyImage)
    fetch("http://localhost:3000/toys", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify({
        name: toyName,
        image: toyImage,
        likes: 0
      })
    })
    .then(resp => resp.json())
    .then(newToy => {
      turnToyObjToHTML(newToy)
    })
  })



});
