function initCarousel() {
  let carousel = document.querySelector('.carousel');
  // let caroArrLeft = document.getElementsByClassName('carousel__arrow_left');
  // let caroArrRight = document.getElementsByClassName('carousel__arrow_right');
  var currentItem = currentItem === undefined ? 0 : currentItem;

  carousel.addEventListener('click', function(event) {
    let caroInner = carousel.querySelector('.carousel__inner');

    // console.log(caroInner);
    // console.log(event.target);
    let shopItemsCount = caroInner.getElementsByClassName('carousel__slide').length;
    let translateWidth = carousel.offsetWidth;
    // console.log(shopItemsCount);
    // console.log(translateWidth);
    // if (event.target.classList.contains('carousel__arrow_left')) {

    if (event.target.closest('.carousel__arrow_left')) {
      console.log('clicked left');
      console.log('ct before', currentItem);
      if (currentItem > 0) {
        // caroInner.style.transform = `translateX(-${translateWidth * currentItem}px)`;
        currentItem = currentItem - 1 >= 0 ? currentItem - 1 : currentItem;
        caroInner.style.transform = `translateX(-${currentItem * 100}%)`;
        // caroInner.style.transform = 'translateX(100%)';

        // console.log('translated ' + `translateX(-${translateWidth * currentItem}px)`);
        console.log('translated 100% ' + carousel.offsetWidth);
      }
      console.log('ct after', currentItem);
    } else if (event.target.closest('.carousel__arrow_right')) {
      console.log('clicked right');
      console.log('ct before', currentItem);
      if (currentItem < shopItemsCount) {
        // caroInner.style.transform = `translateX(${translateWidth * currentItem}px)`;
        // caroInner.style.transform = 'translateX(100%)';
        // caroInner.style.transform = `translateX(${(shopItemsCount - currentItem - shopItemsCount) * 100}%)`;
        // caroInner.style.transform = `translateX(-100%)`;
        currentItem = currentItem + 1 < shopItemsCount ? currentItem + 1 : currentItem;
        caroInner.style.transform = `translateX(-${currentItem * 100}%)`;

        // console.log('translated ' + `translateX(${translateWidth * currentItem}px)`)
        console.log('translated -100% ' + carousel.offsetWidth);
      }
      console.log('ct after', currentItem);
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
    // console.log(`translateX(-${translateWidth * currentItem}px)`);
  })
}
