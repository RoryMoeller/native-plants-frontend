var ecoMap;
var mapOption;
var zoomVolMap = new Map();
var zoomOffsetMap = new Map();

function initMap() {
	
	commonMap.IUtil.serverInfo = new Map();
	
	let result;
	result = Global.config.map.base;
	let mapOption = {
		centerXY: result.map.centerXY,
		extent: result.map.extent,
		zoomLevel: result.map.zoomLevel,
		maxZoom: result.map.maxZoom,
		minZoom: result.map.minZoom,
		mapDiv: 'map'
	};
	
	// // ol.source.XYZ Add layers of Tile Map
    // var tileLayer = new ol.layer.Tile({
    //     source: new ol.source.XYZ({
    //         tileUrlFunction: function (tileCoord) {
    //             console.log(tileCoord);
    //             //alert(tileCoord[0] + " X= " + tileCoord[1] + " Y= " + tileCoord[2]);
    //             var oo = "00000000";
    //             var zz = tileCoord[0];
    //             var z = "L" + zz;
    //             var xx = tileCoord[1].toString(16);
    //             var x = "C" + oo.substring(0, 8 - xx.length) + xx;
    //             var yy = (-tileCoord[2] - 1).toString(16); //Note here that the calculation method has changed
    //             var y = "R" + oo.substring(0, 8 - yy.length) + yy;
    //             return  'C:\\arcgisserver\\directories\\arcgiscache\\test1\\Layers\\_alllayers/' + z + '/' + y + '/' + x + '.png';
    //         },
    //         projection: 'EPSG:3857'
    //     })
    // });
    // map.addLayer(tileLayer);

	ecoMap = commonMap.IBase.createEcoMap(mapOption);

	var OSMLayer = new ol.layer.Tile({
		title: 'OSM map',
		source: new ol.source.OSM(),
		preview: './resources/img/osm.jpg',
		visible: true,
		baseLayer: true,
		displayInLayerSwitcher: true 
	  })
	
	ecoMap.addLayer(OSMLayer);

	zoom = Math.floor(ecoMap.getView().getZoom());

	var collectionLayer = commonMap.IVecLayer.initVecLayerFromREST(config.URL.collectionLayer, config.map.layerName.collection, collectionStyle, ecoMap);
	Global.layer.collectionLayer = collectionLayer;

	var coastLayer = commonMap.IVecLayer.initVecLayerFromREST(config.URL.ecoLayer, config.map.layerName.ecoL3, gridStyle, ecoMap);
	coastLayer.set('displayInLayerSwitcher', true);
	coastLayer.set('visible',false);
	coastLayer.set('preview', './resources/img/eco.jpg');
	coastLayer.setOpacity(0.5);
	// coastLayer.setOpacity(0.5);

	var ecoL4Layer = commonMap.IVecLayer.initVecLayerFromREST(config.URL.ecoLayer, config.map.layerName.ecoL4, ecoL4Style, ecoMap);
	ecoL4Layer.set('displayInLayerSwitcher', true);
	ecoL4Layer.set('visible',true);
	ecoL4Layer.set('preview', './resources/img/ECO4.png');
	ecoL4Layer.setOpacity(0.5);

	var OSBLayer = commonMap.IVecLayer.initVecLayerFromREST(config.URL.OSBLayer, config.map.layerName.OSB, OSBStyle, ecoMap);
	Global.layer.stationLayer = OSBLayer;

	OSBLayer.setZIndex(9);
	coastLayer.setZIndex(8);
	ecoL4Layer.setZIndex(7);
	collectionLayer.setZIndex(10);

	OSBLayer.set('hoverable', true);
	coastLayer.set('hoverable', true);
	ecoL4Layer.set('hoverable', true);
	collectionLayer.set('hoverable', true);

	OSBLayer.set('clickable', true);
	coastLayer.set('clickable', true);
	ecoL4Layer.set('clickable', true);
	collectionLayer.set('clickable', true);

	initSelectInteraction();
	initOSBPanel();
	// initMenuBar();
	

	commonMap.IUtil.markerLayer = new ol.layer.Vector({ source: new ol.source.Vector() });

	commonMap.IUtil.previousZoom = ecoMap.getView().getZoom();
	ecoMap.on('moveend', function () {
		if (commonMap.IUtil.previousZoom != ecoMap.getView().getZoom()) {
			// zoomUpdateLayerSwitchVolPanel();
		}
		commonMap.IUtil.previousZoom = ecoMap.getView().getZoom();
	});

}//end of initMap()	
