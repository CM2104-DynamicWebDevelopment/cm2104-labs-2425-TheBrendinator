//set the map and initial coordinates
var mymap = L.map('mapid').setView([0, 0], 1);

var Esri_WorldGrayCanvas = L.tileLayer('http://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Light_Gray_Base/MapServer/tile/{z}/{y}/{x}',{attribution: 'Tiles &copy; Esri &mdash; Esri, DeLorme, NAVTEQ', maxZoom: 16 });
Esri_WorldGrayCanvas.addTo(mymap);

$('#shakey').click(function() {

    console.log("getting quakes");

    $.getJSON("https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_month.geojson",function(result) {

        console.log(result);

        result.features.forEach(function(quake) {
            //for each earthquake
            //get its coordinates
            var lng = quake.geometry.coordinates[0];
            var lat = quake.geometry.coordinates[1];
            //and its magnitude
            var mag = parseFloat(quake.properties.mag);
            //for each earthquake create a circle
        
            var circle = L.circle([lat, lng], mag * 10000, {
                color: 'red',
                opacity: 0,
                fillColor: 'red',
                fillOpacity: 0.8
            });
            // and add it to the map
            circle.addTo(mymap);
        });
    });
});

$('#dropey').click(function() {

    console.log("getting meteors");

    $.getJSON("https://data.nasa.gov/resource/gh4g-9sfh.json",function(result) {

        console.log(result);

        result.forEach(function(meteor) {
            //for each earthquake
            //get its coordinates
            var lng = parseFloat(meteor.geolocation.longitude);
            var lat = parseFloat(meteor.geolocation.latitude);
            console.log(meteor.name);
            //and its magnitude
            var mass = parseInt(meteor.mass);
            //for each earthquake create a circle
        
            var circle = L.circle([lat, lng], 1, {
                color: 'blue',
                opacity: 0,
                fillColor: 'blue',
                fillOpacity: 0.8
            });
            // and add it to the map
            circle.addTo(mymap).bindPopup(meteor.name);
        });
    });
});