var request = require('request');
var crypto = require('crypto');
var appId = '';
var appSecret = '';

function mp(id, secret) {
    appId = id;
    appSecret = secret;
    return {
        getSessionKey: (code) => {
            return new Promise((resolve, reject) => {
                request({
                    url: 'https://api.weixin.qq.com/sns/jscode2session?appid=' + appId + '&secret=' + appSecret + '&js_code=' + code + '&grant_type=authorization_code',
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
        decryptData: (encryptedData, iv, sessionKey) => {
            // base64 decode
            sessionKey = new Buffer(sessionKey, 'base64');
            encryptedData = new Buffer(encryptedData, 'base64');
            iv = new Buffer(iv, 'base64');

            try {
                var decipher = crypto.createDecipheriv('aes-128-cbc', sessionKey, iv);
                decipher.setAutoPadding(true);
                var decoded = decipher.update(encryptedData, 'binary', 'utf8');
                decoded += decipher.final('utf8');

                decoded = JSON.parse(decoded);

            } catch (err) {
                throw new Error('Illegal Buffer');
            }

            if (decoded.watermark.appid !== this.appId) {
                throw new Error('Illegal Buffer');
            }

            return decoded;
        }
    }
};

module.exports = mp;