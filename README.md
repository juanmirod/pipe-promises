# pipePromises

pipePromises is a function that allows to pipe functions that may return a promise and it runs them sequentially, passing the returned Promise from one ti the next and returning a Promise that resolves when the last promise is resolved or is rejected of any promise in the chain gets rejected. 

The easiest way to explain it is with an example:

```

const getFromSomewhere = () => new Promise((resolve, reject) => 
    setTimeout(() => resolve(2), 1000)
  )
const double = x => 2*x

// tired of chaining promises and repeating '.then' al over the place?
getFromSomewhere(2)
  .then(double)
  .then(double)
  .then(res => console.assert(res === 8))

// you can do this
pipePromises(
    getFromSomewhere,
    double,
    double
  )
  .then(res => console.assert(res === 8))

```

> ¿How can I add a initial value?

Simple, add a constant function as first parameter

```

pipePromises(
    () => 2,
    double,
    double
  )
  .then(res => console.assert(res === 8))


```

This README is a WIP, for more information about the behaviour [check the test.js file](https://github.com/juanmirod/pipe-promises/blob/master/test.js)