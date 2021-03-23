//define administrators
var admins = ["max.rivett@ucc.on.ca", "lbuttery@ucc.on.ca"];


const logged_in_links = document.querySelectorAll('.logged-in');
const admin_links = document.querySelectorAll('.admin-link');


const setupUI = (googleUser) => {
    //takes the end of the user's email
    var email = googleUser.getBasicProfile().getEmail();
    var emailEnd = email.substring(email.length - 10, email.length);
    var flag = 0;
    //if the user's email doesn't end with @ucc.on.ca then they can't view the profile page
    if (googleUser && emailEnd == '@ucc.on.ca') {
        logged_in_links.forEach(item => item.style.display = 'block');
    } else {
        logged_in_links.forEach(item => item.style.display = 'none');
    }

    //checks if admin, shows tab in navbar if so
    for (var i = 0; i < admins.length; i++) {
        if (email == admins[i]) {
            admin_links.forEach(item => item.style.display = 'block');
            flag++;
        }
    }
    if (flag == 0) {
        admin_links.forEach(item => item.style.display = 'none');
    }
}

