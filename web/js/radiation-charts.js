// Isolating the radiation charts variables and functions
// See: http://appendto.com/2010/10/how-good-c-habits-can-encourage-bad-javascript-habits-part-1/

(function(radiationCharts, $, undefined) {
    // Private Properties
    var chartList = [];

    var defaultChartData = {
        labels: ["", "", "", "", "", "", "", "", "", ""],
        datasets: [
            {
                label: "Dosimeter Readings",
                fillColor: "rgba(220,220,220,0.2)",
                strokeColor: "rgba(220,220,220,1)",
                pointColor: "rgba(220,220,220,1)",
                pointStrokeColor: "#fff",
                pointHighlightFill: "#fff",
                pointHighlightStroke: "rgba(220,220,220,1)",
                data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
            },
            {
                label: "Threshold",
                fillColor: "rgba(0,0,0,0)",
                strokeColor: "rgba(150,0,0,0.5)",
                pointColor: "rgba(220,0,0,1)",
                pointStrokeColor: "#fff",
                pointHighlightFill: "#fff",
                pointHighlightStroke: "rgba(220,0,0,1)",
                data: [1.1, 1.1, 1.1, 1.1, 1.1, 1.1, 1.1, 1.1, 1.1, 1.1]
            }
        ]
    };













//    var intervalID;
//    var postBody = "<soapenv:Envelope xmlns:soapenv='http://schemas.xmlsoap.org/soap/envelope/' xmlns:inp='http://xml.netbeans.org/schema/InputEvent.xsd'>" +
//            "<soapenv:Body>" +
//            "<inp:NoInput/>" +
//            "</soapenv:Body>" +
//            "</soapenv:Envelope>";

    //Public Properties
    radiationCharts.sensors = [{name: "sensorName", id: "100", type: 2, typeName: "sensorTypeName", lat: 0, lon: 0}];

    //Public Methods
    radiationCharts.initialize = function() {
        if (intervalID) {
            clearInterval(intervalID);
        }

        intervalID = setInterval(update, 5000);
    };

    radiationCharts.createChart = function(sensorId) {
        
       // Chart.defaults.global.responsive = true; // Should be in init
        
        
        var sensor = sensorData.getSensor(sensorId);
        var copiedData = {};
        jQuery.extend(copiedData, defaultChartData);
        var chartItem = {name: sensor.name, id: sensor.id, data: copiedData}
        chartList.push(chartItem);
        var panel = overlayDocking.docker.addPanel('Radiation Chart Panel', wcDocker.DOCK_LEFT, true, overlayDocking.mainPanel);

        $.get("media/jsviews/dosimeter-chart.tmpl", function(value) {
            var template = $.templates(value);
            var html = template.render();
            $("#dosimeter-chart-comp").html(html);
            template.link("#dosimeter-chart-comp", chartItem);

            var elementId = "#radiation-line-chart-" + chartItem.id;
            var context = $(elementId).get(0).getContext("2d")
            chartItem.chart = new Chart(context).Line(chartItem.data, {
                bezierCurve: false,
                pointDot: false,
                animation: false,
                scaleBeginAtZero: true
            });

            var $monitoredElement = $(".dosimeter-chart-panel").closest(".wcPanelBackground");
            $monitoredElement.detectResizing({ onResize: function() {
                    var td = $monitoredElement.find("#dosimeterChart").closest("td").get(0);
                    var width = $monitoredElement.width()
                    
                    
//                    var height = $monitoredElement.height();
//                    var panel = $monitoredElement.find("#dosimeterChart").get(0);
//                    var width = $monitoredElement.width()
//                    var height = $monitoredElement.height();
//                    panel.style.width=width;
//                    panel.style.height=height;
//                    
//                    var area = $monitoredElement.find(".dosimeter-chart-area").get(0);
//                    area.style.width=width;
//                    area.style.height=height;
                }
            });
        });
    };

    radiationCharts.createChartPanel = function(panel) {
        panel.layout().addItem($('<div id="dosimeter-chart-comp" class="dosimeter-chart-comp"></div>'));
        panel.initSize(120, Infinity);
        panel.minSize(120, 120);
        panel.maxSize(Infinity, Infinity);
    }

    //Private Methods
//    function update() {
//
//    }
//
//    function updateDosimeterData() {
//        var serviceUrl = "http://fed-soa-app01.tsilab.tbe.com:1080/getSensorsService/getSensorsPort";
//        var url = '/proxy/proxy?url=' + encodeURIComponent(serviceUrl);
//        var sensorName, sensorId, sensorType, sensorTypeName, lat, lon;
//        var sensor;
//        $.ajax({
//            type: "post",
//            contentType: 'text/xml',
//            url: url,
//            data: postBody,
//            success: function(xml) {
//                var esr = xml.getElementsByTagName('psGetSensorsDB_Record');
//                for (i = 0; i < esr.length; i++) {
//                    sensorName = esr[i].getElementsByTagName("name")[0].childNodes[0].nodeValue;
//                    sensorId = esr[i].getElementsByTagName("sensor_id")[0].childNodes[0].nodeValue;
//                    sensorType = esr[i].getElementsByTagName("sensor_type")[0].childNodes[0].nodeValue;
//                    sensorTypeName = esr[i].getElementsByTagName("sensor_type_name")[0].childNodes[0].nodeValue;
//                    lat = esr[i].getElementsByTagName("lat")[0].childNodes[0].nodeValue;
//                    lon = esr[i].getElementsByTagName("lon")[0].childNodes[0].nodeValue;
//
//                    sensor = radiationCharts.getSensor(sensorId);
//                    if (sensor) {
//                        sensor.name = sensorName;
//                        sensor.type = sensorType;
//                        sensor.typeName = sensorTypeName;
//                        sensor.lat = lat;
//                        sensor.lon = lon;
//                    } else {
//                        $.observable(radiationCharts.sensors).insert(
//                                {name: sensorName, id: sensorId, type: sensorType, typeName: sensorTypeName, lat: lat, lon: lon}
//                        );
//                    }
//                }
//            },
//            error: function(jqXHR, textStatus, errorThrown) {
//                // TODO: note an error
//                clearInterval(intervalID);
//                alert("error");
//            }
//        });
//    }

}(window.radiationCharts = window.radiationCharts || {}, jQuery));
