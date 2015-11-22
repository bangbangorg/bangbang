/**
 * Created by zoey on 2015/6/4.
 */

LJ.Res = {
    /**
     * 系统消息定义
     */
    OK : 200 ,//操作成功
    FAIL : 400 ,//操作失败

    buildOK : function(data){
        return {status : this.OK , data : data};
    },
    buildError : function(error){
        return {status : this.FAIL , data : error };
    },
    buildCallback : function(err,data,res,errData){
        if(err){
            return res.json(this.buildError(errData))
        }
        return res.json(this.buildOK(data))
    },
    /**
     * 检查是必须项是否存在
     * @param keys  必须项的名称
     * @param body
     * @param res
     * @returns {*}  如果有不存在的返回true
     */
    checkRequire : function(keys,body,res){
        var self = this;
        for(var i in keys){
            if(!body.hasOwnProperty(keys[i])){
                res.json(self.buildError(keys.join(" and ")+" required"));
                return true
            }
        }
        return false
    }
}
module.exports = LJ.Res;