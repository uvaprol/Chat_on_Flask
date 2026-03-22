const login = document.getElementById('login')
const password = document.getElementById('password')
const form = document.getElementById('form')

function Send(){
    console.log(login.value)
    console.log(password.value)
    localStorage.setItem('login', login.value)
    localStorage.setItem('password', password.value)
}

form.addEventListener('keydown', (event) => {
    if (event.key === 'Enter'){
        Send()
    }
})

function checkAutoEnter(){
    if (localStorage.getItem('login') && localStorage.getItem('password')){
        console.log(localStorage.getItem('login'))
    } else {
        console.log('No logs')
    }
}

checkAutoEnter()
