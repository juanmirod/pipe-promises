# pipePromises

pipePromises is a function that allows to pipe functions that may return a promise and it runs them sequentially. Like a chain of promises, but more DRY. 

The easiest way to explain how pipePromises works it is with an example:

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

pipePromises takes some functions as arguments and returns a promise. Is not a functional pipe (it does not returns a function) or a reducer for promises (it doesn't take a initial value), is a way to make a long chain of promises bereable. If you want to add a initial value you can start with a constant function:

```javascript

pipePromises(
    () => 2,
    double,
    double
  )
  .then(res => console.assert(res === 8))


```

> Can I pass an array of functions?

Yes! pipePromises will reject if any argument is not a function, but you can use the spread operator:

```javascript

pipePromises(...[() => 2, double, double])
  .then(res => console.assert(res === 8))

```

## Install

```

npm i pipe-promises

```


This README is a WIP, for more information about the behaviour [check the test.js file](https://github.com/juanmirod/pipe-promises/blob/master/test.js)