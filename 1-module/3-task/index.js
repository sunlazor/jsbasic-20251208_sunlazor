function ucFirst(str) {
  let len = str.length;

  if (len === 0) return '';

  let newStr = str[0].toUpperCase();
  if (len >= 2) {
    newStr = newStr + str.slice(1);
  }

  return newStr;
}
