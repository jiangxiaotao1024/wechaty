"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.syncPerJiesuanDingDan = exports.syncPerDingDan = exports.syncDingDan = exports.getDingdan = void 0;
var me = __importStar(require("./message"));
var bot_1 = require("../bot");
function getDingdan() {
    var dingdan = JSON.parse(bot_1.dataoke.getDingDanSync());
    var temp = dingdan.data.results;
    if (JSON.stringify(temp) != "{}") {
        syncDingDan(temp);
    }
}
exports.getDingdan = getDingdan;
function syncDingDan(temp) {
    var list = temp.publisher_order_dto;
    for (var i = 0; i < list.length; i++) {
        syncPerDingDan(list[i]);
    }
}
exports.syncDingDan = syncDingDan;
function syncPerDingDan(data) {
    var adzone_id = data.adzone_id.toString();
    var wxid = bot_1.dbMain.getWxidByAdzoneIdSync(adzone_id);
    if (data.tk_status == 12) {
        syncPerFukuanDingDan(data, wxid);
    }
    if (data.tk_status == 14) {
        syncPerJiesuanDingDan(data, wxid);
    }
}
exports.syncPerDingDan = syncPerDingDan;
function syncPerFukuanDingDan(data, wxid) {
    return __awaiter(this, void 0, void 0, function () {
        var realmoney, contact;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    realmoney = me.compareMoney((data.alipay_total_price * data.tk_total_rate / 100 * 0.5).toFixed(2));
                    return [4 /*yield*/, bot_1.bot.Contact.find({ alias: wxid })
                        // @ts-ignore
                    ];
                case 1:
                    contact = _a.sent();
                    // @ts-ignore
                    return [4 /*yield*/, contact.say(data.item_title + "\n" +
                            "已绑定:" + data.trade_parent_id + "\n" +
                            "----------------------" + "\n" +
                            "付费:" + data.alipay_total_price + "元\n" +
                            "送红包:" + realmoney + "元\n" +
                            "交易完成后，记住回来找我领包😘")];
                case 2:
                    // @ts-ignore
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
function syncPerJiesuanDingDan(data, wxid) {
    var realmoney = me.compareMoney((data.alipay_total_price * data.tk_total_rate / 100 * 0.5).toFixed(2));
    syncPerJiesuanDingDan_self(data, wxid, realmoney);
    var wxid1 = bot_1.dbMain.getParentIdByChildIdSync(wxid);
    console.log("wxid1:" + wxid1);
    if (wxid1 != null) {
        syncPerJiesuanDingDan_1(data, wxid1, realmoney);
        var wxid2 = bot_1.dbMain.getParentIdByChildIdSync(wxid1);
        if (wxid2 != null) {
            syncPerJiesuanDingDan_2(data, wxid2, realmoney);
        }
    }
}
exports.syncPerJiesuanDingDan = syncPerJiesuanDingDan;
function syncPerJiesuanDingDan_self(data, wxid, realmoney) {
    return __awaiter(this, void 0, void 0, function () {
        var flag, leftMoney, contact;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    flag = bot_1.dbMain.addMoneySync(wxid, realmoney);
                    if (!flag) {
                        return [2 /*return*/];
                    }
                    bot_1.dbMain.addDingDanSync(wxid, data.item_title, data.trade_parent_id, realmoney, 0);
                    leftMoney = bot_1.dbMain.getLeftMoneySync(wxid);
                    return [4 /*yield*/, bot_1.bot.Contact.find({ alias: wxid })];
                case 1:
                    contact = _a.sent();
                    // @ts-ignore
                    return [4 /*yield*/, contact.say("【红包到账提醒】" + "\n" +
                            data.item_title +
                            "订单号:" + data.trade_parent_id + "\n" +
                            "-----------------------------" + "\n" +
                            "这一单送:" + realmoney + "元\n" +
                            "累计余额:" + leftMoney + "元\n" +
                            "发【提现】两个字来领红包😘")];
                case 2:
                    // @ts-ignore
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
function syncPerJiesuanDingDan_1(data, wxid1, realmoney) {
    return __awaiter(this, void 0, void 0, function () {
        var money1, leftMoney1, contact1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    money1 = (realmoney * 0.2).toFixed(2);
                    if (money1 === "0.00")
                        money1 = "0.01";
                    bot_1.dbMain.addMoneySync(wxid1, money1);
                    bot_1.dbMain.addDingDanSync(wxid1, data.item_title, data.trade_parent_id, money1, 1);
                    leftMoney1 = bot_1.dbMain.getLeftMoneySync(wxid1);
                    return [4 /*yield*/, bot_1.bot.Contact.find({ alias: wxid1 })];
                case 1:
                    contact1 = _a.sent();
                    // @ts-ignore
                    return [4 /*yield*/, contact1.say("一级好友提成" + "\n" +
                            "他的红包:" + realmoney + "元\n" +
                            "您的提成:" + money1 + "元\n" +
                            "余额:" + leftMoney1 + "元")];
                case 2:
                    // @ts-ignore
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
function syncPerJiesuanDingDan_2(data, wxid2, realmoney) {
    return __awaiter(this, void 0, void 0, function () {
        var money2, leftMoney2, contact1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    money2 = (realmoney * 0.05).toFixed(2);
                    if (money2 === "0.00")
                        money2 = "0.01";
                    bot_1.dbMain.addMoneySync(wxid2, money2);
                    bot_1.dbMain.addDingDanSync(wxid2, data.item_title, data.trade_parent_id, money2, 2);
                    leftMoney2 = bot_1.dbMain.getLeftMoneySync(wxid2);
                    return [4 /*yield*/, bot_1.bot.Contact.find({ alias: wxid2 })];
                case 1:
                    contact1 = _a.sent();
                    // @ts-ignore
                    return [4 /*yield*/, contact1.say("二级好友提成" + "\n" +
                            "他的红包:" + realmoney + "元\n" +
                            "您的提成:" + money2 + "元\n" +
                            "余额:" + leftMoney2 + "元")];
                case 2:
                    // @ts-ignore
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
