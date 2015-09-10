/**
 * Created by zoey on 2015/8/6.
 */
var bcrypt=require('bcrypt')

/**
 * 验证是否
 * @param password1 需要验证的密码 未加密前
 * @param password2  加密后的密码
 */
exports.isValidPassword = function(password1, password2){
    return bcrypt.compareSync(password1, password2);
}

/**
 * 加密
 * @param password
 */
exports.createHash = function(password){
    return bcrypt.hashSync(password, bcrypt.genSaltSync(10), null);
}