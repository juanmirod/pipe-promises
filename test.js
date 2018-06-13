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

  xit('fails if the arguments are not functions')
  xit('fails if any function does not returns a promise')
})
