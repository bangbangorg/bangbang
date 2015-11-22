/**
 * �û�
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
 * �ж��û��Ƿ����
 * @param username
 * @param cb
 */
exports.findOne = function(query,cb){
    Model.findOne(query,cb)
}
/**
 * ��ѯ���ݳ�ȥ����
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
 * ͨ��id ��ѯ�û�
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