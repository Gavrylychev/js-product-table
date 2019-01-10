require('file-loader?name=[name].[ext]!./index.html');
import './css/style.css';

let SHOW_LOADER = false;
let loader = document.getElementById('loader');
let tbodyRef = document.getElementById('product-table').getElementsByTagName('tbody')[0];
let idHeader = document.getElementById('id');
let priceHeader = document.getElementById('price');
let titleHeader = document.getElementById('title');
let colorHeader = document.getElementById('color');
let departmentHeader = document.getElementById('department');
idHeader.addEventListener('click', () => sortDataBy('id'));
priceHeader.addEventListener('click', () => sortDataBy('price'));
titleHeader.addEventListener('click', () => sortDataBy('title'));
colorHeader.addEventListener('click', () => sortDataBy('color'));
departmentHeader.addEventListener('click', () => sortDataBy('department'));
let visibleData;
let fullData;
let clickCounter;
let asc = true;

fetch('./db.json')
  .then(response => {
    SHOW_LOADER = true;
    checkLoader()
    return response.json();
  })
  .then(data => {
    fullData = data;  
    setTimeout(() => handleData(data), 500)
    })
  .catch(error => console.log('parsing failed', error))

function checkLoader() {
  if (!SHOW_LOADER) {
    loader.style.display = 'none';
  } else {
    loader.style.display = 'table-row';
  }
}

function handleData(data) {
  SHOW_LOADER = false;
  checkLoader();
  tbodyRef.innerHTML = ''
  visibleData = data.slice(0, 20)
  visibleData.forEach((el) => {
    let newRow = tbodyRef.insertRow(tbodyRef.rows.length);

    let idCell = newRow.insertCell(newRow.cells.length);
    let id = document.createTextNode(el.id);
    idCell.appendChild(id);

    let titleCell = newRow.insertCell(newRow.cells.length);
    let title = document.createTextNode(el.title);
    titleCell.appendChild(title)

    let priceCell = newRow.insertCell(newRow.cells.length);
    let price = document.createTextNode(el.price);
    priceCell.appendChild(price)

    let colorCell = newRow.insertCell(newRow.cells.length);
    let color = document.createTextNode(el.color);
    colorCell.appendChild(color)

    let departmentCell = newRow.insertCell(newRow.cells.length);
    let department = document.createTextNode(el.department);
    departmentCell.appendChild(department)
  }) 
}

function sortDataBy(handler) {
    if(clickCounter < 2){
        clickCounter++;
        if (asc) {    
            visibleData = visibleData.sort((a, b) => b[handler] - a[handler]);
            handleData(visibleData);
            asc = false;
          } else {
            visibleData = visibleData.sort((a, b) => a[handler] - b[handler]);
            handleData(visibleData);
            asc = true;
          }
    } else {
        handleData(fullData.slice(0, 20));
        clickCounter = 0;
    }
}