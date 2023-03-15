const filters = document.querySelector('.filters')
const filterAll = document.querySelector('.category-btn')
const user = JSON.parse(sessionStorage.getItem('user'))

let gallery = []
fetchAllImages()
createCategories()

// si l'utilisateur est connecté, création de l'option log out
if (sessionStorage.user) {
    loginLink.innerHTML = 'logout'
    loginLink.style.fontWeight = 700
    loginLink.addEventListener('click', (event) => {
        event.preventDefault()
        sessionStorage.removeItem('user')
        location.href = 'http://127.0.0.1:5500/FrontEnd/index.html'
    })
}

// fonction servant à récupérer les catégories et a créer les boutons utilisé pour filtrer les images
async function createCategories() {
    const categories = await getCategories()
    categories.forEach((category) => {
        const categoryBtn = document.createElement('button')
        filters.appendChild(categoryBtn)
        categoryBtn.classList.add('category-btn')
        categoryBtn.textContent = category.name
        categoryBtn.addEventListener('click', (event) => {
            const imagesFiltered = gallery.filter((image) => image.category.name === category.name)
            displayImages(imagesFiltered)
        })
    })
    filterAll.addEventListener('click', (event) => {
        displayImages(gallery)
    })
}

// fonction servant à récupérer les images et de les stocker dans une variable
async function fetchAllImages() {
    const images = await getAllImages()
    displayImages(images)
    gallery = [...images]
}

// fonction servant à afficher les images sur la page principal
function displayImages(images) {
    const imagesContainer = document.querySelector('.gallery')
    imagesContainer.innerHTML = ''
    images.forEach((image) => {
        const figure = document.createElement('figure')
        const figureCaption = document.createElement('figcaption')
        const figureImage = document.createElement('img')

        figureImage.src = image.imageUrl
        figureImage.alt = image.title
        figureCaption.innerHTML = image.title
        imagesContainer.appendChild(figure)
        figure.appendChild(figureImage)
        figure.appendChild(figureCaption)
        if (sessionStorage.user) {
            figureImage.addEventListener('click', (event) => {
                event.preventDefault()
                displayModal()
            })
        }
    })
}

// redirection vers la page de connexion lors du click sur login
loginLink.addEventListener('click', (event) => {
    location.href = 'http://127.0.0.1:5500/FrontEnd/login.html'
})
