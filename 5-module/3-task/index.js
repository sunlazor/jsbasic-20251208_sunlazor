function initCarousel() {
  document.addEventListener('DOMContentLoaded', () => {
    document.querySelector('.carousel__arrow_left').style.visibility = 'hidden';
  })

  let carousel = document.querySelector('.carousel');
  var currentItem = currentItem === undefined ? 0 : currentItem;

  carousel.addEventListener('click', function(event) {
    let caroInner = carousel.querySelector('.carousel__inner');
    let shopItemsCount = caroInner.getElementsByClassName('carousel__slide').length;

    if (event.target.closest('.carousel__arrow_left')) {
      if (currentItem > 0) {
        currentItem = currentItem - 1 >= 0 ? currentItem - 1 : currentItem;
        caroInner.style.transform = `translateX(-${currentItem * 100}%)`;
      }
    } else if (event.target.closest('.carousel__arrow_right')) {
      if (currentItem < shopItemsCount) {
        currentItem = currentItem + 1 < shopItemsCount ? currentItem + 1 : currentItem;
        caroInner.style.transform = `translateX(-${currentItem * 100}%)`;
      }
    }

    if (currentItem === 0) {
      carousel.querySelector('.carousel__arrow_left').style.visibility = 'hidden';
    } else {
      carousel.querySelector('.carousel__arrow_left').style.visibility = 'visible';
    }

    if (currentItem < shopItemsCount - 1) {
      carousel.querySelector('.carousel__arrow_right').style.visibility = 'visible';
    } else {
      carousel.querySelector('.carousel__arrow_right').style.visibility = 'hidden';
    }
  })
}
