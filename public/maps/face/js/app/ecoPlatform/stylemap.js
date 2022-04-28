
var OSBStyle = function (feature, resolution, select) {
  let parentId = feature.get('Manager');
  let fillcolor, defaultColor;
  switch (parentId) {
    case "Willapa NWR":
      defaultColor = [199,191,74,1];
      break;
    case "WDFW":
      defaultColor = [140,104,237,1];
      break;
    case "OPRD":
      defaultColor = [108,220,245,1];
      break;
    case "TNC":
      defaultColor = [184,77,81,1];
      break;
    case "CCRD":
      defaultColor = [62,171,80];
      break;
    case "California":
      defaultColor = [245,157,224];
      break;
      case "HRD":
      defaultColor = [84,119,171];
      break;
    case "NCLC":
      defaultColor = [125,148,99];
      break;
    case "NPS":
      defaultColor = [250,184,157];
      break;
    case "Nestucca NWR":
      defaultColor = [133,52,118];
      break;
    case "BLM":
      defaultColor = [250,184,157];
      break;
    default:
      defaultColor = [227,164,86];
      break;
  }
  fillcolor = (feature.get('color') && feature.get('color') != '') ? feature.get('color') : defaultColor;

  var style = new ol.style.Style({
    stroke: new ol.style.Stroke({
      color: '#C9BFA7',
      opacity: select ? 0.8 : 0.5,
      width: select ? 3 : 0.5,
    }),
    fill: new ol.style.Fill({
      color: fillcolor,
      opacity: select ? 0.8 : 0.5,
    })
  });
  var label = feature.get('value') ? feature.get('value') : '';
  var textStyle = new ol.style.Style({
    geometry: function (feature) { //For multipolygon, only the largest polygon is labeled
      var geometry = feature.getGeometry();
      if (geometry.getType() == 'MultiPolygon') {
        var polygons = geometry.getPolygons();
        var widest = 0;
        for (var i = 0, ii = polygons.length; i < ii; ++i) {
          var polygon = polygons[i];
          var width = ol.extent.getWidth(polygon.getExtent());
          if (width > widest) {
            widest = width;
            geometry = polygon;
          }
        }
      }
      return geometry;
    },
    text: new ol.style.Text({
      overflow: true,
      text: feature.get('Manager') ? feature.get('Manager') : '',
      fill: new ol.style.Fill({
        color: '#000'
      }),
      stroke: new ol.style.Stroke({
        color: '#fff',
        width: 3
      })
    })
  });
  return [style, textStyle];
}

var ecoL4Style = function (feature, resolution, select) {
  let parentId = feature.get('US_L4CODE');
  let fillcolor, defaultColor;
  switch (parentId) {
    case "10a":
      defaultColor = [224,126,90,1];
      break;
    case "10b":
      defaultColor = [140,104,237,1];
      break;
    case "10c":
      defaultColor = [108,220,245,1];
      break;
    case "10d":
      defaultColor = [184,77,81,1];
      break;
    case "10e":
      defaultColor = [62,171,80];
      break;
    case "10f":
      defaultColor = [245,157,224];
      break;
      case "10g":
      defaultColor = [84,119,171];
      break;
    case "10i":
      defaultColor = [125,148,99];
      break;
    case "10k":
      defaultColor = [250,184,157];
      break;
    case "10m":
      defaultColor = [133,52,118];
      break;
    case "10n":
      defaultColor = [250,184,157];
      break;
    case "11a":
      defaultColor = [235,87,232];
      break;
      case "11b":
      defaultColor = [148,101,56];
      break;
    case "11c":
      defaultColor = [178,242,143];
      break;
    case "11h":
      defaultColor = [97,250,97];
      break;
    case "11k":
      defaultColor = [53,56,140];
      break;
    case "11n":
      defaultColor = [52,130,133];
      break;
    case "11o":
      defaultColor = [153,103,128];
      break;
    case "13aa":
      defaultColor = [84,235,177];
      break;
      case "13ab":
      defaultColor = [224,126,90,1];
      break;
    case "13ac":
      defaultColor = [140,104,237,1];
      break;
    case "13ad":
      defaultColor = [108,220,245,1];
      break;
    case "13ae":
      defaultColor = [184,77,81,1];
      break;
    case "13h":
      defaultColor = [62,171,80];
      break;
    case "13u":
      defaultColor = [245,157,224];
      break;
      case "13v":
      defaultColor = [84,119,171];
      break;
    case "13x":
      defaultColor = [125,148,99];
      break;
    case "13y":
      defaultColor = [250,184,157];
      break;
    case "14e":
      defaultColor = [133,52,118];
      break;
    case "14f":
      defaultColor = [250,184,157];
      break;
    case "14g":
      defaultColor = [235,87,232];
      break;
      case "14h":
      defaultColor = [148,101,56];
      break;
    case "14i":
      defaultColor = [178,242,143];
      break;
    case "14j":
      defaultColor = [97,250,97];
      break;
    case "14k":
      defaultColor = [53,56,140];
      break;
    case "14l":
      defaultColor = [52,130,133];
      break;
    case "14m":
      defaultColor = [153,103,128];
      break;
    case "14n":
      defaultColor = [84,235,177];
      break;
    case "14o":
      defaultColor = [224,126,90,1];
      break;
    case "15g":
      defaultColor = [140,104,237,1];
      break;
    case "15r":
      defaultColor = [108,220,245,1];
      break;
    case "15x":
      defaultColor = [184,77,81,1];
      break;
    case "1a":
      defaultColor = [62,171,80];
      break;
    case "1b":
      defaultColor = [245,157,224];
      break;
      case "1c":
      defaultColor = [84,119,171];
      break;
    case "1d":
      defaultColor = [125,148,99];
      break;
    case "1e":
      defaultColor = [250,184,157];
      break;
    case "1f":
      defaultColor = [133,52,118];
      break;
    case "1g":
      defaultColor = [250,184,157];
      break;
    case "1h":
      defaultColor = [235,87,232];
      break;
      case "1i":
      defaultColor = [148,101,56];
      break;
    case "1j":
      defaultColor = [178,242,143];
      break;
    case "1k":
      defaultColor = [97,250,97];
      break;
    case "1l":
      defaultColor = [53,56,140];
      break;
    case "1i":
      defaultColor = [52,130,133];
      break;
    case "1j":
      defaultColor = [153,103,128];
      break;
    case "1k":
      defaultColor = [84,235,177];
      break;
    case "1l":
      defaultColor = [224,126,90,1];
      break;
    case "1m":
      defaultColor = [140,104,237,1];
      break;
    case "1n":
      defaultColor = [108,220,245,1];
      break;
    case "1o":
      defaultColor = [184,77,81,1];
      break;
    case "2a":
      defaultColor = [62,171,80];
      break;
    case "2b":
      defaultColor = [245,157,224];
      break;
      case "2c":
      defaultColor = [84,119,171];
      break;
    case "2d":
      defaultColor = [125,148,99];
      break;
    case "2e":
      defaultColor = [250,184,157];
      break;
    case "2f":
      defaultColor = [133,52,118];
      break;
    case "2g":
      defaultColor = [250,184,157];
      break;
    case "2h":
      defaultColor = [235,87,232];
      break;
    case "2i":
      defaultColor = [148,101,56];
      break;
    case "3a":
      defaultColor = [178,242,143];
      break;
    case "3b":
      defaultColor = [97,250,97];
      break;
    case "3c":
      defaultColor = [53,56,140];
      break;
    case "3d":
      defaultColor = [52,130,133];
      break;
    case "4a":
      defaultColor = [153,103,128];
      break;
    case "4b":
      defaultColor = [84,235,177];
      break;
    case "4c":
      defaultColor = [224,126,90,1];
      break;
    case "4d":
      defaultColor = [140,104,237,1];
      break;
    case "4e":
      defaultColor = [108,220,245,1];
      break;
    case "4f":
      defaultColor = [184,77,81,1];
      break;
    case "4g":
      defaultColor = [62,171,80];
      break;
    case "4h":
      defaultColor = [245,157,224];
      break;
      case "5a":
      defaultColor = [84,119,171];
      break;
    case "5b":
      defaultColor = [125,148,99];
      break;
    case "5c":
      defaultColor = [250,184,157];
      break;
    case "5d":
      defaultColor = [133,52,118];
      break;
    case "5e":
      defaultColor = [250,184,157];
      break;
    case "5f":
      defaultColor = [235,87,232];
      break;
      case "5g":
      defaultColor = [148,101,56];
      break;
    case "5h":
      defaultColor = [178,242,143];
      break;
    case "5i":
      defaultColor = [97,250,97];
      break;
    case "5j":
      defaultColor = [53,56,140];
      break;
    case "5k":
      defaultColor = [52,130,133];
      break;
    case "5l":
      defaultColor = [153,103,128];
      break;
    case "5m":
      defaultColor = [84,235,177];
      break;
    case "5n":
      defaultColor = [224,126,90,1];
      break;
    case "5o":
      defaultColor = [140,104,237,1];
      break;
    case "6a":
      defaultColor = [108,220,245,1];
      break;
    case "6aa":
      defaultColor = [184,77,81,1];
      break;
    case "6ab":
      defaultColor = [62,171,80];
      break;
    case "6ac":
      defaultColor = [245,157,224];
      break;
      case "6ad":
      defaultColor = [84,119,171];
      break;
    case "6ae":
      defaultColor = [125,148,99];
      break;
    case "6af":
      defaultColor = [250,184,157];
      break;
    case "6ag":
      defaultColor = [133,52,118];
      break;
    case "6ah":
      defaultColor = [250,184,157];
      break;
    case "6ai":
      defaultColor = [235,87,232];
      break;
      case "6aj":
      defaultColor = [148,101,56];
      break;
    case "6ak":
      defaultColor = [178,242,143];
      break;
    case "6al":
      defaultColor = [97,250,97];
      break;
    case "6am":
      defaultColor = [53,56,140];
      break;
    case "6an":
      defaultColor = [52,130,133];
      break;
    case "6ao":
      defaultColor = [153,103,128];
      break;
    case "6ap":
      defaultColor = [84,235,177];
      break;
    case "6aq":
      defaultColor = [224,126,90,1];
      break;
    case "6ar":
      defaultColor = [140,104,237,1];
      break;
    case "6b":
      defaultColor = [108,220,245,1];
      break;
    case "6d":
      defaultColor = [184,77,81,1];
      break;
    case "6c":
      defaultColor = [62,171,80];
      break;
    case "6e":
        defaultColor = [84,119,171];
        break;
    case "6f":
      defaultColor = [245,157,224];
      break;
    case "6g":
      defaultColor = [84,119,171];
      break;
    case "6h":
      defaultColor = [84,119,171];
      break;
    case "6i":
      defaultColor = [125,148,99];
      break;
    case "6k":
      defaultColor = [250,184,157];
      break;
    case "6j":
      defaultColor = [133,52,118];
      break;
    case "6n":
      defaultColor = [250,184,157];
      break;
    case "6k":
      defaultColor = [235,87,232];
      break;
    case "6l":
      defaultColor = [148,101,56];
      break;
    case "6m":
      defaultColor = [178,242,143];
      break;
    case "6o":
      defaultColor = [97,250,97];
      break;
    case "6p":
      defaultColor = [53,56,140];
      break;
    case "6q":
      defaultColor = [52,130,133];
      break;
    case "6r":
      defaultColor = [153,103,128];
      break;
    case "6s":
      defaultColor = [84,235,177];
      break;
      case "6t":
      defaultColor = [224,126,90,1];
      break;
    case "6u":
      defaultColor = [140,104,237,1];
      break;
    case "6v":
      defaultColor = [108,220,245,1];
      break;
    case "6w":
      defaultColor = [184,77,81,1];
      break;
    case "6x":
      defaultColor = [62,171,80];
      break;
    case "6y":
      defaultColor = [245,157,224];
      break;
      case "6z":
      defaultColor = [84,119,171];
      break;
    case "77a":
      defaultColor = [125,148,99];
      break;
    case "77b":
      defaultColor = [250,184,157];
      break;
    case "77c":
      defaultColor = [133,52,118];
      break;
    case "77d":
      defaultColor = [250,184,157];
      break;
    case "77e":
      defaultColor = [235,87,232];
      break;
      case "77f":
      defaultColor = [148,101,56];
      break;
    case "77g":
      defaultColor = [178,242,143];
      break;
    case "77h":
      defaultColor = [97,250,97];
      break;
    case "77i":
      defaultColor = [53,56,140];
      break;
    case "78a":
      defaultColor = [52,130,133];
      break;
    case "78b":
      defaultColor = [153,103,128];
      break;
    case "78c":
      defaultColor = [84,235,177];
      break;
      case "78d":
      defaultColor = [224,126,90,1];
      break;
    case "78e":
      defaultColor = [140,104,237,1];
      break;
    case "78f":
      defaultColor = [108,220,245,1];
      break;
    case "78g":
      defaultColor = [184,77,81,1];
      break;
    case "78h":
      defaultColor = [62,171,80];
      break;
    case "78i":
      defaultColor = [245,157,224];
      break;
      case "78j":
      defaultColor = [84,119,171];
      break;
    case "78k":
      defaultColor = [125,148,99];
      break;
    case "78l":
      defaultColor = [250,184,157];
      break;
    case "78m":
      defaultColor = [133,52,118];
      break;
    case "78n":
      defaultColor = [250,184,157];
      break;
    case "78o":
      defaultColor = [235,87,232];
      break;
      case "78p":
      defaultColor = [148,101,56];
      break;
    case "78q":
      defaultColor = [178,242,143];
      break;
    case "78r":
      defaultColor = [97,250,97];
      break;
    case "7a":
      defaultColor = [53,56,140];
      break;
    case "7b":
      defaultColor = [52,130,133];
      break;
    case "7c":
      defaultColor = [153,103,128];
      break;
    case "7d":
      defaultColor = [84,235,177];
      break;
      case "7e":
      defaultColor = [224,126,90,1];
      break;
    case "7f":
      defaultColor = [140,104,237,1];
      break;
    case "7g":
      defaultColor = [108,220,245,1];
      break;
    case "7h":
      defaultColor = [184,77,81,1];
      break;
    case "7j":
      defaultColor = [62,171,80];
      break;
    case "7k":
      defaultColor = [245,157,224];
      break;
      case "7l":
      defaultColor = [84,119,171];
      break;
    case "7m":
      defaultColor = [125,148,99];
      break;
    case "7n":
      defaultColor = [250,184,157];
      break;
    case "7o":
      defaultColor = [133,52,118];
      break;
    case "7p":
      defaultColor = [250,184,157];
      break;
    case "7q":
      defaultColor = [235,87,232];
      break;
      case "7r":
      defaultColor = [148,101,56];
      break;
    case "7s":
      defaultColor = [178,242,143];
      break;
    case "7t":
      defaultColor = [97,250,97];
      break;
    case "7u":
      defaultColor = [53,56,140];
      break;
    case "7v":
      defaultColor = [52,130,133];
      break;
    case "80d":
      defaultColor = [153,103,128];
      break;
    case "80g":
      defaultColor = [84,235,177];
      break;
      case "80l":
      defaultColor = [224,126,90,1];
      break;
    case "80m":
      defaultColor = [140,104,237,1];
      break;
    case "81a":
      defaultColor = [108,220,245,1];
      break;
    case "81b":
      defaultColor = [184,77,81,1];
      break;
    case "81c":
      defaultColor = [62,171,80];
      break;
    case "81d":
      defaultColor = [245,157,224];
      break;
      case "81e":
      defaultColor = [84,119,171];
      break;
    case "81f":
      defaultColor = [125,148,99];
      break;
    case "81g":
      defaultColor = [250,184,157];
      break;
    case "81h":
      defaultColor = [133,52,118];
      break;
    case "81i":
      defaultColor = [250,184,157];
      break;
    case "81j":
      defaultColor = [235,87,232];
      break;
    case "81k":
      defaultColor = [148,101,56];
      break;
    case "85a":
      defaultColor = [178,242,143];
      break;
    case "85b":
      defaultColor = [97,250,97];
      break;
    case "85c":
      defaultColor = [53,56,140];
      break;
    case "85d":
      defaultColor = [52,130,133];
      break;
    case "85e":
      defaultColor = [153,103,128];
      break;
    case "85f":
      defaultColor = [84,235,177];
      break;
    case "85g":
      defaultColor = [224,126,90,1];
      break;
    case "85h":
      defaultColor = [140,104,237,1];
      break;
    case "85i":
      defaultColor = [108,220,245,1];
      break;
    case "85j":
      defaultColor = [184,77,81,1];
      break;
    case "85k":
      defaultColor = [62,171,80];
      break;
    case "85l":
      defaultColor = [245,157,224];
      break;
      case "85m":
      defaultColor = [84,119,171];
      break;
    case "8a":
      defaultColor = [125,148,99];
      break;
    case "8b":
      defaultColor = [250,184,157];
      break;
    case "8c":
      defaultColor = [133,52,118];
      break;
    case "8d":
      defaultColor = [250,184,157];
      break;
    case "8e":
      defaultColor = [235,87,232];
      break;
    case "8f":
      defaultColor = [148,101,56];
      break;
    case "8g":
      defaultColor = [178,242,143];
      break;
    case "9a":
      defaultColor = [97,250,97];
      break;
    case "9b":
      defaultColor = [53,56,140];
      break;
    case "9c":
      defaultColor = [52,130,133];
      break;
    case "9d":
      defaultColor = [153,103,128];
      break;
    case "9e":
      defaultColor = [84,235,177];
      break;
      case "9f":
      defaultColor = [224,126,90,1];
      break;
    case "9g":
      defaultColor = [140,104,237,1];
      break;
    case "9h":
      defaultColor = [108,220,245,1];
      break;
    case "9i":
      defaultColor = [184,77,81,1];
      break;
    case "9j":
      defaultColor = [62,171,80];
      break;
    case "9k":
      defaultColor = [245,157,224];
      break;
      case "9l":
      defaultColor = [84,119,171];
      break;
    case "9m":
      defaultColor = [125,148,99];
      break;
    case "9n":
      defaultColor = [250,184,157];
      break;
    case "9o":
      defaultColor = [133,52,118];
      break;
    case "9p":
      defaultColor = [250,184,157];
      break;
    case "9q":
      defaultColor = [235,87,232];
      break;
    case "9r":
      defaultColor = [148,101,56];
      break;
    case "9s":
      defaultColor = [178,242,143];
      break;
    default:
      defaultColor = [227,164,86];
      break;
  }
  fillcolor = (feature.get('color') && feature.get('color') != '') ? feature.get('color') : defaultColor;

  var style = new ol.style.Style({
    stroke: new ol.style.Stroke({
      color: '#C9BFA7',
      opacity: select ? 0.8 : 0.5,
      width: select ? 3 : 0.5,
    }),
    fill: new ol.style.Fill({
      color: fillcolor,
      opacity: select ? 0.8 : 0.5,
    })
  });
  var label = feature.get('value') ? feature.get('value') : '';
  var textStyle = new ol.style.Style({
    geometry: function (feature) { //For multipolygon, only the largest polygon is labeled
      var geometry = feature.getGeometry();
      if (geometry.getType() == 'MultiPolygon') {
        var polygons = geometry.getPolygons();
        var widest = 0;
        for (var i = 0, ii = polygons.length; i < ii; ++i) {
          var polygon = polygons[i];
          var width = ol.extent.getWidth(polygon.getExtent());
          if (width > widest) {
            widest = width;
            geometry = polygon;
          }
        }
      }
      return geometry;
    },
    text: new ol.style.Text({
      overflow: true,
      text: feature.get('US_L4CODE') ? feature.get('US_L4CODE') : '',
      fill: new ol.style.Fill({
        color: '#000'
      }),
      stroke: new ol.style.Stroke({
        color: '#fff',
        width: 3
      })
    })
  });
  return [style, textStyle];
}

var gridStyle = function (feature, resolution, select) {
  let parentId = feature.get('US_L3CODE');
  let fillcolor, defaultColor;
  switch (parentId) {
    case "1":
      defaultColor = [199,191,74,1];
      break;
    case "2":
      defaultColor = [140,104,237,1];
      break;
    case "3":
      defaultColor = [108,220,245,1];
      break;
    case "4":
      defaultColor = [184,77,81,1];
      break;
    case "5":
      defaultColor = [62,171,80];
      break;
    case "6":
      defaultColor = [245,157,224];
      break;
      case "7":
      defaultColor = [84,119,171];
      break;
    case "8":
      defaultColor = [125,148,99];
      break;
    case "9":
      defaultColor = [250,184,157];
      break;
    case "10":
      defaultColor = [133,52,118];
      break;
    case "11":
      defaultColor = [250,184,157];
      break;
    case "77":
      defaultColor = [235,87,232];
      break;
      case "13":
      defaultColor = [148,101,56];
      break;
    case "14":
      defaultColor = [178,242,143];
      break;
    case "15":
      defaultColor = [97,250,97];
      break;
    case "78":
      defaultColor = [53,56,140];
      break;
    case "80":
      defaultColor = [52,130,133];
      break;
    case "81":
      defaultColor = [153,103,128];
      break;
      case "85":
      defaultColor = [84,235,177];
      break;
    default:
      defaultColor = [227,164,86];
      break;
  }
  fillcolor = (feature.get('color') && feature.get('color') != '') ? feature.get('color') : defaultColor;

  var style = new ol.style.Style({
    stroke: new ol.style.Stroke({
      color: '#C9BFA7',
      opacity: select ? 0.8 : 0.5,
      width: select ? 3 : 0.5,
    }),
    fill: new ol.style.Fill({
      color: fillcolor,
      opacity: select ? 0.8 : 0.5,
    })
  });
  var label = feature.get('value') ? feature.get('value') : '';
  var textStyle = new ol.style.Style({
    geometry: function (feature) { //对multipolygon仅标注最大的多边形
      var geometry = feature.getGeometry();
      if (geometry.getType() == 'MultiPolygon') {
        var polygons = geometry.getPolygons();
        var widest = 0;
        for (var i = 0, ii = polygons.length; i < ii; ++i) {
          var polygon = polygons[i];
          var width = ol.extent.getWidth(polygon.getExtent());
          if (width > widest) {
            widest = width;
            geometry = polygon;
          }
        }
      }
      return geometry;
    },
    text: new ol.style.Text({
      overflow: true,
      text: feature.get('US_L3CODE') ? feature.get('US_L3CODE') : '',
      fill: new ol.style.Fill({
        color: '#000'
      }),
      stroke: new ol.style.Stroke({
        color: '#fff',
        width: 3
      })
    })
  });
  return [style, textStyle];
}

var ecoStyle = function (feature, resolution, select) {
  
  var shadowStyle = new ol.style.Style({
    stroke: new ol.style.Stroke({
      color: [140, 186, 133, 0.15],
      width: select ? 3 : 0.5,
    }),
    zIndex: 1
  });
  var countryStyle = new ol.style.Style({
    stroke: new ol.style.Stroke({
      //color: [161, 131, 182, 0.8],
      color: [0, 116, 192, 0.8],
      width: select ? 3 : 0.5,
      lineCap: 'round',
      // lineDash: [5, 2]
    }),
    zIndex: 2
  });
  var textStyle = new ol.style.Style({
    geometry: function (feature) { //For multipolygon, only the largest polygon is labeled
      var geometry = feature.getGeometry();
      if (geometry.getType() == 'MultiPolygon') {
        var polygons = geometry.getPolygons();
        var widest = 0;
        for (var i = 0, ii = polygons.length; i < ii; ++i) {
          var polygon = polygons[i];
          var width = ol.extent.getWidth(polygon.getExtent());
          if (width > widest) {
            widest = width;
            geometry = polygon;
          }
        }
      }
      return geometry;
    },
    text: new ol.style.Text({
      overflow: true,
      text: feature.get('US_L3CODE') ? feature.get('US_L3CODE') : '',
      fill: new ol.style.Fill({
        color: '#000'
      }),
      stroke: new ol.style.Stroke({
        color: '#fff',
        width: 3
      })
    })
  });
  return [shadowStyle, countryStyle,textStyle];
}

var regionStyle = function (feature, resolution, select) {
  var shadowStyle = new ol.style.Style({
    stroke: new ol.style.Stroke({
      color: [140, 186, 133, 0.15],
      width: 2
    }),
    zIndex: 1
  });
  var countryStyle = new ol.style.Style({
    stroke: new ol.style.Stroke({
      //color: [161, 131, 182, 0.8],
      color: [0, 116, 192, 0.8],
      width: 1,
      lineCap: 'round',
      lineDash: [5, 2]
    }),
    zIndex: 2
  });
  return [shadowStyle, countryStyle];
}

$("#mgmt").click(mgmtClick);

function mgmtClick() {
  $.ajax({
    type : "GET",
    url : config.URL.OSBLayer,
    dataType : "json",
    success : function(result) {
      if(result.features!=null){
        if(result.features.length!=0){
          var features = (new ol.format.GeoJSON()).readFeatures(result,{
            dataProjection: 'EPSG:4326',
            featureProjection: 'EPSG:3857'
          });

          commonMap.IBase.zoomToFeatures(ecoMap,features,16);
          //(features, 9000);
          // flashFeatures(features,9000);
        }
      }
    },
    error:function (xhr){//XMLHttpRequest, textSt
      atus, errorThrown
      console.log("error");
      }
  });

}


