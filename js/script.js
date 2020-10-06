// Регулярные выражения
const regexSubject = /^[а-яА-Яa-zA-ZЁёЫы0-9 .,!?:'"+_&@#*()-]{5,100}$/iu;
const regexEmail = /^[\w-]+(\.[\w-]+)*@([a-z0-9-]+(\.[a-z0-9-]+)*?\.[a-z]{2,6}|(\d{1,3}\.){3}\d{1,3})(:\d{4})?$/;
const regexMessage = /^[а-яА-Яa-zA-ZЁёЫы0-9 .,!?:'"+_&@#*()-]{10,400}$/iu;

// Получить форму отправки пиьсма
const sendingLetterForm = document.querySelector('#sending-letter-form');

// Получить блоки для вывода ошибок
let errorSubject = document.querySelector('#error-subject');
let errorEmail = document.querySelector('#error-email');
let errorMessage = document.querySelector('#error-message');

// Получить блок инфомации об отправки письма
let sendingLetterFormMessageBlock = document.querySelector('#sending-letter-form-message-block');

// Событие проверки полей subject, email, message
sendingLetterForm.addEventListener('keyup', () => {

    const subject = document.querySelector('#subject').value;
    const email = document.querySelector('#email').value;
    const message = document.querySelector('#message').value;

    // Проверка темы
    if (regexSubject.test(subject)) {
        errorSubject.textContent = '';
    } else {
        errorSubject.textContent = 'Тема письма должна быть от 5 до 50 символов';
    }
    // Проверка email
    if (regexEmail.test(email)) {
        errorEmail.textContent = '';
    } else {
        errorEmail.textContent = 'Пожалуйста введите верный email адрес';
    }
    // Проверка сообщения
    if (regexMessage.test(message)) {
        errorMessage.textContent = '';
    } else {
        errorMessage.textContent = 'Текст сообщения должнен быть от 10 до 400 символов';
    }
});

// Событие отправки письма
sendingLetterForm.addEventListener('submit', (event) => {

    event.preventDefault();

    let subject = document.querySelector('#subject');
    let email = document.querySelector('#email');
    let message = document.querySelector('#message');

    // Проверить, если значение из input-ов не проходят проверку по регулярным выражениям, вернуть false - не разрешать отправку формы
    if (!regexSubject.test(subject.value) || !regexEmail.test(email.value) || !regexMessage.test(message.value)) {
        return false;
    }
    else {
        const ajax = async () => {
            const response = await fetch('mail/mail.php', {
                method: 'POST',
                body: new FormData(sendingLetterForm),
            });

            if (!response.ok) {
                throw new Error(response.status);
            } else {
                const data = await response.text();

                switch (data) {
                    case '0':
                        sendingMessage(sendingLetterFormMessageBlock, 'Извините, произошла ошибка. Пожалуйста, повторите отправку позже!', 'failed-message-sending');
                        break;
                    case '1':
                        sendingMessage(sendingLetterFormMessageBlock, 'Письмо отправлено!', 'successful-message-sending');
                        break;
                    case '2':
                        sendingMessage(sendingLetterFormMessageBlock, 'Заполните необходимые поля!', 'failed-message-sending');
                        break;
                }
            }
        };
        ajax()
            .catch(error => sendingMessage(sendingLetterFormMessageBlock, error, 'failed-message-sending'));

        subject.value = '';
        email.value = '';
        message.value = '';
    }
});

// Функция отображения сообщений об отправки формы
const sendingMessage = (block, message, addRemoveClass) => {
    block.textContent = message;
    block.style.visibility = 'visible';
    block.classList.add(addRemoveClass);
    setTimeout(() => {
        block.textContent = '';
        block.style.visibility = 'hidden';
        block.classList.remove(addRemoveClass);
    }, 3000);
};