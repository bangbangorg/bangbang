/**
 * Created by zoey on 2015/10/1.
 */
var bcrypt=require('bcrypt')
LJ.Bcrypt = {}
/**
 * ��֤arg1�ͼ��ܺ��arg2һ��
 * @param arg1  ����ǰ
 * @param arg2  ���ܺ�
 */
LJ.Bcrypt.isValid = function(arg1, arg2){
    return bcrypt.compareSync(arg1, arg2);
}

/**
 * ����
 * @param arg
 */
LJ.Bcrypt.createHash = function(arg){
    return bcrypt.hashSync(arg, bcrypt.genSaltSync(10), null);
}
module.exports = LJ.Bcrypt;