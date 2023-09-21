let tg = window.Telegram.WebApp;


function validateFields() {
    var fullName = document.getElementById('fullName').value;
    var passengerCount = document.getElementById('passengerCount').value;
    var phone = document.getElementById('phone').value;
    var departureDate = document.getElementById('departureDate').value;
    var fromLocation = document.getElementById('fromLocation').value;
    var toLocation = document.getElementById('toLocation').value;

    if (fullName === '' || passengerCount === '' || phone === '' || departureDate === '' || fromLocation === '' || toLocation === '') {
        alert('Пожалуйста, заполните все поля.');
        return false;
    }

    return true;
}


function validateNumPass() {
    var passengerCount = document.getElementById('passengerCount');
    var countValue = parseInt(passengerCount.value);

    if (countValue > 0 && countValue < 20) {
        passengerCount.style.border = "none"; // Убираем подсветку
        return true;
    } else {
        passengerCount.style.borderBottom = "1px solid red"; // Подсвечиваем красным
        alert('Количество пассажиров должно быть от 1 до 20!'); // Выводим уведомление
        return false;
    }
}



function materialClick(event) {
    if (!validateFields()) {
        return; // Не продолжаем выполнение, если поля не заполнены
    }

    if (!validateNumPass()) {
        return; // Не продолжаем выполнение, если поля не заполнены
    }

    // Получаем элементы с классами inputs и button-container
    var inputsContainer = document.querySelector('.inputs');
    var buttonContainer = document.querySelector('.button-container');

    // Скрываем элементы
    inputsContainer.style.display = 'none';

    // Показываем анимацию (лоадер)
    var loader = document.querySelector('.loader');
    loader.style.display = 'block';

    // Удаляем кнопку
    buttonContainer.removeChild(document.getElementById('bookingButton'));

    // Запускаем анимацию (лоадер) на короткое время (в данном случае, 2 секунды)
    setTimeout(function () {
        loader.style.display = 'none';
        // Показываем сообщение "Спасибо за бронь" с задержкой
        var messageContainer = document.querySelector('.message_block');
        messageContainer.style.display = 'block';

        // После отображения сообщения ждем 2 секунды и отправляем данные
        setTimeout(function () {
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
        }, 2000); // Пауза в 2 секунды перед отправкой данных и закрытием
    }, 1000); // 1 секунда до отображения сообщения
}