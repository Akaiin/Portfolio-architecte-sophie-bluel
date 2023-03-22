const loginForm = document.querySelector('#login-form')
const loginEmail = document.querySelector('#email')
const invalidEmail = document.querySelector('#invalid-email')
const invalidPassword = document.querySelector('#invalid-password')
const loginPassword = document.querySelector('#password')

const showError = (element, message) => {
    element.innerHTML = message
}

const clearErrors = () => {
    invalidEmail.innerHTML = ''
    invalidPassword.innerHTML = ''
}

const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[a-z]+\.[a-z]{2,}$/
    return email.match(emailRegex)
}

const login = () => {
    const email = loginEmail.value
    const password = loginPassword.value
    const user = { email, password }

    if (!isValidEmail(email)) {
        showError(invalidEmail, 'Veuillez entrer un email correct.')
        return
    }

    if (password.length < 6) {
        showError(invalidPassword, 'Veuillez entrer un mot de passe contenant au minimum 6 caractères.')
        return
    }

    clearErrors()

    fetch('http://localhost:5678/api/users/login', {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
    })
        .then((response) => {
            if (response.status === 200) {
                return response.json()
            } else if (response.status === 401) {
                showError(invalidEmail, 'Accès non autorisé.')
            } else if (response.status === 404) {
                showError(invalidEmail, 'Utilisateur non trouvé.')
            } else {
                showError(invalidEmail, response.status)
            }
        })
        .then((userData) => {
            if (userData) {
                sessionStorage.setItem('user', JSON.stringify(userData))
                location.href = 'index.html'
            }
        })
        .catch((error) => {
            console.error(error)
            showError(invalidEmail, 'Erreur lors de la connexion. Veuillez réessayer plus tard.')
        })
}

loginForm.addEventListener('submit', (event) => {
    event.preventDefault()
    login()
})
