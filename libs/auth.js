/**
 * Created by zoey on 2015/7/30.
 * 特别注意请在 ../config文件内配置sms.url
 */
var http =require('http');
var config = require('../config');
_SMSCACHE = {}
LJ.Auth = {}

LJ.Auth.sms = function(phone,cb){
    var authnum =LJ._.random(100000,999999);
    var content = authnum+"（验证码）如非本人操作，请忽略本短信，10分钟内有效"

    _SMSCACHE[phone] = {
        authnum:authnum,
        timestamp:new Date().getTime()
    }
    console.log("authnum="+authnum)
    cb(null,authnum)

    /*var MESSAGE_URL = config.sms.url+'&m='+phone+'&c='+content;
    console.log(MESSAGE_URL)
    var httpReq = http.request(MESSAGE_URL, function (result) {
        result.on('data', function (chunk) {
            if(chunk>=0){
                _SMSCACHE[phone] = {
                    authnum:authnum,
                    timestamp:new Date().getTime()
                }
                cb(null,authnum)
            }
            console.log('BODY: ' + chunk);
        });
        result.on('error', function (err) {
            cb(err)
        });
    });
    httpReq.end();*/
}
/**
 *验证验证码是否有效
 * @param phone
 * @param code
 * @returns {*}
 */
LJ.Auth.verifieSmsCode = function(phone,code){
    var now = new Date().getTime();
    if(_SMSCACHE[phone]){
        console.log(_SMSCACHE[phone])
        if(now - _SMSCACHE[phone].timestamp < 1000 * 60 *10){
            return code == _SMSCACHE[phone].authnum
        }else{
            delete _SMSCACHE[phone]
        }
    }
    return null;
}
module.exports = LJ.Auth;