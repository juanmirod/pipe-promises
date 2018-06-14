'use strict'

module.exports = function pipePromises (...promisesFunctions) {
  return promisesFunctions.reduce(
    (lastPromise, f) => {
      if (typeof f !== 'function') {
        return Promise.reject(new Error(`pipePromises expected a function and got a ${typeof f}`))
      }
      return lastPromise.then(f)
    },
    Promise.resolve()
  )
}
