// Get the dog name, breed, and sex and place them in the table
const tableBody = document.getElementById("table-body")
const dogForm =document.getElementById("dog-form")

dogForm.addEventListener("submit", e => {
    e.preventDefault();
    const updatedDog = {
        name: dogForm.name.value,
        breed: dogForm.breed.value,
        sex: dogForm.sex.value
    }
    console.log(updatedDog, e.target.dataset.id)
    fetch(`http://localhost:3000/dogs/${e.target.dataset.id}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(updatedDog)
    })
    const dogRow = document.getElementById(`${e.target.dataset.id}`)
    console.log(dogRow)
    dogRow.innerHTML = 
    `<td>${dogForm.name.value}</td>
    <td>${dogForm.breed.value}</td>
    <td>${dogForm.sex.value}</td>
    <td><button>Edit Dog</button></td>
    `
})

function getDogs() {
    fetch(`http://localhost:3000/dogs`)
        .then(resp => resp.json())
        .then(data => renderDogs(data))
}

function renderDogs(dogs) {
    dogs.forEach(dog => {
        const tr = document.createElement("tr")
        tr.id = dog.id
        tr.innerHTML = `
        <td>${dog.name}</td>
        <td>${dog.breed}</td>
        <td>${dog.sex}</td>
        <td><button>Edit Dog</button></td>
        `
        tableBody.append(tr)
        const button = tr.querySelector("button")
        button.addEventListener("click", e => {
            dogPopulator(dog)
            
        })

    })
}

getDogs()
function dogPopulator(dog) {
    dogForm.name.value = dog.name
    dogForm.breed.value = dog.breed
    dogForm.sex.value = dog.sex
    dogForm.dataset.id = dog.id
}