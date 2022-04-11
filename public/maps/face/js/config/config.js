//固定变量
const config = {
  bigScreenMinHeight: 1500,
  activeValueMaxResolution: 160,

  version: "Service",

  map: {
    base: {
      map: {
        centerXY: [-118,40],
        extent: [-135, 18, -55, 51.6],
        zoomLevel: 5,
        maxZoom: 16,
        minZoom: 4,
      }
    },
    layerName: {
      OSB: "OSB",
      eco: "eco"
    }
  },

  IP: {
    geowebcacheServer: window.location.hostname + ":8090",
    parentHtmlServerIP: "http://" + window.location.hostname + ":8080",
  },

  Style: {
    textFont: {
      primary: "bold 36px 微软雅黑", 
      normal: "24px 微软雅黑", 
    },
    opacity: 0.2,
  },

  styleConfig: {
    bigScreen: {
      ratio: 2.5,
      fontSize: {
        big: 48,
        medium: 48,
        small: 36,
        minimal: 24,
      },
      fontFamily: "微软雅黑",
      fontBold: "bold",
      selectFontColor: "rgba(51, 133, 255, 0.6)",
      ChinaImgTextColor: "rgba(255, 255, 255)",
      commonMapTextColor: "rgba(70, 70, 70)"
    },
    pcScreen: {
      ratio: 0.6,
      fontSize: {
        big: 24,
        medium: 20,
        small: 16,
        minimal: 12,
      },
      fontFamily: "微软雅黑",
      fontBold: "",
      selectFontColor: "rgba(51, 133, 255, 0.6)",
      ChinaImgTextColor: "rgba(255, 255, 255)",
      commonMapTextColor: "rgba(70, 70, 70)"
    },
  },

  _purple: [214, 206, 227],
  _yellowish: [243, 253, 156],
  _orange: [242, 150, 51],
  _pink: [248, 182, 210],
  _yellow: [252, 220, 107],
  _grey: [235, 230, 220],

};

config.URL = {

  ecoLayer: "./data/data/west_coast_eco_l4.geojson",
  OSBLayer: "./data/data/OSB_Managed_Meadow_Habitat.geojson",
};
