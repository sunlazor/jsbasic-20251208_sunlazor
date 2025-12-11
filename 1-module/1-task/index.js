function factorial(n) {
  switch (n) {
    case 0:
      return 1;
    case 1:
      return 1;
    default:
      let result = 1;
      while(n >= 2) {
        result *= n;
        n--;
      }
      return result;
  }
}
