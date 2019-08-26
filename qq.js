var request = require('request');
var appId = '';
var appSecret = '';

function qq(id, secret) {
    appId = id;
    appSecret = secret;
    return {
        getUserInfoForWeb: (at, key, openid) => {
            return new Promise((resolve, reject) => {
                request({
                    url: 'https://graph.qq.com/user/get_user_info?access_token=' + at + '&oauth_consumer_key=' + key + '&openid=' + openid + '&format=json',
                    json: true
                },
                    (err, resp, body) => {
                        if (err) {
                            reject(err);
                        }
                        else {
                            if (body.errcode && body.errcode !== 0) {
                                reject({
                                    code: body.ret,
                                    message: body.msg
                                });
                            }
                            resolve(body);
                        }
                    });
            });
        }
    };
}

module.exports = qq;