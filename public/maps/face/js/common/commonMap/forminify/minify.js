var fs = require('fs');
var jsp = require("./uglify-js").parser;
var pro = require("./uglify-js").uglify;
 
function jsMinifier(flieIn, fileOut) {
     var flieIn=Array.isArray(flieIn)? flieIn : [flieIn];
     var origCode,ast,finalCode='';
     for(var i=0; i<flieIn.length; i++) {
        origCode = fs.readFileSync(flieIn[i], 'utf8');
        ast = jsp.parse(origCode);
        ast = pro.ast_mangle(ast);
        ast= pro.ast_squeeze(ast);
        finalCode +=';'+ pro.gen_code(ast);
     }
    fs.writeFileSync(fileOut, finalCode, 'utf8');
}
jsMinifier(['../commonMapIUtil.js','../commonMapIBase.js','../commonMapIDraw.js', '../commonMapIService.js','../commonMapIVecLayer.js','../commonMapILocate.js', '../commonMapIVisual.js', '../Button.js', '../MapToolBar.js' ], '../commonMap.js'); //�ϲ�ѹ��

