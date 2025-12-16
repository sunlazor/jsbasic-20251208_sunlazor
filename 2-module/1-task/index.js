function sumSalary(salaries) {
  let total = 0;
  for (let employee in salaries) {
    if (typeof salaries[employee] === 'number' && Number.isFinite(salaries[employee])) {
      total += salaries[employee];
    }
  }

  return total;
}
