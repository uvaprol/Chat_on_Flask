const CHAT = document.getElementById('chat_window')
const MESSAGE = document.getElementById('text')

function Send(){
    let text = MESSAGE.value
    text = text.trim()
    if (text != ''){
        CHAT.innerHTML += `
        <div class = "message">
            <b class = "name">
                ${localStorage.getItem('login')}
            </b>
            <br>
            <b class = "text">
                ${text}
            </b>
        </div> 
        `
    }
    $.ajax({
        url: '/setMessage',
        type: 'POST',
        data: {
            'login': localStorage.getItem('login'),
            'password': localStorage.getItem('password'),
            'text': MESSAGE.value
        }
    })
    MESSAGE.value = ''
}

function getMessage(){
    $.ajax({
        url: '/getMessage',
        type: 'POST',
        data: {
            'login': localStorage.getItem('login'),
            'password': localStorage.getItem('password'),
        },
        success: (response) => {
            CHAT.innerHTML = ''
            for (let i = 0; i < response.data.length; i++){
                CHAT.innerHTML += `
                    <div class = "message">
                        <b class = "name">
                            ${response.data[i][0]}
                        </b>
                        <br>
                        <b class = "text">
                            ${response.data[i][1]}
                        </b>
                    </div>
                    `
            }
        }
    })
}


MESSAGE.addEventListener('keydown', (event) => {
    if (event.key === 'Enter'){
        Send()
    }
})

setInterval(getMessage, 3000)