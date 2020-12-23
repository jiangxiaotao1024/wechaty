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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.bot = exports.dbMain = exports.dataoke = void 0;
var wechaty_1 = require("wechaty");
var wechaty_puppet_1 = require("wechaty-puppet");
var qrcode_terminal_1 = __importDefault(require("qrcode-terminal"));
var me = __importStar(require("./function/message"));
var lo = __importStar(require("./function/login"));
var fr = __importStar(require("./function/friendship"));
var token = 'puppet_donut_70f8471d68550ded';
var java = require("java"); //引入nodejs的java模块
java.classpath.push("./openapi.jar"); //导入编写的jar包
var Dataoke = java.import('com.dtk.main.Dataoke'); //package.class
var DbMain = java.import('com.dtk.db.DbMain'); //package.class
exports.dataoke = new Dataoke();
exports.dbMain = new DbMain();
exports.bot = new wechaty_1.Wechaty({
    puppet: 'wechaty-puppet-hostie',
    puppetOptions: {
        token: token,
    }
});
exports.bot
    .on('scan', function (qrcode, status) {
    if (status === wechaty_puppet_1.ScanStatus.Waiting) {
        qrcode_terminal_1.default.generate(qrcode, {
            small: true
        });
    }
})
    .on('login', function (user) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        console.log("user: " + JSON.stringify(user));
        setInterval(function () {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, lo.getDingdan()];
                        case 1:
                            _a.sent();
                            return [2 /*return*/];
                    }
                });
            });
        }, 10000);
        return [2 /*return*/];
    });
}); })
    .on('message', function (message) { return __awaiter(void 0, void 0, void 0, function () {
    var contact, toContact, text;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, message.from()];
            case 1:
                contact = _a.sent();
                if (me.isNewapp(contact.id))
                    return [2 /*return*/];
                console.log("message: " + JSON.stringify(message));
                if (contact.self()) {
                    return [2 /*return*/];
                }
                return [4 /*yield*/, message.to()];
            case 2:
                toContact = _a.sent();
                return [4 /*yield*/, message.text()];
            case 3:
                text = _a.sent();
                if (me.isRoom(message.room()))
                    return [2 /*return*/];
                return [4 /*yield*/, me.analyseMessage(message, text)];
            case 4:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); }).on('friendship', function (friendship) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, fr.friendShip(friendship)];
            case 1:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); })
    .start();
