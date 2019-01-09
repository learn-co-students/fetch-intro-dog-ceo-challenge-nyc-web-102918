document.addEventListener('DOMContentLoaded', () => {
// console.log('%c HI', 'color: firebrick')
const imgUrl = "https://dog.ceo/api/breeds/image/random/4"
const dogImg = document.querySelector('#dog-image-container')
//Challenge one
fetch(imgUrl)
.then(res => res.json())
.then(data => data.message)
.then(imageUrls => {
      imageUrls.forEach((imageUrl) => {
        const image = document.createElement("img")
        image.src = imageUrl
        image.id = "dog-images"
        dogImg.appendChild(image)
      })
    })

//Challenge two
let allBreeds = []
const breedList = document.querySelector("#dog-breeds")
const breedUrl = 'https://dog.ceo/api/breeds/list/all'
function fetchAllBreeds() {
  fetch(breedUrl)
  .then(res => res.json())
  .then(data => Object.keys(data.message))
  .then(names => {
    allBreeds = names
    renderBreeds(names)
  })
}
  function renderBreeds(breeds){
  breeds.forEach((breed) => {
    breedList.innerHTML += `
    <li>${breed}</li>
    `
    })
  }
fetchAllBreeds()
//Challenge three
  breedList.addEventListener('click', function breedClickHandler(e) {
    if (e.target.tagName === "LI") {
      e.target.style.color = "purple"
    }
  })

//Challenge four
const select = document.querySelector("#breed-dropdown")
select.addEventListener('change', (e) => {
  e.preventDefault()
  // console.log(e.target.value)
  const filteredDogs = allBreeds.filter((breed) => {
    return breed.charAt(0).includes(e.target.value)
  })
  breedList.innerHTML = ""
  renderBreeds(filteredDogs)
})

})
