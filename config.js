// var baseUrl = 'http://static.feiniu.com/static/js-build';
// var version = 20141219;
//if (location.host.indexOf('dev') == 0) {
//     //线上开发
//     baseUrl = 'http://dev.static.feiniu.com/static/js';
//     version = new Date().getTime();
// } else if(location.host.indexOf('preview') == 0) {
//     //预发
//     baseUrl = 'http://preview.static.feiniu.com/static/js-build';
// }

//var host = location.host;

// var basePath = "http://static.feiniu.com/static/js_build/";

// var version = 20150114;

// seajs 的简单配置
seajs.config({

  base: "./js",

  alias: {

    "jquery": "jquery-1.11.1"  //set jquery 类库别名

  }

});