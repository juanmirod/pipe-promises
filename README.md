# pipePromises

pipePromises is a function that allows to pipe functions that may return a promise and it runs them sequentially, passing the returned Promise from one ti the next and returning a Promise that resolves when the last promise is resolved or is rejected of any promise in the chain gets rejected. 

The easiest way to explain it is with an example:

```javascript

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

> How can I add a initial value?

pipePromises takes some functions as arguments and returns a promise, not another function. Is not a functional pipe or a reducer for promises, is a way to make a long promises chain bereable. If you want to add a initial value you can start with a constant function:

```javascript

pipePromises(
    () => 2,
    double,
    double
  )
  .then(res => console.assert(res === 8))


```

> Can I pass an array of functions?

pipePromises will reject if any argument is not a function, but you can use the spread operator:

```javascript

pipePromises(...[() => 2, double, double])
  .then(res => console.assert(res === 8))

```

This README is a WIP, for more information about the behaviour [check the test.js file](https://github.com/juanmirod/pipe-promises/blob/master/test.js)