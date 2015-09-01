/**
 * Created by zoey on 2015/7/30.
 * email utf-8
 */
var nodemailer = require('nodemailer');
var _ = require('lodash');
var http =require('http');
var config = require('../config');
_SMSCACHE = {}
Auth = {}

/**
 * email send
 * @param email
 * @param cb
 */

Auth.email = function(obj,cb){
    var transporter = nodemailer.createTransport(config.email);

    var mailOptions = {
        from: 'yanzao-inc<'+config.email.auth.user+'>', // sender address
        to: obj.email, // list of receivers
        subject: obj.subject, // Subject line
        html: obj.content// plaintext body
    };

    transporter.sendMail(mailOptions, function(error, info){
        if(error){
            console.log(error);
            cb(error)
        }else{
            console.log('Message sent: ' + info.response);
            cb()
        }
    });
}

Auth.sms = function(phone,cb){
    var authnum =_.random(100000,999999);
    var content = authnum+"（验证码）如非本人操作，请忽略本短信，10分钟内有效"

    var MESSAGE_URL = config.sms.url+'&m='+phone+'&c='+content;
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
    httpReq.end();
}
/**
 *
 * @param phone
 * @param code
 * @returns {*}
 */
Auth.verifieSmsCode = function(phone,code){
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
module.exports=Auth;