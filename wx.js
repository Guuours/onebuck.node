var request = require('request');
var appId = '';
var appSecret = '';

function wx(id, secret) {
    appId = id;
    appSecret = secret;
    return {
        getAccessToken: (code) => {
            return new Promise((resolve, reject) => {
                request({
                    url: 'https://api.weixin.qq.com/sns/oauth2/access_token?appid=' + appId + '&secret=' + appSecret + '&code=' + code + '&grant_type=authorization_code',
                    json: true
                },
                    (err, resp, body) => {
                        if (err) {
                            reject(err);
                        }
                        else {
                            if (body.errcode && body.errcode !== 0) {
                                reject({
                                    code: body.errcode,
                                    message: body.errmsg
                                });
                            }
                            else {
                                resolve(body);
                            }
                        }
                    });
            });
        },
        refreshAccessToken: (rt) => {
            return new Promise((resolve, reject) => {
                request({
                    url: 'https://api.weixin.qq.com/sns/oauth2/refresh_token?appid=' + appId + '&grant_type=refresh_token&refresh_token=' + rt,
                    json: true
                },
                    (err, resp, body) => {
                        if (err) {
                            reject(err);
                        }
                        else {
                            if (body.errcode && body.errcode !== 0) {
                                reject({
                                    code: body.errcode,
                                    message: body.errmsg
                                });
                            }
                            else {
                                resolve(body);
                            }
                        }
                    });
            });
        },
        getUserInfo: (at, openid) => {
            return new Promise((resolve, reject) => {
                request({
                    url: 'https://api.weixin.qq.com/sns/userinfo?access_token=' + at + '&openid=' + openid,
                    json: true
                },
                    (err, resp, body) => {
                        if (err) {
                            reject(err);
                        }
                        else {
                            if (body.errcode && body.errcode !== 0) {
                                reject({
                                    code: body.errcode,
                                    message: body.errmsg
                                });
                            }
                            else {
                                resolve(body);
                            }
                        }
                    });
            });
        }
    };
}

module.exports = wx;