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
        console.log(pageNumber);
        return
    }
    console.log(value);
    pageNumber += sliceNumber;
    pageNumber2 += sliceNumber;
    console.log(pageNumber);
    renderTable(rows);
}

let step = 5;
let page = 0;
function setStep(value) {
    step = Number(value);
    pageRender(0)
    //console.log(pag);
}
function inc(){
    if (page*step+step < rowsDefault.length)
        page++;
    pageRender(page)
}

function dec(){
    if (page != 0)
        page--;
    pageRender(page)
}

function pageRender(pageNum){
    let index = pageNum*step;
    rows = rowsDefault.slice(index, index+step);
    console.log({page, step, index, rows})
    renderTable(rows);
}


function renderTable(rows) {
    const table = document.querySelector("table");
    const tableHead = table.querySelector("thead");
    const tableBody = table.querySelector("tbody");

    tableBody.innerHTML = "<tr></tr>";
    const counter = document.createElement("h1");
    counter.textContent = rows.length;
    tableBody.appendChild(counter);
    for (const row of rows) {
        const rowElement = document.createElement("tr");

        for (let key in row) {
            if (key == "id") {
                continue
            }
            const cellElement = document.createElement("td");

            if (key == "registration_date") {
                const t = new Intl.DateTimeFormat()
                cellElement.textContent = t.format(new Date(row[key]));
            } else {
                cellElement.textContent = row[key];
            }

            if (key == "username") {
                cellElement.className = "table__username"
            }
            
            rowElement.appendChild(cellElement);
        }
        
        const cellRemoveIcon = document.createElement("td");
        const btn = document.createElement("button");
        btn.className = "btn-remove";
        btn.addEventListener('click', (event) => {
            deleteUser(row.id);
        })
        cellRemoveIcon.appendChild(btn);
        rowElement.appendChild(cellRemoveIcon);
        tableBody.appendChild(rowElement);
    }
}

async function loadIntoTable(url, table) {
    const tableHead = table.querySelector("thead");
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
        rows.sort((a, b) => new Date(a.registration_date) - new Date(b.registration_date));
        obj.value = "sortAsc";
    } else if (obj.value == 'sortAsc') {
        rows.sort((a, b) => new Date(b.registration_date) - new Date(a.registration_date));
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


loadIntoTable("https://5ebbb8e5f2cfeb001697d05c.mockapi.io/users", document.querySelector("table"))

function test3(str) {

}

function searchUser(obj) {
    // поиск по email или имени
    const newRows = rowsDefault.filter((el) => 
        // поиск по email 
        el.email.toLowerCase().includes(obj.value.toLowerCase()) || el.username.toLowerCase().includes(obj.value.toLowerCase())
    )
    renderTable(newRows);
    console.log(obj.value);
}

function deleteUser(id) {
    let isDelete = confirm("ТЫ РИЛ ХОЧЕШЬ УДАЛИТЬ ЧЕЛА???")
    if (isDelete){
        rows = rows.filter((el) => el.id != id); 
        rowsDefault = rowsDefault.filter((el) => el.id != id); 
        console.log(rows);
        renderTable(rows);
    } else {
        alert("Ну ок, не удаляем")
    }
    // поиск по email или имени
    // const newRows = rows.filter((el) => 
    //     el.email.toLowerCase().includes(obj.value.toLowerCase()) || el.username.toLowerCase().includes(obj.value.toLowerCase())
    // )
    //renderTable(newRows);
    console.log(id);
}

function remove() {
    document.querySelector(".search__input").value = "";
    renderTable(rows);
}

console.log(rows);
//document.querySelector("table").innerHTML = "<tr></tr>"

