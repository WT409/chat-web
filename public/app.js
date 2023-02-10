  const server = io()

function renderMessages(messages) {
    let chat = document.getElementById("chat")
    chat.innerHTML += `<div id="messages"><span id="username">${messages.username}</span> - ${messages.message}</div>`
}

server.on("previousMessage", messages => {
    messages.forEach(message => {
        renderMessages(message)
    })
})

server.on("receivedMessage", messages => {
    renderMessages(messages)
})

let username = document.getElementById("input-username")
let message = document.getElementById("input-text")

message.onkeydown = e => {
    if(e.key === "Enter" && message.value.length &&
        username.value.length) {
            const messagesObj = {
                username: username.value,
                message: message.value
            }

        renderMessages(messagesObj)

        server.emit("sendMessage", messagesObj)

        message.value = ''
    }
}
