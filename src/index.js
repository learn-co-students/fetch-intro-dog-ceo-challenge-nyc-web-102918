console.log('%c HI', 'color: firebrick')

document.addEventListener('DOMContentLoaded', () => {

  const imgUrl = "https://dog.ceo/api/breeds/image/random/4"
  const breedUrl = "https://dog.ceo/api/breeds/list/all"

  const dogImgContainer = document.getElementById('dog-image-container')
  const dogBreed = document.getElementById('dog-breeds')
  const breedDropdown = document.getElementById('breed-dropdown')




  fetch(imgUrl)
    .then((response) => {
      const parsedResponse = response.json()
        //console.log(parsedResponse)
        return parsedResponse
    })
    .then((parsedResponse) => {
      console.log(parsedResponse)
      // message es un atributo en mi parsed responde donde tiene los linck de las fotos
      // por eso estoy colocandolo aqui porque estoy diciendo mi parsed con este atributo vamos a
      // extraer esto.
      const dogImgString = parsedResponse.message.map((imgUrl) => `<img src="${imgUrl}">`)
      dogImgContainer.innerHTML = dogImgString
    })



      // // Challenge 1
      // fetch("https://dog.ceo/api/breeds/image/random/4")
      //   .then(response => {
      //     return response.json()
      //   })
      //   .then(parsed => {
      //     return parsed.message
      //   })
      //   .then(imageUrls => {
      //     imageUrls.forEach(imageUrl => {
      //       const image = document.createElement("img")
      //       image.src = imageUrl
      //       imageContainer.appendChild(image)
      //     })
      //   })

      function fetchAllBreeds() {
      dogBreed.innerHTML = ""
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
            dogBreed.appendChild(item)
          })
        })
      }

      fetchAllBreeds()


      // Challenge 3
     dogBreed.addEventListener('click', function breedClickHandler(e) {
       if (e.target.tagName === "LI") {
         e.target.style.color = "#ff0000"
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
