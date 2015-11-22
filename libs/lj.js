/**
 * Created by zoey on 2015/10/1.
 * 默认           LJ._ lodash模块
 * add auth       LJ.Auth  短信模块
 * add bcrypt     LJ.Bcrypt  加密模块
 * add response   LJ.Res  返回模块
 */

var fs = require('fs');
var path = require('path');
var _ = require('lodash');
global.LJ = {};
LJ._=_
var include = function(filename) {
  var script = fs.readFileSync(path.join(__dirname, filename), {'encoding': 'utf-8'});
  module._compile(script, filename);
};

//The module order is important
[
    'auth.js',
    'bcrypt.js',
    'response.js',
].forEach(include);
