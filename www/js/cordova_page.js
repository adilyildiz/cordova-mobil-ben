/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

// Wait for the deviceready event before using any of Cordova's device APIs.
// See https://cordova.apache.org/docs/en/latest/cordova/events/events.html#deviceready
document.addEventListener("deviceready", onDeviceReady, false);
var intervalDakika;
function onDeviceReady() {
  // Cordova is now initialized. Have fun!

  console.log("Running cordova-" + cordova.platformId + "@" + cordova.version);
  document.getElementById("deviceready").classList.add("ready");

  console.log(navigator.camera);
  console.log("navigator.geolocation works well");

  window.addEventListener("batterystatus", onBatteryStatus, false);

  setInterval(function () {
    saniyelikKontroller();
  }, 1000);

  cordova.plugins.notification.badge.set(0);

  cordova.plugins.backgroundMode.enable();
  cordova.plugins.backgroundMode.overrideBackButton();
  cordova.plugins.backgroundMode.setDefaults({
    resume: false,
  });

  cordova.plugins.backgroundMode.on("activate", function () {
    $.get("https://adilyildiz.com.tr/tarih.php", function (data) {
      cordova.plugins.notification.local.schedule({
        id: 1,
        title: "Arkaplana Geçtim",
        text: "Şu An Saat: " + data,
        /*icon: "res://icon/android/ldpi.png",
            smallIcon: "res://icon/android/ldpi.png",
            sound: null,*/
        //badge: 1,
        data: { test: 1 },
      });
    }).fail(function () {
      cordova.plugins.notification.local.schedule({
        id: 1,
        title: "Arkaplana Geçtim",
        text: "Saat Bilgisi Sunucudan Alınamadı ",
        /*icon: "res://icon/android/ldpi.png",
            smallIcon: "res://icon/android/ldpi.png",
            sound: null,*/
        //badge: 1,
        data: { test: 1 },
      });
    });
    intervalDakika = setInterval(function () {
      //dakikalikKontroller();
    }, 60000);
  });
  cordova.plugins.backgroundMode.on("deactivate", function () {
    $.get("https://adilyildiz.com.tr/tarih.php", function (data) {
      cordova.plugins.notification.local.schedule({
        id: 1,
        title: "Arkaplandan Çıktım",
        text: "Şu An Saat: " + data,
        /*icon: "res://icon/android/ldpi.png",
            smallIcon: "res://icon/android/ldpi.png",
            sound: null,*/
        //badge: 1,
        data: { test: 1 },
      });
    }).fail(function () {
      cordova.plugins.notification.local.schedule({
        id: 1,
        title: "Arkaplan Çıktım",
        text: "Saat Bilgisi Sunucudan Alınamadı ",
        /*icon: "res://icon/android/ldpi.png",
            smallIcon: "res://icon/android/ldpi.png",
            sound: null,*/
        //badge: 1,
        data: { test: 1 },
      });
    });
    clearInterval(intervalDakika);
  });
  /*
  
  setInterval(function () {
    dakikalikKontrollerNormal();
  }, 60000);
  */
}

function checkConnection() {
  var networkState = navigator.connection.type;

  var states = {};
  states[Connection.UNKNOWN] = "Unknown connection";
  states[Connection.ETHERNET] = "Ethernet connection";
  states[Connection.WIFI] = "WiFi connection";
  states[Connection.CELL_2G] = "Cell 2G connection";
  states[Connection.CELL_3G] = "Cell 3G connection";
  states[Connection.CELL_4G] = "Cell 4G connection";
  states[Connection.CELL] = "Cell generic connection";
  states[Connection.NONE] = "No network connection";
  document.getElementById("baglantidurumu").innerHTML =
    "" + states[networkState];
}

window.addEventListener("batterystatus", onBatteryStatus, false);

function onBatteryStatus(status) {
  console.log("Level: " + status.level + " isPlugged: " + status.isPlugged);
  document.getElementById("pildurumu").innerHTML =
    "Seviye: " + status.level + " Şarj Olma Durumu: " + status.isPlugged;
}

function onSuccessGPS(position) {
  document.getElementById("konumdurumu").innerHTML =
    "<br />Latitude: " +
    position.coords.latitude +
    "<br />" +
    "Longitude: " +
    position.coords.longitude +
    "<br />" +
    "Altitude: " +
    position.coords.altitude +
    "<br />" +
    "Accuracy: " +
    position.coords.accuracy +
    "<br />" +
    "Altitude Accuracy: " +
    position.coords.altitudeAccuracy +
    "<br />" +
    "Heading: " +
    position.coords.heading +
    "<br />" +
    "Speed: " +
    position.coords.speed +
    "<br />" +
    "Timestamp: " +
    position.timestamp +
    "<br />";
}

// onError Callback receives a PositionError object
//
function onErrorGPS(error) {
  alert("code: " + error.code + "\n" + "message: " + error.message + "\n");
}

function onSuccessCam(imageURI) {
  var image = document.getElementById("myImage");
  image.src = "data:image/jpeg;base64," + imageURI;
}

function onFailCam(message) {
  alert("Failed because: " + message);
}

function kameracek() {
  navigator.camera.getPicture(onSuccessCam, onFailCam, {
    quality: 80,
    destinationType: Camera.DestinationType.DATA_URL,
    saveToPhotoAlbum: true,
    encodingType: Camera.EncodingType.JPEG,
    mediaType: Camera.MediaType.PICTURE,
    // allowEdit: true,
    correctOrientation: true,
    targetWidth: 640,
    targetHeight: 480,
  });
}

function qrkontrol() {
  cordova.plugins.scanner.scan(
    {
      prompt_message: "Kod Taratınız", // Change the info message. A blank message ('') will show a default message
      orientation_locked: false, // Lock the orientation screen
      camera_id: 0, // Choose the camera source
      beep_enabled: true, // Enables a beep after the scan
      scan_type: "normal", // Types of scan mode: normal = default black with white background / inverted = white bars on dark background / mixed = normal and inverted modes
      barcode_formats: [],
      //barcode_formats: ["QR_CODE", "CODE_39", "CODE_128"], // Put a list of formats that the scanner will find. A blank list ([]) will enable scan of all barcode types
      extras: {}, // Additional extra parameters. See [ZXing Journey Apps][1] IntentIntegrator and Intents for more details
    },
    function (f) {
      document.getElementById("qrdurumu").innerHTML = JSON.stringify(f);
      console.log(f);
    },
    function (f) {
      document.getElementById("qrdurumu").innerHTML = JSON.stringify(f);
      console.log(f);
    }
  );
}

function bildirimAc() {
  $.get("https://adilyildiz.com.tr/tarih.php", function (data) {
    bildirimVer("Anlık Mesaj", "Şu An Saat: " + data);
  }).fail(function () {
    bildirimVer("Anlık Mesaj", "Saat Bilgisi Sunucudan Alınamadı");
  });
}

function saniyelikKontroller() {
  navigator.geolocation.getCurrentPosition(onSuccessGPS, onErrorGPS);
  checkConnection();
}
function dakikalikKontrollerArkaplan() {
  $.get("https://adilyildiz.com.tr/tarih.php", function (data) {
    bildirimVer("Arkaplan Dakikalık Mesaj", "Şu An Saat: " + data);
  }).fail(function () {
    bildirimVer("Arkaplan Dakikalık Mesaj", "Saat Bilgisi Sunucudan Alınamadı");
  });
}
function dakikalikKontrollerNormal() {
  $.get("https://adilyildiz.com.tr/tarih.php", function (data) {
    bildirimVer(
      "Arkaplan Normal Dakikalık Mesaj",
      "Şu An Saat: " +
        data +
        (cordova.plugins.backgroundMode.isActive()
          ? " Uygulama Arkaplanda"
          : " Uygulama Arkaplanda Değil")
    );

    bildirimVer("Arkaplan Dakikalık Mesaj", "Saat Bilgisi Sunucudan Alınamadı");
  }).fail(function () {
    bildirimVer(
      "Arkaplan Normal Dakikalık Mesaj",
      "Saat Bilgisi Sunucudan Alınamadı " +
        (cordova.plugins.backgroundMode.isActive()
          ? " Uygulama Arkaplanda"
          : " Uygulama Arkaplanda Değil")
    );
  });
}
function saatlikKontroller() {}

function bildirimVer(baslik = "Uyarı", mesaj = "", idX = -1) {
  if (cordova.platformId == "browser") {
    navigator.notification.alert(
      mesaj, // message
      alertDismissed, // callback
      baslik, // title
      "Tamam" // buttonName
    );
  } else if(cordova.platformId == "ios"){
    cordova.plugins.notification.local.schedule({
      //id: idX,
      title: baslik,
      text: mesaj,
      /*icon: "res://icon/android/ldpi.png",
        smallIcon: "res://icon/android/ldpi.png",
        sound: null,*/
      //badge: 1,
      //data: { test: 1 },
    });
  } else {
    var permissions = cordova.plugins.permissions;
    permissions.requestPermission(
      permissions.POST_NOTIFICATIONS,
      function () {
        /*Onay Durumu*/
      },
      function () {
        /*Hata Durumu*/
      }
    );
    permissions.checkPermission(
      permissions.POST_NOTIFICATIONS,
      function () {
        if (idX == -1) {
          cordova.plugins.notification.local.schedule({
            //id: idX,
            title: baslik,
            text: mesaj,
            /*icon: "res://icon/android/ldpi.png",
              smallIcon: "res://icon/android/ldpi.png",
              sound: null,*/
            //badge: 1,
            //data: { test: 1 },
          });
        } else {
          cordova.plugins.notification.local.schedule({
            id: idX,
            title: baslik,
            text: mesaj,
            /*icon: "res://icon/android/ldpi.png",
              smallIcon: "res://icon/android/ldpi.png",
              sound: null,*/
            //badge: 1,
            data: { test: 1 },
          });
        }
      },
      function () {
        /*Hata Durumu*/
      }
    );
  }
}

function alertDismissed() {
  // do something
}
