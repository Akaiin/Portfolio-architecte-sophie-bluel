const imagesContainer = document.querySelector('.gallery')
const modalContainer = document.querySelector('.modal')
const modalContent = document.querySelector('.modal-content')

fetch('http://localhost:5678/api/works')
    .then((response)=> {
    return response.json()
    }) 
    .then((data)=> {data.forEach(images => {
        console.log(images)
        createImage(images.imageUrl, images.title)
    });})


    function createImage(imageUrl,imageTitle) {
        const figure = document.createElement('figure')
        const figureCaption = document.createElement('figcaption')
        const figureImage = document.createElement("img")
        
        figureImage.src= imageUrl
        figureImage.alt = imageTitle
        figureCaption.innerHTML = imageTitle
        imagesContainer.appendChild(figure)
        figure.appendChild(figureImage)
        figure.appendChild(figureCaption)

        figureImage.addEventListener("click", (event) => {
            modalContainer.style.display = 'flex'
        })
    }

    modalContainer.addEventListener("click", (event) => {
        console.log(modalContainer)
        console.log(event)
        if (event.target == modalContainer) {
        modalContainer.style.display = 'none'}
    })

