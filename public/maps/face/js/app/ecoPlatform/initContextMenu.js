
var selectClickControl,selectHoverControl;
//Initialize layer selection events
function initSelectInteraction() {
	//Mouse over event
	selectHoverControl = new ol.interaction.Select({
		multi: true,
		condition: ol.events.condition.pointerMove,
		layers: function(layer) {
			if (layer.get('hoverable') == true){
				return layer;
			}
		},
		style: function(feature, resolution){
			var layer = selectHoverControl.getLayer(feature);
			var stylefunc = layer.getStyleFunction();
			return stylefunc(feature, resolution, true);
		},
	});
	ecoMap.addInteraction(selectHoverControl);


	//Left mouse click event
	selectClickControl = new ol.interaction.Select({
		multi: true,
		condition: ol.events.condition.singleClick,
		hitTolerance: 2,
		layers: function(layer) {
			if ( layer.get('clickable') == true){
				return layer;
			}
		},
		style: function(feature, resolution){
			var layer = selectClickControl.getLayer(feature);
			var stylefunc = layer.getStyleFunction();
			return stylefunc(feature, resolution, true);
		},
	});
	ecoMap.addInteraction(selectClickControl);
	selectClickControl.on('select', SelectClickEvent);
}

//Left mouse click event
function SelectClickEvent(evt) {
	var features = 	selectClickControl.getFeatures().getArray(); 
	if (features.length>0){	
		getInfoContent(features);
		$("#expand").hide();
		$(".imgFold").show(300);
		$(".listBox").show(300);		
	} else {
		selectClickControl.getFeatures().clear();
		infoPopup.setPosition(undefined);
		if (parent.changeCurGrid != undefined){
			parent.changeCurGrid(initGridName);
		}
	}
}

function getInfoContent(features) {
	$("#list_tableBox").empty();
	if (features !=null){
	
			var jsonobj = features[0].getProperties();
			let tr = `<tr class="tr1"> <td class="td2" width="150"  Name="Num" EditType="TextBox">Attribute Name</td>  <td class="td3" width="250"  Name="Amount" EditType="TextBox">Value</td>  </tr>`
			$("#list_tableBox").append(tr);
			let tr1 = `<tr> <td class="td5" >OBJECTID</td> <td class="td6" >` + decodeURIComponent(jsonobj["OBJECTID"]) + `</td> </tr>`		
			$("#list_tableBox").append(tr1);
			let tr2 = `<tr> <td class="td5" >US_L4CODE</td> <td class="td6" >` + decodeURIComponent(jsonobj["US_L4CODE"]) + `</td> </tr>`		
			$("#list_tableBox").append(tr2);
			let tr3 = `<tr> <td class="td5" >US_L4NAME</td> <td class="td6" >` + decodeURIComponent(jsonobj["US_L4NAME"]) + `</td> </tr>`		
			$("#list_tableBox").append(tr3);
			let tr4 = `<tr> <td class="td5" >US_L3CODE</td> <td class="td6" >` + decodeURIComponent(jsonobj["US_L3CODE"]) + `</td> </tr>`		
			$("#list_tableBox").append(tr4);
			let tr5 = `<tr> <td class="td5" >US_L3NAME</td> <td class="td6" >` + decodeURIComponent(jsonobj["US_L3NAME"]) + `</td> </tr>`		
			$("#list_tableBox").append(tr5);
			let tr6 = `<tr> <td class="td5" >NA_L3CODE</td> <td class="td6" >` + decodeURIComponent(jsonobj["NA_L3CODE"]) + `</td> </tr>`		
			$("#list_tableBox").append(tr6);
			let tr7 = `<tr> <td class="td5" >NA_L3NAME</td> <td class="td6" >` + decodeURIComponent(jsonobj["NA_L3NAME"]) + `</td> </tr>`		
			$("#list_tableBox").append(tr7);
			let tr8 = `<tr> <td class="td5" >NA_L2CODE</td> <td class="td6" >` + decodeURIComponent(jsonobj["NA_L2CODE"]) + `</td> </tr>`		
			$("#list_tableBox").append(tr8);
			let tr9 = `<tr> <td class="td5" >NA_L2NAME</td> <td class="td6" >` + decodeURIComponent(jsonobj["NA_L2NAME"]) + `</td> </tr>`		
			$("#list_tableBox").append(tr9);
			let tr10 = `<tr> <td class="td5" >NA_L1CODE</td> <td class="td6" >` + decodeURIComponent(jsonobj["NA_L1CODE"]) + `</td> </tr>`		
			$("#list_tableBox").append(tr10);
			let tr11 = `<tr> <td class="td5" >NA_L1NAME</td> <td class="td6" >` + decodeURIComponent(jsonobj["NA_L1NAME"]) + `</td> </tr>`		
			$("#list_tableBox").append(tr11);
			let tr12 = `<tr> <td class="td5" >STATE_NAME</td> <td class="td6" >` + decodeURIComponent(jsonobj["STATE_NAME"]) + `</td> </tr>`		
			$("#list_tableBox").append(tr12);
			let tr13 = `<tr> <td class="td5" >Shape_Area</td> <td class="td6" >` + decodeURIComponent(jsonobj["Shape_Area"]) + `</td> </tr>`		
			$("#list_tableBox").append(tr13);
			let tr14 = `<tr> <td class="td5" >EPA_REGION</td> <td class="td6" >` + decodeURIComponent(jsonobj["EPA_REGION"]) + `</td> </tr>`		
			$("#list_tableBox").append(tr14);			
	}
}










