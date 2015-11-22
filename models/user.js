/**
 * 用户
 * Created by zoey on 2015/8/16.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var BaseSchema = new Schema({
    mobilePhoneNumber:String,
    password:String,
    userInfo:{
        name:String,
        sex:Number,
        avatar:String,//头像地址
        age:Number
    },
    orderInfo:{
        totalNum:Number,//接单数
        A:Number,//好评
        F:Number//差评
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

exports.findAndCreate = function(query,obj,cb){
    Model.findOne(query,function(err,doc){
        if(!doc){
            Model.create(obj,function(err,doc){
                cb(err,doc)
            });
        }else{
            cb(err,doc);
        }
    });
}
/**
 * 判断用户是否存在
 * @param username
 * @param cb
 */
exports.findOne = function(query,cb){
    Model.findOne(query,cb)
}
/**
 * 查询数据除去密码
 * @param param
 * @param cb
 */
exports.findOneNoPwd = function(param,cb){
    Model.findOne(param,function(err,doc){
        if(doc){
            try{
                doc = doc.toJSON()
                delete doc.password;
            }catch(err){
                console.log(err)
            }
        }
        cb(err,doc)
    })
}
/**
 * 通过id 查询用户
 * @param param
 * @param cb
 */
exports.findById = function(id,cb){
    Model.findById(id,cb)
}
exports.findByIdAndUpdate = function(id,obj,cb){
    obj.updatedAt=new Date();
    Model.findByIdAndUpdate(id,obj,function(err,doc){
        cb(err,{
            updatedAt:obj.updatedAt,
        })
    })
}
exports.update = function(query,obj,cb){
    Model.update(query,{$set:obj},cb)
}
/**
 * 好评
 * @param userId
 * @param cb
 */
exports.a = function(userId,cb){
    Model.update({_id:userId},{$inc:{orderInfo:{A:1}}},cb)
}

/**
 * 差评
 * @param userId
 * @param cb
 */
exports.f = function(userId,cb){
    Model.update({_id:userId},{$inc:{orderInfo:{F:1}}},cb)
}