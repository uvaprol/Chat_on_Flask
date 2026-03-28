const form = document.getElementById('form')
const login = document.getElementById('login')
const password = document.getElementById('password')

localStorage.removeItem('login')
localStorage.removeItem('password')

function Send(){
    $.ajax({
        url: '/checkReg',
        type: 'POST',
        data: {
            'login': login.value,
            'password': password.value
        },
        success: (response) => {
            localStorage.setItem('login', login.value)
            localStorage.setItem('password', password.value)
            window.location.href = `${response.redirect}`
        },
        error: (response) => {
            console.log(response.responseJSON.error)
        }
    })
}

form.addEventListener('keydown', (event) => {
    if (event.key === 'Enter'){
        Send()
    }
})