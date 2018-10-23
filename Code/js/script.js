//Gruppo Ferrari, Benigni, Arena

function getData() {
    // Store XMLHttpRequest and the JSON file location in variables
    var xhr = new XMLHttpRequest();
    var url = "http://annavalli2.ddns.net/solar_api/GetInverterRealtimeData.cgi?Scope=System";

    // Called whenever the readyState attribute changes 
    xhr.onreadystatechange = function () {

        // Check if fetch request is done
        if (xhr.readyState == 4 && xhr.status == 200) {
            // Parse the JSON string
            var jsonData = JSON.parse(xhr.responseText);
            createTable(jsonData);
            document.getElementById("timestamp").innerHTML = jsonData.Head.Timestamp;
        }
    };

    // Do the HTTP call using the url variable we specified above
    xhr.open("GET", url, true);
    xhr.send();
}

function createTable(json) {
    for (var data in json.Body.Data) {
        let table = document.createElement("table");
        var tblBody = document.createElement("tbody");
        for (var value in json.Body.Data[data].Values) {
            let row = document.createElement("tr");
            let cellIndex = document.createElement("td");
            let cellData = document.createElement("td");
            let cellUnit = document.createElement("td");
            cellIndex.appendChild(document.createTextNode(`${value} :`));
            cellData.appendChild(document.createTextNode(json.Body.Data[data].Values[value]));
            cellUnit.appendChild(document.createTextNode(json.Body.Data[data].Unit));
            row.appendChild(cellIndex);
            row.appendChild(cellData);
            row.appendChild(cellUnit);
            tblBody.appendChild(row);
        }
        table.appendChild(tblBody);
        document.getElementById(data).appendChild(table);
    }  
}
