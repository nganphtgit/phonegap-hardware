// Initialize app
var myApp = new Framework7();
var $$ = Dom7;
var mainView = myApp.addView('.view-main', {
    // Because we want to use dynamic navbar, we need to enable it for this view:
    dynamicNavbar: true
});

$$(document).on('pageInit', '.page[data-page="result-device-info"]', function (e) {
    let $message = "";
    $message += "Cordova version: " + device.cordova;
    $message += "<br/>Device Model: " + device.model;
    $message += "<br/>Device Platform: " + device.platform;
    $message += "<br/>UUID: " + device.uuid;
    $message += "<br/>Version: " + device.version;
    $message += "<br/>Manufacturer: " + device.manufacturer;
    $message += "<br/>Serial: " + device.serial;
    $message += "<br/>is Virtual: " + device.isVirtual;
    document.getElementById('resultDeviceInfo').innerHTML = $message;
});
$$(document).on('pageInit', '.page[data-page="compass"]', function () {  
    var btnStopCompass = document.getElementById('btnStopCompass');
    btnStopCompass.addEventListener('click', function(e) {
        e.preventDefault();
        navigator.compass.clearWatch(watchID);
    }, false);
    var btnPlayCompass = document.getElementById('btnPlayCompass');
    btnPlayCompass.addEventListener('click', function(e) {
        e.preventDefault();
        watchID = navigator.compass.watchHeading(onSuccess, onError, options);    
    }, false);
    function onSuccess(heading) {
        var img = document.getElementById('compass');
        img.setAttribute('style','transform:rotate(-'+ heading.magneticHeading + 'deg)');
    };
    function onError(compassError) {
        alert('Compass error: ' + compassError.code);
    };
    
    var options = {
        frequency: 1500
    };
});
$$(document).on('pageInit', '.page[data-page="result-device-motion"]', function (e) {
    function onSuccess(acceleration) {
        let message = "";
        message += 'Acceleration X: ' + acceleration.x;
        message += '<br/>Acceleration Y: ' + acceleration.y;
        message += '<br/>Acceleration Z: ' + acceleration.z;
        message += '<br/>Timestamp: ' + acceleration.timestamp;
        document.getElementById('resultDeviceMotion').innerHTML = message;
    }
    function onError() {
        alert('onError!');
    }
    var motionOptions = { frequency: 300 };
    var watchID = navigator.accelerometer.watchAcceleration(onSuccess, onError, motionOptions);
    var btnMotionBack = document.getElementById('btnMotionBack');
    btnMotionBack.addEventListener('click', function(e) {
        e.preventDefault();
        navigator.accelerometer.clearWatch(watchID);
    });
});
var btnCheckNetwork = document.getElementById('btnCheckNetwork');
btnCheckNetwork.addEventListener('click', function(e) {
    e.preventDefault();
    var networkState = navigator.connection.type;
    
    var states = {};
    states[Connection.UNKNOWN]  = 'Unknown connection';
    states[Connection.ETHERNET] = 'Ethernet connection';
    states[Connection.WIFI]     = 'WiFi connection';
    states[Connection.CELL_2G]  = 'Cell 2G connection';
    states[Connection.CELL_3G]  = 'Cell 3G connection';
    states[Connection.CELL_4G]  = 'Cell 4G connection';
    states[Connection.CELL]     = 'Cell generic connection';
    states[Connection.NONE]     = 'No network connection';
        
    alert('Connection type: ' + states[networkState]);
});

var btnBatteryStatus = document.getElementById('btnBatteryStatus');
btnBatteryStatus.addEventListener('click', function(e) {
    e.preventDefault();
    window.addEventListener("batterystatus", onBatteryStatus, false);
});

function onBatteryStatus(status) {
    alert("Level: " + status.level + " isPlugged: " + status.isPlugged);
}
window.addEventListener("batterycritical", onBatteryCritical, false);
function onBatteryCritical(status) {
    alert("Battery Level Critical " + status.level + "%\nRecharge Soon!");
}
window.addEventListener("batterylow", onBatteryLow, false);

function onBatteryLow(status) {
    alert("Battery Level Low " + status.level + "%");
}
    
    
