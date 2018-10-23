// Initialize app
var myApp = new Framework7();
var $$ = Dom7;
var mainView = myApp.addView('.view-main', {
    // Because we want to use dynamic navbar, we need to enable it for this view:
    dynamicNavbar: true
});

$$(document).on('pageInit', '.page[data-page="result"]', function (e) {
    let $message = "";
    $message += "Cordova version: " + device.cordova;
    $message += "<br/>Device Model: " + device.model;
    $message += "<br/>Device Platform: " + device.platform;
    $message += "<br/>UUID: " + device.uuid;
    $message += "<br/>Version: " + device.version;
    $message += "<br/>Manufacturer: " + device.manufacturer;
    $message += "<br/>Serial: " + device.serial;
    $message += "<br/>is Virtual: " + device.isVirtual;
    document.getElementById('resultContent').innerHTML = $message;
    
});
$$(document).on('pageInit', '.page[data-page="compass"]', function (e) {
    document.addEventListener("deviceready", onDeviceReady, false);
    function onDeviceReady() {
        alert(navigator.compass);
        var watchID = navigator.compass.getCurrentHeading(onSuccess, onError, options);    
    }
    function onSuccess(heading) {
        alert("abc");
        var img = document.getElementById('compass');
        img.setAttribute('style','transform:rotate('+ heading.magneticHeading + 'deg)');
    };
});


function onError(compassError) {
    alert('Compass error: ' + compassError.code);
};

var options = {
    frequency: 1500
}; // Update every 3 seconds


    
    
