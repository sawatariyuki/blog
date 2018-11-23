# openlayers调用江苏天地图2  
（矢量底图 + 全球注记 + 江苏注记）

## 前言
坑还挺大（两天前的操作见 [181121] maps/XYZ.md）

## 调整
记得两天前还在用XYZLayer调江苏天地图首页的wmts接口，  
其中做了一步调整y的操作
>对比openLayers使用XYZSource的TileLayer发现请求地址的后三个值(9/82/427)为
>```
>z/y/x
>```
>其与openLayers中(_x, _y, _z)的转换为
>```
>z = abs(_z)
>y = abs(abs(_y) - 2**(abs(_z) - 2) - 1)
>x = abs(_x)
>```
结果是图虽然出来了，相互间也对上了但在纬度上缺偏差了约1.55度，  
现在发现这仅仅是因为没在Layer中设置对应```projection```  
（之前只在```new Map()```里设了```projection:'EPSG:4326'```而```ol```默认的```projection```为```EPSG:3857```），  
导致其与江苏天地图所用的```EPSG:4490```（对应```ol```中的```EPSG:4326```）对不上  

## 踩坑收获
[1.江苏天地图高清JSON注记样例](./files/天地图注记.json)  
[2.江苏天地图对JSON注记的处理方式](./filse/江苏天地图自己对注记的处理方式.js)  
[3.使用openlayers对上述JSON的处理方式（demo）](./files/使用天地图首页的江苏省注记.js)  
[4.为了解决跨域请求写的后台代理（其中需要对江苏天地图的response做gzip解压）](./files/JSTDTGETRequestProxyServlet.java)
