const login = document.getElementById('login')
const password = document.getElementById('password')
const form = document.getElementById('form')

function Send(){
    console.log(login.value)
    console.log(password.value)
    localStorage.setItem('login', login.value)
    localStorage.setItem('password', password.value)
    serverResponse()
}

form.addEventListener('keydown', (event) => {
    if (event.key === 'Enter'){
        Send()
    }
})

function checkAutoEnter(){
    login.value = localStorage.getItem('login')
    password.value = localStorage.getItem('password')
    if (localStorage.getItem('login') && localStorage.getItem('password')){
        console.log(localStorage.getItem('login'))
    } else {
        console.log('No logs')
    }
}

function serverResponse(){
    $.ajax({
        url: '/checkLog',
        type: 'POST',
        data: {
            'login': localStorage.getItem('login'),
            'password': localStorage.getItem('password')
        },
        success: (response) => {
            window.location.href = `${response.redirect}?login=${localStorage.getItem('login')}`
        },
        error: (response) => {
            console.log(response.responseJSON.error)
        }
    })
}

checkAutoEnter()
