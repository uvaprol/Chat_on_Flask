const CHAT = document.getElementById('chat_window')
const MESSAGE = document.getElementById('text')

function Send(){
    let text = MESSAGE.value
    text = text.trim()
    if (text != ''){
        const now = new Date()
        const hour = now.getHours()
        const minutes = now.getMinutes()
        const day = now.getDate()
        const month = now.getMonth()
        const year = now.getFullYear()
        CHAT.innerHTML += `
        <div class = "message">
            <b class = "name">
                ${localStorage.getItem('login')}
                <i class = "name">
                    ${hour}:${minutes}  ${day}/${month + 1}/${year}
                </i>
            </b>
            <br>
            <b class = "text">
                ${text}
            </b>
        </div> 
        `
    }
    MESSAGE.value = ''
}

MESSAGE.addEventListener('keydown', (event) => {
    if (event.key === 'Enter'){
        Send()
    }
})