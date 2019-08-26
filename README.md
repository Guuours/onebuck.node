A toolkit that provides some methods to help you to integrate you app to tencent products such as qq, wechat, etc.
# use with async
```js
var onebuck = require('./index');
var mp = onebuck.mp('yourappid', 'yourappsecret');

var run = async (func) => {
    func();
}

run(async () => {
    try {
        // get at
        var at = await mp.getAccessToken();
        console.log(at);
        // get user list
        var ul = await mp.getUserList(at);
        console.log(ul.data.openid.length);
        // get user info
        var u = await mp.getUserInfo(at, ul.data.openid[0]);
        console.log(u.nickname);
        // get template list
        var tl = await mp.getTemplates(at);
        // send message
        var msgId = await mp.sendMessage(at, 'openid', 'templateid',
            {
                msg: {
                    value: new Date().toString()
                }
            });
        // get js ticket
        var ticket = await mp.getJsTicket(at);
        console.log(ticket);
        var signature = mp.getJsSignature(ticket, 'redirecturl');
        console.log(signature);
    }
    catch (err) {
        console.log(err.code);
        console.log(err.message);
    }
});
```