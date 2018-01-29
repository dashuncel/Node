const EventEmitter = require('events');

class ChatApp extends EventEmitter {
  /**
   * @param {String} title
   */
  constructor(title) {
    super();

    this.title = title;

    // Посылать каждую секунду сообщение
    setInterval(() => {
      this.emit('message', `${this.title}: ping-pong`);
    }, 1000);
  }

  close() {
    console.log(`Чат ${this.title} закрылся :('`)
    this.removeAllListeners('message', () => {
      console.log(`Чат ${this.title} закрылся :('`)
    });
  }
}

let webinarChat =  new ChatApp('webinar');
let facebookChat = new ChatApp('=========facebook');
let vkChat =       new ChatApp('---------vk');

let chatOnMessage = (message) => {
  console.log(message);
};

let readyToAns = (message) => {
  console.log(message.split(':')[0], ': готовлюсь к ответу');
};

webinarChat.on('message', chatOnMessage);
webinarChat.on('message', readyToAns);

facebookChat.on('message', chatOnMessage);

vkChat.on('message', chatOnMessage);
vkChat.on('message', readyToAns);
vkChat.setMaxListeners(2);
vkChat.close();

// Закрыть вконтакте
setTimeout( ()=> {
  console.log('Закрываю вконтакте...');
vkChat.removeListener('message', chatOnMessage);
}, 10000 );


// Закрыть фейсбук
setTimeout( ()=> {
  console.log('Закрываю фейсбук, все внимание — вебинару!');
facebookChat.removeListener('message', chatOnMessage);
}, 15000 );