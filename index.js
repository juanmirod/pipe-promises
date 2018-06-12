'use strict'

module.exports = function pipePromises (...promisesFunctions) {
  return promisesFunctions.reduce(
    (lastPromise, f) => lastPromise.then(f),
    Promise.resolve()
  )
}
