/* eslint-env jasmine */
const pipePromises = require('.')

describe('pipePromises', () => {
  it('returns a promise', done => {
    const first = () => Promise.resolve('first')
    pipePromises(first)
      .then(res => expect(res).toBe('first'))
      .then(done)
  })

  xit('pass the result of one promise function to the next')
  xit('fails if the arguments are not functions')
  xit('fails if any function does not returns a promise')
  xit('returns a rejection if any promise in the pipe gets rejected')
})
