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


	var coastLayer = commonMap.IVecLayer.initVecLayerFromREST(config.URL.ecoLayer, config.map.layerName.ecoL3, gridStyle, ecoMap);
	coastLayer.set('displayInLayerSwitcher', true);
	coastLayer.set('visible',false);
	coastLayer.set('preview', './resources/img/eco.jpg');
	coastLayer.setOpacity(0.5);
	// coastLayer.setOpacity(0.5);

	var ecoL4Layer = commonMap.IVecLayer.initVecLayerFromREST(config.URL.ecoLayer, config.map.layerName.ecoL4, ecoL4Style, ecoMap);
	ecoL4Layer.set('displayInLayerSwitcher', true);
	ecoL4Layer.set('visible',true);
	ecoL4Layer.set('preview', './resources/img/ecoL4.jpg');
	ecoL4Layer.setOpacity(0.5);

	var OSBLayer = commonMap.IVecLayer.initVecLayerFromREST(config.URL.OSBLayer, config.map.layerName.OSB, OSBStyle, ecoMap);
	Global.layer.stationLayer = OSBLayer;

	OSBLayer.setZIndex(9);
	coastLayer.setZIndex(8);
	ecoL4Layer.setZIndex(7);

	OSBLayer.set('hoverable', true);
	coastLayer.set('hoverable', true);
	ecoL4Layer.set('hoverable', true);

	OSBLayer.set('clickable', true);
	coastLayer.set('clickable', true);
	ecoL4Layer.set('clickable', true);

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
