import uuid from './Uuid'

type Handlers = {
  [key: string]: Function
}

const handlers: Handlers = {}

/**
 * Trigger an event notification to all listeners 
 * of this type as well as passing on any parameters
 * that were supplied.
 * @param type Event to trigger
 * @param args A comma seperated list of parameters. 
 *             to be passed as arguments to the listener 
 *             in the order they were given.
 */
const trigger = (type: string, ...args: Array<any>): void => {
  const keys = Object.getOwnPropertyNames(handlers)
  const callables = keys.filter(key => {
      const identifier = key.split('_')
      return identifier[0] === type
  })

  callables.forEach(handler => {
    handlers[handler](...args)
  })
}

/**
 * Register a listener for an event of a particular type.
 * @param type Event name to listen to.
 * @param handler Function to execute when the event is triggered.
 * @returns A symbol that can be used to remove the listener.
 */
const on = (type: string, handler: Function): string => {
  // const key = Symbol.for(`${type}_${uuid()}`)
  const key = `${type}_${uuid()}`
  handlers[key] = handler

  return key
}

/**
 * Stop listening for events by passing the correct key.
 * @param key An associated symbol that was supplied 
 *            when listening for an event.
 */
const off = (key: string): void => {
  delete handlers[key]
}

export {
  on,
  off,
  trigger,
  handlers
}