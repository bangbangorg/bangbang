/**
 * �û�
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
        avatar:String,//ͷ���ַ
        age:Number
    },
    orderInfo:{
        totalNum:Number,//�ӵ���
        A:Number,//����
        F:Number//����
    },
    ewallet:{//����Ǯ��
        account:Number,//�˻����
        bankcard:String,//�����п�
        alipay:String//��֧�����ʺ�
    },
    //setting:{
    //    isReceivePush:Boolean//�Ƿ��������  ��1�����ڵĶ�����������
    //},
    createdAt: {type:Date , default:Date.now},
    updatedAt : {type:Date , default:Date.now}
});
var Model = mongoose.model('user', BaseSchema,'user');

exports.create = function(obj,cb){
    Model.create(obj,cb)
}
exports.modify = function(query,obj,cb){
    Model.update(query,{$set:obj},cb)
}
/**
 * ����
 * @param userId
 * @param cb
 */
exports.a = function(userId,cb){
    Model.update({_id:userId},{$inc:{orderInfo:{A:1}}},cb)
}

/**
 * ����
 * @param userId
 * @param cb
 */
exports.f = function(userId,cb){
    Model.update({_id:userId},{$inc:{orderInfo:{F:1}}},cb)
}