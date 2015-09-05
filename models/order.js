/**
 * 订单
 * Created by zoey on 2015/8/16.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var BaseSchema = new Schema({
    userId:{ type: Schema.Types.ObjectId , ref: 'user'},
    location1:{ type: ["number"], index: '2d', sparse: true },//目的地坐标
    location2:{ type: ["number"], index: '2d', sparse: true },//送达地坐标
    content:String,
    fee:Number,
    status:{type:Number , default:0},//0未接受 10有人接单  20发单人确定人选  50完成  100失败
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