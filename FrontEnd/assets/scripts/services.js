// récupération des catégories
async function getCategories() {
    const response = await fetch('http://localhost:5678/api/categories')
    const categories = await response.json()
    return categories
}

// récupération de toutes les images
async function getAllImages() {
    const response = await fetch('http://localhost:5678/api/works')
    const images = await response.json()
    return images
}
// récupération de la fonction de suppréssion des images
async function deleteImage(imageId) {
    fetch(`http://localhost:5678/api/works/${imageId}`, {
        method: 'DELETE',
        headers: {
            accept: '*/*',
            Authorization: `Bearer ${user.token}`,
        },
    })
        .then((response) => {
            alert('la suppression à été éffectué avec succès')
        })
        .catch((error) => alert('la suppression à échoué'))
}
