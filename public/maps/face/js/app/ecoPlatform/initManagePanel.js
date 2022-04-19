
function initOSBPanel()
{

	var OSB2Layer = new ol.layer.Vector(
		{	
			title: "OSB2",
			displayInLayerSwitcher: false,
			source: new ol.source.Vector({}),
			style: function(f,res) { return regionStyle(f,res,false); }
        });
	ecoMap.addLayer(OSB2Layer);
	OSB2Layer.setZIndex(12);

	$.ajax({
	    url: config.URL.OSBLayer,
	    type: 'get',
	    dataType:'JSON',
	    success: function (result) {

			if(result.features!=null){
				if(result.features.length!=0){
				  var features = (new ol.format.GeoJSON()).readFeatures(result,{
					dataProjection: 'EPSG:4326',
					featureProjection: 'EPSG:3857'
				  });				  
				}
			  }
	    	$("#pipeGrid").empty();
	        var table  = "<table id  = 'allPipeGrid' style='width:85%; margin-top: -10px;'></table>";
	        $("#pipeGrid").append(table);
			var tr = "";	
			var unique = [];
			var fidArr = [];
			for (var i = 0; i < features.length; i++) {
				var jsonobj = features[i].getProperties();
				var fids = jsonobj["FID"];
				var managers  = jsonobj["Manager"] !=null ? decodeURIComponent(jsonobj["Manager"]):"";
				if(unique.indexOf(managers) == -1) {
					unique.push(managers);
					fidArr.push(fids);
				  }
			}
		
	        $.each(unique, function (i, item) { 
	
				var initSelect = false;
				var manager  = item;
				var ds =i;
				var fid  = fidArr[i];
	        	var row = parseInt(i/3);
	        	if(i%3==0){//第二行第一格空着
	        		tr = "<tr id= 'allpg"+ row +"'  style='width: 100%;'></tr>";   
	        		$("#allPipeGrid").append(tr);
	        		// var td = "<td></td>" ;
	        		// $("#allpg"+row).append(td);
	        		
	        		var td2 = "<td><a class ='allPipeGrid' id='"+fid+"' href='#'>"+manager+"</a></td>";
	        		$("#allpg"+row).append(td2);
	        		$("#"+fid).linkbutton({
	        			width:'90px',
						plain :'true',
						selected : initSelect
	        		});
	        	}else{
	        		var td = "<td><a class ='allPipeGrid'  id= '"+fid+"' href='#'>"+manager+"</a></td>";
	        		$("#allpg"+row).append(td);
	        		$("#"+fid).linkbutton({
	        			width:'90px',
						plain :'true',
						selected : initSelect
	        		});
	        	}
	        });
	        $(".allPipeGrid").click(allPipeGridClick);
	    },
	    error:function(allPipeGrid){
	    }
	});
}


function allPipeGridClick(e){
	var pipeGrid = e.target.parentElement.parentElement.id;
	if(pipeGrid!=null){
		$(".allPipeGrid").linkbutton('unselect');
		$("#" + pipeGrid).linkbutton('select');

		//在地图上高亮显示该区级范围
		var layers = commonMap.IBase.getLayerByProperty(ecoMap,'title','OSB');
		var OSBId = e.target.parentElement.parentElement.id;
		var gridFeatures = locateGridRegion(ecoMap, layers[0], OSBId);
		layers = commonMap.IBase.getLayerByProperty(ecoMap,'title','OSB2');
		if(layers!=null){
			layers[0].getSource().clear();
			layers[0].getSource().addFeatures(gridFeatures);
		}

		if(parent.changeCurGrid != undefined){
			var name = e.target.parentElement.parentElement.innerText.replace("OSB","");
			parent.changeCurGrid(name);
		}
	}else{
		console.log("error");
	}
}


function locateGridRegion(map, OSBLayer, OSBId)
{
    var features = OSBLayer.getSource().getFeatures();
    var results = new Array();
    for (var i = 0; i < features.length; i++) {
		if (OSBId ==features[i].get('FID')) {
			results.push(features[i]);
		}
    }
	commonMap.IBase.zoomToFeatures(map, results, 14);
    return results;
}


