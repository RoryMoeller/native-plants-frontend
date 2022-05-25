$(function () {

    app.initGlobal();
 
    initMap();
  
    if (["normal"].indexOf(Global.pageName) > -1) {
      loadGrid();
    }
  
  });
  