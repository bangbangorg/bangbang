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