/**
 * Компонент, который реализует таблицу
 * с возможностью удаления строк
 *
 * Пример одного элемента, описывающего строку таблицы
 *
 *      {
 *          name: 'Ilia',
 *          age: 25,
 *          salary: '1000',
 *          city: 'Petrozavodsk'
 *      }
 *
 */
export default class UserTable {
  elem;

  constructor(rows) {
    let table = document.createElement('table');
    let thead = table.createTHead();
    this.#makeHeadRow(thead);
    this.#addDataToTable(rows, table);

    this.elem = table;
  }

  #makeHeadRow(thead) {
    let hrow = thead.insertRow();
    let th = document.createElement('TH');
    th.textContent = 'Имя';
    hrow.appendChild(th);
    th = document.createElement('TH');
    th.textContent = 'Возраст';
    hrow.appendChild(th);
    th = document.createElement('TH');
    th.textContent = 'Зарплата';
    hrow.appendChild(th);
    th = document.createElement('TH');
    th.textContent = 'Возраст';
    hrow.appendChild(th);
    let bb = document.createElement('TH');
    bb.textContent = 'Попрощаться';
    hrow.appendChild(bb);
  }

  #addDataToTable(rows, table) {
    rows.forEach(function (record) {
      let trow = table.insertRow();
      trow.addEventListener('click', function (ev) {
        ev.target.closest('tr').remove()
      });
      trow.insertCell().textContent = record.name;
      trow.insertCell().textContent = record.age;
      trow.insertCell().textContent = record.salary;
      trow.insertCell().textContent = record.city;
      let bb = trow.insertCell();
      let button = document.createElement('BUTTON');
      button.textContent = '×';
      bb.appendChild(button);
    })
  }
}
