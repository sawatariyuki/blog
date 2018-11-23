/**
 * . 天地图图层
 *
 * @author <a href="mailto:lanxy88@gmail.com">NelsonXu</a>
 * @version V1.0, 2014/7/30 22:26
 */

define(["esri/layers/TiledMapServiceLayer", "esri/SpatialReference", "esri/geometry/Extent", "esri/geometry/Point", "esri/layers/TileInfo","esri/dijit/Popup", "dojo/_base/declare",'dojo/topic', "dojo/dom-construct","dojo/request/script"],
  function (TiledMapServiceLayer, SpatialReference, Extent, Point, TileInfo, Popup,declare,topic,domConstruct,script) {
    var app,curMap,loader;
    var loadflag=false;
    var panflag=false;
    var measure=false;
    var firstflag=true;
    function onOver() {
      this.isOver = true;
      if (this.isdown) {
        return;
      }
      var highFilter =new PIXI.filters.ColorMatrixFilter();
      highFilter.matrix =[1,0,0,0,0,
        0,1,0,0,0,
        0,0,1,1.4,0,
        0,0,0,1,0];
      this.filters = [highFilter];
    }

    function onOut() {
      this.isOver = false;
      if (this.isdown) {
        return;
      }
      var highFilter =new PIXI.filters.ColorMatrixFilter();
      highFilter.matrix =[1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0];
      this.filters = [highFilter];
    }

    function onUp() {
      this.isdown = false;
      if (this.isOver) {
        var h1 =new PIXI.filters.ColorMatrixFilter();
        h1.matrix =[1,0,0,0,0,
          0,1,0,0,0,
          0,0,1,1.4,0,
          0,0,0,1,0];
        this.filters = [h1];
      }
      else {
        var h2 =new PIXI.filters.ColorMatrixFilter();
        h2.matrix =[1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0];
        this.filters = [h2];
      }
    }
    topic.subscribe('map-zoom-start', function () {
      app.stage.removeChildren();
      app.stage.x=0;
      app.stage.y=0;
    });
    topic.subscribe('map-zoom-end', function () {
      app.stage.removeChildren();
      app.stage.x=0;
      app.stage.y=0;
    });
    topic.subscribe('map-pan', function (e) {
      app.stage.x = e.delta.x;
      app.stage.y = e.delta.y;
      panflag=true;
    });
    topic.subscribe('map-pan-end', function (e) {
      $.each(app.stage.children,function(i,v){
        v.x= v.x+ e.delta.x;
        v.y= v.y+ e.delta.y;
      });
      app.stage.x=0;
      app.stage.y=0;
      panflag=false;
    });
    topic.subscribe('map/export', function (e) {
      curMap=e;
    });
    topic.subscribe("tool/measure", function(){
      debugger;
      measure=true;
    });
    topic.subscribe("tool/measure-end", function(){
      measure=false;
    });
    topic.subscribe("stage/clear", function(){
      var dom=document.getElementById("esri.Map_0_layers");
      dom.removeChild(app.view);
    });
    return declare("TDTNJMapServiceLayer", TiledMapServiceLayer, {
      constructor: function (url, opt) {
        this.spatialReference = new SpatialReference(4326);
        this.initialExtent = (this.fullExtent = new Extent(-180.0, -90.0, 180.0, 90.0, this.spatialReference));
        this.tileInfo = new TileInfo({
          "rows": 256,
          "cols": 256,
          "compressionQuality": 0,
          "origin": {
            "x": -180,
            "y": 90
          },
          "spatialReference": {
            "wkid": 4326
          },
          "lods": [
            {"level": 0, "resolution": 0.703125, "scale": 295497593.05875},
            {"level": 1, "resolution": 0.3515625, "scale": 147748796.529375},
            {"level": 2, "resolution": 0.17578125, "scale": 73874398.264688},
            {"level": 3, "resolution": 0.087890625, "scale": 36937199.132344},
            {"level": 4, "resolution": 0.0439453125, "scale": 18468599.566172},
            {"level": 5, "resolution": 0.02197265625, "scale": 9234299.783086},
            {"level": 6, "resolution": 0.010986328125, "scale": 4617149.891543},
            {"level": 7, "resolution": 0.0054931640625, "scale": 2308574.945771},
            {"level": 8, "resolution": 0.00274658203125, "scale": 1154287.472886},
            {"level": 9, "resolution": 0.001373291015625, "scale": 577143.736443},
            {"level": 10, "resolution": 0.0006866455078125, "scale": 288571.86822143558},
            {"level": 11, "resolution": 0.00034332275390625, "scale": 144285.93411071779},
            {"level": 12, "resolution": 0.000171661376953125, "scale": 72142.967055358895},
            {"level": 13, "resolution": 8.58306884765625e-005, "scale": 36071.483527679447},
            {"level": 14, "resolution": 4.291534423828125e-005, "scale": 18035.741763839724},
            {"level": 15, "resolution": 2.1457672119140625e-005, "scale": 9017.8708819198619},
            {"level": 16, "resolution": 1.0728836059570313e-005, "scale": 4508.9354409599309},
            {"level": 17, "resolution": 5.3644180297851563e-006, "scale": 2254.4677204799655},
            {"level": 18, "resolution": 2.6822090148925782e-006, "scale": 1127.2338602399828},
            {"level": 19, "resolution": 1.341104532462678e-006, "scale": 563.61694063346}
          ]
        });
        this.loaded = true;
        this.onLoad(this);
        var dom=document.getElementById("esri.Map_0_layers");
        debugger;
        app = new PIXI.Application(document.body.scrollWidth, window.innerHeight,{ transparent: true });
        dom.appendChild(app.view);
        app.stage.interactive = true;
        if(firstflag){
          loader = PIXI.loader;
          loader.add("/map/static/image/point/icons.json");
          firstflag=false;
        }
      },
      getTileUrl: function (level, row, col) {
        var btn=[];
        if(level<17){
          $.ajax({
            type: "GET",
            url: "/map/getTileJsonByColumn",
            data: {
              scale:level,
              x:row,
              y:col
            },
            dataType: "json",
            cache:false,
            timeout:0,
            beforeSend :function(xmlHttp){
              xmlHttp.setRequestHeader("If-Modified-Since","0");
              xmlHttp.setRequestHeader("Cache-Control","no-cache");
            },
            success: function(obj){
              if(level==curMap.getZoom()){
                if(typeof obj.features!="undefined"){
                  $.each(obj.features,function(i,v){
                    btn[i]=new PIXI.Sprite.fromImage(v.PNG);
                    btn[i].buttonMode = true;
                    var p=curMap.toScreen(new Point(v.geometry.coordinates[0], v.geometry.coordinates[1], new SpatialReference({ wkid: 4326 })));
                    btn[i].x=p.x;
                    btn[i].y=p.y;
                    if(v.NID!=""){
                      btn[i].interactive = true;
                    }
                    app.stage.addChild(btn[i]);
                    loader.load(setup);
                    function setup(){
                      if(v.SymbolType!=""){
                        loadflag=true;
                        var id =  PIXI.loader.resources["/map/static/image/point/icons.json"].textures;
                        var s = new PIXI.Sprite(id[v.SymbolType+".png"]);
                        var sp=curMap.toScreen(new Point(v.PointX, v.PointY, new SpatialReference({ wkid: 4326 })));
                        s.x=sp.x-5;
                        s.y=sp.y-5;
                        app.stage.addChild(s);
                      }
                    }
                    if(loadflag){
                      var id =  PIXI.loader.resources["/map/static/image/point/icons.json"].textures;
                      var s = new PIXI.Sprite(id[v.SymbolType+".png"]);
                      var sp=curMap.toScreen(new Point(v.PointX, v.PointY, new SpatialReference({ wkid: 4326 })));
                      s.x=sp.x-5;
                      s.y=sp.y-5;
                      app.stage.addChild(s);
                    }
                    if(v.NID!=""){
                      btn[i].on('pointerover', onOver)
                        .on('pointerout', onOut)
                        .on('pointerdown',function(){
                          this.isdown = true;
                        })
                        .on('pointerup', function(){
                          this.isdown = false;

                          if (this.isOver) {
                            var h1 =new PIXI.filters.ColorMatrixFilter();
                            h1.matrix =[1,0,0,0,0,
                              0,1,0,0,0,
                              0,0,1,1.4,0,
                              0,0,0,1,0];
                            this.filters = [h1];
                          }
                          else {
                            var h2 =new PIXI.filters.ColorMatrixFilter();
                            h2.matrix =[1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0];
                            this.filters = [h2];
                          }

                          if (this.isOver){
                            if(!measure){
                              if(!panflag){
                                var arrow="";
                                curMap.infoWindow.hide();
                                var loc=new Point(v.PointX, v.PointY, new SpatialReference({ wkid: 4326 }));
                                var htm='<div class="info_title">'+v.properties.TextString+'</div>';
                                if(parseFloat(v.PointY)- parseFloat(v.geometry.coordinates[1])<0) {arrow="bottom"}
                                else {arrow="top"}
                                var popup = new Popup({
                                  anchor: arrow
                                }, domConstruct.create("div"));
                                popup.setContent(htm);
                                curMap.setInfoWindow(popup);
                                curMap.infoWindow.show(loc);

                                if($("#routebox").css("display")=="block"&&(!($(".start-spn").attr("checked_attr")=="true"&&$(".end-spn").attr("checked_attr")=="true"))){
                                  topic.publish('poi/rtclick', {
                                    poi: v.NID,
                                    poiX: v.PointX,
                                    poiY: v.PointY,
                                    name: v.properties.TextString
                                  });
                                }
                                else{
                                  $("#searchtxt").val(v.properties.TextString);
                                  topic.publish('poi/click', {
                                    poi: v.NID,
                                    poiX: v.PointX,
                                    poiY: v.PointY
                                  });
                                }
                              }
                            }
                          }

                        })
                        .on('pointerupoutside', onUp);
                    }
                  });
                }
              }
            }
          }).done().fail().always();
        }

        return this.url + "?tilematrix=" + (level + 1) + "&tilerow=" + row + "&tilecol=" + col;
      }
    });
  });
