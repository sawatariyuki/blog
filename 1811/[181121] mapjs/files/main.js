import 'ol/ol.css';
import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import XYZSource from 'ol/source/XYZ';

let mapLayer = new TileLayer({
  source: new XYZSource({
    extent: [116.10358013377254, 30.710719079012677, 122.09030402444137, 35.21265930204362],
    tileSize: [256, 256],
    tileUrlFunction : function (xyz, obj1, obj2) {
        var z = Math.abs(xyz[0])
        var y = Math.abs(Math.abs(xyz[2]) - Math.pow(2, z - 2) - 1)
        var x = Math.abs(xyz[1])
        let url = 'http://218.2.231.246/mapservice/wmts/vector?tilematrix='+z+'&tilerow='+y+'&tilecol='+x
        return url
    }
  })
})

let markLayer = new TileLayer({
  source: new XYZSource({
    extent: [116.10358013377254, 30.710719079012677, 122.09030402444137, 35.21265930204362],
    tileSize: [256, 256],
    tileUrlFunction : function (xyz, obj1, obj2) {
        var z = Math.abs(xyz[0])
        var y = Math.abs(Math.abs(xyz[2]) - Math.pow(2, z - 2) - 1)
        var x = Math.abs(xyz[1])
        var url = 'http://218.2.231.245/mapjs2/rest/services/MapJS/js_slzj_2017/MapServer/tile/'
          + z + '/' + y + '/'+ x
        return url
    }
  })
})

new Map({
  target: 'map-container',
  layers: [mapLayer, markLayer],
  view: new View({
    center: [120, 32],
    zoom: 9,
    minZoom:0,
    maxZoom: 20,
    projection: 'EPSG:4326'
  })
});

//http://218.2.231.245/mapjs2/rest/services/MapJS/js_sldt_2017/MapServer/tile/9/82/427