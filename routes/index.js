var express = require('express');
var user = require('../controllers/user');
var order = require('../controllers/order');
var favorite = require('../controllers/favorite');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', { title: 'Express' });
});
router.post('/reg', user.reg)//手机号注册
router.post('/login', user.login)//登录
/* user */
router.post('/user/modify/:userId', user.modify)//修改用户资料
router.get('/user/:userId/a', user.a)//好评
router.get('/user/:userId/f', user.f)//差评
router.get('/user/requestPasswordReset', user.requestPasswordReset)//密码重设

/* order */
router.post('/order', order.create)//生成订单
router.get('/order', order.find)//订单列表 默认最新未抢 search:延迟，实时、已抢，未抢
router.post('/grab/:userId/:orderId', order.grab)//抢单
router.delete('/grab/:userId/:orderId', order.delGrab)//取消此单
/* favorite */
router.post('/favorite/:userId/:orderId', favorite.collect)//收藏
router.delete('/favorite/:userId/:orderId', favorite.cancel)//取消收藏
router.get('/favorite/:userId', favorite.findByUser)//查看用户收藏列表


module.exports = router;
