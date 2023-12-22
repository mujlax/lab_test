"use strict";


/**
 * TODO:
 * 2. Удаление ненужных методов (функций)
 * 1. FIXME: Изменение названий переменных и методов
 * 3. FIXME: Переработка сортировки
 * 4. FIXME: SOLID (S) разбиение больший функций на более мелкие
 * 5.* FIXME: Избавиться от глобальных переменных
 * 6.** FIXME: Разделение бизнес-потребностей на файлы
*/

let rows = [];
let rowsDefault;

let sliceNumber = 5;
let pageNumber = 0;
let pageNumber2 = 5;

initRender("https://5ebbb8e5f2cfeb001697d05c.mockapi.io/users")

// INIT

async function initRender(url) {
    rowsDefault = await loadData(url);
    rows = [...rowsDefault];
    
    pageRender(0)
}

async function loadData(url) {
    const response = await fetch(url);
    return await response.json();
}

const btnsSort = document.getElementsByClassName("btn-sort")
for (let i = 0; i < btnsSort.length; i++) {
    btnsSort[i].addEventListener("click", function () {
        const currentActive = document.querySelector(".btn-sort_isActive");
        if (currentActive != null) {
            currentActive.classList.remove("btn-sort_isActive");
        }
        this.classList.add("btn-sort_isActive")
    })
};

function renderTable(rows) {
    const table = document.querySelector("table");
    const tableBody = table.querySelector("tbody");
    
    tableBody.innerHTML = "<tr></tr>";
    
    for (const row of rows) {
        const rowElement = document.createElement("tr");
        for (let key in row) {
            if (key == "id") 
                continue;
            
            const cellElement = prepareCell(document.createElement("td"), key, row);
            rowElement.appendChild(cellElement);
        }
        const btn = createDeleteButton(row.id);
        
        const cellDeleteButton = document.createElement("td");
        cellDeleteButton.appendChild(btn);
        rowElement.appendChild(cellDeleteButton);
        tableBody.appendChild(rowElement);
    }
}

function prepareCell(cell, key, row){
    if (key == "username") {
        cell.className = "table__username"
    }
    if (key == "registration_date") {
        cell.textContent = parseDate(row[key]);
    } else {
        cell.textContent = row[key];
    }
    return cell;
}

function parseDate(dateStr) {
    const formatter = new Intl.DateTimeFormat();
    return formatter.format(new Date(dateStr));
}

function createDeleteButton(id){
    const btn = document.createElement("button");
    btn.className = "btn-remove";
    btn.addEventListener('click', () => {
        deleteUser(id);
    })
    return btn
}

let isRegAsc = true;
function sortRegistration() {
    if (isRegAsc) {
        rows.sort((a, b) => new Date(a.registration_date) - new Date(b.registration_date));
    } else {
        rows.sort((a, b) => new Date(b.registration_date) - new Date(a.registration_date));
    }
    isRegAsc = !isRegAsc;
    renderTable(rows);
}

let isRatingAsc = true;
function sortRating() {
    if (isRatingAsc) {
        rows.sort((a, b) => a.rating - b.rating);
    } else {
        rows.sort((a, b) => b.rating - a.rating);
    }
    isRatingAsc = !isRatingAsc;
    renderTable(rows);
}


function searchUser(obj) {
    const newRows = rowsDefault.filter((el) =>
        el.email.toLowerCase().includes(obj.value.toLowerCase()) ||
        el.username.toLowerCase().includes(obj.value.toLowerCase())
    )
    renderTable(newRows);
}

function deleteUser(id) {
    const isDelete = confirm("Удалить челебоса?")
    if (isDelete) {
        rows = rows.filter((el) => el.id != id);
        rowsDefault = rowsDefault.filter((el) => el.id != id);
        renderTable(rows);
    } else {
        alert("Ну ок, не удаляем")
    }
}

function clearSearch() {
    document.querySelector(".search__input").value = "";
    renderTable(rows);
}


// PAGINATION

let step = 5;
let page = 0;
function setStep(value) {
    step = Number(value);
    pageRender(0)
}
function inc() {
    if (page * step + step < rowsDefault.length)
        page++;
    pageRender(page)
}

function dec() {
    if (page != 0)
        page--;
    pageRender(page)
}

function pageRender(pageNum) {
    let index = pageNum * step;
    rows = rowsDefault.slice(index, index + step);
    renderTable(rows);
}
