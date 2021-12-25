// modal
const modalBtn = document.querySelector('.btn__main'),
      modal = document.querySelector('.modal'),
      btnClose = document.querySelector('.modal__close');

      modalBtn.addEventListener('click', () => {
          modalOpen();
      })

      function modalOpen() {
        modal.classList.add('modal__show');
      }

      function modalClose () {
          modal.classList.remove('modal__show');
      }

      modal.addEventListener('click', (e) => {
        if (e.target === modal || e.target.getAttribute('data-close') == '') {
            modalClose();
        }
    });

    // forms

const forms = document.querySelectorAll('form');

forms.forEach(item => {
    postData(item)
})

const formMessage = {
    loading: 'spinner.svg',
    success: 'Мы с вами свяжемся в ближайшее время',
    error: 'Что то пошло не так :('
}

function postData(form) {
    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const statusMessage = document.createElement('img');
        statusMessage.src = formMessage.loading;
        statusMessage.style.cssText = `
                display: block;
                margin: 0 auto;
            `;
        form.insertAdjacentElement('afterend', statusMessage);

        const request = new XMLHttpRequest;
        request.open('POST', 'server.php');
        request.setRequestHeader('Content-type', 'application/json');
        const formData = new FormData(form);
        const object = {};
        formData.forEach(function(value, key) {
            object[key] = value;
        });
        const json = JSON.stringify(object);
        request.send(json);
        request.addEventListener('load', () => {
            if(request.status === 200) {
                console.log(request.response);
                showThanksModal(formMessage.success);
                form.reset();
                statusMessage.remove();
            } else {
                showThanksModal(formMessage.error);
                statusMessage.remove();
            }
        })
    });
}

function showThanksModal(message) {
    const prevModalDialog = document.querySelector('.modal__dialog');
    
    prevModalDialog.classList.add('hide');
    modalOpen();

    const thanksModal = document.createElement('div');
    thanksModal.classList.add('modal__dialog');
    thanksModal.innerHTML = `
    <div class="modal__content">
        <div class="modal__close" data-close>&times;</div>
        <div class="modal__title">${message}</div>
    </div>
    `;

    modal.append(thanksModal);
    setTimeout(() => {
        thanksModal.remove();
        prevModalDialog.classList.remove('hide');
        modalClose();
    },2000);

}