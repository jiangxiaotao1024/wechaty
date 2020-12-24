import { Wechaty } from 'wechaty'
import { ScanStatus } from 'wechaty-puppet'
import QrcodeTerminal from 'qrcode-terminal';
import * as me from "./function/message";
import * as lo from "./function/login";
import * as fr from "./function/friendship";
const token = 'puppet_donut_70f8471d68550ded'
var java = require("java"); //引入nodejs的java模块

java.classpath.push("./openapi.jar"); //导入编写的jar包
var Dataoke = java.import('com.dtk.main.Dataoke'); //package.class
var DbMain = java.import('com.dtk.db.DbMain'); //package.class
export var dataoke = new Dataoke();
export var dbMain = new DbMain();
export var bot = new Wechaty({
  puppet: 'wechaty-puppet-hostie',
  puppetOptions: {
    token,
  }
});
bot
  .on('scan', (qrcode, status) => {
    if (status === ScanStatus.Waiting) {
      QrcodeTerminal.generate(qrcode, {
        small: true
      })
    }
  })
  .on('login', async user => {
    console.log(`user: ${JSON.stringify(user)}`)
    //每隔10ms获取这段时间呢的订单信息，包括付款订单，结算订单
    setInterval(async function (){
      await lo.getDingdan()
    },10000)
  })
  .on('message', async message => {
    const contact = await message.from()
    //过滤腾讯新闻消息
    if(me.isNewapp(contact.id))
      return
    console.log(`message: ${JSON.stringify(message)}`)
    //自己发出的消息不做处理
    if(contact.self()) {
      return
    }
    const toContact = await message.to()
    var text = await message.text()
    //群消息不做处理
    if(me.isRoom(message.room()))
      return
    //分析消息
    await me.analyseMessage(message,text.toLowerCase())
  }).on('friendship', async friendship => {
    //处理好友请求
    await fr.friendShip(friendship)
  })
  .start()
