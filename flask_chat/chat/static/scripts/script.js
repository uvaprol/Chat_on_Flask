// Загрузка и отображение сообщений
function loadMessages() {
    $.get(
    "/get_messages",
    (data) => {
        $("#chat_window").empty();
        let messages = data["messages"];
        for (let i in messages) {
            let message = messages[i];
            let name = message["sender"];
            let text = message["text"];
            let time = message["time"];
            console.log(name, text, time);
            let html = "<div class = 'message'> <b class = 'name'> " + name + " <i class = 'name'>" + time + "</i></b>:<br><b class = 'text'>" + text + "</div>";
            let div = $(html); // div = визуальный элемент с сообщением

            $("#chat_window").append(div);
        }
    }
    );
}

// Отправка сообщения
function sendMessage() {
    let name = $("#name").val(); // Кладем текст из поля "name" в переменную
    let text = $("#text").val();
    $.get("/send_message", { "name" : name, "text" : text});

    $("#text").val("");
}

// При загрузке страницы
$(() => {
    // При нажатии клавиш в поле текст
     $("#text").on("keypress", (event) => {
         // При нажатии Enter, вызвать функцию sendMessage
         if (event.keyCode == 13) {
             sendMessage();
         }
     });

    // Каждую секунду вызывать loadMessages
    setInterval(loadMessages, 1000);
});
