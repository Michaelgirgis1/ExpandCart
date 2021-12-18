

// Wait for the DOM to be ready
$(function () {
    // let nextButton = document.getElementById("nextBtn");
    // let prevButton =  document.getElementById("prevBtn");
    var currentTab = 0;
    showTab(currentTab); // Display the current tab
    function showTab(n) {
        // This function will display the specified tab of the form ...
        var tabs = document.getElementsByClassName("tab");
        let headers = document.getElementsByClassName("header-item");
        tabs[n].classList.add("active");
        headers[n].classList.add("active");
        debugger
        // ... and fix the Previous/Next buttons:
        // if (n == 0) {
        //     // document.getElementById("prevBtn").style.display = "none";
        // } else {
        //     document.getElementById("prevBtn").style.display = "inline";
        // }
        if (n == (tabs.length - 1)) {
            document.getElementById("nextBtn").innerHTML = "Submit";
        } else {
            document.getElementById("nextBtn").innerHTML = "Save and Continue";
        }
        // ... and run a function that displays the correct step indicator:
        // fixStepIndicator(n)
    }
    function nextPrev(n) {
        // This function will figure out which tab to display
        let tabs = document.getElementsByClassName("tab");
        let headers = document.getElementsByClassName("header-item");


        // Exit the function if any field in the current tab is invalid:
        // if (n == 1) return false;   // if (n == 1 && !validateForm()) 
        // Hide the current tab:
        // x[currentTab].style.display = "none";
        tabs[currentTab].classList.remove("active");
        headers[currentTab].classList.remove("active");

        // Increase or decrease the current tab by 1:
        currentTab = currentTab + n;
        // if you have reached the end of the form... :
        if (currentTab >= tabs.length) {
            //...the form gets submitted:
            document.getElementById("regForm").submit();
            return false;
        }
        // Otherwise, display the correct tab:
        showTab(currentTab);
    }
    $("#nextBtn").click(function (e) {
        e.stopPropagation();
        console.log("validator", validator.check('#contectPhoneInput'), $('form').validate().checkForm());
        if(currentTab == 0) {

            if ($('form').validate().checkForm()) {
                nextPrev(1)
                
            } else {
                $('form').submit();
            }
        } else {
            nextPrev(1)

        }
    })
    // $("#prevBtn").click(function () {
    //     nextPrev(-1)
    // })
    // Initialize form validation on the registration form.
    // It has the name attribute "registration"
    var validator = $("form[name='registration']").validate({
        // Specify validation rules
        rules: {
            contactPhone: {
                required: true,
                maxlength: 11
            },
            name: {
                required: true,
                minlength: 2
            },
            // email: {
            //   required: true,
            //   // Specify that email should be validated
            //   // by the built-in "email" rule
            //   email: true
            // }
        },
        // Specify validation error messages
        messages: {
            contactPhone: {
                required: "Please enter your contact phone",
                maxlength: "Maximum number is 11"
            },
            name: {
                required: "Please enter your name",
                minlength: "Your name must be at least 2 characters long"

            },
            // password: {
            //   required: "Please provide a password",
            //   minlength: "Your password must be at least 5 characters long"
            // },
            // email: "Please enter a valid email address"
        },
    });


    $(".add-new-address-btn").click(function () {
        debugger
        $(".step-one__add-address").slideToggle();
    });

    function initMap() {
        map = new google.maps.Map(document.getElementById("map"), {
            center: { lat: 26.383054, lng: 29.719477 },
            zoom: 8,
        });
        initialize()
    }
    initMap()
    function initMap2() {
        map = new google.maps.Map(document.getElementById("mapAddress"), {
            center: { lat: 26.383054, lng: 29.719477 },
            zoom: 8,
        });
    }
    
    initMap2();
    let infoWindow = new google.maps.InfoWindow();
    let locationButton = document.getElementById("locationBtn");

    $("#locationBtn").click(() => {
        // Try HTML5 geolocation.
        // debugger
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    debugger
                    const pos = {
                        lat: position.coords.latitude,
                        lng: position.coords.longitude,
                    };
                    codeLatLng(pos.lat, pos.lng)

                    infoWindow.setPosition(pos);
                    infoWindow.setContent("Location found.");
                    infoWindow.open(map);
                    map.setCenter(pos);
                },
                () => {
                    handleLocationError(true, infoWindow, map.getCenter());
                }
            );
        } else {
            // Browser doesn't support Geolocation
            handleLocationError(false, infoWindow, map.getCenter());
        }
    });

    function handleLocationError(browserHasGeolocation, infoWindow, pos) {
        infoWindow.setPosition(pos);
        infoWindow.setContent(
            browserHasGeolocation
                ? "Error: The Geolocation service failed."
                : "Error: Your browser doesn't support geolocation."
        );
        infoWindow.open(map);
    }

    var geocoder;
    function initialize() {
        geocoder = new google.maps.Geocoder();
    }
    function codeLatLng(lat, lng) {

        var latlng = new google.maps.LatLng(lat, lng);
        geocoder.geocode({ 'latLng': latlng }, function (results, status) {
            debugger
            if (status == google.maps.GeocoderStatus.OK) {
                //console.log(results);
                if (results[1]) {
                    debugger
                    var indice = 0;
                    for (var j = 0; j < results.length; j++) {
                        if (results[j].types[0] == 'locality') {
                            indice = j;
                            break;
                        }
                    }
                    alert('The good number is: ' + j);
                    console.log(results[j]);
                    for (var i = 0; i < results[j].address_components.length; i++) {
                        if (results[j].address_components[i].types[0] == "locality") {
                            //this is the object you are looking for City
                            city = results[j].address_components[i];
                        }
                        if (results[j].address_components[i].types[0] == "administrative_area_level_1") {
                            //this is the object you are looking for State
                            region = results[j].address_components[i];
                        }
                        if (results[j].address_components[i].types[0] == "country") {
                            //this is the object you are looking for
                            country = results[j].address_components[i];
                        }
                    }


                    //city data
                    alert(city.long_name + " || " + region.long_name + " || " + country.short_name)


                } else {
                    alert("No results found");
                }
                //}
            } else {
                alert("Geocoder failed due to: " + status);
            }
        });
    }
});