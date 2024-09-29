export function showMessage(message, type = 'success') {
    const messageElement = document.querySelector('.message');
    messageElement.innerHTML = message;
    messageElement.classList.add(type);
    messageElement.style.display = 'block';
    setTimeout(() => {messageElement.style.display = 'none'
    }, 3000);
}