import 'ol/ol.css'
import Map from 'ol/Map'
import View from 'ol/View'
import TileLayer from 'ol/layer/Tile'
import XYZSource from 'ol/source/XYZ'
import proj from 'ol/proj'

import VectorSource from 'ol/source/Vector'
import VectorLayer from 'ol/layer/Vector'
import GeoJSON from 'ol/format/GeoJSON'
import Style from 'ol/style/Style'
import Icon from 'ol/style/Icon'

import axios from 'axios'

let geojsonObject = {
  "features": [
    {
      "ID": "POI注记36071_1_32848",
      "NID": "320000G0000000000832840",
      "PNG": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACcAAAAPCAYAAABnXNZuAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAFVSURBVEhL1ZSLjcQgDERTBC3RjrtJMfSSXljGjMEE8tFKe9I9iRXxdzBot39BdtDUoFmh6W9B4yQhS1INE0li3o+6t/g3aPEFxx5zZEGaZtSrpCxBym8FySGEtiQdOZXVOPYcnX9e42E8sHlxgK4ROM5CQhN55D12wYblzSC+5F+Nv+B7+snphuBb4bcG95qYohfbl8X4XFAP2Kdl1Lgq2udO4pLkEPcSWYFN0WQpDlyVP3VJQAFf6IqnGP+e0XMpzvWGTVHHMCFcpX+D9eSt+RR/vazf9+IMmxwfu0idnF5zeXvirubM7yZnUFwqohDWC0Bcfw8rfifudE0W0wuO4pg2cG7mgc2LA9NhXl+r7Zuge3Gw3YvjX4wbwHKtxAG1mHp7cy32Wpz6WNzi6WpU6wPofXc7tD/CcIWmAboG6HoN00boa9Dc7PwcoEuh6StYgjW27QOgSfQtl9CfxwAAAABJRU5ErkJggg==",
      "PNGID": "",
      "PointX": "118.899040089",
      "PointY": "31.992351581",
      "SymbolType": "山",
      "geometry": {
        "coordinates": [
          118.899738469,
          31.993559867
        ],
        "type": "Point"
      },
      "properties": {
        "TextString": "轿子山"
      },
      "type": "Feature"
    },
    {
      "ID": "POI注记36071_1_32906",
      "NID": "320000G0000000000847961",
      "PNG": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABsAAAAPCAYAAAAVk7TYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAD3SURBVDhPxZOBDQMhCEVvCFdyHbdxGHdxFyoIFpBrTdukL7ncKfK/oHf9DbjBx2jxt0CvkHOFzqKtJChtDSBXicSGvea1hqfuGYpQlBkmn5rhnDZDOLQzw2I23ilBCp8MSo+QfF8ZfTA4XuDOI0EUSKkMe0+Hmp9tRo3NDDVVp3COmEPbRjpDNHJJgj5T1AjN1jkoM8SYkZGv0LbwN2bUUq7ItHaepQj+xKzVsl2CiI/NZptmFZRAbZSqdHWcOTD/4UCbEZEZf1vcD460os3mbbSbCZ5jsy3ZVvYWrExtmMwEPUHRF5ys8ZDwHbxm2wAPj+CUkXNdDwZOeF+3HDpHAAAAAElFTkSuQmCC",
      "PNGID": "",
      "PointX": "118.893264073",
      "PointY": "32.0014691110001",
      "SymbolType": "山",
      "geometry": {
        "coordinates": [
          118.893962445,
          32.002115323
        ],
        "type": "Point"
      },
      "properties": {
        "TextString": "塔山"
      },
      "type": "Feature"
    },
    {
      "ID": "POI注记36071_1_32918",
      "NID": "320000G0000000000849348",
      "PNG": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACcAAAAPCAYAAABnXNZuAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAEvSURBVEhL3ZOLjcQgDERTBC3RDt1QTHpJLz6PP1kbQi4nnS7SPYlVGPyZmOz2L6CASSdX2p9CtFMrjX8V1Q7qtVI/TLxBigwcvVK1ZJPWSNSAHS3MsT1uUGpnmzgvVMYlZ4oUMrCP5oAdzWjzWHicSDb3iKNTDeYc7ZfNueZgf2Kagetq1DGVZFiXFnxwpckc4gs1ezv0nMzt7XrSuRlPaXrjcXLZnJVJjJPb2wNzHsBAE3QLA9ywN01KxV83x6Bg+N4+BV80B0RBAL4tDzobvG7uYyAWUn7XHIjmhPW1onlIRuHk7mfmREzmED//86c1msMD3iJ5ifhVhyncmcMe9ZCTJvMd6BN6nMUiIjL+LGJgpTkmJVb6HVLMmYSARDO2FUy6zLEjwaRHWArnbNsXfSjcAsHinZIAAAAASUVORK5CYII=",
      "PNGID": "",
      "PointX": "118.897997287",
      "PointY": "32.0117023500001",
      "SymbolType": "山",
      "geometry": {
        "coordinates": [
          118.898695666,
          32.012348563
        ],
        "type": "Point"
      },
      "properties": {
        "TextString": "对门山"
      },
      "type": "Feature"
    },
    {
      "ID": "POI注记36071_1_32921",
      "NID": "320000G0000000000851771",
      "PNG": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABsAAAAPCAYAAAAVk7TYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAADPSURBVDhP3ZLbDQQhCEUtwpZsh24sxl7shQVlHPAxrsnsz57ERIHLFaP7f/AQkRlyDBhiXuYbmCMG79FvV0DpZxryWZsxkhqRfIOFkGiTwDSYcen7ycpG4LNB4oW9WcYYfK0hWD+YkdaHSJUVjjXsU5KQmq2ekEnwhdlVQHCsUcwkmUAaq8laTHjJLCFc4//aTDe5nxYQ3jejiVRDzdNkjDYrbM3Mh+iXNqu/cV6n1vNk6qod/WRbeLLl1z/gtJ4pJhqJjwlCUtPcCpGQxrkPkHdX2tNT64sAAAAASUVORK5CYII=",
      "PNGID": "",
      "PointX": "118.893147058",
      "PointY": "32.0039528560001",
      "SymbolType": "山",
      "geometry": {
        "coordinates": [
          118.893845431,
          32.004599069
        ],
        "type": "Point"
      },
      "properties": {
        "TextString": "西山"
      },
      "type": "Feature"
    },
    {
      "ID": "POI注记36071_1_33439",
      "NID": "320000G0000000000896990",
      "PNG": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABsAAAAPCAYAAAAVk7TYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAEgSURBVDhPzZTrjcQgDIRTBC3RDt1QDL3Qi9djBjAcm+Tu130SUjLr5wTt9W8QwtcjDDEoGZQMShPqCzVHibnybYVplwZJjFl6FOWmhyRl0w0UDiG8OokVkGdFu6BYMUW0TToMYUhJcwt9Di6wJDRpU+LZ1cb6S7PJXTOjSo5aGMm1SvUDbMnNJr9xkvzFHe+EMRodgtczvwOwrV9sBtiKHh+L78c38znQMXCUZsajjQ27LBZY1Bo3G76l2wJbxaRWq2bPiB0xL5oNW0rWCTH5atsARfHb6YLge982s+Ruyf3BBlWbFPT4+230YCv4z4vjEhe2ZrPWQzOzcGyw2Teu+kHfinaX/L+PNelQ+xWnvG/aD/jbgLJBaUDZoPSgXdcH6kyS5X/hasIAAAAASUVORK5CYII=",
      "PNGID": "",
      "PointX": "118.905083804",
      "PointY": "32.0045690060001",
      "SymbolType": "无",
      "geometry": {
        "coordinates": [
          118.90393941,
          32.0052145100001
        ],
        "type": "Point"
      },
      "properties": {
        "TextString": "窦村"
      },
      "type": "Feature"
    },
    {
      "ID": "POI注记36071_1_33442",
      "NID": "320000G0000000000896998",
      "PNG": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACcAAAAPCAYAAABnXNZuAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAFWSURBVEhL1ZXbsYMwDEQpwi25HbpxMfTiXhyvtIqMkQnJx525Z4ZM0HMlcLL9S1qHX4X5PgIxBk0fYbhA0xoEHXtqudR3Qre0PaW2H/cFWi0t59I0cx1Lt9Y+9pbucmgfgJi9fyq15LfYe5CXWxTKVhtqpTGmixtrM8yBUZPSo8uL6UajGL98SOtleVLnibjf6E2GRwJutzwJAXM8JZ2B47o9TF1byTo9/HjvnO/EHUfptVDXH+tck3KunCezxrE4ibcDgJf6NNRwnacRanXx14EVETQiJ2cs/FScmoTl5u4GmC7LF1HGT5ubxl6KiwiGGxFRxrebm4WsbAZNBCcW7x7q917TkExx4s05o7h+14tef9NWm2OL4eCdc2cbwx0vjKlscwr+NbDNtzhsGf5p28jXRm7THNZkTAge80qgmv4Wtg570+WYUbzk0/0TohoRdHf/tr0Atq9SEw15ZWkAAAAASUVORK5CYII=",
      "PNGID": "",
      "PointX": "118.904595226",
      "PointY": "32.0082247610001",
      "SymbolType": "无",
      "geometry": {
        "coordinates": [
          118.902935853,
          32.008870265
        ],
        "type": "Point"
      },
      "properties": {
        "TextString": "前庄头"
      },
      "type": "Feature"
    }
  ],
  "type": "FeatureCollection"
}

for (let i in geojsonObject.features) {
  geojsonObject.features[i].geometry.coordinates[0]
  geojsonObject.features[i].geometry.coordinates[1] -= 1.547
}

// 注记 全球
let markLayerGlobal = new TileLayer({
  source: new XYZSource({
    tileUrlFunction : function (xyz, obj1, obj2) {
        var z = Math.abs(xyz[0])
        var y = Math.abs(Math.abs(xyz[2]) - Math.pow(2, z - 2) - 1)
        var x = Math.abs(xyz[1])
        // var url = 'http://218.2.231.245/mapjs2/rest/services/MapJS/js_slzj_2017/MapServer/tile/'+z+'/'+y+'/'+x
        var url = 'http://218.2.231.246/mapservice/wmts/slzj?tilematrix='+z+'&tilerow='+y+'&tilecol='+x
        return url
    }
  })
})

// 注记 江苏省
let markLayerJS = new TileLayer({
  source: new XYZSource({
    tileUrlFunction : function (xyz, obj1, obj2) {
        var z = Math.abs(xyz[0])
        var y = Math.abs(Math.abs(xyz[2]) - Math.pow(2, z - 2) - 1)
        var x = Math.abs(xyz[1])
        var url = 'http://218.2.231.245/mapjs2/rest/services/MapJS/js_slzj_2017/MapServer/tile/'+z+'/'+y+'/'+x
        return url
    }
  })
})

// 底图
let mapLayerGlobal = new TileLayer({
  source: new XYZSource({
    tileUrlFunction : function (xyz, obj1, obj2) {
      let z = Math.abs(xyz[0])
      let y = Math.abs(Math.abs(xyz[2]) - Math.pow(2, z - 2) - 1)
      let x = Math.abs(xyz[1])
      let url = 'http://218.2.231.246/mapservice/wmts/vector?tilematrix='+z+'&tilerow='+y+'&tilecol='+x
      return url
    }
  })
})

let geoLayer = new VectorLayer({
  source: new VectorSource({
    features: (new GeoJSON()).readFeatures(geojsonObject)
  }),
  style: feature => {
    let geoFeatures = geojsonObject.features
    let png = findPNGInGeoJSONFeatures(geoFeatures, feature)
    if (png) {
      return new Style({
        image: new Icon({src: png})
      })
    }
  }
})

let map = new Map({
  target: 'map-container',
  layers: [mapLayerGlobal, markLayerGlobal, geoLayer],
  view: new View({
    center: [118.75755746589125, 30.51003995971428],
    zoom: 8,
    minZoom:0,
    maxZoom: 19,
    projection: 'EPSG:4326'
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

// 按ol的feature在geoJSONFeatures中找到注记图片
function findPNGInGeoJSONFeatures(geoFeatures, feature) {
  if (!geoFeatures || !feature) {
    return
  }
  for (let i in geoFeatures) {
    if (geoFeatures[i]) {
      let flatCoordinates = feature.values_.geometry.flatCoordinates
      let geoCoordinates = geoFeatures[i].geometry.coordinates
      if (flatCoordinates[0] === geoCoordinates[0] && flatCoordinates[1] === geoCoordinates[1]) {
        return geoFeatures[i].PNG
      }
    }
  }
}
