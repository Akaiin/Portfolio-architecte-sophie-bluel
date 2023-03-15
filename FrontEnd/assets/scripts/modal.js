const modalContainer = document.querySelector('.modal')
const modalContent = document.querySelector('.modal-content')
const loginLink = document.querySelector('.login')
const closeBtn = document.querySelector('.close-btn')
const addModalBtn = document.querySelector('.modal__add-btn')
const backBtn = document.querySelector('.back-btn')
const uploadBtn = document.querySelector('#upload-btn')
const addPhoto = document.querySelector('.modal__hidden-btn')
const addModal = document.querySelector('.modal__content__hidden')
const title = document.querySelector('#title')
const category = document.querySelector('#category')
const uploadContent = document.querySelector('.upload__content')
const uploadText = document.querySelector('.upload__subtext')

// fermeture de la modale lors du click sur les bouton en croix
document.querySelectorAll('.close-btn').forEach((button) => {
    button.addEventListener('click', (event) => {
        closeModal()
    })
})

// fermeture de la modale lors du click en dehors
modalContainer.addEventListener('click', (event) => {
    if (event.target == modalContainer) {
        closeModal()
    }
})

// bouton précédent de la page modale upload
backBtn.addEventListener('click', (event) => {
    resetModal()
})

// passage vers la page upload de la modale
addModalBtn.addEventListener('click', (event) => {
    modalContent.style.display = 'none'
    addModal.style.display = 'flex'
})

// previsualisation de l'image séléctionné dans l'input file dans le container
uploadBtn.addEventListener('change', (event) => {
    const image = uploadBtn.files[0]
    if (image.size <= 4194304) {
        uploadContent.innerHTML = `<img src="${URL.createObjectURL(
            image
        )}" alt="image" class="uploaded__photo">`
    } else {
        uploadText.style.color = 'red'
        uploadText.innerHTML = `Fichier trop volumineux, veuillez respecter la taille qui est de 4mo maximum`
    }
})

// création de mon objet formData contenant les propriété de mes images uploadé
addPhoto.addEventListener('click', (event) => {
    event.preventDefault()
    let formData = new FormData()
    formData.append('image', uploadBtn.files[0])
    formData.append('title', title.value)
    formData.append('category', category.value)

    // envoi des informations de mes images vers le serveur
    fetch('http://localhost:5678/api/works', {
        method: 'POST',
        body: formData,
        headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${user.token}`,
        },
    })
    title.value = ''
})

// changement de la couleur du bouton si l'input title est utilisé ou non
title.addEventListener('input', (event) => {
    if (!title.value) {
        addPhoto.style.background = '#A7A7A7'
    } else {
        addPhoto.style.background = '#1D6154'
    }
})

// fonction servant à afficher la modale
function displayModal() {
    modalContainer.style.display = 'flex'
    resetModal()
    displayModalImages()
}

// fonction servant à afficher les images dans la modale
function displayModalImages() {
    const modalImages = document.querySelector('.modal__images__container')
    modalImages.innerHTML = ''
    gallery.forEach((image) => {
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
        deleteBtn.classList.add('delete__image-btn')
        deleteBtn.innerHTML = `<img src="/FrontEnd/assets/icons/bin.svg" alt="delete bin">`
        edit.innerHTML = 'éditer'
        modalCard.appendChild(edit)
        // suppréssion des travaux lors du click sur les boutons
        deleteBtn.addEventListener('click', (event) => {
            event.preventDefault()
            deleteImage(image.id)
        })
    })
}

// fonction servant à cacher la modale
function closeModal() {
    modalContainer.style.display = 'none'
}

// fonction servant à ce qu'on soit toujours renvoyé sur la première page de la modale lors de l'ouverture
function resetModal() {
    modalContent.style.display = 'flex'
    addModal.style.display = 'none'
}
