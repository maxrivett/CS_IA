//get the user's name, email, year level
var userName = "";
var userEmail = "";
var yearLevel = "";
//shows all the features after user signin
//runs when the user SIGNS IN using google
function onSignIn(googleUser) {
    var profile = googleUser.getBasicProfile();
    userName = profile.getName();
    userEmail = profile.getEmail();
    //checks if user is on the profile page before adding elements
    if (window.location.href.includes("profile")) {

        //finds the user's year to print within div
        db.collection('useryear').get().then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                if (doc.data()['email'] == userEmail) {
                    yearLevel = doc.data()['yearlevel'];
                    document.querySelector('#year123').innerText = "Year Level: " + yearLevel;
                }
            });
        });

        
        db.collection('records').get().then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                //finds user squat record and prints it
                if (doc.data()['email'] == userEmail && doc.data()['exercise'] == "Squat") {
                    document.querySelector('#squat123').innerText = "Personal Record: " + doc.data()['weight'] + " pounds.";
                }
                //finds user deadlift record and prints it
                if (doc.data()['email'] == userEmail && doc.data()['exercise'] == "Deadlift") {
                    document.querySelector('#deadlift123').innerText = "Personal Record: " + doc.data()['weight'] + " pounds.";
                }
                //finds user bench record and prints it
                if (doc.data()['email'] == userEmail && doc.data()['exercise'] == "Bench Press") {
                    document.querySelector('#bench123').innerText = "Personal Record: " + doc.data()['weight'] + " pounds.";
                }
            });
        });
    
        var element = document.querySelector('#img123')
        var image = document.createElement('img')
        image.setAttribute('src', profile.getImageUrl());
        image.setAttribute('width', 170);
        image.setAttribute('height', 170);
        //wipe the element so that the image doesn't get printed twice upon re-signin
        element.innerHTML = "";
        element.append(image);

        document.querySelector('#name123').innerText = 
            profile.getName();
        document.querySelector('#email123').innerText = 
            profile.getEmail();
        
    }
// Calls the function to setup the UI
    setupUI(googleUser);

}

// gets the current date in the form of (M)M/DD/YY
var today = new Date();
var year = today.getFullYear() + "";
var subyear = year.substring(2,4);
var currentDate = (today.getMonth()+1)+'-'+today.getDate() + '-' + subyear;
console.log(currentDate);

//flag for squat
var flagSquat = 0;
//add record from profile page SQUAT
const addSquat = document.querySelector('#add-squat');
addSquat.addEventListener('submit', (e) => {
    e.preventDefault(); 
    //checks database to see if user already has a document
    db.collection('records').get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            if (doc.data()['email'] == userEmail && doc.data()['exercise'] == "Squat") {
                //if they have a doc already, flag and update it to what they inputted
                flagSquat += 1; //flag comes before the .then() in the next line
                db.collection('records').doc(doc.id).update({weight: addSquat['title'].value}).then(() => {
                    addSquat.reset();
                });
            } 
        });
        //if flag is equal to 0, the user doesn't have a doc in the db yet
        //will then add a doc to the database
        if (flagSquat == 0) {

            db.collection('records').add({
                exercise: "Squat",
                weight: addSquat['title'].value,
                name: userName,
                year: yearLevel,
                date: currentDate,
                email: userEmail
            }).then(() => {
                addSquat.reset();
            });
        }
    });
});

//flag for deadlift
var flagDeadlift = 0;
//add record from profile page DEADLIFT
const addDeadlift = document.querySelector('#add-deadlift');
addDeadlift.addEventListener('submit', (e) => {
    e.preventDefault(); 

    //checks database to see if user already has a document
    db.collection('records').get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            if (doc.data()['email'] == userEmail && doc.data()['exercise'] == "Deadlift") {
                //if they have a doc already, flag and update it to what they inputted
                flagDeadlift += 1; //flag comes before the .then() in the next line
                db.collection('records').doc(doc.id).update({weight: addDeadlift['title'].value}).then(() => {
                    addDeadlift.reset();
                });
            } 
        });
        //if flag is equal to 0, the user doesn't have a doc in the db yet
        //will then add a doc to the database
        if (flagDeadlift == 0) {

        db.collection('records').add({

            exercise: "Deadlift",
            weight: addDeadlift['title'].value,
            name: userName,
            year: yearLevel,
            date: currentDate,
            email: userEmail

        }).then(() => {
            addDeadlift.reset();
        })
    }
});

})
 
//flag for bench press
var flagBench = 0;
//add record from profile page BENCH
const addBench = document.querySelector('#add-bench');
addBench.addEventListener('submit', (e) => {
    e.preventDefault(); 

    //checks database to see if user already has a document
    db.collection('records').get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            if (doc.data()['email'] == userEmail && doc.data()['exercise'] == "Bench Press") {
                //if they have a doc already, flag and update it to what they inputted
                flagBench += 1; //flag comes before the .then() in the next line
                db.collection('records').doc(doc.id).update({weight: addBench['title'].value}).then(() => {
                    addBench.reset();
                });
            } 
        });
        //if flag is equal to 0, the user doesn't have a doc in the db yet
        //will then add a doc to the database
    if (flagBench == 0) {

        db.collection('records').add({

            exercise: "Bench Press",
            weight: addBench['title'].value,
            name: userName,
            year: yearLevel,
            date: currentDate,
            email: userEmail

        }).then(() => {
            addBench.reset();
        })
    }
});

})
//will be useful later
var flag = 0;
//user adds/changes year level
const changeYear = document.querySelector('#add-year');
changeYear.addEventListener('submit', (e) => {
    e.preventDefault(); 

    //checks database to see if user already has a document
    db.collection('useryear').get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            console.log(doc.data()['email']);
            if (doc.data()['email'] == userEmail) {
                //if they have a doc already, flag and update it to what they inputted
                flag += 1; //flag comes before the .then() in the next line
                db.collection('useryear').doc(doc.id).update({yearlevel: changeYear['title'].value}).then(() => {
                    changeYear.reset();
                    
                });
            } 
        });
        //if flag is equal to 0, the user doesn't have a doc in the db yet
        //will then add a doc to the database
        if (flag == 0) {
            db.collection('useryear').add({
    
                email: userEmail,
                yearlevel: changeYear['title'].value
    
            }).then(() => {
                changeYear.reset();
            })
        }
    });
    
    console.log(flag);
    console.log(userEmail);
})


//Runs when the user SIGNS OUT using the sign out button
function signOut() {
    gapi.auth2.getAuthInstance().signOut().then(function() {
        console.log('user signed out...')
        //sends user back to about page after they sign out.
        if (window.location.href.includes("profile")) {
            window.location.href = 'http://localhost:8000/index.html';
        }
    });
    setupUI();
}