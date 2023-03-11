const imagesContainer = document.querySelector('.gallery')
const modalContainer = document.querySelector('.modal')
const modalContent = document.querySelector('.modal-content')
const modalImages = document.querySelector('.modal__images__container')
const loginLink = document.querySelector('.login')
const closeBtn = document.querySelector('.close--btn')
const addModalBtn = document.querySelector('.modal__add--btn')
const backBtn = document.querySelector('.back--btn')
const uploadBtn = document.querySelector('#upload--btn')
const addPhoto = document.querySelector('.modal__hidden--btn')
const addModal = document.querySelector('.modal-content-hidden')
const title = document.querySelector('#title')
const Category = document.querySelector('#category')
const uploadContent = document.querySelector('.upload__content')
const user = JSON.parse(sessionStorage.getItem('user'))

uploadBtn.addEventListener('change', (event) => {
    const image = uploadBtn.files[0]
    uploadContent.innerHTML = `<img src="${URL.createObjectURL(image)}" alt="image" class="uploaded__photo">`
})

fetch('http://localhost:5678/api/works') // récupération des travaux
    .then((response) => {
        return response.json()
    })
    .then((data) => {
        // ajouts des travaux dans la page d'accueil
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
            // si l'utilisateur est connecté, création de l'option log out
            if (sessionStorage.user) {
                loginLink.innerHTML = 'logout'
                loginLink.style.fontWeight = 700
                loginLink.addEventListener('click', (event) => {
                    event.preventDefault()
                    sessionStorage.removeItem('user')
                    location.href = 'http://127.0.0.1:5500/FrontEnd/index.html'
                })
                // création de la modale
                figureImage.addEventListener('click', (event) => {
                    modalImages.innerHTML = ''
                    modalContainer.style.display = 'flex'
                    modalContent.style.display = 'flex'
                    addModal.style.display = 'none'

                    modalContainer.addEventListener('click', (event) => {
                        if (event.target.classList.contains('close--btn')) {
                            modalContainer.style.display = 'none'
                        }
                    })
                    addModalBtn.addEventListener('click', (event) => {
                        modalContent.style.display = 'none'
                        addModal.style.display = 'flex'
                    })
                    backBtn.addEventListener('click', (event) => {
                        modalContent.style.display = 'flex'
                        addModal.style.display = 'none'
                    })
                    data.forEach((image) => {
                        const modalCard = document.createElement('div')
                        const modalPhotos = document.createElement('img')
                        const deleteBtn = document.createElement('button')
                        const edit = document.createElement('p')

                        modalCard.classList.add('modal__images__card')
                        modalPhotos.src = image.imageUrl
                        modalPhotos.alt = image.title
                        modalImages.appendChild(modalCard)
                        modalCard.appendChild(modalPhotos)
                        modalPhotos.classList.add('modal__images-size')
                        modalCard.appendChild(deleteBtn)
                        deleteBtn.classList.add('delete__image--btn')
                        deleteBtn.innerHTML = `<img src="/FrontEnd/assets/icons/bin.svg" alt="delete bin">`
                        edit.innerHTML = 'éditer'
                        modalCard.appendChild(edit)
                        // suppréssion des travaux lors du click sur les boutons
                        deleteBtn.addEventListener('click', (event) => {
                            fetch(`http://localhost:5678/api/works/${image.id}`, {
                                method: 'DELETE',
                                headers: {
                                    Accept: 'application/json',
                                    Authorization: `Bearer ${user.token}`,
                                },
                            })
                        })
                    })
                })
            }
        })
    })

// fermeture de la modale
modalContainer.addEventListener('click', (event) => {
    if (event.target == modalContainer) {
        modalContainer.style.display = 'none'
    }
})

// redirection vers la page de connexion lors du click sur login
loginLink.addEventListener('click', (event) => {
    location.href = 'http://127.0.0.1:5500/FrontEnd/login.html'
})

addPhoto.addEventListener('click', (event) => {
    event.preventDefault()
    let formData = new FormData()
    formData.append('image', uploadBtn.files[0])
    formData.append('title', title.value)
    formData.append('category', Category.value)

    fetch('http://localhost:5678/api/works', {
        method: 'POST',
        body: formData,
        headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${user.token}`,
        },
    })
})
