# Event Emitter
1. ```npm install```
2. ```npm run test``` or ```npm run watch```

## Usage
``` javascript
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
chat.addMessage('Hello') // Logs: Message event:: Hello
chat.addMessage('World') // Logs: Message event:: World

scribe.deActivate()
chat.addMessage('Hello') // Logs: nothing
chat.addMessage('World') // Logs: nothing
```
Run: ```npm run examples``` to see the above example in action
