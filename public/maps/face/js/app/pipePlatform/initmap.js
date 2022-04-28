var pipeMap;
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
	if (result.radiuslayer != null) {
		if (result.radiuslayer.zoomvolmap != null) {
			var zoomvolmap = result.radiuslayer.zoomvolmap;
			for (i = 0; i < zoomvolmap.length; i++) {
				zoomVolMap.set(zoomvolmap[i].zoom.toString(), zoomvolmap[i].pipeType);
			}
		}
		if (result.radiuslayer.lineoffset != null) {
			var lineoffset = result.radiuslayer.lineoffset;
			for (i = 0; i < lineoffset.length; i++) {
				zoomOffsetMap.set(lineoffset[i].zoom.toString(), lineoffset[i].offset);
			}
		}
	}

	pipeMap = commonMap.IBase.createPipeMap(mapOption);

	var OSMLayer = new ol.layer.Tile({
		title: 'OSM map',
		source: new ol.source.OSM(),
		preview: './resources/img/osm.jpg',
		visible: true,
		baseLayer: true,
		displayInLayerSwitcher: true 
	  })
	
  pipeMap.addLayer(OSMLayer);

	zoom = Math.floor(pipeMap.getView().getZoom());

	var ecoLayer = commonMap.IVecLayer.initVecLayerFromREST(config.URL.pipelineLayer, config.map.layerName.ecoline, ecoStyle, pipeMap);
	Global.layer.ecoLayer = ecoLayer;

	var pipelineLayer = commonMap.IVecLayer.initVecLayerFromREST(config.URL.pipelineLayer, config.map.layerName.pipeline, gridStyle, pipeMap);
	pipelineLayer.set('displayInLayerSwitcher', true);
	pipelineLayer.set('visible',false);
	pipelineLayer.set('preview', './resources/img/eco.jpg');

	var stationLayer = commonMap.IVecLayer.initVecLayerFromREST(config.URL.station, config.map.layerName.station, gridStyle, pipeMap);
	Global.layer.stationLayer = stationLayer;

	stationLayer.setZIndex(9);
	pipelineLayer.setZIndex(8);
	ecoLayer.setZIndex(7);

	stationLayer.set('hoverable', true);
	pipelineLayer.set('hoverable', true);
	ecoLayer.set('hoverable', true);

	stationLayer.set('clickable', true);
	pipelineLayer.set('clickable', true);
	ecoLayer.set('clickable', true);

	initSelectInteraction();

	commonMap.IUtil.markerLayer = new ol.layer.Vector({ source: new ol.source.Vector() });

	commonMap.IUtil.previousZoom = pipeMap.getView().getZoom();
	pipeMap.on('moveend', function () {
		if (commonMap.IUtil.previousZoom != pipeMap.getView().getZoom()) {
			// zoomUpdateLayerSwitchVolPanel();
		}
		commonMap.IUtil.previousZoom = pipeMap.getView().getZoom();
	});

	
}//end of initMap()	
