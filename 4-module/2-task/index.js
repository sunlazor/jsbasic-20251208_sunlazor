function makeDiagonalRed(table) {
  let i = 0;
  for (let row of table.rows) {
    row.cells[i].style.color = 'red';
    if (row.cells[i] !== undefined) {
      i++;
    }
  }
}
