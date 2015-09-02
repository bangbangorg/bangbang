/**
 * Created by Cadbury on 2015/9/2.
 */
var response = require("../common/response")
var Order = require("../models/order")

exports.grab = function(req,res){
    Order.create(req.query,function(err,rows){
        if(err){
            return res.json(response.buildError())
        }
        res.json(response.buildOK(rows))
    })
}