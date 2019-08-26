var request = require('request');
var uuid = require('uuid/v1');
var crypto = require('crypto');
var appId = '';
var appSecret = '';

function mp(id, secret) {
    appId = id;
    appSecret = secret;
    return {
        getAccessToken: () => {
            return new Promise((resolve, reject) => {
                request({
                    url: 'https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=' + appId + '&secret=' + appSecret,
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
                            resolve(body.access_token);
                        }
                    });
            });
        },
        getUserInfo: (at, openid, lang) => {
            return new Promise((resolve, reject) => {
                request({
                    url: 'https://api.weixin.qq.com/cgi-bin/user/info?access_token=' + at + '&openid=' + openid + '&lang=' + (lang ? lang : 'zh_CN'),
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
                            resolve(body);
                        }
                    });
            });
        },
        getUserList: (at, next) => {
            return new Promise((resolve, reject) => {
                request({
                    url: 'https://api.weixin.qq.com/cgi-bin/user/get?access_token=' + at + '&next_openid=' + (next ? next : ''),
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
                            resolve(body);
                        }
                    });
            });
        },
        getTemplates: (at) => {
            return new Promise((resolve, reject) => {
                request({
                    url: 'https://api.weixin.qq.com/cgi-bin/template/get_all_private_template?access_token=' + at,
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
                            resolve(body);
                        }
                    });
            });
        },
        sendMessage: (at, openid, template, params, url) => {
            return new Promise((resolve, reject) => {
                request({
                    url: 'https://api.weixin.qq.com/cgi-bin/message/template/send?access_token=' + at,
                    method: 'POST',
                    json: true,
                    body: {
                        touser: openid,
                        template_id: template,
                        url: url,
                        data: params
                    }
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
                            resolve(body.msgid);
                        }
                    });
            });
        },
        getJsTicket: (at) => {
            return new Promise((resolve, reject) => {
                request({
                    url: 'https://api.weixin.qq.com/cgi-bin/ticket/getticket?access_token=' + at + '&type=jsapi',
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
                            resolve(body.ticket);
                        }
                    });
            });
        },
        getJsSignature: (ticket, url) => {
            var nonceString = uuid();
            var timestamp = Number(new Date());
            var raw = 'jsapi_ticket=' + ticket + '&noncestr=' + nonceString + '&timestamp=' + timestamp + '&url=' + url;
            return crypto.createHash('sha1').update(raw).digest('hex');
        }
    };
}

module.exports = mp;