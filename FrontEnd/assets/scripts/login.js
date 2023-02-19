const loginForm = document.querySelector('#login-form')
const loginEmail = document.querySelector('#email')
const invalidEmail = document.querySelector('#invalid-email')
const loginPassword = document.querySelector('#password')

loginForm.addEventListener('click', (event) => {
    event.preventDefault()
    /*if (loginEmail.value.match(/^[^\s@]+@[a-z]+\.[a-z]{2,}$/)) {
        location.href = "http://127.0.0.1:5500/FrontEnd/index.html"
    } else {
        invalidEmail.innerHTML = 'Veuillez entrer un email correct.'
    }*/

    fetch('http://localhost:5678/api/users/login', {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: {
            email: loginEmail.value,
            password: loginPassword.value,
        },
    }).then((response) => {
        console.log(response)
    })
})
