function highlight(table) {
  // <td>Name</td>
  // <td>Age</td>
  // <td>Gender</td>
  // <td>Status</td>

  let tableBody = table.tBodies[0];
  for (let row of tableBody.rows) {
    changeDisplayStyleByAvailability(row);
    changeClassByGender(row);
    aPinchOfAgeism(row);
  }
}

function aPinchOfAgeism(row) {
  let cells = row.cells;
  if (parseInt(cells[1].textContent) < 18) {
    row.style.textDecoration = 'line-through';
  }
}

function changeClassByGender(row) {
  let cells = row.cells;
  if (cells[2].textContent === 'f') {
    row.classList.add('female');
  } else if (cells[2].textContent === 'm') {
    row.classList.add('male');
  }
}

function changeDisplayStyleByAvailability(row) {
  let cells = row.cells;
  switch (cells[3].dataset.available) {
    case 'true':
      row.classList.add('available');
      break;
    case 'false':
      row.classList.add('unavailable');
      break;
    default:
      row.setAttribute('hidden', true);
  }
}
