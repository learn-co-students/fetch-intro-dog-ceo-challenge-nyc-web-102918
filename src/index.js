console.log('%c HI', 'color: firebrick')
const imgURL = "https://dog.ceo/api/breeds/image/random/4"

const breedUrl = 'https://dog.ceo/api/breeds/list/all'

// Need to refactor the listBreed function to use recurrsion

document.addEventListener("DOMContentLoaded", () => {   
    // Challenge 1: Posting dog pictures 
    fetch(imgURL)
        .then(img => img.json())
        .then((img) => {
            for(let i of img.message){
                let image = document.createElement('img')
                image.src = i

       document.getElementById("dog-image-container").appendChild(image)
        //     //     select.innerHTML += `<img src= ${i}/>`
             }
         })

    // Challenge 2: List of dog breeds
     fetch(breedUrl)
         .then(info => info.json())
         .then((info) => {
             const breeds = Object.keys(info.message).concat(Object.values(info.message).filter(x => typeof x === "string"))
             console.log(breeds)

            //  for(let breed of breeds){
            //      let li = document.createElement('li')

            //      li.innerText = breed 

            //      document.getElementById('dog-breeds').appendChild(li)
            //  }
         })

         
        // Challenge 3: adding color functionality. 
         document.addEventListener('click', (event) => {
            if ([...document.getElementById('dog-breeds').children].includes(event.target)){
                event.target.style.color = 'red'
            }
         })

         
         // Challenge 4: adding dropdown

         document.addEventListener('change', (event) => {

            fetch(breedUrl)
            .then(info => info.json())
            .then((info) => {
                const breeds = Object.keys(info.message)
   
                for(let breed of breeds){
                    let li = document.createElement('li')
   
                    li.innerText = breed 
   
                    document.getElementById('dog-breeds').appendChild(li)
                }
            })

             const filteredArray = [...document.getElementById('dog-breeds').children].filter(dog => dog.textContent[0] == event.target.value)
            
             let ul = document.getElementById('dog-breeds')

             ul.innerHTML = ''

             for(breed of filteredArray){
                ul.appendChild(breed)
             }

         })

})
