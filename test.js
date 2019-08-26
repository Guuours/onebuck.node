var onebuck = require('./index');
var mp = onebuck.mp('wxe67c1c1e5eb63378', 'ab31fade77549961f7a77d26d830917e');

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
        var msgId = await mp.sendMessage(at, 'oHB-N5nrP48zyh44hgOc-zDIF4V0', 'rv3nBNoAxwSars1dgSnJhQ13kJJNDPevnwl4xvvzqbU',
            {
                msg: {
                    value: new Date().toString()
                }
            });
        // get js ticket
        var ticket = await mp.getJsTicket(at);
        console.log(ticket);
        var signature = mp.getJsSignature(ticket, 'http://www.baidu.com');
        console.log(signature);
    }
    catch (err) {
        console.log(err.code);
        console.log(err.message);
    }
});