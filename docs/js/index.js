


//
let rows;

function renderTable (rows) {
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
    rows = await response.json();

    
    //Clear

    tableBody.innerHTML = "<tr></tr>";

    //Populate     

    // for (const row of rows) {
    //     const rowElement = document.createElement("tr");

    //     for (let key in row) {
    //         if (key == "id") {
    //             continue
    //         }
    //         const cellElement = document.createElement("td");

    //         if (key == "registration_date") {
    //             const t = new Intl.DateTimeFormat()
    //             cellElement.textContent = t.format(new Date(row[key]));
    //         } else {
    //             cellElement.textContent = row[key];
    //         } 

    //         rowElement.appendChild(cellElement);
    //     }
    //     const cellRemoveIcon = document.createElement("td");
    //     const btn = document.createElement("button");
    //     btn.className = "btn-remove";
    //     cellRemoveIcon.appendChild(btn);
    //     rowElement.appendChild(cellRemoveIcon);
    //     tableBody.appendChild(rowElement);
    // }

    //renderTable(rows)
}

async function loadData (url) {
    const response = await fetch(url);
    return await response.json();
}

function sortTest(value) {
    
    switch (value) {
        case "registration": 
            rows.sort((a, b) => a.rating - b.rating);
            console.log("Reg");
            break;
        case "rating": 
            rows.sort((a, b) => a.rating - b.rating);
            console.log("Rat");
            break;
        default: console.log("Poh");
    }
    renderTable(rows);
    

}


loadIntoTable("https://5ebbb8e5f2cfeb001697d05c.mockapi.io/users", document.querySelector("table"))

function test3 (str) {
    
}

console.log(rows);
//document.querySelector("table").innerHTML = "<tr></tr>"