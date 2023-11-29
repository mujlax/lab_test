let rows;
let rowsDefault;

function renderTable(rows) {
    const table = document.querySelector("table");
    const tableHead = table.querySelector("thead");
    const tableBody = table.querySelector("tbody");

    tableBody.innerHTML = "<tr></tr>";

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
            rowElement.appendChild(cellElement);
        }
        const cellRemoveIcon = document.createElement("td");
        const btn = document.createElement("button");
        btn.className = "btn-remove";
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

    renderTable(rows)
}

async function loadData(url) {
    const response = await fetch(url);
    return await response.json();
}

// function sortRegistration(obj) {

// case "registration": 
//             rows.sort((a, b) => new Date(a.registration_date) - new Date(b.registration_date));
//             console.log("Reg");
//             break;
//         case "rating": 
//             rows.sort((a, b) => a.rating - b.rating);
//             console.log("Rat");
//             obj.value = "test";
//             break;
//         default: console.log("Poh");

//     renderTable(rows);
// }

function sortRegistration(obj) {
    if (obj.value == 'default') {
        rows.sort((a, b) => new Date(a.registration_date) - new Date(b.registration_date) ? 1 : -1);
        obj.value = "sortAsc";
    } else if (obj.value == 'sortAsc') {
        rows.sort((a, b) => new Date(b.registration_date) - new Date(a.registration_date) ? -1 : 1);
        obj.value = "sortDesc";
    } else if (obj.value == 'sortDesc') {
        rows = rowsDefault;
        obj.value = "default";
    }
    console.log(obj.value);
    renderTable(rows);
}

function sortRating(obj) {
    if (obj.value == 'default') {
        rows.sort((a, b) => a.rating - b.rating);
        obj.value = "sortAsc";
    } else if (obj.value == 'sortAsc') {
        rows.sort((a, b) => b.rating - a.rating);
        obj.value = "sortDesc";
    } else if (obj.value == 'sortDesc') {
        rows = rowsDefault;
        obj.value = "default";
    }
    console.log(obj.value);
    renderTable(rows);
}


loadIntoTable("https://5ebbb8e5f2cfeb001697d05c.mockapi.io/users", document.querySelector("table"))

function test3(str) {

}

console.log(rows);
//document.querySelector("table").innerHTML = "<tr></tr>"