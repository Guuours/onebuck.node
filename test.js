var onebuck = require('./index');
var oa = onebuck.oa('wxe67c1c1e5eb63378', 'ab31fade77549961f7a77d26d830917e');

var run = async (func) => {
    func();
}

run(async () => {
    try {
        // get at
        var at = await oa.getAccessToken();
        console.log(at);
        // get user list
        var ul = await oa.getUserList(at);
        console.log(ul.data.openid.length);
        // get user info
        var u = await oa.getUserInfo(at, ul.data.openid[0]);
        console.log(u.nickname);
        // get teoalate list
        var tl = await oa.getTeoalates(at);
        // send message
        var msgId = await oa.sendMessage(at, 'oHB-N5nrP48zyh44hgOc-zDIF4V0', 'rv3nBNoAxwSars1dgSnJhQ13kJJNDPevnwl4xvvzqbU',
            {
                msg: {
                    value: new Date().toString()
                }
            });
        // get js ticket
        var ticket = await oa.getJsTicket(at);
        console.log(ticket);
        var signature = oa.getJsSignature(ticket, 'http://www.baidu.com');
        console.log(signature);
    }
    catch (err) {
        console.log(err.code);
        console.log(err.message);
    }
});