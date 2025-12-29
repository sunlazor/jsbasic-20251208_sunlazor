function initCarousel() {
  document.querySelector('.carousel__arrow_left').style.display = 'none'

  let carousel = document.querySelector('.carousel');
  var currentItem = currentItem === undefined ? 0 : currentItem;

  carousel.addEventListener('click', function(event) {
    let caroInner = carousel.querySelector('.carousel__inner');
    let shopItemsCount = caroInner.getElementsByClassName('carousel__slide').length;

    if (event.target.closest('.carousel__arrow_left')) {
      if (currentItem > 0) {
        currentItem = currentItem - 1 >= 0 ? currentItem - 1 : currentItem;
        caroInner.style.transform = `translateX(-${currentItem * 500}px)`;
      }
    } else if (event.target.closest('.carousel__arrow_right')) {
      if (currentItem < shopItemsCount) {
        currentItem = currentItem + 1 < shopItemsCount ? currentItem + 1 : currentItem;
        caroInner.style.transform = `translateX(-${currentItem * 500}px)`;
      }
    }

    if (currentItem === 0) {
      carousel.querySelector('.carousel__arrow_left').style.display = 'none';
    } else {
      carousel.querySelector('.carousel__arrow_left').style.display = '';
    }

    if (currentItem < shopItemsCount - 1) {
      carousel.querySelector('.carousel__arrow_right').style.display = '';
    } else {
      carousel.querySelector('.carousel__arrow_right').style.display = 'none';
    }
  })
}
