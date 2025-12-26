function toggleText() {
  let btn = document.querySelector('.toggle-text-button');
  let txt = document.querySelector('#text');

  if (btn) {
    btn.addEventListener('click', () => txt.toggleAttribute('hidden'));
  }
}
