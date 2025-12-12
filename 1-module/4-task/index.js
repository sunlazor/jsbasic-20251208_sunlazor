function checkSpam(str) {
  // возвращающую true, если str содержит '1xBet' или 'XXX'
  let lstr = str.toLowerCase();

  return lstr.includes('1xbet') || lstr.includes('xxx');
}
