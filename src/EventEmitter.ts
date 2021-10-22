type Handlers = {
  [key: string]: Function[]
}

type HandlerMap = {
  [key: string]: Function
}

const handlers: Handlers = {}

/**
 * Trigger a notification to all listeners of this event type
 * as well as passing on any parameters that were supplied.
 * @param type Event to trigger
 * @param args A comma seperated list of parameters. 
 *             to be passed as arguments to the listener 
 *             in the order they were given.
 */
const trigger = (type: string, ...args: Array<any>): void => {
  try {
    const event: Function[] = createEvent(type)
    event.forEach(handler => {
      handler(...args)
    })
  } catch (error) {
    throw error
  }
}

/**
 * Register a listener for an event of a particular type.
 * @param type Event name to listen to. Or map of events where
 *             the type is the key and the handler is the value
 * @param handler Function to execute when the event is triggered.
 */
const on = (event: string | HandlerMap, handler?: Function): void => {
  if (typeof event === "string") {
    if (handler) {
      register(event, handler)
    }
  } else {
    const keys: Array<string> = Object.keys(event)
    keys.forEach(key => {
      const listener = event[key]
      register(key, listener)
    })
  }
}

/**
 * Register an listener to an event
 * @param event The event to listen to
 * @param handler The function to be called
 */
const register = (event: string, handler: Function):void => {
  let notification = createEvent(event)
  notification.push(handler)
}


/**
 * Stop listening for events by passing the type and function.
 * @param type Event name to unsubscribe from.
 * @param handler Function to remove
 */
const off = (type: string, handler: Function): void => {
  let event = getEvent(type)
  const updatedEvent = event.filter(listeners => {
    return listeners !== handler
  })

  handlers[type] = updatedEvent
  prune()
}

/**
 * Finds the event namespace
 * for the supplied type.
 * @param type 
 * @returns An empty array or an array 
 *          of handlers assigned to the event
 */
const getEvent = (type: string): Function[] => {
  let event = handlers[type]
  if (!event) {
    throw new Error(`Event type: ${type} not found`)
  }
  return event
}

/**
 * Creates the event namespace
 * for the supplied type.
 * @param type 
 * @returns An empty array 
 */
const createEvent = (type: string): Function[] => {
  let event = handlers[type]
  if (!event) {
    event = handlers[type] = []
  }
  return event
}

/**
 * Removes any events that have 0 subscribers
 */
const prune = () => {
  const keys = Object.getOwnPropertyNames(handlers)
  keys.forEach(event => {
    if (handlers[event].length < 1) {
      delete handlers[event]
    }
  })
}

export {
  on,
  off,
  trigger
}