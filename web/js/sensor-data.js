// Isolating the sensor data variables and functions
// See: http://appendto.com/2010/10/how-good-c-habits-can-encourage-bad-javascript-habits-part-1/

(function(sensorData, $, undefined) {
    //Private Properties
    var intervalID;
    var postBody = "<soapenv:Envelope xmlns:soapenv='http://schemas.xmlsoap.org/soap/envelope/' xmlns:inp='http://xml.netbeans.org/schema/InputEvent.xsd'>" +
            "<soapenv:Body>" +
            "<inp:NoInput/>" +
            "</soapenv:Body>" +
            "</soapenv:Envelope>";

    //Public Properties
    sensorData.sensors = [{name: "sensorName", id: "100", type: 2, typeName: "sensorTypeName", lat: 0, lon: 0}];

    //Public Methods
    sensorData.initialize = function() {
        if (intervalID) {
            clearInterval(intervalID);
        }

        intervalID = setInterval(updateSensorData, 5000);
    };

    sensorData.getSensor = function(id) {
        for (var i = 0; i < sensorData.sensors.length; i++) {
            if (sensorData.sensors[i].id && sensorData.sensors[i].id == id) {
                return sensorData.sensors[i];
            }
        }
        return undefined;
    };

    //Private Methods
    function updateSensorData() {
        var serviceUrl = "http://fed-soa-app01.tsilab.tbe.com:1080/getSensorsService/getSensorsPort";
        var url = '/proxy/proxy?url=' + encodeURIComponent(serviceUrl);
        var sensorName, sensorId, sensorType, sensorTypeName, lat, lon;
        var sensor;
        $.ajax({
            type: "post",
            contentType: 'text/xml',
            url: url,
            data: postBody,
            success: function(xml) {
                var esr = xml.getElementsByTagName('psGetSensorsDB_Record');
                for (i = 0; i < esr.length; i++) {
                    sensorName = esr[i].getElementsByTagName("name")[0].childNodes[0].nodeValue;
                    sensorId = esr[i].getElementsByTagName("sensor_id")[0].childNodes[0].nodeValue;
                    sensorType = esr[i].getElementsByTagName("sensor_type")[0].childNodes[0].nodeValue;
                    sensorTypeName = esr[i].getElementsByTagName("sensor_type_name")[0].childNodes[0].nodeValue;
                    lat = esr[i].getElementsByTagName("lat")[0].childNodes[0].nodeValue;
                    lon = esr[i].getElementsByTagName("lon")[0].childNodes[0].nodeValue;

                    sensor = sensorData.getSensor(sensorId);
                    if (sensor) {
                        sensor.name = sensorName;
                        sensor.type = sensorType;
                        sensor.typeName = sensorTypeName;
                        sensor.lat = lat;
                        sensor.lon = lon;
                    } else {
                        $.observable(sensorData.sensors).insert(
                                {name: sensorName, id: sensorId, type: sensorType, typeName: sensorTypeName, lat: lat, lon: lon}
                        );
                    }
                }
            },
            error: function(jqXHR, textStatus, errorThrown) {
                // TODO: note an error
                clearInterval(intervalID);
                alert("error");
            }
        });
    }

}(window.sensorData = window.sensorData || {}, jQuery));