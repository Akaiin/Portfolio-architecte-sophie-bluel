async function login(user) {
    const response = await fetch('http://localhost:5678/api/users/login', {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
    })
    return response
}

// récupération des catégories
async function getCategories() {
    const response = await fetch('http://localhost:5678/api/categories')
    return await response.json()
}

// récupération de toutes les images
async function getAllImages() {
    const response = await fetch('http://localhost:5678/api/works')
    return await response.json()
}

// récupération de la fonction de suppréssion d'image
async function deleteImage(imageId) {
    fetch(`http://localhost:5678/api/works/${imageId}`, {
        method: 'DELETE',
        headers: {
            accept: '*/*',
            Authorization: `Bearer ${user.token}`,
            credentials: 'same-origin',
        },
    })
        .then((response) => {
            if (response.ok) {
                alert('la suppression à été éffectué avec succès')
                gallery = [...gallery.filter((image) => image.id !== imageId)]
                displayImages(gallery)
                displayModalImages()
            }
        })
        .catch((error) => alert('la suppression à échoué'))
}

async function uploadImage(formData, token) {
    const response = await fetch('http://localhost:5678/api/works', {
        method: 'POST',
        body: formData,
        headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${token}`,
        },
    })
    return response
}
