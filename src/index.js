document.addEventListener('DOMContentLoaded', () => {
  const imageContainer = document.getElementById("dog-image-container")
  const breedList = document.getElementById("dog-breeds")
  const breedDropdown = document.getElementById("breed-dropdown")

  // Challenge 1
  fetch("https://dog.ceo/api/breeds/image/random/4")
    .then(response => {
      return response.json()
    })
    .then(parsed => {
      return parsed.message
    })
    .then(imageUrls => {
      imageUrls.forEach(imageUrl => {
        const image = document.createElement("img")
        image.src = imageUrl
        imageContainer.appendChild(image)
      })
    })

    // Challenge 2
    function fetchAllBreeds() {
      breedList.innerHTML = ""
      fetch("https://dog.ceo/api/breeds/list/all")
        .then(response => {
          return response.json()
        })
        .then(parsed => {
          return Object.keys(parsed.message)
        })
        .then(breeds => {
          breeds.forEach(breed => {
            const item = document.createElement("li")
            item.innerHTML = breed
            breedList.appendChild(item)
          })
        })
    }

    fetchAllBreeds()

      // Challenge 3
      breedList.addEventListener('click', function breedClickHandler(e) {
        if (e.target.tagName === "LI") {
          e.target.style.color = "#d44500"
        }
      })

      // Challenge 4

      //create dropdowns for every letter associated with breed
      function makeLetterOptions() {
        const firstLetters = []

        fetch("https://dog.ceo/api/breeds/list/all")
          .then(response => {
            return response.json()
          })
          .then(parsed => {
            return Object.keys(parsed.message)
          })
          .then(breeds => {
            // const allFirstLetters = breeds.map(breed => {
            //   return breed[0]
            // })
            breeds.map(breed => {
              if (!firstLetters.includes(breed[0])) {
                firstLetters.push(breed[0])
                return breed[0]
              }

            })

            firstLetters.forEach(letter => {
              const option = document.createElement("option")
              option.textContent = letter
              option.value = letter
              breedDropdown.appendChild(option)
            })
          })
      }
      makeLetterOptions()

      function breedQuery(letter) {
        fetch("https://dog.ceo/api/breeds/list/all")
          .then(response => {
            return response.json()
          })
          .then(parsed => {
            return Object.keys(parsed.message)
          })
          .then(breeds => {
            const filteredBreeds = breeds.filter(breed => breed[0] === letter)
            breedList.innerHTML = ""
            filteredBreeds.forEach(breed => {
              const item = document.createElement("li")
              item.innerHTML = breed
              breedList.appendChild(item)
            })

          })
      }

      breedDropdown.addEventListener('change', function functionName(e) {
        const optionValue = e.target.value

        if (optionValue === "all") {
          fetchAllBreeds()
        } else {
          breedQuery(optionValue)
        }
      })

})
