import { closeModal, showModal } from "./modal";
import { sendingData } from "../services/services";

export default function sendForm(modalSelector) {   
    const message = {
        loading: '/img/spinner.svg',
        success: 'Thank you! We will contact you soon!',
        error: 'Sorry, we have some problems with server'
    };
    const forms = document.querySelectorAll('form');

    forms.forEach((el) => postData(el, modalSelector));



    function postData(form, modalSelector) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();

            const statusMessage = document.createElement('img');
            statusMessage.src = message.loading;
            statusMessage.style.cssText = `
                display: block;
                margin: 0 auto;
                `;
            form.insertAdjacentElement('afterend', statusMessage);

            const formData = new FormData(form);

            const objRequest = JSON.stringify(Object.fromEntries(formData.entries()));

            sendingData('http://localhost:3000/requests', objRequest)
                .then((data) => {
                    statusMessage.remove();
                    showthanksModal(message.success, modalSelector);
                })
                .catch(() => showthanksModal(message.error, modalSelector))
                .finally(() => form.reset());
        });
    }

    function showthanksModal(message, modalSelector) {
        const prevModalDialog = document.querySelector('.modal__dialog');

        prevModalDialog.classList.add('hide');
        prevModalDialog.classList.remove('show');
        showModal(modalSelector);

        const thanksModal = document.createElement('div');
        thanksModal.classList.add('modal__dialog');
        thanksModal.innerHTML = `
            <div class="modal__content">
            <div class="modal__close" data-close>×</div>
            <div class="modal__title">${message}</div>
            </div>
            `;
        document.querySelector(modalSelector).append(thanksModal);
        setTimeout(() => {
            thanksModal.remove();
            prevModalDialog.classList.remove('hide');
            prevModalDialog.classList.add('show');
            closeModal(modalSelector);
        }, 2000)
    }
}