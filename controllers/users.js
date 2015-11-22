/**
 * Created by zoey on 2015/8/11.
 */
var User = require("../models/user")

exports.login=function (req, res) {
    var query=req.query;
    if(query.hasOwnProperty('mobilePhoneNumber')&&query.hasOwnProperty('smsCode')){
        if(!LJ.Auth.verifieSmsCode(query.mobilePhoneNumber,query.smsCode)){
            return res.json(LJ.Res.buildError("smsCode error"));
        }
        User.findOne({mobilePhoneNumber:query.mobilePhoneNumber},function(err,doc){
            if(err){
                return res.json(LJ.Res.buildError(err));
            }
            if(doc){
                req.session.user = doc;
                doc = doc.toJSON()
                delete doc.password;
                res.json(LJ.Res.buildOK(doc));
            }else{
                return res.json(LJ.Res.buildError("User Not found."));
            }
        })
    }else if(query.hasOwnProperty('mobilePhoneNumber')&&query.hasOwnProperty('password')){
        var password = req.query.password
        User.findOne({mobilePhoneNumber:query.mobilePhoneNumber},function(err,doc){
            if(err){
                return res.json(LJ.Res.buildError(err));
            }
            if(doc){
                if (!LJ.Bcrypt.isValid(doc.password, password)){
                    return res.json(LJ.Res.buildError("Invalid Password"));
                }
                req.session.user = doc;
                doc = doc.toJSON()
                delete doc.password;
                res.json(LJ.Res.buildOK(doc));
            }else{
                return res.json(LJ.Res.buildError("User Not found."));
            }
        });
    }else{
        return res.json(LJ.Res.buildError("mobilePhoneNumber and password required"));
    }
};
/**
 * ʹ���ֻ�����һ��ע����¼
 * @param req
 * @param res
 * @returns {*}
 */
exports.usersByMobilePhone=function (req, res) {
    var body=req.body;
    if(LJ.Res.checkRequire(['mobilePhoneNumber','smsCode'],body,res)){
        return
    }
    if(!LJ.Auth.verifieSmsCode(body.mobilePhoneNumber,body.smsCode)){
        return res.json(LJ.Res.buildError("smsCode error"));
    }
    User.findAndCreate({mobilePhoneNumber:body.mobilePhoneNumber},{userInfo:{name:body.mobilePhoneNumber},mobilePhoneNumber:body.mobilePhoneNumber},function(err,doc){
        if(err){
            return res.json(LJ.Res.buildError(err));
        }
        if(doc){
            req.session.user = doc;
            res.json(LJ.Res.buildOK(doc));
        }
    })
};
/**
 * ���Ͷ���/������֤��
 * @param req
 * @param res
 * @returns {*}
 */
exports.requestSmsCode=function (req, res) {
    var body=req.body;
    if(LJ.Res.checkRequire(['mobilePhoneNumber'],body,res)){
        return
    }
    LJ.Auth.sms(body.mobilePhoneNumber,function(err){
        LJ.Res.buildCallback(err,null,res,"���Ͷ���ʧ��")
    })
};
/**
 * ��ȡ�û�
 * @param req
 * @param res
 * @returns {*}
 */
exports.findById=function (req, res) {
    User.findOneNoPwd({_id:req.params.uid},function(err,doc){
        LJ.Res.buildCallback(err,doc,res,"��ȡ�û�ʧ��")
    })
};
/**
 * �����û�
 * @param req
 * @param res
 * @returns {*}
 */
exports.update=function (req, res) {
    User.findByIdAndUpdate(req.params.uid,req.body,function(err,doc){
        LJ.Res.buildCallback(err,doc,res,"�����û�ʧ��")
    })
};
/**
 * ��ȫ���޸��û�����
 * @param req
 * @param res
 * @returns {*}
 */
exports.updatePassword=function (req, res) {
    var body=req.body;
    if(LJ.Res.checkRequire(['old_password','new_password'],body,res)){
        return
    }
    User.findById(req.params.uid,function(err,doc){
        if(err){
            return res.json(LJ.Res.buildError(err));
        }
        if(doc){
            if(doc.password && LJ.Bcrypt.isValid(doc.password,req.body.old_password)){
                var new_password = LJ.Bcrypt.createHash(req.body.new_password);
                User.findByIdAndUpdate(req.params.uid,{password:new_password},function(err,doc){
                    if(err){
                        return res.json(LJ.Res.buildError(err));
                    }
                    res.json(LJ.Res.buildOK());
                })
            }else{
                return res.json(LJ.Res.buildError("Invalid old Password"));
            }
        }
    })
};
/**
 * ʹ�ö�����֤�������û�����
 * @param req
 * @param res
 * @returns {*}
 */
exports.requestPasswordResetBySmsCode=function (req, res) {
    var body=req.body;
    if(LJ.Res.checkRequire(['mobilePhoneNumber'],body,res)){
        return
    }
    User.findOne({mobilePhoneNumber:req.body.mobilePhoneNumber},function(err,doc){
        if(err){
            return res.json(LJ.Res.buildError(err));
        }
        if(doc){
            LJ.Auth.sms(req.body.mobilePhoneNumber, function (err,smsCode) {
                //��Ҫsession�洢��֤��
                req.session[smsCode] = req.body.mobilePhoneNumber;
                if(err){
                    return res.json(LJ.Res.buildError("smscode send fail"));
                }
                res.json(LJ.Res.buildOK('smscode send success'));
            })
        }else{
            return res.json(LJ.Res.buildError('mobilePhoneNumber Not found.'));
        }
    })
};
/**
 * ͨ���ֻ��յ�����֤�������µ�����
 * @param req
 * @param res
 * @returns {*}
 */
exports.resetPasswordBySmsCode=function (req, res) {
    var body=req.body;
    body.smsCode = req.params.smsCode
    if(LJ.Res.checkRequire(['password','smsCode'],body,res)){
        return
    }
    var mobilePhoneNumber = req.session[body.smsCode];
    if(!mobilePhoneNumber){
        return res.json(LJ.Res.buildError("smsCode error"));
    }
    var new_password = LJ.Bcrypt.createHash(body.password);
    User.update({mobilePhoneNumber:mobilePhoneNumber},{password  :new_password},function(err,doc){
        if(err){
            return res.json(LJ.Res.buildError(err));
        }
        delete req.session[body.smsCode]
        res.json(LJ.Res.buildOK());
    })
};

/**
 * ����
 * @param req
 * @param res
 */
exports.a = function(req,res){
    User.a(req.params.uid,function(err,rows){
        LJ.Res.buildCallback(err,rows,res,'����ʧ��')
    })
}

/**
 * ����
 * @param req
 * @param res
 */
exports.f = function(req,res){
    User.f(req.params.uid,function(err,rows){
        LJ.Res.buildCallback(err,rows,res,'����ʧ��')
    })
}