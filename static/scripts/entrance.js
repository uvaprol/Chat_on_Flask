let sign_mode = true
let sub_btn = document.getElementById('sub_btn')
let swaper_btn = document.getElementById('swaper')
let warning_msg = document.getElementById('warning')
const API_ADRESS = 'http://192.168.1.6/login' 

function show_warning(){
    warning_msg.style.transition = 'transform 1s ease'
    warning_msg.style.transform = 'scale(1)'
}

function switch_mode(){
    if (sign_mode){
        sign_mode = false
        sub_btn.innerText = 'Регистрация'
        swaper_btn.innerText = 'Вход'
    } else {
        sign_mode = true
        sub_btn.innerText = 'Вход'
        swaper_btn.innerText = 'Регистрация'
        warning_msg.style.transition = 'transform 0s ease'
        warning_msg.style.transform = 'scale(0)'
    }
}

function subscribe(){
    fetch(`http://192.168.1.6/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            sign_mode: sign_mode,
            login: document.getElementById('login').value,
            password: document.getElementById('password').value
        })
    })
    .then(response => response.json())
    .then(data => {
        console.log(data);
        warning_msg.innerText =  sign_mode ? 'Таких незнаем' : 'Такой уже есть';
        show_warning();
    })
    .catch(error => {
        console.log(error);
        warning_msg.innerText = 'Упс, что-то поломалось';
        show_warning();
    })
}

function checkServer() {
    fetch('http://192.168.1.6/ping')
        .then(response => response.json())
        .then(data => {
            console.log('Сервер доступен!', data);
        })
        .catch(error => {
            console.error('Сервер не отвечает!', error);
            warning_msg.innerText = 'Сервер не запущен!';
            show_warning();
        });
}

// Проверяем сервер при загрузке
checkServer();


// $.get(
//     "http://192.168.1.6/ping",
//     (data) => {
//         console.log(data)
//         }
//     );