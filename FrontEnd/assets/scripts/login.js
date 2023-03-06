const loginForm = document.querySelector('#login-form')
const loginEmail = document.querySelector('#email')
const invalidEmail = document.querySelector('#invalid-email')
const invalidPassword = document.querySelector('#invalid-password')
const loginPassword = document.querySelector('#password')

loginForm.addEventListener('submit', (event) => {
    event.preventDefault()
    let login = {
        email: loginEmail.value,
        password: loginPassword.value,
    }
    if (!login.email.match(/^[^\s@]+@[a-z]+\.[a-z]{2,}$/)) {
        invalidEmail.innerHTML = 'Veuillez entrer un email correct.'
    } else if (login.password.length < 6) {
        invalidPassword.innerHTML = 'Veuillez entrer un mot de passe contenant au minimum 6 caractères'
    } else {
        console.log(login)
        fetch('http://localhost:5678/api/users/login', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },

            body: JSON.stringify(login),
        })
            .then((response) => {
                if (response.status === 200) {
                    return response.json()
                } else if (response.status === 401) {
                    invalidEmail.innerHTML = 'Accès non autrorisé'
                } else if (response.status === 404) {
                    invalidEmail.innerHTML = 'Utilisateur non trouvé'
                } else {
                    invalidEmail.innerHTML = response.status
                }
            })
            .then((userData) => {
                if (userData) {
                    sessionStorage.setItem('user', JSON.stringify(userData))
                    location.href = 'http://127.0.0.1:5500/FrontEnd/index.html'
                }
            })
    }
})
