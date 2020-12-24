"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.friendShip = void 0;
const bot_1 = require("../bot");
function friendShip(friendship) {
    try {
        console.log("type:" + friendship.type());
        switch (friendship.type()) {
            case bot_1.bot.Friendship.Type.Receive:
                console.log(`friend ship receive`);
                //将好友请求存入数据库，由于无法识别好友来源，后期做手动添加操作
                bot_1.dbMain.addNewUserRequestSync(friendship.payload.contactId, friendship.payload.hello);
                break;
            case bot_1.bot.Friendship.Type.Confirm:
                console.log(`friend ship confirmed`);
                const contact = friendship.contact();
                console.log("contact:" + JSON.stringify(contact));
                contact.say("您好，我是返利机器人，回复help获取更多帮助");
                //对所有的好友备注为好友id方便后面茶渣好友
                contact.alias(contact.id);
                // var wxid = dbMain.getParentIdByChildIdSync(contact.id)
                // if(wxid!="") {
                //     dbMain.addFirstNumber(wxid)
                //     var wxid1 = dbMain.getParentIdByChildIdSync(wxid)
                //     if(wxid1!="")
                //         dbMain.addFirstNumberSync(wxid1)
                // }
                break;
        }
    }
    catch (e) {
        console.error(e);
    }
}
exports.friendShip = friendShip;
