let BasicFun = {};


BasicFun.deepClone = function (obj) {
  let _obj = JSON.stringify(obj),
    objClone = JSON.parse(_obj);
  return objClone
}

BasicFun.strFormat = function (format, ...args) {
  if (!format.match(/^(?:(?:(?:[^{}]|(?:\{\{)|(?:\}\}))+)|(?:\{[0-9]+\}))+$/)) {
    throw new Error('invalid format string.');
  }
  return format.replace(/((?:[^{}]|(?:\{\{)|(?:\}\}))+)|(?:\{([0-9]+)\})/g, (m, str, index) => {
    if (str) {
      return str.replace(/(?:{{)|(?:}})/g, m => m[0]);
    } else {
      if (index >= args.length) {
        throw new Error('argument index is out of range in format');
      }
      return args[index];
    }
  });
}


BasicFun.RGBtoHex = function (r, g, b) {
  let hex = r << 16 | g << 8 | b;
  return "#" + hex.toString(16);
}

BasicFun.HextoRGB = function (hexStr) {
  let hex = 0;
  if (hexStr.charAt(0) == "#") {
    if (hexStr.length == 4) {
    
      hexStr = "#" + hexStr.charAt(1).repeat(2) +
        hexStr.charAt(2).repeat(2) +
        hexStr.charAt(3).repeat(2);
    }
    hex = parseInt(hexStr.slice(1), 16);
  }
  let r = hex >> 16 & 0xFF;
  let g = hex >> 8 & 0xFF;
  let b = hex & 0xFF;
  let rgb = `rgb(${r},${g},${b})`;
  return rgb;
}

BasicFun.Str2Time = function (dateStr) {
  dateStr = dateStr.substring(0, 19);
  dateStr = dateStr.replace(/-/g, '/'); 
  var timestamp = new Date(dateStr).getTime();
  return timestamp;
}
