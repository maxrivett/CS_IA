
//creating the leaderboard
var benchArr = new Array();
var deadliftArr = new Array();
var squatArr = new Array();
var dummyArr = new Array();

// db.collection('records').get().then((querySnapshot) => {
//     querySnapshot.forEach((doc) => {
//         if (doc.data()['exercise'] == "Bench Press") {
//             benchArr.push(doc.data());
//         } else if (doc.data()['exercise'] == "Deadlift") {
//             deadliftArr.push(doc.data());
//         } else if (doc.data()['exercise'] == "Squat") {
//             squatArr.push(doc.data());
//         } else {
//           console.log("Failed to retrieve records from database.");
//         }
//     });
// });

db.collection('records').get().then((querySnapshot) => {
  querySnapshot.forEach((doc) => {
    // switch case for pushing records to arrays
    switch (doc.data()['exercise']) {
      //if doc.data()['exercise'] == "Bench Press", essentially.
      case "Bench Press":
        //push the doc data into the bench press array
        benchArr.push(doc.data());
        //break out of the switch case
        break;
      case "Deadlift":
        deadliftArr.push(doc.data());
        break;
      case "Squat":
        squatArr.push(doc.data());
        break;
      default: //will happen if none of the case breaks occur
        console.log("Failed to retrieve records from database.");
    }
  });
});

//sort collection by weight
function weightSort(list) {
  // The main loop to iterate over the whole list
  for (var i = list.length -1; i >= 0; i--){
    // Child loop to make iterate all over and over and compare by pairs
    for(var j = 1; j <= i; j++){
        // If the current is larger than next, they'll change positions
        if(list[j-1].weight < list[j].weight) {
            var aux = list[j-1];
            list[j-1] = list[j];
            list[j] = aux;
         }
    }
 }
 return list;
}

function nameSort(list) {
  // The main loop to iterate over the whole list
  for (var i = list.length -1; i >= 0; i--){
    // Child loop to make iterate all over and over and compare by pairs
    for(var j = 1; j <= i; j++){
        // If the current item is *smaller* than the next, they will change positions
        if(list[j-1].name > list[j].name) {
            var aux = list[j-1];
            list[j-1] = list[j];
            list[j] = aux;
         }
    }
 }
 return list;
}

function yearSort(list) {
  // The main loop to iterate over the whole list
  for (var i = list.length -1; i >= 0; i--){
    // Child loop to make iterate all over and over and compare by pairs
    for(var j = 1; j <= i; j++){
        // If the current item is *smaller* than the next, they will change positions
        if(list[j-1].year > list[j].year) {
            var aux = list[j-1];
            list[j-1] = list[j];
            list[j] = aux;
         }
    }
 }
 return list;
}

//creating the table
const createTable = document.querySelector('#create-table');
createTable.addEventListener('submit', (e) => {
  e.preventDefault(); 

//checks if the user chose squat on dropdown
  if (createTable['exercises'].value == 'squat') {
    dummyArr = squatArr;
    if (createTable['sortable'].value == 'weight') {
      console.log("squat weight");
      makeTable(weightSort(dummyArr));
    }
    if (createTable['sortable'].value == 'name') {
      console.log("squat name");
      makeTable(nameSort(dummyArr));
    }
    if (createTable['sortable'].value == 'year-level') {
      console.log("squat year");
      makeTable(yearSort(dummyArr));
    }
  }

//checks if the user chose bench on dropdown
  if (createTable['exercises'].value == 'bench-press') {
    dummyArr = benchArr;
    if (createTable['sortable'].value == 'weight') {
      console.log("bench weight");
      makeTable(weightSort(dummyArr));
    }
    if (createTable['sortable'].value == 'name') {
      console.log("bench name");
      makeTable(nameSort(dummyArr));
    }
    if (createTable['sortable'].value == 'year-level') {
      console.log("bench year");
      makeTable(yearSort(dummyArr));
    }
  }

//checks if the user chose deadlift on dropdown
  if (createTable['exercises'].value == 'deadlift') {
    dummyArr = deadliftArr;
    if (createTable['sortable'].value == 'weight') {
      console.log("dead weight");
      makeTable(weightSort(dummyArr));
    }
    if (createTable['sortable'].value == 'name') {
      console.log("dead name");
      makeTable(nameSort(dummyArr));
    }
    if (createTable['sortable'].value == 'year-level') {
      console.log("dead year");
      makeTable(yearSort(dummyArr));
    }
  }

});

function makeTable(list) {
  
    // create an html table object
    table = document.createElement("table"),
    row = table.insertRow();
    // table.style.backgroundColor = '#3399ff';
    // table.style.text = 'red';
    

    
  
    row.insertCell().innerHTML = "Name";
    row.insertCell().innerHTML = "Year";
    row.insertCell().innerHTML = "Exercise";
    row.insertCell().innerHTML = "Weight";
    row.insertCell().innerHTML = "Date";
    row = table.insertRow();

    // loop through records
    for (var i = 0; i < list.length; i++) {
      // add cells
      var cell1 = row.insertCell();
      var cell2 = row.insertCell();
      var cell3 = row.insertCell();
      var cell4 = row.insertCell();
      var cell5 = row.insertCell();
      cell1.innerHTML = list[i].name;
      cell2.innerHTML = list[i].year;
      cell3.innerHTML = list[i].exercise;
      cell4.innerHTML = list[i].weight;
      cell5.innerHTML = list[i].date;
  
      row = table.insertRow();
    }
  
    //wipes the div of any previous table
    document.getElementById("table123").innerHTML = "";
    // append the table to the div dummy tag
    document.getElementById("table123").appendChild(table);

}