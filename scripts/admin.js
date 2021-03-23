window.onload = function makeTable() {
    // create an html table object
    table = document.createElement("table"),
    row = table.insertRow();
  
    row.insertCell().innerHTML = "Name";
    row.insertCell().innerHTML = "Year";
    row.insertCell().innerHTML = "Exercise";
    row.insertCell().innerHTML = "Weight";
    row.insertCell().innerHTML = "Date";
    row.insertCell().innerHTML = "Delete?";
    row = table.insertRow();


    var records = new Array();

    db.collection('records').get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            var newRecord = doc.data();
            newRecord.id = doc.id;
            records.push(newRecord);
        });

            // loop through records
            for (var i = 0; i < records.length; i++) {
            // add cells
            var cell1 = row.insertCell();
            var cell2 = row.insertCell();
            var cell3 = row.insertCell();
            var cell4 = row.insertCell();
            var cell5 = row.insertCell();
            var cell6 = row.insertCell();
            cell1.innerHTML = records[i].name;
            cell2.innerHTML = records[i].year;
            cell3.innerHTML = records[i].exercise;
            cell4.innerHTML = records[i].weight;
            cell5.innerHTML = records[i].date;

            var btn = document.createElement("BUTTON");
            btn.setAttribute("id",records[i].id);
            btn.setAttribute("onclick","deleteRecord(id);");
            btn.setAttribute("class", "btn btn-danger");
            console.log(btn.id);
            var txt = document.createTextNode("Delete!");
            btn.appendChild(txt);
            cell6.appendChild(btn); 
            
            row.setAttribute("id", records[i].id + "1");
            row = table.insertRow();
        
        }
    });
    //wipes the div of any previous table
    document.getElementById("records-table").innerHTML = "";
    // append the table to the div dummy tag
    document.getElementById("records-table").appendChild(table);

}

function deleteRecord(btn_id) {

    db.collection("records").doc(btn_id).delete().then(() => {
        console.log("Document successfully deleted!");
    }).catch((error) => {
        console.error("Error removing document: ", error);
    });

    document.getElementById(btn_id+"1").remove();

}