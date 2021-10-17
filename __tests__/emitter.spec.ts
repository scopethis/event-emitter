import { on, trigger, getHandlersForEvent, off} from '../src/EventEmitter'

describe('Hopin Event Emitter', () => {

  test('it stores the supplied event and function', () => {
    const sleeping = jest.fn();
    const eating = jest.fn();

    on('sleep', sleeping)
    on('eat', eating)

    expect(getHandlersForEvent('sleep')[0]).toEqual(sleeping)
    expect(getHandlersForEvent('eat')[0]).toEqual(eating)
  })

  test('the handler is called when triggered', () => {
    const hello = jest.fn();

    on('greet', hello)
    on('goodbye', hello)

    trigger('greet')

    expect(hello).toHaveBeenCalledTimes(1)
  })


  test('the same event type can be used with different handlers', () => {
    const snooze = jest.fn();
    const upAndAtem = jest.fn();
    const dayOff = jest.fn();

    on('alarm', snooze)
    on('alarm', upAndAtem)
    on('alarm', dayOff)

    trigger('alarm')

    expect(snooze).toHaveBeenCalledTimes(1)
    expect(upAndAtem).toHaveBeenCalledTimes(1)
    expect(dayOff).toHaveBeenCalledTimes(1)
  })

  test('An event can be turned off', () => {
    const inFrench = jest.fn();
    const inItalian = jest.fn();

    on('bonjour', inFrench)
    on('ciao', inItalian)

    trigger('bonjour')
    trigger('ciao')
    expect(inFrench).toHaveBeenCalledTimes(1)
    expect(inItalian).toHaveBeenCalledTimes(1)

    trigger('ciao')
    expect(inItalian).toHaveBeenCalledTimes(2)

    off('bonjour', inFrench)
    expect(() => {
      getHandlersForEvent('bonjour')
    }).toThrowError(new Error(`Event type: bonjour not found`))
  })

  test('it tidies up after itself', () => {
    const iAmJumping = jest.fn();

    on('jump', iAmJumping)
    trigger('jump')

    expect(iAmJumping).toHaveBeenCalledTimes(1)

    off('jump', iAmJumping)
    expect(() => {
      getHandlersForEvent('jump')
    }).toThrowError(new Error(`Event type: jump not found`))
  })

  test('Arbitrary arguments can be passed', () => {
    const aFunc = (arg1:string, arg2:string) => {
      expect(arg1).toBe('hello')
      expect(arg2).toBe('world')
    }

    on('helloWorld', aFunc)
    trigger('helloWorld', 'hello', 'world')
  })
})