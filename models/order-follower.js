/**
 * 接单用户
 * Created by zoey on 2015/8/16.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var BaseSchema = new Schema({
    userId:{ type: Schema.Types.ObjectId , ref: 'user'},
    orderId: { type: Schema.Types.ObjectId , ref: 'order'},
    createdAt: {type:Date , default:Date.now},
    updatedAt : {type:Date , default:Date.now}
});

var Model = mongoose.model('order_follower', BaseSchema,'order_follower');

exports.create = function(obj,cb){
    Model.create(obj,cb)
}
exports.remove = function(obj,cb){
    Model.remove(obj,cb)
}