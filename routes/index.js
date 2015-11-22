var express = require('express');
var users = require('../controllers/users');
var order = require('../controllers/order');
var favorite = require('../controllers/favorite');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', { title: 'Express' });
});
/* user */
router.get('/login', users.login);
router.post('/usersByMobilePhone', users.usersByMobilePhone);//使用手机号码一键注册或登录 require mobilePhoneNumber,smsCode
router.post('/requestSmsCode', users.requestSmsCode);//发送短信/语音验证码  require mobilePhoneNumber
router.get('/users/:uid', users.findById);
router.put('/users/:uid', users.update);
router.put('/users/:uid/updatePassword', users.updatePassword);
router.post('/requestPasswordResetBySmsCode', users.requestPasswordResetBySmsCode);//使用短信验证码重置用户密码
router.put('/resetPasswordBySmsCode/:smsCode', users.resetPasswordBySmsCode);//通过手机收到的验证码设置新的密码
router.get('/users/:uid/a', users.a)//好评
router.get('/users/:uid/f', users.f)//差评

/* order */
router.post('/order', order.create)//生成订单
router.get('/order', order.find)//订单列表 默认最新未抢 search:延迟，实时、已抢，未抢
router.post('/grab/:userId/:orderId', order.grab)//抢单
router.delete('/grab/:userId/:orderId', order.delGrab)//取消此单
/* favorite */
router.post('/favorite/:userId/:orderId', favorite.collect)//收藏
router.delete('/favorite/:userId/:orderId', favorite.cancel)//取消收藏
router.get('/favorite/:userId', favorite.find)//查看用户收藏列表


module.exports = router;
