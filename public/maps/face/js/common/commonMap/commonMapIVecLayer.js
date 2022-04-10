
commonMap.IVecLayer = {};

commonMap.IVecLayer.initVectorLayer = function(opt_options, map)
{
    var options = opt_options || {};
    var layerTitle = options.title ? options.title : "";
	var layerStyle = options.style ? options.style : new ol.style.Style({});
	var layerType = options.type ? options.type : "default";

    var visualLayer = new ol.layer.Vector(
		{	
			title: layerTitle,
			type: layerType,
			displayInLayerSwitcher: false,
			source: new ol.source.Vector({}),
			renderOrder: ol.ordering.yOrdering(),
			style: layerStyle //function(f,res) { return layerStyle; }
        });

    map.addLayer(visualLayer);
    return visualLayer;
}

commonMap.IVecLayer.refreshLayerFromRequest = function(url, layer)
{
	$.ajax({
		type : "GET",
		url : url,
		dataType : "json",
		success : function(result) {
				if(layer.getSource() !=null){
					layer.getSource().clear();
				}
				layer.getSource().addFeatures((new ol.format.GeoJSON()).readFeatures(result,{
					dataProjection: 'EPSG:4326',
					featureProjection: 'EPSG:3857'
				}))
	},
	error:function (xhr){
		console.log("获取坐标数据出错，请检查");
	}
	});
}

commonMap.IVecLayer.addFeaturesToLayerFromRequest = function(url, layer)
{
	$.ajax({
		type : "GET",
		url : url,
		dataType : "json",
		success : function(result) {
			if(result.features != null){
				layer.getSource().addFeatures((new ol.format.GeoJSON()).readFeatures(result,{
					dataProjection: 'EPSG:4326',
					featureProjection: 'EPSG:3857'
				}))
			}
	},
	error:function (xhr){
		console.log("获取坐标数据出错，请检查");
	}
	});
}

