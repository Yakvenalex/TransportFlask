let tg = window.Telegram.WebApp;

function materialClick(event) {
    // Получаем элементы с классами inputs и button-container
    var inputsContainer = document.querySelector('.inputs');
    var buttonContainer = document.querySelector('.button-container');

    // Скрываем элементы
    inputsContainer.style.display = 'none';

    // Показываем анимацию (лоадер)
    var loader = document.querySelector('.loader');
    loader.style.display = 'block';

    // Создаем новую кнопку "Закрыть"
    var closeButton = document.createElement('button');
    closeButton.id = 'closeButton'; // Новый ID для кнопки
    closeButton.className = 'button'; // Копируем классы старой кнопки
    closeButton.textContent = 'ЗАКРЫТЬ';
    closeButton.onclick = closeClick; // Добавляем обработчик события клика

    // Заменяем текущую кнопку новой
    buttonContainer.removeChild(document.getElementById('bookingButton'));
    buttonContainer.appendChild(closeButton);

    // Запускаем анимацию (лоадер) на короткое время (в данном случае, 2 секунды)
    setTimeout(function() {
        loader.style.display = 'none';
        // Показываем сообщение "Спасибо за бронь" с задержкой
        var messageContainer = document.querySelector('.message_block');
        messageContainer.style.display = 'block';
    }, 1000); // 2 секунды
}

function closeClick(event) {
    var fullName = document.getElementById('fullName').value;
    var passengerCount = document.getElementById('passengerCount').value;
    var phone = document.getElementById('phone').value;
    var departureDate = document.getElementById('departureDate').value;
    var fromLocation = document.getElementById('fromLocation').value;
    var toLocation = document.getElementById('toLocation').value;

    let data = {
        fullName: fullName,
        passengerCount: passengerCount,
        departureDate: departureDate,
        fromLocation: fromLocation,
        toLocation: toLocation,
        phone: phone
    }
    tg.sendData(JSON.stringify(data))

    tg.close()
}
