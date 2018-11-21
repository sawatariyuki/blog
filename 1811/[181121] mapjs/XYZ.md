# openlayers调用江苏天地图（矢量底图 + 注记）
江苏天地图-特色功能-综合服务: http://www.mapjs.com.cn/map/pub/index  
OpenLayers Workshop install: https://openlayers.org/workshop/en/

## projection
在江苏天地图服务列表勾选选项后有Json返回值，其中
```
"spatialReference": {
  "wkid": 4490,
  "latestWkid": 4490
}
```
wkid指明```projection```使用```'EPSG:4326'```

## url
综合服务的江苏省矢量底图请求地址为  
（某个tile）  
http://218.2.231.245/mapjs2/rest/services/MapJS/js_sldt_2017/MapServer/tile/9/82/427

对比openLayers使用XYZSource的TileLayer发现请求地址的后三个值(9/82/427)为
```
z/y/x
```
其与openLayers中(_x, _y, _z)的转换为
```
z = abs(_z)
y = abs(abs(_y) - 2**(abs(_z) - 2) - 1)
x = abs(_x)
```

## 增加注记Layer
将Layer中的请求地址换成下面的即可  
http://218.2.231.245/mapjs2/rest/services/MapJS/js_slzj_2017/MapServer/tile/z/y/x  

## 相关文件
[Json返回值 - response.json](./files/response.json)  
[OpenLayers Workshop - index.html](./files/index.html)  
[OpenLayers Workshop - main.js](./files/main.js)  
[江苏天地图file请求值（level8 & level9）](./files/江苏天地图file请求值（level8&level9）.txt)
