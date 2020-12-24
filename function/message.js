"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.compareMoney = exports.returnTaoKouLing = exports.analyseTaoKouLing = exports.getChaxun = exports.getTiXian = exports.getHelp = exports.analyseMessage = exports.isMyself = exports.isNewapp = exports.isRoom = void 0;
const bot_1 = require("../bot");
const login_1 = require("./login");
function isRoom(room) {
    if (room) {
        console.log("isRoom");
        return true;
    }
}
exports.isRoom = isRoom;
function isNewapp(id) {
    if (id === "newsapp")
        return true;
}
exports.isNewapp = isNewapp;
function isMyself(id) {
    if (id === "wxid_gb6oix6ix36g12") {
        return true;
    }
}
exports.isMyself = isMyself;
function analyseMessage(message, text) {
    switch (text) {
        case "help":
            getHelp(message);
            break;
        case "提现":
            getTiXian(message);
            break;
        case "查询":
            getChaxun(message);
            break;
        case "赚钱":
            getTuiJian(message);
            break;
        // case "测试订单支付":
        //     testDingDanZhiFu(message)
        //     break
        // case "群发":
        //     qunfa(message)
        //     break
        // case "好友":
        //     haoyou(message)
        //     break
        default:
            analyseTaoKouLing(message);
            break;
    }
}
exports.analyseMessage = analyseMessage;
//群发接口
function qunfa(message) {
    return __awaiter(this, void 0, void 0, function* () {
        var friends = yield bot_1.bot.Contact.findAll();
        const contactCard = bot_1.bot.Contact.load('wxid_gb6oix6ix36g12');
        for (var i = 0; i < friends.length; i++) {
            if (friends[i].friend())
                // if (friends[i].id != 'fmessage'
                //     && friends[i].id != 'wxid_ps8vz8gkkwci22'
                // &&friends[i].id!='wxid_5j7y7ph9j46322') {
                if (friends[i].id === 'wxid_gdl4wsmp2oxr22' ||
                    friends[i].id === 'wxid_ceekm1yas3vj22'
                    || friends[i].id === 'wxid_w9uoh4zcwn6612'
                    || friends[i].id === 'liuchang1012'
                    || friends[i].id === 'wxid_4078wzm2qy6v22'
                    || friends[i].id === 'wxid_9onmtj5xxizq12'
                    || friends[i].id === 'wxid_narqbikjhtc812'
                    || friends[i].id === 'wxid_lx6qsxqhqfnr22') {
                    yield friends[i].say("分享一个返利机器人");
                    yield friends[i].say(contactCard);
                    yield friends[i].say("群发，勿回，谢谢😬");
                }
        }
    });
}
//获取好友列表接口
function haoyou(message) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log("haoyou");
        var friends = yield bot_1.bot.Contact.findAll();
        for (var i = 0; i < friends.length; i++) {
            if (friends[i].friend())
                if (friends[i].id != 'fmessage'
                    && friends[i].id != 'wxid_ps8vz8gkkwci22') {
                    // @ts-ignore
                    console.log("name:" + friends[i].payload.name + "/alias:" + friends[i].payload.alias + "/id:" + friends[i].id);
                }
        }
    });
}
function getHelp(message) {
    message.say("发送淘口令可获得返利链接\n" +
        "发送【查询】查看个人信息\n" +
        "发送【提现】提现\n" +
        "发送【赚钱】查看赚钱方式\n" +
        "目前还是测试阶段，后期功能和佣金待完善，如果发现BUG请见谅😂，有什么问题或者好的建议请反馈，谢谢");
}
exports.getHelp = getHelp;
function getTiXian(message) {
    var id = message.from().id;
    bot_1.dbMain.addTixianRequestSync(id);
    var leftMoney = bot_1.dbMain.getLeftMoneySync(id);
    message.say("领红包：" + leftMoney + "元" + "\n" +
        "24小时内发给你" + "\n" +
        "请把我置顶,谢谢😘");
}
exports.getTiXian = getTiXian;
function getChaxun(message) {
    var id = message.from().id;
    var totalMoney = bot_1.dbMain.getTotalMoneySync(id);
    var leftMoney = bot_1.dbMain.getLeftMoneySync(id);
    var tixianMoney = totalMoney - leftMoney;
    var totalNumber = bot_1.dbMain.getDingDanNumberSync(id);
    var lever1Money = bot_1.dbMain.getLever1MoneySync(id);
    var lever2Money = bot_1.dbMain.getLever2MoneySync(id);
    var lever1Number = bot_1.dbMain.getLever1NumberSync(id);
    var lever2Number = bot_1.dbMain.getLever2NumberSync(id);
    message.say("总佣金:" + totalMoney + "元" + "\n" +
        "已提现:" + tixianMoney + "元" + "\n" +
        "可提现:" + leftMoney + "元" + "\n" +
        "总成功单数:" + totalNumber + "单" + "\n\n" +
        "一级佣金:" + lever1Money + "元\n" +
        "一级推广人数:" + lever1Number + "人\n" +
        "二级佣金:" + lever2Money + "元\n" +
        "二级推广人数:" + lever2Number + "人\n");
}
exports.getChaxun = getChaxun;
function getTuiJian(message) {
    message.say("【淘宝兼职方法】" + "\n" +
        "本方法用于自己推广赚零花钱" + "\n" +
        "绑定下级方法:" + "\n" +
        "把我的名片推送给好友或者推送到群里" + "\n" +
        "Ta点击名片添加我，会绑定为你的下级" + "\n" +
        "绑定下级后将永久享受下级购物20%奖励，" +
        "同时，你的下级推广的新成员购物你也享有5%" +
        "该奖励属于额外奖励不会影响你好友返利金额");
}
function analyseTaoKouLing(message) {
    var goodsId = bot_1.dataoke.getGoodsIdSync(message.text());
    if (goodsId === "不是链接")
        return;
    var return_message;
    if (goodsId === "无优惠") {
        return_message = "亲该宝贝没有优惠，其他商品试试呢！";
    }
    else {
        return_message = returnTaoKouLing(message, goodsId);
    }
    message.say(return_message);
}
exports.analyseTaoKouLing = analyseTaoKouLing;
function returnTaoKouLing(message, goodsId) {
    var itemDetail = JSON.parse(bot_1.dataoke.getDetailSync(goodsId));
    var pid = bot_1.dbMain.getPidByIdSync(message.from().id);
    console.log("pid:" + pid);
    var return_message;
    var urlChange = JSON.parse(bot_1.dataoke.getTaoKouLingSync(goodsId, pid));
    var title = itemDetail.data.title;
    var originalPrice = itemDetail.data.originalPrice;
    var actualPrice = itemDetail.data.actualPrice;
    var couponPrice = itemDetail.data.couponPrice;
    var minCommissionRate = urlChange.data.minCommissionRate;
    var taokouling = urlChange.data.tpwd;
    var realmoney = compareMoney((parseFloat(actualPrice) * minCommissionRate / 100 * 0.5).toFixed(2));
    if (realmoney === "0.00")
        realmoney = "0.01";
    if (couponPrice == 0) {
        return_message = "一一一一优惠信息一一一一\n" +
            title + "\n" +
            "━┉┉┉┉∞┉┉┉┉━\n" +
            "原价:" + originalPrice + "元\n" +
            "收货后再给你的红包:" + realmoney + "元\n" +
            "━┉┉┉┉∞┉┉┉┉━\n" +
            taokouling +
            "\n复制本条信息\n" +
            "打开淘即可下单😘";
    }
    else {
        return_message = "一一一一优惠信息一一一一\n" +
            title + "\n" +
            "━┉┉┉┉∞┉┉┉┉━\n" +
            "原价:" + originalPrice + "元\n" +
            "优惠:" + couponPrice + "元\n" +
            "券后价:" + actualPrice + "元\n" +
            "收货后再给你的红包:" + realmoney + "元\n" +
            "━┉┉┉┉∞┉┉┉┉━\n" +
            taokouling +
            "\n复制本条信息\n" +
            "打开淘即可下单😘";
    }
    return return_message;
}
exports.returnTaoKouLing = returnTaoKouLing;
function compareMoney(money) {
    if (money === "0.00")
        money = "0.01";
    return money;
}
exports.compareMoney = compareMoney;
function testDingDanZhiFu(message) {
    var dingdan = { "requestId": "bf97acdf7d70eaaf9435cb624587520d", "time": 1608173303942, "code": 0, "msg": "成功", "data": { "has_pre": false, "has_next": false, "page_no": 1, "results": { "publisher_order_dto": [{ "terminal_type": "无线", "item_category_name": "五金/工具", "tk_paid_time": "2020-12-17 10:48:17", "adzone_id": 111067000033, "alipay_total_price": "100.00", "seller_shop_title": "天澄贸易", "alimama_share_fee": "0.00", "trade_id": "1446862356240876331", "click_time": "2020-12-17 10:42:23", "subsidy_rate": "0.00", "refund_tag": 0, "item_title": "红/绿色可接驳PU聚氨酯圆皮带圆带圆形粗面O型粘接工业环形传动带", "order_type": "淘宝", "tb_paid_time": "2020-12-17 10:48:07", "tk_order_role": 2, "total_commission_fee": "0.00", "pub_id": 128572012, "item_img": "//img.alicdn.com/tfscom/i3/2650656919/O1CN01AhNj5T20yx13IJmDj_!!2650656919.jpg", "alimama_rate": "0.00", "item_id": 631237418743, "item_price": "100.00", "tb_deposit_time": "--", "tk_status": 14, "total_commission_rate": "1.35", "trade_parent_id": "1446862356240876331", "subsidy_type": "--", "tk_create_time": "2020-12-17 10:42:57", "pub_share_fee": "0.00", "item_num": 1, "tk_commission_fee_for_media_platform": "0.00", "income_rate": "1.35", "site_name": "Yoke", "pub_share_pre_fee": "0.01", "tk_commission_rate_for_media_platform": "0.00", "tk_deposit_time": "--", "app_key": "23116944", "tk_total_rate": "1.35", "pub_share_rate": "100.00", "adzone_name": "Yoke", "site_id": 2181300208, "item_link": "http://item.taobao.com/item.htm?id=631237418743", "deposit_price": "0.00", "is_lx": "0", "seller_nick": "弑神style", "subsidy_fee": "0.00", "flow_source": "--", "tk_commission_pre_fee_for_media_platform": "0.00" },
                ] }, "position_index": "1608172977_1ISDZ9F1kzV2|1608172977_1ISDZ9F1kzV2", "page_size": 20 } };
    // var dingdan = {"requestId":"03e73fe541d4bddfbd9e77278e2bf62a","time":1608614790929,"code":0,"msg":"成功","data":{"has_pre":false,"has_next":false,"page_no":1,"results":{},"position_index":"1608012000_|1608015601_","page_size":20}}
    var temp = dingdan.data.results;
    // @ts-ignore
    if (JSON.stringify(temp) != "{}") {
        // @ts-ignore
        login_1.syncDingDan(temp);
    }
}
