function camelize(str) {
  if(str === '') return '';

  return str
    .split('-')
    .reduce((resStr, word, index) => {
      return resStr += index > 0 ? word[0].toUpperCase() + word.slice(1) : word;
    });
}
