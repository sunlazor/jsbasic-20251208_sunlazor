import createElement from '../../assets/lib/create-element.js';

export default class Modal {
  modal;
  escapeListener;
  constructor() {
    this.modal = this.#makeModal();

    this.escapeListener = (event) => {
      if (event.key === 'Escape') {
        this.close();
      }
    }

    document.body.addEventListener('click', (event) => {
      if (event.target.closest('.modal__close')) {
        this.close();
      }
    })
  }

  open() {
    document.body.classList.add('is-modal-open');
    document.body.appendChild(this.modal);

    document.body.addEventListener('keydown', this.escapeListener);
  }

  close() {
    document.body.classList.remove('is-modal-open');
    document.body.querySelector('.modal').remove();

    document.body.removeEventListener('keydown', this.escapeListener);
  }

  setTitle(title) {
    let titleBlock = this.modal.querySelector('.modal__title');
    titleBlock.textContent = title;
  }

  setBody(body) {
    let bodyBlock = this.modal.querySelector('.modal__body');
    bodyBlock.innerHTML = body.innerHTML;
  }

  #createElement(html) {
    const div = document.createElement('div');
    div.innerHTML = html;
    return div.firstElementChild;
  }

  #makeModal() {
    return this.#createElement(`
        <!--Корневой элемент Modal-->
      <div class="modal">
        <!--Прозрачная подложка перекрывающая интерфейс-->
        <div class="modal__overlay"></div>

        <div class="modal__inner">
          <div class="modal__header">
            <!--Кнопка закрытия модального окна-->
            <button type="button" class="modal__close">
              <img src="/assets/images/icons/cross-icon.svg" alt="close-icon" />
            </button>

            <h3 class="modal__title">
<!--              Вот сюда нужно добавлять заголовок-->
            </h3>
          </div>

          <div class="modal__body">
<!--            A сюда нужно добавлять содержимое тела модального окна-->
          </div>
        </div>
      </div>
    `);
  }
}
