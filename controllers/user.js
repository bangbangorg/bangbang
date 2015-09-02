/**
 * Created by zoey on 2015/8/11.
 */
var response = require("../common/response")
var User = require("../models/user")

exports.reg = function(req,res){
    User.create(req.query,function(err,rows){
        if(err){
            return res.json(response.buildError())
        }
        res.json(response.buildOK(rows))
    })
}

/**
 * ∫√∆¿
 * @param req
 * @param res
 */
exports.a = function(req,res){
    User.a(req.params.userId,function(err,rows){
        if(err){
            return res.json(response.buildError())
        }
        res.json(response.buildOK(rows))
    })
}

/**
 * ≤Ó∆¿
 * @param req
 * @param res
 */
exports.f = function(req,res){
    User.f(req.params.userId,function(err,rows){
        if(err){
            return res.json(response.buildError())
        }
        res.json(response.buildOK(rows))
    })
}