/**
 * Created by zoey on 2015/8/11.
 */
var response = require("../common/response")
var util = require("../common/util")
var User = require("../models/user")

exports.reg = function(req,res){
    req.body.password = util.createHash(req.body.password)
    User.create(req.body,function(err,rows){
        if(err){
            return res.json(response.buildError())
        }
        res.json(response.buildOK(rows))
    })
}
exports.login = function(req,res){
    User.findOne({phoneNo:req.body.phoneNo},function(err,doc){
        if(err){
            return res.json(response.buildError())
        }
        if(doc){
            //User exists but wrong password, log the error
            if (!util.isValidPassword(doc, password)){
                return res.json(response.buildError("Invalid Password"));
            }
            req.session.user = doc;
            doc = doc.toJSON()
            delete doc.password;
            res.json(response.buildOK(doc));
        }else{
            return res.json(response.buildError("User Not found."));
        }
    })
    res.json(response.buildOK())
}
exports.requestPasswordReset = function(req,res) {
    res.json(response.buildOK())
}
exports.modify = function(req,res){
    User.modify({_id:req.params.userId},req.body,function(err,docs){
        if(err){
            return res.json(response.buildError())
        }
        res.json(response.buildError())
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