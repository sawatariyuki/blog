import 'ol/ol.css'
import Map from 'ol/Map'
import View from 'ol/View'
import TileLayer from 'ol/layer/Tile'
import XYZSource from 'ol/source/XYZ'

let projection = 'EPSG:4326'

// 注记 全球
let markLayerGlobal = new TileLayer({
  source: new XYZSource({
    url: 'http://218.2.231.246/mapservice/wmts/slzj?tilematrix={z}&tilerow={y}&tilecol={x}',
    projection: projection
  })
})

// 注记 江苏省
let markLayerJS = new TileLayer({
  source: new XYZSource({
    url: 'http://218.2.231.245/mapjs2/rest/services/MapJS/js_slzj_2017/MapServer/tile/{z}/{y}/{x}',
    projection: projection
  })
})

// 底图
let mapLayerGlobal = new TileLayer({
  source: new XYZSource({
    url: 'http://218.2.231.246/mapservice/wmts/vector?tilematrix={z}&tilerow={y}&tilecol={x}',
    projection: projection
  })
})

let map = new Map({
  target: 'map-container',
  layers: [mapLayerGlobal, markLayerGlobal, markLayerJS],
  view: new View({
    center: [118.75755746589125, 30.51003995971428],
    zoom: 8,
    minZoom:0,
    maxZoom: 19,
    projection: projection
  })
});

map.getView().on('change:resolution', () => {
  let z = map.getView().getZoom()
  if (z >= 18) {
    markLayerJS.values_.visible = false
  } else {
    markLayerJS.values_.visible = true
  }
  console.log('z: ', z)
})

map.on('singleclick', event => {
  console.log(event.coordinate)
})