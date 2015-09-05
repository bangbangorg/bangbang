/**
 * ����
 * Created by zoey on 2015/8/16.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var BaseSchema = new Schema({
    userId:{ type: Schema.Types.ObjectId , ref: 'user'},
    location1:{ type: ["number"], index: '2d', sparse: true },//Ŀ�ĵ�����
    location2:{ type: ["number"], index: '2d', sparse: true },//�ʹ������
    content:String,
    fee:Number,
    status:{type:Number , default:0},//0δ���� 10���˽ӵ�  20������ȷ����ѡ  50���  100ʧ��
    createdAt: {type:Date , default:Date.now},
    updatedAt : {type:Date , default:Date.now}
});
var Model = mongoose.model('order', BaseSchema,'order');

exports.create = function(obj,cb){
    Model.create(obj,cb)
}
exports.find = function(obj,cb){
    Model.find(obj,cb)
}