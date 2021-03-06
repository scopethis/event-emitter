import { on, trigger, off} from '../src/EventEmitter'

describe('Hopin Event Emitter', () => {
  test('An error is not thrown if trigger if event not registered', () => {
    expect(() => {
      trigger('greet')
    }).not.toThrow()
  })


  test('the handler is called when triggered', () => {
    const hello = jest.fn();

    on('greet', hello)
    on('goodbye', hello)

    trigger('greet')

    expect(hello).toHaveBeenCalledTimes(1)
  })

  test('multiple event/handlers can be registered at once', () => {
    const jump = jest.fn();
    const walk = jest.fn();
    const run = jest.fn();

    on({ 
      jump: jump,
      walk: walk,
      run: run
    })

    trigger('jump')
    trigger('walk')
    trigger('run')

    expect(jump).toHaveBeenCalledTimes(1)
    expect(walk).toHaveBeenCalledTimes(1)
    expect(run).toHaveBeenCalledTimes(1)
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
    trigger('bonjour')
    expect(inFrench).toHaveBeenCalledTimes(1)
  })

  test('it tidies up after itself', () => {
    const iAmJumping = jest.fn();

    on('jump', iAmJumping)
    trigger('jump')

    expect(iAmJumping).toHaveBeenCalledTimes(1)

    off('jump', iAmJumping)
    trigger('jump')
    expect(iAmJumping).toHaveBeenCalledTimes(1)
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