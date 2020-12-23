import {bot, dbMain} from "../bot";

export function friendShip(friendship:any){
    try {
        console.log("type:"+friendship.type())
        switch (friendship.type()) {
            case bot.Friendship.Type.Receive:
                console.log(`friend ship receive`)
                dbMain.addNewUserRequestSync(friendship.payload.contactId,friendship.payload.hello)
                break
            case bot.Friendship.Type.Confirm:
                console.log(`friend ship confirmed`)
                const contact = friendship.contact();
                console.log("contact:"+JSON.stringify(contact))
                contact.say("您好，我是返利机器人，回复help获取更多帮助")
                contact.alias(contact.id)
                // var wxid = dbMain.getParentIdByChildIdSync(contact.id)
                // if(wxid!="") {
                //     dbMain.addFirstNumber(wxid)
                //     var wxid1 = dbMain.getParentIdByChildIdSync(wxid)
                //     if(wxid1!="")
                //         dbMain.addFirstNumberSync(wxid1)
                // }
                break
        }
    } catch (e) {
        console.error(e)
    }
}