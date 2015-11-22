/**
 * Created by zoey on 2015/10/1.
 */
var bcrypt=require('bcrypt')
LJ.Bcrypt = {}
/**
 * 验证arg1和加密后的arg2一致
 * @param arg1  加密前
 * @param arg2  加密后
 */
LJ.Bcrypt.isValid = function(arg1, arg2){
    return bcrypt.compareSync(arg1, arg2);
}

/**
 * 加密
 * @param arg
 */
LJ.Bcrypt.createHash = function(arg){
    return bcrypt.hashSync(arg, bcrypt.genSaltSync(10), null);
}
module.exports = LJ.Bcrypt;