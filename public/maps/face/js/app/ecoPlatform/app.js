let app = {};

app.intiConfig = function () {
    commonMap.IUtil.serverInfo = new Map();
}

app.initGlobal = function () {
    Global.config = config;

    var heigtht = window.innerHeight;
    if (heigtht >= config.bigScreenMinHeight) {
        Global.styleConfig = BasicFun.deepClone(config.styleConfig.bigScreen);
    }
    else {
        Global.styleConfig = BasicFun.deepClone(config.styleConfig.pcScreen);
    }
}