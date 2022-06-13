var data;

function loadAccidentPoints(map, data) {
    var features = new Array(data.length);

    for (var i = 0; i < data.length; i++) {
        var coordinates = data[i].Coordinates;
        if (coordinates) {
            var latLong = coordinates.substring('POINT('.length + 1, coordinates.length-1).split(' ');
            var latitude = latLong[0];
            var longitude = latLong[1];
            features[i] = new ol.Feature({
                'geometry': new ol.geom.Point([
                    features.latitude,
                    features.longitude
                ]),
                'i': i
            });
        }
    }

    var style = new ol.style.Style({
        image: new ol.style.Circle({
            radius: 10,
            fill: new ol.style.Fill({color: '#666666'}),
            stroke: new ol.style.Stroke({color: '#bada55', width: 1})
        })
    });

    //var vectorSource = new ol.source.Vector({
     //   features: features,
    //    wrapX: false,
    //});

    var vector = new ol.layer.Vector({
        features: features,
        style: function (feature) {
            return styles[feature.get('size')];
        },
    });
}

function loadMap() {
    var map = new ol.Map({
        target: 'map',
        layers: [
          new ol.layer.Tile({
            source: new ol.source.OSM()
          })
        ],
        view: new ol.View({
          zoom: 4
        })
      });

      loadAccidentPoints(map, data);
}