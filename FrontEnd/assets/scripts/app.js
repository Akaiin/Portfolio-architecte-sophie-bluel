const imagesContainer = document.querySelector('.gallery')
const modalContainer = document.querySelector('.modal')
const modalContent = document.querySelector('.modal-content')
const modalImages = document.querySelector('.modal__images__container')
const loginLink = document.querySelector('.login')
const closeBtn = document.querySelector('#close--btn')

fetch('http://localhost:5678/api/works') /* récupération des travaux */
    .then((response) => {
        return response.json()
    })
    .then((data) => {
        /* ajouts des travaux dans la page d'accueil */
        data.forEach((image) => {
            const figure = document.createElement('figure')
            const figureCaption = document.createElement('figcaption')
            const figureImage = document.createElement('img')

            figureImage.src = image.imageUrl
            figureImage.alt = image.title
            figureCaption.innerHTML = image.title
            imagesContainer.appendChild(figure)
            figure.appendChild(figureImage)
            figure.appendChild(figureCaption)
            /* si l'utilisateur est connecté, création de l'option log out */
            if (sessionStorage.user) {
                loginLink.innerHTML = 'logout'
                loginLink.style.fontWeight = 700
                loginLink.addEventListener('click', (event) => {
                    event.preventDefault()
                    sessionStorage.removeItem('user')
                    location.href = 'http://127.0.0.1:5500/FrontEnd/index.html'
                })
                /* création de la modale */
                figureImage.addEventListener('click', (event) => {
                    modalImages.innerHTML = ''
                    modalContainer.style.display = 'flex'

                    closeBtn.addEventListener('click', (event) => {
                        modalContainer.style.display = 'none'
                    })
                    data.forEach((image) => {
                        const modalCard = document.createElement('div')
                        const modalPhotos = document.createElement('img')
                        const deleteBtn = document.createElement('button')

                        modalCard.classList.add('modal__images__card')
                        modalPhotos.src = image.imageUrl
                        modalPhotos.alt = image.title
                        modalImages.appendChild(modalCard)
                        modalCard.appendChild(modalPhotos)
                        modalPhotos.classList.add('modal__images-size')
                        modalCard.appendChild(deleteBtn)
                        /* suppréssion des travaux lors du click sur les boutons */
                        deleteBtn.addEventListener('click', (event) => {
                            event.preventDefault()
                            const token = JSON.parse(sessionStorage.getItem('user')).token
                            fetch(`http://localhost:5678/api/works/${image.id}`, {
                                method: 'DELETE',
                                headers: {
                                    Accept: 'application/json',
                                    Authorization: `Bearer ${token}`,
                                },
                            })
                        })
                    })
                })
            }
        })
    })

/* fermeture de la modale */
modalContainer.addEventListener('click', (event) => {
    if (event.target == modalContainer) {
        modalContainer.style.display = 'none'
    }
})

/* redirection vers la page de connexion lors du click sur login */
loginLink.addEventListener('click', (event) => {
    location.href = 'http://127.0.0.1:5500/FrontEnd/login.html'
})
