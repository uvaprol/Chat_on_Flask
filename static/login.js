const form = document.getElementById('form')
const login = document.getElementById('login')
const password = document.getElementById('fpassword')

localStorage.removeItem('login')
localStorage.removeItem('password')

function Send(){
    alert('Такой логин занят XD')
}

form.addEventListener('keydown', (event) => {
    if (event.key === 'Enter'){
        Send()
    }
})