const imagesContainer = document.querySelector('.gallery')
const modalContainer = document.querySelector('.modal')
const modalContent = document.querySelector('.modal-content')
const modalImages = document.querySelector('.modal__images__container')
const loginLink = document.querySelector('.login')

fetch('http://localhost:5678/api/works')
    .then((response) => {
        return response.json()
    })
    .then((data) => {
        data.forEach((image) => {
            const figure = document.createElement('figure')
            const figureCaption = document.createElement('figcaption')
            const figureImage = document.createElement('img')

            figureImage.src = image.url
            figureImage.alt = image.title
            figureCaption.innerHTML = image.title
            imagesContainer.appendChild(figure)
            figure.appendChild(figureImage)
            figure.appendChild(figureCaption)

            figureImage.addEventListener('click', (event) => {
                modalContainer.style.display = 'flex'
                data.forEach((image) => {
                    const modalGallery = document.createElement('div')
                    const modalPhotos = document.createElement('img')

                    modalGallery.innerHTML = ''
                    modalPhotos.src = image.url
                    modalPhotos.alt = image.title
                    modalImages.appendChild(modalGallery)
                    modalGallery.appendChild(modalPhotos)
                    modalPhotos.classList.add('modal__images-size')
                    modalGallery.classList.add('modal__images__cards')
                })
            })
        })
    })

modalContainer.addEventListener('click', (event) => {
    if (event.target == modalContainer) {
        modalContainer.style.display = 'none'
    }
})

loginLink.addEventListener('click', (event) => {
    location.href = 'http://127.0.0.1:5500/FrontEnd/login.html'
})
