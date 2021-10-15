import { on, trigger, handlers, off} from '../src/EventEmitter'

describe('Hopin Event Emitter', () => {
  test('it stores the supplied type and function', () => {
    const hello = jest.fn();
    const goodbye = jest.fn();

    const aKey = on('hello', hello)
    const bKey = on('goodbye', goodbye)

    expect(handlers[aKey]).toEqual(hello)
    expect(handlers[bKey]).toEqual(goodbye)
  })

  
  test('the handler is called when triggered', () => {
    const hello = jest.fn();

    on('greet', hello)
    on('goodbye', hello)

    trigger('greet')

    expect(hello).toHaveBeenCalledTimes(1)
  })


  test('the same event type can be used with different handlers', () => {
    const inEnglish = jest.fn();
    const inFrench = jest.fn();
    const inSpanish = jest.fn();

    on('greet', inEnglish)
    on('greet', inFrench)
    on('greet', inSpanish)

    trigger('greet')

    expect(inEnglish).toHaveBeenCalledTimes(1)
    expect(inFrench).toHaveBeenCalledTimes(1)
    expect(inSpanish).toHaveBeenCalledTimes(1)
  })

  test('An event can be turned off', () => {
    const inFrench = jest.fn();
    const inItalian = jest.fn();

    const frenchKey = on('bonjour', inFrench)
    on('ciao', inItalian)

    trigger('bonjour')
    trigger('ciao')
    expect(inFrench).toHaveBeenCalledTimes(1)
    expect(inItalian).toHaveBeenCalledTimes(1)

    off(frenchKey)
    trigger('bonjour')
    trigger('ciao')
    expect(inFrench).toHaveBeenCalledTimes(1)
    expect(inItalian).toHaveBeenCalledTimes(2)
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