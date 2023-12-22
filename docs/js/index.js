"use strict";


/**
 * TODO:
 * 1. Изменение названий переменных и методов
 * 2. Удаление ненужных методов (функций)
 * 3. Переработка сортировки
 * 4. SOLID (S) разбиение больший функций на более мелкие
 * 5.* Избавиться от глобальных переменных
 * 6.** Разделение бизнес-потребностей на файлы
 */

let rows = [];
let rowsDefault;

let sliceNumber = 5;
let pageNumber = 0;
let pageNumber2 = 5;

function pagination(value) {
    rows = rowsDefault.slice(pageNumber, pageNumber2);
    renderTable(rows);
    if (value == "left") {
        pageNumber -= sliceNumber;
        pageNumber2 -= sliceNumber;
        renderTable(rows);
        return
    }
    pageNumber += sliceNumber;
    pageNumber2 += sliceNumber;
    renderTable(rows);
}

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


function renderTable(rows) {
    const table = document.querySelector("table");
    const tableBody = table.querySelector("tbody");

    tableBody.innerHTML = "<tr></tr>";

    for (const row of rows) {
        
        for (let key in row) {
            if (key == "id") continue;
            
            const cellElement = document.createElement("td");
            if (key == "username") {
                cellElement.className = "table__username"
            }
            
            if (key == "registration_date") {
                const t = new Intl.DateTimeFormat()
                cellElement.textContent = t.format(new Date(row[key]));
            } else {
                cellElement.textContent = row[key];
            }
            const rowElement = document.createElement("tr");
            rowElement.appendChild(cellElement);
        }

        const btn = document.createElement("button");
        btn.className = "btn-remove";
        btn.addEventListener('click', (event) => {
            deleteUser(row.id);
        })

        const cellRemoveIcon = document.createElement("td");
        cellRemoveIcon.appendChild(btn);
        rowElement.appendChild(cellRemoveIcon);
        tableBody.appendChild(rowElement);
    }
}

loadIntoTable(
    "https://5ebbb8e5f2cfeb001697d05c.mockapi.io/users",
    document.querySelector("table")
    )

async function loadIntoTable(url, table) {
    const tableBody = table.querySelector("tbody");
    const response = await fetch(url);
    rowsDefault = await response.json();
    rows = [...rowsDefault];

    //Clear
    tableBody.innerHTML = "<tr></tr>";

    pageRender(0)
}

async function loadData(url) {
    const response = await fetch(url);
    return await response.json();
}


function sortRegistration(obj) {
    if (obj.value == 'default') {
        rows.sort((a, b) => 
        new Date(a.registration_date) - new Date(b.registration_date));
        obj.value = "sortAsc";
    } else if (obj.value == 'sortAsc') {
        rows.sort((a, b) => 
        new Date(b.registration_date) - new Date(a.registration_date));
        obj.value = "sortDesc";
    } else if (obj.value == 'sortDesc') {
        rows = rowsDefault;
        obj.value = "default";
    }
    renderTable(rows);
}

function sortRating(obj) {
    console.log("Asdasd");
    let value = obj.getAttribute("value");
    if (value == 'default') {
        rows = [...rowsDefault];
        obj.setAttribute("value", "sortAsc");
    } else if (value == 'sortAsc') {
        rows.sort((a, b) => a.rating - b.rating);
        obj.setAttribute("value", "sortDesc");
    } else if (value == 'sortDesc') {
        rows.sort((a, b) => b.rating - a.rating);
        obj.setAttribute("value", "default");
    }
    renderTable(rows);
}



function searchUser(obj) {
    const newRows = rowsDefault.filter((el) =>
        el.email.toLowerCase().includes(obj.value.toLowerCase()) 
        || 
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

// INIT

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


