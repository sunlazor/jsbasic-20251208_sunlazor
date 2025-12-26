function hideSelf() {
  let btn = document.body.querySelector('.hide-self-button');

  if (btn) {
    btn.addEventListener(
      'click',
      function ({ currentTarget }) {
        currentTarget.toggleAttribute('hidden');
        setTimeout(() => currentTarget.toggleAttribute('hidden'), 1000);
      }
    );
  }
}
