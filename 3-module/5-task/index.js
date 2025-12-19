function getMinMax(str) {
  return str
    .split(' ')
    .map(item => parseFloat(item))
    .filter(item => !Number.isNaN(item))
    .reduce((res, item) => {
      res.min = res.min === undefined ? item : Math.min(res.min, item);
      res.max = res.max === undefined ? item : Math.max(res.max, item);
      return res;
    }, {})
  ;
}
