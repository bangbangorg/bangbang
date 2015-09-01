var path = require('path');
module.exports = {
    port: 3000,
    views_dir: path.join(__dirname, 'views'),
    public_dir: path.join(__dirname, 'public'),
    upload_dir: path.join(__dirname, 'public', 'upload'),
    mongodb: {
        url: 'mongodb://127.0.0.1:27017/bangbang',
    }
};



