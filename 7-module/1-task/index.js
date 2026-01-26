export default class RibbonMenu {
  elem;

  constructor(categories) {
    this.categories = categories;

    let ribbon = this.#makeRibbon();
    this.#addCategories(ribbon, categories);
    this.#addCategoriesButtonInteractivity(ribbon);
    this.#addScroll(ribbon);

    this.elem = ribbon;
  }

  #makeRibbon() {
    return this.#createElement(
      `<!--Корневой элемент RibbonMenu-->
  <div class="ribbon">
    <!--Кнопка прокрутки влево-->
    <button class="ribbon__arrow ribbon__arrow_left ribbon__arrow_visible">
      <img src="/assets/images/icons/angle-icon.svg" alt="icon">
    </button>

    <!--Ссылки на категории-->
    <nav class="ribbon__inner">
<!--      <a href="#" class="ribbon__item ribbon__item_active" data-id="">All</a>-->
<!--      <a href="#" class="ribbon__item" data-id="salads">Salads</a>-->
    </nav>

    <!--Кнопка прокрутки вправо-->
    <button class="ribbon__arrow ribbon__arrow_right ribbon__arrow_visible">
      <img src="/assets/images/icons/angle-icon.svg" alt="icon">
    </button>
  </div>`
    );
  }

  #createElement(html) {
    const div = document.createElement('div');
    div.innerHTML = html;
    return div.firstElementChild;
  }

  #addScroll(ribbon) {
    let ribbonInner = ribbon.querySelector('.ribbon__inner');

    let leftArrow = ribbon.querySelector('.ribbon__arrow_left');
    ribbon.addEventListener('click', (event) => {
      if (event.target.closest('button') === leftArrow) {
        ribbonInner.scrollBy(-350, 0);

        this.#calculateArrowsVisibility(ribbon);
      }
    });

    let rightArrow = ribbon.querySelector('.ribbon__arrow_right');
    ribbon.addEventListener('click', (event) => {
      if (event.target.closest('button') === rightArrow) {
        ribbonInner.scrollBy(350, 0);

        this.#calculateArrowsVisibility(ribbon);
      }
    });
  }

  #calculateArrowsVisibility(ribbon) {
    let ribbonInner = ribbon.querySelector('.ribbon__inner');
    let rightArrow = ribbon.querySelector('.ribbon__arrow_right');
    let leftArrow = ribbon.querySelector('.ribbon__arrow_left');

    let scrollWidth = ribbonInner.scrollWidth;
    let scrollLeft = ribbonInner.scrollLeft;
    let clientWidth = ribbonInner.clientWidth;
    let scrollRight = scrollWidth - scrollLeft - clientWidth;

    if (scrollLeft < 1) {
      leftArrow.classList.toggle('ribbon__arrow_visible', false);
    } else {
      leftArrow.classList.toggle('ribbon__arrow_visible', true);
    }

    if (scrollRight < 1) {
      rightArrow.classList.toggle('ribbon__arrow_visible', false);
    } else {
      rightArrow.classList.toggle('ribbon__arrow_visible', true);
    }
  }

  #addCategories(ribbon, categories) {
    let ribbonInner = ribbon.querySelector('.ribbon__inner');

    categories.forEach((category) => {
      let a = document.createElement('A');
      a.classList.add('ribbon__item');
      a.href = '#';
      a.textContent = category.name;
      a.dataset.id = category.id;

      a.onclick = () => {
        a.dispatchEvent(
          new CustomEvent('ribbon-select', {
            detail: category.id,
            bubbles: true,
          }))
      }

      ribbonInner.appendChild(a);
    })
  }

  #addCategoriesButtonInteractivity(ribbon) {
    let ribbonInner = ribbon.querySelector('.ribbon__inner');

    ribbon.addEventListener('ribbon-select', (event) => {
      let clickedCategory = event.target.closest('.ribbon__item');
      if (!clickedCategory.classList.contains('ribbon__item_active')) {
        let previousCategory = ribbonInner.querySelector('.ribbon__item_active');
        if (previousCategory) {
          previousCategory.classList.remove('ribbon__item_active');
        }
        clickedCategory.classList.add('ribbon__item_active');
      }
    })
  }
}
