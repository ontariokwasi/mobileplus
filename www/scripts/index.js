var myApp = new Framework7({
    pushState: true,
    material: true,
    materialRipple:true
});
var $$ = Dom7;
var mainView = myApp.addView('.view-main', {

    dynamicNavbar: true
});




(function () {
    "use strict";
   

    document.addEventListener('deviceready', onDeviceReady.bind(this), false);
   

    function onDeviceReady() {
        $$('.loginclass').on('click', function () {
            var uname = $$('#username').val();
            var pwd = $$('#password').val();


            if (uname != '' && pwd != '') {

                $.ajax({
                    type: 'POST',

                    data: {
                        username: uname,
                        password: pwd
                    },
                    url: 'https://gipc.gov.gh/investor/gipc/mobileapi/loginval.php',
                    beforeSend: function () {
                        myApp.showPreloader();

                    },
                    complete: function () {
                        myApp.hidePreloader();

                    },
                    success: function (result) {
                        var data = JSON.parse(result);

                        if (data == '0') {
                            myApp.alert("Credential incorrect", "Message");
                        } else if (data == '2') {
                            myApp.alert("Connection to server failed", "Message");
                        } else {
                            var arr = data.split('|');

                            if (arr[0] == '1') {
                                localStorage.setItem("username", arr[1]);
                                localStorage.setItem("userfullname", arr[2]);

                                mainView.router.loadPage('form.html');



                            }

                        }




                    },
                    error: function () {
                        myApp.alert("Internet connection problem", "Message");
                    }
                });


            }
            else {

                myApp.alert("your credentials are required", "Message");
            }







        });
        
        myApp.onPageInit('form', function (page) {
            //SHOW NAVBAR
            mainView.showNavbar();
            //DIAPLAY USER FULLNAME ON THE MENU
            $$('#userfullname').html(localStorage.userfullname);
            // SHOW TOP RIGHT MENU
            $$('.open-links').on('click', function () {
                var clickedLink = this;
                var popoverHTML = '<div class="popover" style="width: 150px; ">' +
                                    '<div class="popover-inner">' +
                                      '<div class="list-block">' +
                                        '<ul>' +
                                        '<li><a href="help.html" class="item-link list-button" style="color:#3CB371">Help</li>' +
                                        '<li><a href="login.html" class="item-link list-button" style="color:#3CB371">Logout</li>' +
                                        '</ul>' +
                                      '</div>' +
                                    '</div>' +
                                  '</div>'
                myApp.popover(popoverHTML, clickedLink);
            });
            //WHEN NEW REGISTRATION IS CLICKED
            $$('#registration_click').on('click', function () {
                   $.ajax({
                    type: 'POST',
                     data: {
                        username: localStorage.username
                    },
                    url: 'https://gipc.gov.gh/investor/gipc/mobileapi/registration.php',
                    beforeSend: function () {
                        myApp.showPreloader();

                    },
                    complete: function () {
                        myApp.hidePreloader();

                    },
                    success: function (data) {
                                if (data) {
                                      localStorage.setItem("details", data);
                                      mainView.router.loadPage('registration.html');
                       
                                } else {
                                  
                                    myApp.alert("No Record", "Message");
                                }
                    }
                });
               

            });
            //WHEN NEW RENEWAL IS CLICKED
            $$('#renewal_click').on('click', function () {
                var renewal_details;
                console.log('renewal_click working');
                // return;
                   $.ajax({
                    type: 'POST',
                     data: {
                        username: localStorage.username
                    },
                    url: 'https://gipc.gov.gh/investor/gipc/mobileapi/renewal.php',
                    beforeSend: function () {
                        myApp.showPreloader();

                    },
                    complete: function () {
                        myApp.hidePreloader();

                    },
                    success: function (data) {
                        console.log(data);

                            var result = JSON.parse(data);
                            console.log(result);
                            console.log(result[2][3]);
                            console.log(result[1].NAME_OF_COMPANY);

                        $$('#renewal_status').html('');

                        $$.each(result, function (index,item) {
                        $$('#renewal_status').html(
                              // $$('<span>'+item.NAME_OF_COMPANY+' ('+item[3]+')</span>')
                              'item[3]'
                            )
                          })


                        for (var i = 0; i < result.length; i++) {
                           
                            console.log(result[i][3]);
                        }




                                if (data) {
                                      localStorage.setItem("renewal_details", renewal_details);
                                      mainView.router.loadPage('renewal.html');
                       
                                } else {
                                  
                                    myApp.alert("No Record", "Message");
                                }
                    }
                });
               

            });
           //WHEN QUOTA IS CLICKED
            $$('#quota_click').on('click', function () {
                $.ajax({
                    type: 'POST',
                    data: {
                        username: localStorage.username
                    },
                    url: 'https://gipc.gov.gh/investor/gipc/mobileapi/quota.php',
                    beforeSend: function () {
                        myApp.showPreloader();

                    },
                    complete: function () {
                        myApp.hidePreloader();

                    },
                    success: function (data) {
                        if (data) {
                            localStorage.setItem("quotadetails", data);
                            mainView.router.loadPage('quota.html');

                        } else {

                            myApp.alert("No Record", "Message");
                        }
                    }
                });


            });
            //WHEN TECHNOLOGY TRANSFER IS CLICKED
            $$('#tt_click').on('click', function () {
                $.ajax({
                    type: 'POST',
                    data: {
                        username: localStorage.username
                    },
                    url: 'https://gipc.gov.gh/investor/gipc/mobileapi/tt.php',
                    beforeSend: function () {
                        myApp.showPreloader();

                    },
                    complete: function () {
                        myApp.hidePreloader();

                    },
                    success: function (data) {
                        if (data) {
                            localStorage.setItem("ttdetails", data);
                            mainView.router.loadPage('tt.html');

                        } else {

                            myApp.alert("No Record", "Message");
                        }
                    }
                });


            });

            //WHEN STRATEGIC INVESTMENT IS CLICKED
            $$('#st_click').on('click', function () {
                $.ajax({
                    type: 'POST',
                    data: {
                        username: localStorage.username
                    },
                    url: 'https://gipc.gov.gh/investor/gipc/mobileapi/si.php',
                    beforeSend: function () {
                        myApp.showPreloader();

                    },
                    complete: function () {
                        myApp.hidePreloader();

                    },
                    success: function (data) {
                        if (data) {
                            localStorage.setItem("stdetails", data);
                            mainView.router.loadPage('si.html');

                        } else {

                            myApp.alert("No Record", "Message");
                        }
                    }
                });


            });
        });
        myApp.onPageInit('new_application', function (page) {
            //DISPLAY USER FULLNAME ON TOP OF THE PAGE
            $$('#userfullnameR').html(localStorage.userfullname);

            //GET RECORDS FROM LOCAL STORAGE
            var services_json = localStorage.getItem("details");
            
            services_json = JSON.parse(services_json);
           
            var services_arr = $.map(services_json, function (el) { return el; })
            if (services_arr.length === 0) {
               
                $$('#data_status').html("No registration yet");
            } else {
                $$('#data_status').html(services_arr.length+" "+"Records");
            }
            var arrayLength = services_arr.length;
            var ind=0;
            for (var j = 0; j < arrayLength; j++) {
               //APPEND DATA TO DROP DOWN  
                 $('#companynames').append($('<option/>', {
                     value: ind++,
                    text: services_arr[j].name_enterprise,
                   
                }));

            }
            //POPULATE VALUES BY CHANGE IN DROPDOWN
            $$('#companynames').on('change', function () {
              
                $$('#registration_status').html(services_arr[this.value].status); 
                $$('#submit_date').val(services_arr[this.value].submit_date);
            });
            // SHOW TOP RIGHT MENU
            $$('.open-links').on('click', function () {
                var clickedLink = this;
                var popoverHTML = '<div class="popover" style="width: 150px; ">' +
                                    '<div class="popover-inner">' +
                                      '<div class="list-block">' +
                                        '<ul>' +
                                        '<li><a href="help.html" class="item-link list-button" style="color:#3CB371">Help</li>' +
                                        '<li><a href="login.html" class="item-link list-button" style="color:#3CB371">Logout</li>' +
                                        '</ul>' +
                                      '</div>' +
                                    '</div>' +
                                  '</div>'
                myApp.popover(popoverHTML, clickedLink);
            });
           
            
            
        });
        myApp.onPageInit('quota_application', function (page) {

            //DISPLAY USER FULLNAME ON TOP OF THE PAGE
            $$('#userfullnameQ').html(localStorage.userfullname);

            //GET RECORDS FROM LOCAL STORAGE
            var services_json = localStorage.getItem("quotadetails");

            services_json = JSON.parse(services_json);

            var services_arr = $.map(services_json, function (el) { return el; })
            if (services_arr.length === 0) {

                $$('#data_statusQ').html("No quota yet");
            } else {
                $$('#data_statusQ').html(services_arr.length + " " + "Records");
            }
            var arrayLength = services_arr.length;
            var ind = 0;
            for (var j = 0; j < arrayLength; j++) {
                //APPEND DATA TO DROP DOWN  
                $('#companynamesQ').append($('<option/>', {
                    value: ind++,
                    text: services_arr[j].enterpriseName,

                }));

            }
            //POPULATE VALUES BY CHANGE IN DROPDOWN
            $$('#companynamesQ').on('change', function () {

                $$('#quota_status').html(services_arr[this.value].status);
                $$('#submit_dateQ').val(services_arr[this.value].submitDate);
            });
            // SHOW TOP RIGHT MENU
            $$('.open-links').on('click', function () {
                var clickedLink = this;
                var popoverHTML = '<div class="popover" style="width: 150px; ">' +
                                    '<div class="popover-inner">' +
                                      '<div class="list-block">' +
                                        '<ul>' +
                                        '<li><a href="help.html" class="item-link list-button" style="color:#3CB371">Help</li>' +
                                        '<li><a href="login.html" class="item-link list-button" style="color:#3CB371">Logout</li>' +
                                        '</ul>' +
                                      '</div>' +
                                    '</div>' +
                                  '</div>'
                myApp.popover(popoverHTML, clickedLink);
            });


        });
        myApp.onPageInit('tt_application', function (page) {
            //DISPLAY USER FULLNAME ON TOP OF THE PAGE
            $$('#userfullnamett').html(localStorage.userfullname);

            //GET RECORDS FROM LOCAL STORAGE
            var services_json = localStorage.getItem("ttdetails");

            services_json = JSON.parse(services_json);

            var services_arr = $.map(services_json, function (el) { return el; })
            if (services_arr.length === 0) {

                $$('#data_statustt').html("No technology transfer application yet");
            } else {
                $$('#data_statustt').html(services_arr.length + " " + "Records");
            }
            var arrayLength = services_arr.length;
            var ind = 0;
            for (var j = 0; j < arrayLength; j++) {
                //APPEND DATA TO DROP DOWN  
                $('#companynamestt').append($('<option/>', {
                    value: ind++,
                    text: services_arr[j].enterpriseName,

                }));

            }
            //POPULATE VALUES BY CHANGE IN DROPDOWN
            $$('#companynamestt').on('change', function () {

                $$('#tt_status').html(services_arr[this.value].status);
                $$('#submit_datett').val(services_arr[this.value].submitDate);
            });
            // SHOW TOP RIGHT MENU
            $$('.open-links').on('click', function () {
                var clickedLink = this;
                var popoverHTML = '<div class="popover" style="width: 150px; ">' +
                                    '<div class="popover-inner">' +
                                      '<div class="list-block">' +
                                        '<ul>' +
                                        '<li><a href="help.html" class="item-link list-button" style="color:#3CB371">Help</li>' +
                                        '<li><a href="login.html" class="item-link list-button" style="color:#3CB371">Logout</li>' +
                                        '</ul>' +
                                      '</div>' +
                                    '</div>' +
                                  '</div>'
                myApp.popover(popoverHTML, clickedLink);
            });
        });
        myApp.onPageInit('si_application', function (page) {

            //DISPLAY USER FULLNAME ON TOP OF THE PAGE
            $$('#userfullnamest').html(localStorage.userfullname);

            //GET RECORDS FROM LOCAL STORAGE
            var services_json = localStorage.getItem("stdetails");

            services_json = JSON.parse(services_json);

            var services_arr = $.map(services_json, function (el) { return el; })
            if (services_arr.length === 0) {

                $$('#data_statusst').html("No strategic investment application yet");
            } else {
                $$('#data_statusst').html(services_arr.length + " " + "Records");
            }
            var arrayLength = services_arr.length;
            var ind = 0;
            for (var j = 0; j < arrayLength; j++) {
                //APPEND DATA TO DROP DOWN  
                $('#companynamesst').append($('<option/>', {
                    value: ind++,
                    text: services_arr[j].enterpriseName,

                }));

            }
            //POPULATE VALUES BY CHANGE IN DROPDOWN
            $$('#companynamesst').on('change', function () {

                $$('#st_status').html(services_arr[this.value].status);
                $$('#submit_datest').val(services_arr[this.value].submitDate);
            });
            // SHOW TOP RIGHT MENU
            $$('.open-links').on('click', function () {
                var clickedLink = this;
                var popoverHTML = '<div class="popover" style="width: 150px; ">' +
                                    '<div class="popover-inner">' +
                                      '<div class="list-block">' +
                                        '<ul>' +
                                        '<li><a href="help.html" class="item-link list-button" style="color:#3CB371">Help</li>' +
                                        '<li><a href="login.html" class="item-link list-button" style="color:#3CB371">Logout</li>' +
                                        '</ul>' +
                                      '</div>' +
                                    '</div>' +
                                  '</div>'
                myApp.popover(popoverHTML, clickedLink);
            });
        });
        myApp.onPageInit('login-screen', function (page) {
            mainView.showNavbar();
            myApp.closeModal();
            $$('.loginclass').on('click', function () {
                var uname = $$('#username').val();
                var pwd = $$('#password').val();


                if (uname != '' && pwd != '') {

                    $.ajax({
                        type: 'POST',

                        data: {
                            username: uname,
                            password: pwd
                        },
                        url: 'https://gipc.gov.gh/investor/gipc/mobileapi/loginval.php',
                        beforeSend: function () {
                            myApp.showPreloader();

                        },
                        complete: function () {
                            myApp.hidePreloader();

                        },
                        success: function (result) {
                            var data = JSON.parse(result);

                            if (data == '0') {
                                myApp.alert("Credential incorrect", "Message");
                            } else if (data == '2') {
                                myApp.alert("Connection to server failed", "Message");
                            } else {
                                var arr = data.split('|');

                                if (arr[0] == '1') {
                                    localStorage.setItem("username", arr[1]);
                                    localStorage.setItem("userfullname", arr[2]);

                                    mainView.router.loadPage('form.html');



                                }

                            }




                        },
                        error: function () {
                            myApp.alert("Internet connection problem", "Message");
                        }
                    });


                }
                else {

                    myApp.alert("your credentials are required", "Message");
                }







            });
        });
        myApp.onPageInit('help', function (page) {
            mainView.showNavbar();
            myApp.closeModal();
        });
    };

    
} )();