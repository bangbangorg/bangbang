/**
 * Created by llx on 2015/9/5.
 */
var response = require("../common/response")
var favorite = require("../models/favorite")

exports.collect = function(req,res){
    //req.params
    //{userId:xxx,orderId:yyy}
    favorite.create(req.params,function(err,rows){
        if(err){
            return res.json(response.buildError())
        }
        res.json(response.buildOK(rows))
    })
}
exports.cancel = function(req,res){
    favorite.cancel(req.params,function(err,rows){
        if(err){
            return res.json(response.buildError())
        }
        res.json(response.buildOK(rows))
    })
}
exports.find = function(req,res){
    //req.params
    //{userId:xxx}
    favorite.findByUser(req.params,function(err,rows){
        if(err){
            return res.json(response.buildError())
        }
        res.json(response.buildOK(rows))
    })
}
