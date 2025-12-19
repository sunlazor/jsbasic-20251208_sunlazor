function filterRange(arr, a, b) {
  return arr.slice().filter(el => (el >= a && el <= b));
}
