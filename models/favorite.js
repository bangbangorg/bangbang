/**
 * 订单收藏
 * Created by zoey on 2015/8/16.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var BaseSchema = new Schema({
    userId:{ type: Schema.Types.ObjectId , ref: 'user'},
    orderId: { type: Schema.Types.ObjectId , ref: 'order'},
    createdAt: {type:Date , default:Date.now}
});

var Model = mongoose.model('favorite', BaseSchema,'favorite');

exports.create = function(obj,cb){
    Model.create(obj,cb)
}
exports.cancel = function(obj,cb){
    Model.remove(obj,cb)
}
exports.findByUser = function(obj,cb){
    Model.find(obj,cb)
}
