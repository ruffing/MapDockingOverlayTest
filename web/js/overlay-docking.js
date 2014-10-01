// Isolating the overlay docking variables and functions
// See: http://appendto.com/2010/10/how-good-c-habits-can-encourage-bad-javascript-habits-part-1/

(function(overlayDocking, $, undefined) {
    //Private Properties

    //Public Properties
    overlayDocking.docker;
    overlayDocking.mainPanel;

    //Public Methods
    overlayDocking.initialize = function() {
        overlayDocking.docker = new wcDocker(document.body, {allowContextMenu: false});
        if (overlayDocking.docker) {
            overlayDocking.docker.registerPanelType('Top Panel', createTopPanel);
            overlayDocking.docker.registerPanelType('Blank Panel', createBlankPanel);
            overlayDocking.docker.registerPanelType('Sensors Panel', sensorListDisplay.createSensorPanel);
            overlayDocking.docker.registerPanelType('Radiation Chart Panel', radiationCharts.createChartPanel);
        }
    };

    overlayDocking.layout = function() {
        overlayDocking.docker.addPanel('Top Panel', wcDocker.DOCK_TOP, false);
        overlayDocking.mainPanel = overlayDocking.docker.addPanel('Blank Panel', wcDocker.DOCK_BOTTOM, false);
        overlayDocking.docker.addPanel('Sensors Panel', wcDocker.DOCK_LEFT, false, overlayDocking.mainPanel);
//        docker.addPanel('Test Panel', wcDocker.DOCK_RIGHT, false, mainPanel);
//        docker.addPanel('Test Panel', wcDocker.DOCK_RIGHT, false, mainPanel);
//        docker.addPanel('Test Panel', wcDocker.DOCK_RIGHT, false, mainPanel);
    };


    //Private Methods

    function createTopPanel(panel) {
        panel.layout().addItem($('<div id="topPanelMain"></div>'));

        $.get("media/jsviews/top-panel.tmpl", function(value) {
            var template = $.templates(value);
            var html = template.render();
            $("#topPanelMain").html(html);
        });

        $("#topPanelMain").closest(".wcPanelBackground").css("background", "rgba(245,245,255,0.6)");

        panel.initSize(Infinity, 65);
        panel.minSize(200, 65);
        panel.maxSize(Infinity, 65);
        panel.moveable(false);
        panel.closeable(false);
    }

    function createBlankPanel(panel) {
        panel.layout().addItem($('<div class="sourceLink"></div>'));
    }
}(window.overlayDocking = window.overlayDocking || {}, jQuery));