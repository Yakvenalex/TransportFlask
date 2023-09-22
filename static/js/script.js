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
    if (!validateFields() || !validateNumPass()) {
        return; // Не продолжаем выполнение, если поля не заполнены или есть ошибки
    }

    var inputsContainer = document.querySelector('.inputs');
    var buttonContainer = document.querySelector('.button-container');
    var loader = document.querySelector('.loader');
    var messageContainer = document.querySelector('.message_block');

    inputsContainer.style.display = 'none';
    loader.style.display = 'block';
    buttonContainer.removeChild(document.getElementById('bookingButton'));

    var formData = new FormData(document.querySelector('form'));
    var userData = tg.initDataUnsafe.user;


    formData.append('user_id', userData.id);
    formData.append('notifi', "not_notify");


    fetch('/submit_form', {
        method: 'POST',
        body: formData
    })
        .then(response => response.text())
        .then(data => {
            messageContainer.style.display = 'block';
            messageContainer.innerHTML = data;

            // Выполнить tg.close() через 2 секунды
            setTimeout(function () {
                tg.close();
            }, 2000);
        })
        .catch(error => {
            console.error('Ошибка отправки данных на сервер:', error);
        });

    setTimeout(function () {
        loader.style.display = 'none';
    }, 2000); // Пауза в 2 секунды после отправки данных
}