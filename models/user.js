/**
 * 用户
 * Created by zoey on 2015/8/16.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var BaseSchema = new Schema({
    phoneNo:String,
    password:String,
    userInfo:{
        name:String,
        sex:Number,
        avatar:String,//头像地址
        age:Number
    },
    orderInfo:{
        totalNum:Number,//接单数
        A:String,//好评
        F:String//差评
    },
    ewallet:{//电子钱包
        account:Number,//账户余额
        bankcard:String,//绑定银行卡
        alipay:String//绑定支付宝帐号
    },
    //setting:{
    //    isReceivePush:Boolean//是否接收推送  近1公里内的订单主动推送
    //},
    createdAt: {type:Date , default:Date.now},
    updatedAt : {type:Date , default:Date.now}
});
var Model = mongoose.model('user', BaseSchema,'user');

exports.create = function(obj,cb){
    Model.create(obj,cb)
}

/**
 * 好评
 * @param userId
 * @param cb
 */
exports.a = function(userId,cb){
    Model.update({_id:userId},{$inc:{A:1}},cb)
}

/**
 * 差评
 * @param userId
 * @param cb
 */
exports.f = function(userId,cb){
    Model.update({_id:userId},{$inc:{F:1}},cb)
}