// Initialize your app
var myApp = new Framework7({
});

// Export selectors engine
var $$ = Dom7;

// Add view
var mainView = myApp.addView('.view-main', {
    // Because we use fixed-through navbar we can enable dynamic navbar
    dynamicNavbar: true
});



$$('.login-screen .button-round').on('click', function () {
    var uname = $$('.login-screen input[name="username"]').val();
    var pwd = $$('.login-screen input[name="password"]').val();
    myApp.alert('Username: ' + uname + ', Password: ' + pwd, function () {
        myApp.closeModal('.login-screen');
    });
});

