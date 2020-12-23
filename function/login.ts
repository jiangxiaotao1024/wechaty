import * as me from "./message";
import {bot, dataoke, dbMain} from "../bot";
export function getDingdan(){
    var dingdan = JSON.parse(dataoke.getDingDanSync())
    var temp = dingdan.data.results
    if(JSON.stringify(temp)!="{}"){
        syncDingDan(temp)
    }
}
export function syncDingDan(temp: { publisher_order_dto: any; }){
    var list = temp.publisher_order_dto;
    for(var i =0;i<list.length;i++){
        syncPerDingDan(list[i])
    }
}
export function syncPerDingDan(data:any){
    var adzone_id = data.adzone_id.toString();
    var wxid = dbMain.getWxidByAdzoneIdSync(adzone_id);
    if (data.tk_status == 12){
        syncPerFukuanDingDan(data,wxid)
    }
    if(data.tk_status == 14){
        syncPerJiesuanDingDan(data,wxid)
    }
}
async function syncPerFukuanDingDan(data: any, wxid: any) {
    var realmoney = me.compareMoney((data.alipay_total_price * data.tk_total_rate / 100 * 0.5).toFixed(2))
    const contact = await bot.Contact.find({alias: wxid})
    // @ts-ignore
    await contact.say(data.item_title+"\n"+
        "已绑定:"+data.trade_parent_id+"\n"+
        "----------------------"+"\n"+
        "付费:"+data.alipay_total_price+"元\n"+
        "送红包:"+realmoney+"元\n"+
        "交易完成后，记住回来找我领包😘")
}
export function syncPerJiesuanDingDan(data:any,wxid:any){
    var realmoney = me.compareMoney((data.alipay_total_price*data.tk_total_rate/100*0.5).toFixed(2))
    syncPerJiesuanDingDan_self(data, wxid,realmoney)
    var wxid1 = dbMain.getParentIdByChildIdSync(wxid);
    console.log("wxid1:"+wxid1)
    if(wxid1 != null){
        syncPerJiesuanDingDan_1(data,wxid1,realmoney)
        var wxid2 = dbMain.getParentIdByChildIdSync(wxid1);
        if(wxid2 != null){
            syncPerJiesuanDingDan_2(data,wxid2,realmoney)
        }
    }
}
async function syncPerJiesuanDingDan_self(data: any, wxid: any, realmoney: any) {
    var flag = dbMain.addMoneySync(wxid, realmoney)
    if (!flag) {
        return;
    }
    dbMain.addDingDanSync(wxid, data.item_title, data.trade_parent_id, realmoney, 0)
    var leftMoney = dbMain.getLeftMoneySync(wxid)
    const contact = await bot.Contact.find({alias: wxid});
    // @ts-ignore
    await contact.say("【红包到账提醒】" + "\n" +
        data.item_title +
        "订单号:" + data.trade_parent_id + "\n" +
        "-----------------------------" + "\n" +
        "这一单送:" + realmoney + "元\n" +
        "累计余额:" + leftMoney + "元\n" +
        "发【提现】两个字来领红包😘")
}
async function syncPerJiesuanDingDan_1(data: any, wxid1: any, realmoney: any) {
    // @ts-ignore
    var money1 = (realmoney * 0.2).toFixed(2);
    if (money1 === "0.00")
        money1 = "0.01"
    dbMain.addMoneySync(wxid1, money1)
    dbMain.addDingDanSync(wxid1, data.item_title, data.trade_parent_id, money1, 1)
    var leftMoney1 = dbMain.getLeftMoneySync(wxid1)
    var contact1 = await bot.Contact.find({alias: wxid1});
    // @ts-ignore
    await contact1.say("一级好友提成" + "\n" +
        "他的红包:" + realmoney + "元\n" +
        "您的提成:" + money1 + "元\n" +
        "余额:" + leftMoney1+"元")
}
async function syncPerJiesuanDingDan_2(data: any, wxid2: any, realmoney: any) {
    // @ts-ignore
    var money2 = (realmoney * 0.05).toFixed(2);
    if (money2 === "0.00")
        money2 = "0.01"
    dbMain.addMoneySync(wxid2, money2)
    dbMain.addDingDanSync(wxid2, data.item_title, data.trade_parent_id, money2, 2)
    var leftMoney2 = dbMain.getLeftMoneySync(wxid2)
    var contact1 = await bot.Contact.find({alias: wxid2});
    // @ts-ignore
    await contact1.say("二级好友提成" + "\n" +
        "他的红包:" + realmoney + "元\n" +
        "您的提成:" + money2 + "元\n" +
        "余额:" + leftMoney2+"元")
}