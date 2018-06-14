/* eslint-env jasmine */
const pipePromises = require('.')

describe('pipePromises', () => {
  const first = () => Promise.resolve('first')
  const two = () => Promise.resolve(2)
  const double = x => Promise.resolve(2 * x)
  const fail = () => Promise.reject(new Error('Oh no!'))

  it('returns a promise', done =>
    pipePromises(first)
      .then(res => expect(res).toBe('first'))
      .then(done)
  )

  it('pass the result of one promise function to the next', done =>
    pipePromises(two, double, double, double)
      .then(res => expect(res).toBe(16))
      .then(done)
  )

  it('get rejected if any promise in the pipe gets rejected', done =>
    pipePromises(two, double, fail, double)
      .then(done.fail)
      .catch(err => expect(err).toEqual(new Error('Oh no!')))
      .then(done)
  )

  it('works with normal functions (because it is the default behaviour of then)', done =>
    pipePromises(
      _ => 4,
      x => x * 3
    )
      .then(res => expect(res).toBe(12))
      .then(done)
  )

  it('fails if any argument is not a function', done =>
    pipePromises(two, 4, double)
      .then(done.fail)
      .catch(err =>
        expect(err).toEqual(new Error('pipePromises expected a function and got a number'))
      )
      .then(done)
  )
})
