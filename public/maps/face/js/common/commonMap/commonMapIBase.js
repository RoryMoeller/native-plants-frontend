commonMap.IBase = {};

commonMap.IBase.createPipeMap = function(opt_options)
{
	var options = opt_options || {};
	this.centerXY_ = options.centerXY !== undefined ? options.centerXY : [-118,40];
	this.extent_ = options.extent !== undefined ? options.extent : [-135, 18, -55, 51.6];
    this.centerPrj_ = options.centerPrj !== undefined ? options.centerPrj : 'EPSG:4326';
    this.zoomLevel_ = options.zoomLevel !== undefined ? options.zoomLevel : 5;
	this.mapDiv_ = options.mapDiv;//  !== undefined ? options.mapDiv : 'map';
	this.maxZoom_ = options.maxZoom !== undefined ? options.maxZoom : 14;
	this.minZoom_ = options.minZoom !== undefined ? options.minZoom : 4;

    var view = new ol.View({
		center: ol.proj.transform(this.centerXY_, this.centerPrj_ ,'EPSG:3857' ),
		zoom: this.zoomLevel_,
		maxZoom: this.maxZoom_,
		minZoom: this.minZoom_,
		projection: 'EPSG:3857'
	});
	var map = new ol.Map({
		target: this.mapDiv_,
		renderer: 'canvas',
		view: view,
		layers: [],
		controls: [
					new ol.control.Zoom({
						zoomInTipLabel: "放大",
						zoomOutTipLabel: "缩小"
					}),
					new ol.control.ZoomSlider({

					}),

					new ol.control.MousePosition({
									coordinateFormat: ol.coordinate.createStringXY(4),
									projection: 'EPSG:4326'}),
					new ol.control.LayerSwitcherImage()
				]
	});

	var lables = ['country', 'state', 'county', 'city'];
	var tipZoomLevel = [4, 7, 9, 12];
	var leftpx = $(".ol-zoomslider").css("left");
	var left = parseInt(leftpx.slice(0,leftpx.length-2));
	var toppx = $(".ol-zoomslider").css("top");
	var top = parseInt(toppx.slice(0,toppx.length-2));
	var heightpx = $(".ol-zoomslider").css("height"); 
	var h = parseInt(heightpx.slice(0,heightpx.length-2));
	var widthpx = $(".ol-zoomslider").css("width"); 
	var w = parseInt(widthpx.slice(0,widthpx.length-2));

	var step = parseInt(h/(this.maxZoom_ - this.minZoom_));
	var leftcss = left + w +3 + 'px';
	for(var i=0; i<lables.length; i++){
		var topcss;
		if(this.maxZoom_ >= tipZoomLevel[i] && tipZoomLevel[i] >= this.minZoom_){
			if(i==0){
				topcss = top + (this.maxZoom_ - tipZoomLevel[i])*step -10 + 'px';
			}else{
				topcss = top + (this.maxZoom_ - tipZoomLevel[i])*step -7 + 'px';
			}
			$("#"+this.mapDiv_).append("<div class=\"zoomtip\" id=\"zoomtip" + i + "\" style=\"left:"+leftcss+";top:"+ topcss +"\"><span style=\"color:#1E1E1E;margin-left: 10px;font-size: 12px;\">"+ lables[i] +"</span></div>");
		}else{
			continue;
		}
	}
    return map;
}

commonMap.IBase.getLayerByProperty = function(map, propName, propValue)
{
	var allLayers = map.getLayers();
	var layers = new Array();
	

	var array = allLayers.getArray();
	for(var i =0;i<array.length;i++){
		if(array[i].get(propName) == propValue){
			layers.push(array[i]);
		}
	}
	return layers;
}

commonMap.IBase.getInteractById = function(map, propName, propValue)
{
	var interacts = map.getInteractions();
	var result = new Array();

	var array = interacts.getArray();
	for(var i = 0;i<array.length;i++){
		if(array[i].get(propName) == propValue){
			result.push(array[i]);
		}
	}
	return result;
}