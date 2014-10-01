// Isolating the sensor list display variables and functions
// See: http://appendto.com/2010/10/how-good-c-habits-can-encourage-bad-javascript-habits-part-1/

(function(sensorListDisplay, $, undefined) {
    //Private Properties

    //Public Properties

    //Public Methods
    sensorListDisplay.createSensorPanel = function(panel) {
        panel.layout().addItem($('<div id="sensorsList"></div>'));

        $.get("media/jsviews/sensor-list-display.tmpl", function(value) {
            var template = $.templates(value);
            var html = template.render();
            $("#sensorsList").html(html);
            template.link("#sensorsList", sensorData);
        });

        $("#sensorsList").closest("td").css("vertical-align", "top");
        $("#sensorsList").closest(".wcPanelBackground").css("background", "rgba(245,245,255,0.6)");
       
        panel.initSize(120, Infinity);
        panel.minSize(120, 120);
        panel.maxSize(Infinity, Infinity);
    };

    //Private Methods
    
    
}(window.sensorListDisplay = window.sensorListDisplay || {}, jQuery));