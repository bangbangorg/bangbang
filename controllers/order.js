/**
 * Created by Cadbury on 2015/9/2.
 */
var response = require("../common/response")
var Order = require("../models/order")
var OrderFollower = require("../models/order-follower")

exports.create = function(req,res){
    Order.create(req.body,function(err,rows){
        if(err){
            return res.json(response.buildError())
        }
        res.json(response.buildOK(rows))
    })
}
exports.grab = function(req,res){
    OrderFollower.create(req.params,function(err,rows){
        if(err){
            return res.json(response.buildError())
        }
        res.json(response.buildOK(rows))
    })
}
exports.delGrab = function(req,res){
    OrderFollower.remove(req.params,function(err,rows){
        if(err){
            return res.json(response.buildError())
        }
        res.json(response.buildOK(rows))
    })
}
exports.find = function(obj,cb){
    Order.find({}, function (err, rows) {
        if (err) {
            return res.json(response.buildError())
        }
        res.json(response.buildOK(rows))
    })
}