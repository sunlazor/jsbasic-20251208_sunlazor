function isEmpty(obj) {
  let propertiesCounter = 0;
  for (let prop in obj) {
    propertiesCounter++;
  }

  return propertiesCounter === 0;
}
