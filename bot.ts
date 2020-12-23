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
    setInterval(async function (){
      await lo.getDingdan()
    },10000)
  })
  .on('message', async message => {
    const contact = await message.from()
    if(me.isNewapp(contact.id))
      return
    console.log(`message: ${JSON.stringify(message)}`)
    if(contact.self()) {
      return
    }
    const toContact = await message.to()
    var text = await message.text()
    if(me.isRoom(message.room()))
      return
    await me.analyseMessage(message,text)
  }).on('friendship', async friendship => {
    await fr.friendShip(friendship)
  })
  .start()
