// Isolating the map variables and functions
// See: http://appendto.com/2010/10/how-good-c-habits-can-encourage-bad-javascript-habits-part-1/

(function(mainMapUI, $, undefined) {
    //Private Property
    var map;

    

    //Public Property
//  skillet.ingredient = 'Bacon Strips';

    //Public Method
    mainMapUI.initialize = function() {
        map = L.map('map', {attributionControl: false}).setView([51.505, -0.09], 13);

        var defaultLayer = L.tileLayer.provider('Esri.WorldImagery').addTo(map);

        var baseLayers = {
            'Street Map': L.tileLayer.provider('Esri.WorldStreetMap'),
            'Satellite': defaultLayer
        };

        var overlayLayers = {};

        L.control.layers(baseLayers, overlayLayers, { collapsed: false}).addTo(map);
    };

    //Private Method
//  function addItem( item ) {}

}(window.mainMapUI = window.mainMapUI || {}, jQuery));