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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.bot = exports.dbMain = exports.dataoke = void 0;
const wechaty_1 = require("wechaty");
const wechaty_puppet_1 = require("wechaty-puppet");
const qrcode_terminal_1 = __importDefault(require("qrcode-terminal"));
const me = __importStar(require("./function/message"));
const lo = __importStar(require("./function/login"));
const fr = __importStar(require("./function/friendship"));
const token = 'puppet_donut_70f8471d68550ded';
var java = require("java"); //引入nodejs的java模块
java.classpath.push("./openapi.jar"); //导入编写的jar包
var Dataoke = java.import('com.dtk.main.Dataoke'); //package.class
var DbMain = java.import('com.dtk.db.DbMain'); //package.class
exports.dataoke = new Dataoke();
exports.dbMain = new DbMain();
exports.bot = new wechaty_1.Wechaty({
    puppet: 'wechaty-puppet-hostie',
    puppetOptions: {
        token,
    }
});
exports.bot
    .on('scan', (qrcode, status) => {
    if (status === wechaty_puppet_1.ScanStatus.Waiting) {
        qrcode_terminal_1.default.generate(qrcode, {
            small: true
        });
    }
})
    .on('login', (user) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(`user: ${JSON.stringify(user)}`);
    //每隔10ms获取这段时间呢的订单信息，包括付款订单，结算订单
    setInterval(function () {
        return __awaiter(this, void 0, void 0, function* () {
            yield lo.getDingdan();
        });
    }, 10000);
}))
    .on('message', (message) => __awaiter(void 0, void 0, void 0, function* () {
    const contact = yield message.from();
    //过滤腾讯新闻消息
    if (me.isNewapp(contact.id))
        return;
    console.log(`message: ${JSON.stringify(message)}`);
    //自己发出的消息不做处理
    if (contact.self()) {
        return;
    }
    const toContact = yield message.to();
    var text = yield message.text();
    //群消息不做处理
    if (me.isRoom(message.room()))
        return;
    //分析消息
    yield me.analyseMessage(message, text.toLowerCase());
})).on('friendship', (friendship) => __awaiter(void 0, void 0, void 0, function* () {
    //处理好友请求
    yield fr.friendShip(friendship);
}))
    .start();
