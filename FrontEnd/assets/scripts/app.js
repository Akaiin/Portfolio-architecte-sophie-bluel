const imagesContainer = document.querySelector('.gallery')


fetch('http://localhost:5678/api/works')
    .then((response)=> {
    return response.json()
    }) 
    .then((data)=> {data.forEach(image => {
        console.log(image)
        createImage(image.imageUrl, image.title)
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
    }