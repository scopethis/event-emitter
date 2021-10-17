import { on, trigger, off } from '../src/EventEmitter'

const Messages = () => {
  return {
    addMessage: (message:string) => {
      trigger('message', message)
    }
  }
}

const MessageHandler = () => {
  const _listen = (message: string) => {
    console.log(`Message event:: ${message}`)
  }

  return {
    activate: () => {
      on('message', _listen)
    },
    deActivate: () => {
      off('message', _listen)
    }
  }
}

const chat = Messages()
const scribe = MessageHandler()

scribe.activate()
chat.addMessage('Hello')
chat.addMessage('World')

scribe.deActivate()
chat.addMessage('Hello')
chat.addMessage('World')

